import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let animationFrameId;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    const mouse = { x: null, y: null, radius: 150 };

    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('resize', handleResize);

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        
        // Premium Cyan/Purple Theme Colors
        const colors = ['#00d4ff', '#9d4edd', '#ffffff', '#33d1ff', '#a45cff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > w || this.x < 0) this.vx = -this.vx;
        if (this.y > h || this.y < 0) this.vy = -this.vy;

        // Interactive mouse repelling
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirX = dx / distance;
          let forceDirY = dy / distance;
          
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirX * force * this.density;
          let directionY = forceDirY * force * this.density;

          if (distance < maxDistance) {
            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        
        // Add a subtle glow to the particle
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }
    }

    function init() {
      particles = [];
      // Adjust particle count dynamically based on screen size to maintain performance
      const particleCount = Math.min(Math.floor((w * h) / 10000), 120); 
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      
      // Draw premium gradient background
      let bgGradient = ctx.createLinearGradient(0, 0, 0, h);
      bgGradient.addColorStop(0, '#070b1a');
      bgGradient.addColorStop(1, '#0a0f25');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        // Reset shadow for lines
        ctx.shadowBlur = 0; 

        particles[i].update();
        particles[i].draw();
        
        // Connect close particles
        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = dx * dx + dy * dy;

          if (distance < 18000) { // Connecting threshold
            let opacityValue = 1 - (distance / 18000);
            
            // Generate a gradient line stroke between the two points to look incredible
            const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            grad.addColorStop(0, `rgba(51, 209, 255, ${opacityValue * 0.4})`);
            grad.addColorStop(1, `rgba(164, 92, 255, ${opacityValue * 0.4})`);
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 w-full h-full shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
      style={{ touchAction: 'none' }}
    />
  );
}