// Animation Initializer
// This file initializes all animations after the DOM is loaded

// Neural Network Animation
function initNeuralNetwork() {
  const neuralNetworkContainer = document.querySelector('.neural-network');
  
  if (neuralNetworkContainer) {
    const canvas = document.createElement('canvas');
    neuralNetworkContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 50;
    const connectionDistance = 150;
    let particleColor, connectionColor;
    
    function updateColors() {
      const isDarkMode = document.body.classList.contains('dark-mode');
      particleColor = isDarkMode ? '#6366f1' : '#4f46e5';
      connectionColor = isDarkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(79, 70, 229, 0.15)';
    }
    
    function initCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    }
    
    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
          radius: Math.random() * 2 + 1
        });
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      // Update particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });
      
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = connectionColor;
            ctx.lineWidth = 0.5 * (1 - distance / connectionDistance);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    updateColors();
    initCanvas();
    animate();
    
    // Handle window resize
    window.addEventListener('resize', initCanvas);
    
    // Update colors when theme changes
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          updateColors();
        }
      });
    });
    
    observer.observe(document.body, { attributes: true });
  }
}

// Matrix Rain Animation
function initMatrixRain() {
  const matrixContainer = document.querySelector('.matrix-rain');
  
  if (matrixContainer) {
    const canvas = document.createElement('canvas');
    matrixContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width, height;
    
    // Matrix characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    let columns;
    let drops = [];
    
    function initCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      columns = Math.floor(width / fontSize);
      drops = [];
      
      // Initialize drops
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100); // Random starting position above the canvas
      }
    }
    
    function draw() {
      // Set semi-transparent black background to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      // Set color and font for characters
      const isDarkMode = document.body.classList.contains('dark-mode');
      ctx.fillStyle = isDarkMode ? '#6366f180' : '#4f46e580';
      ctx.font = `${fontSize}px monospace`;
      
      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw character
        if (drops[i] > 0) {
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        }
        
        // Move drop down
        drops[i]++;
        
        // Reset drop to top with random delay when it reaches bottom
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -20) - 10;
        }
      }
    }
    
    function animate() {
      draw();
      requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    initCanvas();
    animate();
    
    // Handle window resize
    window.addEventListener('resize', initCanvas);
  }
}

// Code Particles Animation
function initCodeParticles() {
  const codeParticlesContainer = document.querySelector('.code-particles');
  
  if (codeParticlesContainer) {
    const canvas = document.createElement('canvas');
    codeParticlesContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width, height;
    
    // Code symbols
    const codeSymbols = [
      '{', '}', '[', ']', '(', ')', '<', '>', '=', '+', '-', '*', '/', '%',
      '&&', '||', '!', '==', '===', '!=', '!==', '>=', '<=', '=>', '?', ':',
      'if', 'else', 'for', 'while', 'function', 'return', 'class', 'import',
      'const', 'let', 'var', 'async', 'await', 'try', 'catch', 'true', 'false',
      'null', 'undefined', 'this', 'new', 'delete', 'typeof', 'instanceof'
    ];
    
    // Particles
    let particles = [];
    const particleCount = 30;
    
    function initCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    }
    
    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.random() * 0.3 - 0.15,
          vy: Math.random() * 0.3 - 0.15,
          symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
          size: Math.random() * 10 + 10,
          opacity: Math.random() * 0.5 + 0.1,
          rotation: Math.random() * 360
        });
      }
    }
    
    function draw() {
      ctx.clearRect(0, 0, width, height);
      
      // Set color based on theme
      const isDarkMode = document.body.classList.contains('dark-mode');
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += 0.1;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
        
        // Draw code symbol
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);
        ctx.font = `${particle.size}px monospace`;
        ctx.fillStyle = isDarkMode ? 
          `rgba(99, 102, 241, ${particle.opacity})` : 
          `rgba(79, 70, 229, ${particle.opacity})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(particle.symbol, 0, 0);
        ctx.restore();
      });
    }
    
    function animate() {
      draw();
      requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    initCanvas();
    animate();
    
    // Handle window resize
    window.addEventListener('resize', initCanvas);
  }
}

// Initialize all animations when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initNeuralNetwork();
  initMatrixRain();
  initCodeParticles();
});

// Export the initialization functions for direct use
export { initNeuralNetwork, initMatrixRain, initCodeParticles };