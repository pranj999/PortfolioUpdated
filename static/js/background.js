document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let particleCount = 0;
    
    // Set responsive canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Adjust particle count based on screen size
        particleCount = Math.floor((canvas.width * canvas.height) / 10000);
        if (particleCount > 100) particleCount = 100; // Cap at 100 particles
        
        // Re-initialize particles
        initParticles();
    }
    
    // Initialize particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                color: getRandomColor(),
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                connections: []
            });
        }
    }
    
    // Generate a random color with teal theme
    function getRandomColor() {
        const r = Math.floor(Math.random() * 50);
        const g = Math.floor(Math.random() * 100 + 155); // Higher green for teal
        const b = Math.floor(Math.random() * 100 + 155); // Higher blue for teal
        const a = Math.random() * 0.3 + 0.1; // Low opacity
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    
    // Animation loop
    function animate() {
        // Only clear a portion of the canvas for trailing effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            
            // Move particles
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Bounce off edges
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Draw connections
            p.connections = [];
            for (let j = 0; j < particles.length; j++) {
                if (i !== j) {
                    const p2 = particles[j];
                    const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
                    const maxDistance = 150;
                    
                    if (distance < maxDistance) {
                        p.connections.push(j);
                        
                        // Draw line with gradient opacity based on distance
                        const opacity = 1 - (distance / maxDistance);
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 180, 180, ${opacity * 0.2})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Handle mouse interaction
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };
    
    canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.x;
        mouse.y = e.y;
        
        // Create ripple effect
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const distance = Math.sqrt(Math.pow(p.x - mouse.x, 2) + Math.pow(p.y - mouse.y, 2));
            
            if (distance < mouse.radius) {
                const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x);
                const force = (mouse.radius - distance) / mouse.radius;
                
                p.speedX += Math.cos(angle) * force * 0.2;
                p.speedY += Math.sin(angle) * force * 0.2;
                
                // Add some dampening to prevent excessive speed
                p.speedX *= 0.95;
                p.speedY *= 0.95;
            }
        }
    });
    
    // Handle touch interaction for mobile
    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
    });
    
    // Initialize and start animation
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
    
    // Reduce animation on low-power devices or when tab is not visible
    let isLowPower = false;
    
    // Check if browser supports battery API
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            isLowPower = !battery.charging && battery.level < 0.2;
            
            battery.addEventListener('chargingchange', function() {
                isLowPower = !battery.charging && battery.level < 0.2;
                adjustAnimationQuality();
            });
            
            battery.addEventListener('levelchange', function() {
                isLowPower = !battery.charging && battery.level < 0.2;
                adjustAnimationQuality();
            });
        });
    }
    
    // Handle visibility change
    document.addEventListener('visibilitychange', function() {
        adjustAnimationQuality();
    });
    
    function adjustAnimationQuality() {
        if (document.hidden || isLowPower) {
            // Reduce particle count when tab is not visible or on low power
            particleCount = Math.floor(particleCount / 3);
            if (particleCount < 10) particleCount = 10;
        } else {
            // Restore normal particle count
            particleCount = Math.floor((canvas.width * canvas.height) / 10000);
            if (particleCount > 100) particleCount = 100;
        }
        
        initParticles();
    }
});