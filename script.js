// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', function () {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    initNavTheme();
    initCustomCursor();
    initMagneticEffects();
    initScrollReveal();
    initMarquee();
    initCardEffects();
    initGlassBlob();
});

// ========================================
// NAV THEME DYNAMICS
// ========================================

function initNavTheme() {
    const navbar = document.querySelector('custom-navbar');
    if (!navbar) return;

    const sections = document.querySelectorAll('section, .marquee-container, footer');

    // Default: light background (black text)
    navbar.classList.add('light-background');

    const observerOptions = {
        threshold: 0,
        rootMargin: '-10% 0px -90% 0px' // Check if section is under top 10% of viewport
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const isDark = entry.target.classList.contains('marquee-container') ||
                    entry.target.tagName === 'FOOTER' ||
                    entry.target.id === 'special-dark-section'; // Add more if needed

                if (isDark) {
                    navbar.classList.remove('light-background');
                } else {
                    navbar.classList.add('light-background');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => navObserver.observe(section));
}

// ========================================
// CUSTOM CURSOR
// ========================================

function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Animate outline with a bit of delay for smooth trail
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect on clickable elements
    const clickables = document.querySelectorAll('a, button, .clickable, .work-item');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hovered');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hovered');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ========================================
// MAGNETIC EFFECTS
// ========================================

function initMagneticEffects() {
    const magneticEls = document.querySelectorAll('.magnetic-btn, .logo, .nav-links a');

    magneticEls.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Stronger pull than original
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;

            // If it has children (like text), move them slightly differently for parallax
            const inner = el.querySelector('span');
            if (inner) {
                inner.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            }
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
            const inner = el.querySelector('span');
            if (inner) {
                inner.style.transform = 'translate(0, 0)';
            }
        });
    });
}

// ========================================
// SCROLL REVEAL
// ========================================

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
}

// ========================================
// MARQUEE CLONE
// ========================================

function initMarquee() {
    const marqueeContent = document.querySelector('.marquee-content');
    if (!marqueeContent) return;

    // Clone for infinite loop
    const clone = marqueeContent.cloneNode(true);
    marqueeContent.parentElement.appendChild(clone);
}

// ========================================
// CARD HOVER EFFECTS
// ========================================

function initCardEffects() {
    const cards = document.querySelectorAll('.work-item, .bio-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

// ========================================
// GLASS BLOB ANIMATION
// ========================================

function initGlassBlob() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometry - High density sphere for smooth liquid effect
    const geometry = new THREE.IcosahedronGeometry(2, 64);

    // Custom material with vertex displacement
    const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x4f46e5),
        metalness: 0.1,
        roughness: 0.2,
        transmission: 0.9,
        ior: 1.5,
        thickness: 2.0,
        transparent: true,
        opacity: 0.8,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });

    const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uNoiseIntensity: { value: 0.2 },
        uNoiseSpeed: { value: 0.6 }
    };

    material.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = uniforms.uTime;
        shader.uniforms.uMouse = uniforms.uMouse;
        shader.uniforms.uNoiseIntensity = uniforms.uNoiseIntensity;
        shader.uniforms.uNoiseSpeed = uniforms.uNoiseSpeed;

        shader.vertexShader = `
            uniform float uTime;
            uniform vec2 uMouse;
            uniform float uNoiseIntensity;
            uniform float uNoiseSpeed;

            // Simple noise function
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
            vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
            vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

            float snoise(vec3 v) {
                const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

                vec3 i  = floor(v + dot(v, C.yyy) );
                vec3 x0 = v - i + dot(i, C.xxx) ;

                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min( g.xyz, l.zxy );
                vec3 i2 = max( g.xyz, l.zxy );

                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy;
                vec3 x3 = x0 - D.yyy;

                i = mod289(i);
                vec4 p = permute( permute( permute(
                            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                        + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                        + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

                float n_ = 0.142857142857;
                vec3  ns = n_ * D.wyz - p.xzw;

                vec4 j = p - 49.0 * floor(p * (1.0 / 49.0));

                vec4 x_ = floor(j * n_);
                vec4 y_ = floor(j - 7.0 * x_ );

                vec4 x = x_ * n_ + D.xxxx;
                vec4 y = y_ * n_ + D.xxxx;
                vec4 h = 1.0 - abs(x) - abs(y);

                vec4 b0 = vec4( x.xy, y.xy );
                vec4 b1 = vec4( x.zw, y.zw );

                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));

                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

                vec3 p0 = vec3(a0.xy,h.x);
                vec3 p1 = vec3(a0.zw,h.y);
                vec3 p2 = vec3(a1.xy,h.z);
                vec3 p3 = vec3(a1.zw,h.w);

                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;

                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                                dot(p2,x2), dot(p3,x3) ) );
            }

            ${shader.vertexShader}
        `.replace(
            `#include <begin_vertex>`,
            `
            float noise = snoise(position * 0.5 + uTime * uNoiseSpeed);
            
            // Mouse influence
            float dist = distance(position.xy, uMouse * 3.0);
            float mouseInfluence = smoothstep(2.0, 0.0, dist) * 0.5;
            
            vec3 transformed = position + normal * (noise * uNoiseIntensity + mouseInfluence);
            `
        );
    };

    const blob = new THREE.Mesh(geometry, material);
    blob.scale.set(1.2, 1.0, 1.0); // Rounder oval shape
    scene.add(blob);

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x4f46e5, 1);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x4f46e5, 2);
    pointLight.position.set(-5, -3, 2);
    scene.add(pointLight);

    // Interaction vars
    let targetMouse = new THREE.Vector2(0, 0);
    let currentMouse = new THREE.Vector2(0, 0);

    window.addEventListener('mousemove', (e) => {
        targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animate(time) {
        requestAnimationFrame(animate);

        const seconds = time * 0.001;
        uniforms.uTime.value = seconds;

        // Smooth mouse follow
        currentMouse.lerp(targetMouse, 0.05);
        uniforms.uMouse.value.copy(currentMouse);

        // Slow rotation
        blob.rotation.y = seconds * 0.1;
        blob.rotation.z = seconds * 0.05;

        // Subtle tilt based on mouse
        blob.rotation.x = currentMouse.y * 0.2;
        blob.rotation.y += currentMouse.x * 0.2;

        renderer.render(scene, camera);
    }

    animate(0);

    // Resize handler
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetHex = this.getAttribute('href');
        if (targetHex === '#') return;

        const target = document.querySelector(targetHex);
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});