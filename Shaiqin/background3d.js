// 3D Background Animation with Three.js
class ThreeBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.geometries = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.clock = new THREE.Clock();
        
        this.init();
        this.createParticles();
        this.createFloatingGeometry();
        this.animate();
        this.bindEvents();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x0a0a0f, 0.0008);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;

        // Renderer setup
        const canvas = document.getElementById('bg-canvas');
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x0a0a0f, 1);
    }

    createParticles() {
        const particleCount = 1500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const blueColors = [
            new THREE.Color(0x2196F3),
            new THREE.Color(0x64B5F6),
            new THREE.Color(0x1976D2),
            new THREE.Color(0x90CAF9),
            new THREE.Color(0x1565C0)
        ];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Random positions in 3D space
            positions[i3] = (Math.random() - 0.5) * 200;
            positions[i3 + 1] = (Math.random() - 0.5) * 200;
            positions[i3 + 2] = (Math.random() - 0.5) * 200;

            // Random blue colors
            const color = blueColors[Math.floor(Math.random() * blueColors.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Random sizes
            sizes[i] = Math.random() * 3 + 1;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Particle material with custom shader
        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createFloatingGeometry() {
        // Create various geometric shapes
        const shapes = [
            { geometry: new THREE.IcosahedronGeometry(2, 0), count: 15 },
            { geometry: new THREE.OctahedronGeometry(1.5), count: 10 },
            { geometry: new THREE.TetrahedronGeometry(2), count: 8 },
            { geometry: new THREE.TorusGeometry(2, 0.5, 8, 16), count: 5 },
            { geometry: new THREE.ConeGeometry(1.5, 3, 8), count: 6 }
        ];

        shapes.forEach(shape => {
            for (let i = 0; i < shape.count; i++) {
                const material = new THREE.MeshLambertMaterial({
                    color: new THREE.Color().setHSL(0.6 + Math.random() * 0.1, 0.7, 0.5 + Math.random() * 0.3),
                    transparent: true,
                    opacity: 0.3
                });

                const mesh = new THREE.Mesh(shape.geometry, material);
                
                // Random position
                mesh.position.set(
                    (Math.random() - 0.5) * 150,
                    (Math.random() - 0.5) * 150,
                    (Math.random() - 0.5) * 150
                );

                // Random rotation
                mesh.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                );

                // Random scale
                const scale = Math.random() * 0.8 + 0.5;
                mesh.scale.setScalar(scale);

                // Store animation properties
                mesh.userData = {
                    rotationSpeed: {
                        x: (Math.random() - 0.5) * 0.02,
                        y: (Math.random() - 0.5) * 0.02,
                        z: (Math.random() - 0.5) * 0.02
                    },
                    floatSpeed: Math.random() * 0.01 + 0.005,
                    floatOffset: Math.random() * Math.PI * 2
                };

                this.geometries.push(mesh);
                this.scene.add(mesh);
            }
        });

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x2196F3, 0.3);
        this.scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0x64B5F6, 0.8);
        directionalLight.position.set(10, 10, 10);
        this.scene.add(directionalLight);

        // Add point lights
        const pointLight1 = new THREE.PointLight(0x2196F3, 1, 50);
        pointLight1.position.set(20, 20, 20);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x1976D2, 1, 50);
        pointLight2.position.set(-20, -20, -20);
        this.scene.add(pointLight2);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = this.clock.getElapsedTime();

        // Animate particles
        if (this.particles) {
            this.particles.rotation.y += 0.002;
            this.particles.rotation.x += 0.001;
            
            // Mouse interaction with particles
            const targetX = this.mouseX * 0.001;
            const targetY = this.mouseY * 0.001;
            
            this.particles.rotation.y += (targetX - this.particles.rotation.y) * 0.05;
            this.particles.rotation.x += (targetY - this.particles.rotation.x) * 0.05;
        }

        // Animate geometric shapes
        this.geometries.forEach((mesh, index) => {
            // Rotation animation
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;

            // Floating animation
            mesh.position.y += Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.1;
            
            // Subtle scaling pulse
            const scale = 1 + Math.sin(time * 2 + index) * 0.1;
            mesh.scale.setScalar(scale);
        });

        // Camera movement based on mouse
        this.camera.position.x += (this.mouseX * 0.05 - this.camera.position.x) * 0.05;
        this.camera.position.y += (-this.mouseY * 0.05 - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }

    bindEvents() {
        // Mouse movement
        document.addEventListener('mousemove', (event) => {
            this.mouseX = event.clientX - this.windowHalfX;
            this.mouseY = event.clientY - this.windowHalfY;
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.windowHalfX = window.innerWidth / 2;
            this.windowHalfY = window.innerHeight / 2;

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Form interactions - enhance background when focusing inputs
        const inputs = document.querySelectorAll('input, button');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                this.enhanceBackground();
            });
            
            input.addEventListener('blur', () => {
                this.normalizeBackground();
            });
        });

        // Container animation events
        const container = document.querySelector('.container');
        if (container) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (container.classList.contains('active')) {
                            this.transitionBackground();
                        } else {
                            this.resetBackground();
                        }
                    }
                });
            });

            observer.observe(container, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    }

    enhanceBackground() {
        // Increase particle intensity on input focus
        if (this.particles) {
            this.particles.material.opacity = 1.0;
            this.particles.material.size = 3;
        }

        this.geometries.forEach(mesh => {
            mesh.material.opacity = 0.5;
        });
    }

    normalizeBackground() {
        // Return to normal state
        if (this.particles) {
            this.particles.material.opacity = 0.8;
            this.particles.material.size = 2;
        }

        this.geometries.forEach(mesh => {
            mesh.material.opacity = 0.3;
        });
    }

    transitionBackground() {
        // Special animation for form transition
        this.geometries.forEach((mesh, index) => {
            setTimeout(() => {
                mesh.userData.rotationSpeed.x *= 2;
                mesh.userData.rotationSpeed.y *= 2;
                mesh.userData.rotationSpeed.z *= 2;
            }, index * 50);
        });
    }

    resetBackground() {
        // Reset animation speeds
        this.geometries.forEach(mesh => {
            mesh.userData.rotationSpeed.x /= 2;
            mesh.userData.rotationSpeed.y /= 2;
            mesh.userData.rotationSpeed.z /= 2;
        });
    }
}

// Initialize 3D background when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThreeBackground();
});