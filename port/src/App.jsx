import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import './App.css'
import './assets/animations.css'
import './assets/matrix-rain.css'
import './assets/neural-network.css'
import './assets/code-particles.css'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [loading, setLoading] = useState(true)

  // Check for user's preferred color scheme and simulate loading time
  useEffect(() => {
    // Add or remove dark-mode class from body
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
    
    // Simulate loading time - reduced to make animations visible faster
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [darkMode])
  
  // Initialize animations
  useEffect(() => {
    // Neural Network Animation - Enhanced for more dynamic visualization
    const initNeuralNetwork = () => {
      const neuralNetworkContainer = document.querySelector('.neural-network');
      
      if (neuralNetworkContainer) {
        const canvas = document.createElement('canvas');
        neuralNetworkContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const particleCount = 80; // Increased from 50 for more density
        const connectionDistance = 180; // Increased from 150 for more connections
        let particleColor, connectionColor;
        let mouseX = 0, mouseY = 0;
        let isMouseMoving = false;
        let mouseTimer;
        
        function updateColors() {
          const isDarkMode = document.body.classList.contains('dark-mode');
          particleColor = isDarkMode ? '#6366f1' : '#4f46e5';
          connectionColor = isDarkMode ? 'rgba(99, 102, 241, 0.25)' : 'rgba(79, 70, 229, 0.25)';
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
          
          // Create particles with different speeds and sizes
          for (let i = 0; i < particleCount; i++) {
            // Create different types of particles
            const isFastParticle = Math.random() > 0.7;
            const speedMultiplier = isFastParticle ? 2 : 1;
            
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() * 0.6 - 0.3) * speedMultiplier,
              vy: (Math.random() * 0.6 - 0.3) * speedMultiplier,
              radius: Math.random() * 2.5 + 1,
              color: particleColor,
              pulseSpeed: Math.random() * 0.1,
              pulseDirection: 1,
              pulseAmount: 0,
              isFastParticle
            });
          }
        }
        
        function animate() {
          ctx.clearRect(0, 0, width, height);
          
          // Update particles
          particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > height) particle.vy *= -1;
            
            // Pulse effect for particles
            particle.pulseAmount += particle.pulseSpeed * particle.pulseDirection;
            if (particle.pulseAmount > 0.5 || particle.pulseAmount < 0) {
              particle.pulseDirection *= -1;
            }
            
            // Mouse interaction - attract particles if mouse is moving
            if (isMouseMoving) {
              const dx = mouseX - particle.x;
              const dy = mouseY - particle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 200) {
                const force = 0.2 / distance;
                particle.vx += dx * force;
                particle.vy += dy * force;
                
                // Limit velocity
                const maxVel = particle.isFastParticle ? 2 : 1;
                const vel = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
                if (vel > maxVel) {
                  particle.vx = (particle.vx / vel) * maxVel;
                  particle.vy = (particle.vy / vel) * maxVel;
                }
              }
            }
            
            // Draw particle with pulse effect
            const radius = particle.radius * (1 + particle.pulseAmount * 0.3);
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
            
            // Add glow effect
            const gradient = ctx.createRadialGradient(
              particle.x, particle.y, 0,
              particle.x, particle.y, radius * 2
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Add small glow
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, radius * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          });
          
          // Draw connections
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < connectionDistance) {
                // Calculate opacity based on distance
                const opacity = 1 - distance / connectionDistance;
                
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                
                // Create gradient for connection
                const gradient = ctx.createLinearGradient(
                  particles[i].x, particles[i].y,
                  particles[j].x, particles[j].y
                );
                
                // Extract base color and create semi-transparent version
                const baseColor = connectionColor.replace(/[^,]+(?=\))/, opacity.toFixed(2));
                gradient.addColorStop(0, baseColor);
                gradient.addColorStop(1, baseColor);
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 0.8 * opacity;
                ctx.stroke();
              }
            }
          }
          
          requestAnimationFrame(animate);
        }
        
        // Track mouse movement for interactivity
        document.addEventListener('mousemove', (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          isMouseMoving = true;
          
          // Reset mouse movement flag after 2 seconds of inactivity
          clearTimeout(mouseTimer);
          mouseTimer = setTimeout(() => {
            isMouseMoving = false;
          }, 2000);
        });
        
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
    };

    // Matrix Rain Animation - Enhanced with tech symbols and binary code
    const initMatrixRain = () => {
      const matrixContainer = document.querySelector('.matrix-rain');
      
      if (matrixContainer) {
        const canvas = document.createElement('canvas');
        matrixContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let width, height;
        
        // Enhanced Matrix characters with tech symbols
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const techSymbols = '{}<>[]()+-*/=&|!?:;%$#@^~';
        const codeKeywords = ['if','for','var','let','const','function','class','return','async','await'];
        const fontSize = 14;
        let columns;
        let drops = [];
        let speeds = [];
        let symbolTypes = [];
        
        function initCanvas() {
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = width;
          canvas.height = height;
          
          columns = Math.floor(width / fontSize);
          drops = [];
          speeds = [];
          symbolTypes = [];
          
          // Initialize drops with varying speeds and symbol types
          for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -100); // Random starting position above the canvas
            speeds[i] = Math.random() * 0.5 + 0.5; // Random speed between 0.5 and 1
            symbolTypes[i] = Math.random(); // Determines what type of symbols this column will use
          }
        }
        
        function getSymbol(columnIndex) {
          const type = symbolTypes[columnIndex];
          
          if (type < 0.6) {
            // 60% chance for original matrix characters
            return chars[Math.floor(Math.random() * chars.length)];
          } else if (type < 0.85) {
            // 25% chance for tech symbols
            return techSymbols[Math.floor(Math.random() * techSymbols.length)];
          } else {
            // 15% chance for code keywords
            return codeKeywords[Math.floor(Math.random() * codeKeywords.length)];
          }
        }
        
        function draw() {
          // Set semi-transparent black background to create trail effect
          ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
          ctx.fillRect(0, 0, width, height);
          
          // Set color and font for characters
          const isDarkMode = document.body.classList.contains('dark-mode');
          const baseColor = isDarkMode ? '#6366f1' : '#4f46e5';
          const highlightColor = isDarkMode ? '#ffffff' : '#ffffff';
          
          // Draw characters
          for (let i = 0; i < drops.length; i++) {
            // Get symbol based on column type
            const symbol = getSymbol(i);
            
            // Determine if this is the head of the stream (brighter)
            const isHead = drops[i] > 0 && Math.floor(drops[i]) === drops[i];
            
            // Set color and font
            if (isHead) {
              ctx.fillStyle = highlightColor;
              ctx.font = `bold ${fontSize}px monospace`;
            } else {
              // Create a gradient effect down the stream
              const fadePosition = drops[i] / (height / fontSize);
              const alpha = Math.max(0.2, 1 - fadePosition * 0.1);
              ctx.fillStyle = `${baseColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
              ctx.font = `${fontSize}px monospace`;
            }
            
            // Draw character
            if (drops[i] > 0) {
              ctx.fillText(symbol, i * fontSize, drops[i] * fontSize);
            }
            
            // Move drop down at varying speeds
            drops[i] += speeds[i];
            
            // Reset drop to top with random delay when it reaches bottom
            if (drops[i] * fontSize > height && Math.random() > 0.975) {
              drops[i] = Math.floor(Math.random() * -20) - 10;
              // Occasionally change the speed and symbol type
              if (Math.random() > 0.8) {
                speeds[i] = Math.random() * 0.5 + 0.5;
                symbolTypes[i] = Math.random();
              }
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
    };

    // Code Particles Animation - Enhanced with tech symbols and code snippets
    const initCodeParticles = () => {
      const codeParticlesContainer = document.querySelector('.code-particles');
      
      if (codeParticlesContainer) {
        const canvas = document.createElement('canvas');
        codeParticlesContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let width, height;
        
        // Code symbols and snippets for a more tech-focused animation
        const codeSymbols = [
          '{', '}', '[', ']', '(', ')', '<', '>', '=', '+', '-', '*', '/', '%',
          '&&', '||', '!', '==', '===', '!=', '!==', '>=', '<=', '=>', '?', ':',
          'if', 'else', 'for', 'while', 'function', 'return', 'class', 'import',
          'const', 'let', 'var', 'async', 'await', 'try', 'catch', 'true', 'false',
          'null', 'undefined', 'this', 'new', 'delete', 'typeof', 'instanceof'
        ];
        
        // Add code snippets for more tech focus
        const codeSnippets = [
          'function()', 'if()', 'for()', 'while()', 'return', 'const', 'let', 'var', 
          'class', 'import', 'export', 'async', 'await', 'try{}', 'catch{}',
          '<div>', '</div>', '<App/>', 'useState', 'useEffect', 'props', 'state',
          'API', 'JSON', 'HTTP', 'GET', 'POST', 'SQL', 'NoSQL', 'AI', 'ML', 'React', 'Node'
        ];
        
        // Particles
        let particles = [];
        const particleCount = 40; // Increased from 30 for more dynamic feel
        
        function initCanvas() {
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = width;
          canvas.height = height;
          initParticles();
        }
        
        function getRandomSymbolOrSnippet() {
          // 70% chance for symbol, 30% chance for code snippet
          if (Math.random() < 0.7) {
            return codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
          } else {
            return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          }
        }
        
        function initParticles() {
          particles = [];
          for (let i = 0; i < particleCount; i++) {
            // Determine if this is a code snippet (larger, slower) or symbol (smaller, faster)
            const isCodeSnippet = Math.random() < 0.3;
            const text = isCodeSnippet ? 
              codeSnippets[Math.floor(Math.random() * codeSnippets.length)] : 
              codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
            
            // Speed inversely proportional to text length
            const speedFactor = isCodeSnippet ? 0.5 : 1.2;
            
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() * 0.3 - 0.15) * speedFactor,
              vy: (Math.random() * 0.3 - 0.15) * speedFactor,
              symbol: text,
              size: isCodeSnippet ? Math.random() * 8 + 12 : Math.random() * 10 + 10,
              opacity: Math.random() * 0.5 + 0.3,
              rotation: Math.random() * 360,
              rotationSpeed: (Math.random() * 0.2 - 0.1), // Random rotation speed
              pulseDirection: Math.random() < 0.5 ? 1 : -1, // Direction of pulse
              pulseSpeed: Math.random() * 0.01 + 0.005, // Speed of pulse
              isCodeSnippet: isCodeSnippet
            });
          }
        }
        
        function draw() {
          ctx.clearRect(0, 0, width, height);
          
          // Set color based on theme
          const isDarkMode = document.body.classList.contains('dark-mode');
          const baseColor = isDarkMode ? 'rgba(99, 102, 241,' : 'rgba(79, 70, 229,';
          const accentColor = isDarkMode ? 'rgba(129, 140, 248,' : 'rgba(129, 140, 248,';
          
          // Update and draw particles
          particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.rotation += particle.rotationSpeed;
            
            // Update opacity (pulsing effect)
            particle.opacity += particle.pulseSpeed * particle.pulseDirection;
            if (particle.opacity > 0.8 || particle.opacity < 0.3) {
              particle.pulseDirection *= -1;
            }
            
            // Wrap around edges
            if (particle.x < 0) particle.x = width;
            if (particle.x > width) particle.x = 0;
            if (particle.y < 0) particle.y = height;
            if (particle.y > height) particle.y = 0;
            
            // Occasionally change text
            if (Math.random() < 0.001) {
              particle.symbol = particle.isCodeSnippet ? 
                codeSnippets[Math.floor(Math.random() * codeSnippets.length)] : 
                codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
            }
            
            // Draw code symbol
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation * Math.PI / 180);
            ctx.font = `${particle.isCodeSnippet ? 'bold' : 'normal'} ${particle.size}px monospace`;
            ctx.fillStyle = particle.isCodeSnippet ? 
              `${accentColor}${particle.opacity})` : 
              `${baseColor}${particle.opacity})`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Add subtle glow effect for code snippets
            if (particle.isCodeSnippet) {
              ctx.shadowColor = isDarkMode ? 'rgba(129, 140, 248, 0.8)' : 'rgba(129, 140, 248, 0.8)';
              ctx.shadowBlur = 5;
            }
            
            ctx.fillText(particle.symbol, 0, 0);
            ctx.shadowBlur = 0; // Reset shadow
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
    };

    // Initialize all animations
    const timer = setTimeout(() => {
      initNeuralNetwork();
      initMatrixRain();
      initCodeParticles();
    }, 100); // Small delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Tech-themed background animations */}
      <div className="binary-code"></div>
      <div className="circuit-pattern"></div>
      <div className="floating-icons">
        <div className="tech-icon"></div>
        <div className="tech-icon"></div>
        <div className="tech-icon"></div>
        <div className="tech-icon"></div>
        <div className="tech-icon"></div>
        <div className="tech-icon"></div>
        <div className="tech-icon"></div>
        <div className="tech-icon"></div>
        <div className="tech-icon"></div>
        <div className="tech-icon"></div>
        <div className="tech-icon"></div>
        <div className="tech-icon"></div>
      </div>
      <div className="neural-network"></div>
      <div className="matrix-rain"></div>
      <div className="code-particles"></div>
      
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <main style={{ position: 'relative', zIndex: 1 }}>
              <Home />
              <About />
              <Experience />
              <Projects />
              <Skills />
              <Contact />
            </main>
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
