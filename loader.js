// ========================================
// SHARD REVEAL LOADER (loader.js)
// ========================================

function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) {
        // Fallback: unlock body if loader is missing for some reason
        document.body.classList.remove('loading');
        return;
    }

    // Safety Timeout: Force load after 6 seconds if something breaks
    const safetyTimeout = setTimeout(() => {
        console.warn("Loader timed out, forcing reveal.");
        finishLoading();
    }, 6000);

    // Lock Scroll
    document.body.classList.add('loading');

    // ----------------------------
    // 1. Prepare DOM Text for Shatter Effect (Hero Title)
    // ----------------------------
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (heroTitle) {
        const splitText = (node) => {
            if (node.nodeType === 3) {
                const content = node.nodeValue;
                const chars = content.split('').map(char => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.className = 'char';
                    if (char.trim() !== "") {
                        // More dramatic initial scatter
                        const x = (Math.random() - 0.5) * 600 + 'px';
                        const y = (Math.random() - 0.5) * 600 + 'px';
                        const z = (Math.random() - 0.5) * 500 + 'px';
                        const r = (Math.random() - 0.5) * 360 + 'deg';
                        span.style.setProperty('--x', x);
                        span.style.setProperty('--y', y);
                        span.style.setProperty('--z', z);
                        span.style.setProperty('--r', r);
                    }
                    return span;
                });
                node.replaceWith(...chars);
            } else if (node.nodeType === 1) {
                Array.from(node.childNodes).forEach(splitText);
            }
        };
        splitText(heroTitle);
    }

    if (heroSubtitle) {
        heroSubtitle.classList.add('loading-state');
    }

    // ----------------------------
    // 2. Three.js Glass Shard Simulation
    // ----------------------------
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5f5f7, 0.05); // Softer fog

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    loader.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x4f46e5, 5, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // Geometry: Smaller, Sharper Shards
    const shardCount = 800; // More shards
    // Reduce size for "smaller" look
    const geometry = new THREE.TetrahedronGeometry(0.04, 0);

    const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.2,
        roughness: 0.1,
        transmission: 0.95,
        clearcoat: 1.0,
        opacity: 0.9,
        transparent: true,
        side: THREE.DoubleSide
    });

    const mesh = new THREE.InstancedMesh(geometry, material, shardCount);
    scene.add(mesh);

    const dummy = new THREE.Object3D();
    const shards = [];

    // Distribution
    for (let i = 0; i < shardCount; i++) {
        // Start: Random Cloud around camera
        // Using spherical coordinates for better "cloud" distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 4 + Math.random() * 6; // Start far out

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi) + 2; // Bias +Z

        // End: Compressed into the center (singularity) before exploding to text
        // Or "building" the page. Let's have them converge to a dense center point
        // creating a "big bang" effect that triggers the DOM reveal.

        shards.push({
            start: { x, y, z, rx: Math.random() * Math.PI, ry: Math.random() * Math.PI },
            // Target is 0,0,0 essentially
            speed: 0.01 + Math.random() * 0.02,
            wobble: Math.random() * Math.PI
        });
    }

    let progress = 0;
    let isFinished = false;

    // Animation Loop
    function animate() {
        if (!loader || isFinished) return;

        // Non-linear progress for better "feel"
        // Starts slow, speeds up as it assembles
        // Starts slow, speeds up as it assembles
        progress += 0.025; // Significantly faster (was 0.008)
        const ease = Math.pow(progress, 3); // Cubic ease in

        let arrivedCount = 0;

        for (let i = 0; i < shardCount; i++) {
            const s = shards[i];

            // Interpolate from Start to (0,0,0)
            // We want them to swirl in.

            const invProgress = 1 - Math.min(ease, 1);

            // Spiral effect
            const angle = s.wobble + progress * 5;
            const radiusScale = invProgress * 1.5; // Shrink radius

            // Standard approach: Linear lerp to 0, plus spiral
            let tx = s.start.x * invProgress;
            let ty = s.start.y * invProgress;
            let tz = s.start.z * invProgress;

            // Add some swirl noise
            tx += Math.sin(angle) * 0.1 * invProgress;
            ty += Math.cos(angle) * 0.1 * invProgress;

            // Rotation also settles to 0
            const rx = s.start.rx * invProgress;
            const ry = s.start.ry * invProgress;

            dummy.position.set(tx, ty, tz);
            dummy.rotation.set(rx, ry, progress);

            // As they get very close to center (progress ~ 1), scale them down to nothing
            // This simulates them "fusing" into the page
            let scale = 1;
            if (progress > 0.8) {
                scale = Math.max(0, 1 - (progress - 0.8) * 5); // 0.8 -> 1.0 fades scale to 0
            }
            dummy.scale.set(scale, scale, scale);

            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        }

        mesh.instanceMatrix.needsUpdate = true;

        // Camera slight drift
        camera.position.z = 5 - ease * 2; // Zoom in
        camera.rotation.z = progress * 0.1;

        if (progress >= 1.2) {
            isFinished = true;
            finishLoading();
        } else {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
    }

    animate();

    function finishLoading() {
        clearTimeout(safetyTimeout);

        // 1. Trigger DOM Text Assembly
        if (heroTitle) heroTitle.classList.add('assembled');
        if (heroSubtitle) heroSubtitle.classList.remove('loading-state');

        // 2. Fade out Loader & Canvas
        loader.style.opacity = '0';

        // 3. Cleanup
        setTimeout(() => {
            document.body.classList.remove('loading');
            loader.remove();

            // Dispose Three.js
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        }, 500); // Faster cleanup (was 800)
    }

    // Resize Handler
    window.addEventListener('resize', () => {
        if (isFinished) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
