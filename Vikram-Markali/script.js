
        // Matrix rain effect
        const canvas = document.getElementById('matrixCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01010110100101101001011010010110100101101001011010010110100101101001';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00d4ff';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 50);

        // Flip card animation
        function flipCard() {
            const container = document.getElementById('authContainer');
            container.classList.toggle('flipped');
        }

        // Form submissions
        document.getElementById('signinForm').addEventListener('submit', function(e) {
            e.preventDefault();
            showAccessGranted();
            setTimeout(() => {
                alert('Login successful! Welcome back, hacker.');
                this.reset();
            }, 2000);
        });

        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            showAccessGranted();
            setTimeout(() => {
                alert('Registration complete! Access granted.');
                this.reset();
            }, 2000);
        });

        function showAccessGranted() {
            const msg = document.createElement('div');
            msg.className = 'access-granted';
            msg.textContent = '[ ACCESS GRANTED ]';
            document.body.appendChild(msg);
            setTimeout(() => msg.remove(), 2000);
        }

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Add typing sound effect (visual feedback)
        document.querySelectorAll('.cyber-input').forEach(input => {
            input.addEventListener('input', function() {
                this.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.8)';
                setTimeout(() => {
                    this.style.boxShadow = '';
                }, 100);
            });
        });
