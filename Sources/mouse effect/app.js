// Destructure React, useState, useEffect from the React object
const { useState, useEffect, useRef } = React;
// Destructure motion components and hooks from framer-motion
const { motion, useMotionValue, useSpring, useTransform, AnimatePresence } = Motion;

// Enhanced Custom cursor component with particle effects
const EnhancedCursor = ({ cursorType, variants }) => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorXSmooth = useSpring(cursorX, { damping: 25, stiffness: 400 });
  const cursorYSmooth = useSpring(cursorY, { damping: 25, stiffness: 400 });
  
  // For more responsive cursor dot
  const cursorXDot = useSpring(cursorX, { damping: 40, stiffness: 800 });
  const cursorYDot = useSpring(cursorY, { damping: 40, stiffness: 800 });
  
  // For particles
  const [particles, setParticles] = useState([]);
  const [trails, setTrails] = useState([]);
  const particleCount = 12; // Number of particles around cursor
  const trailCount = 20; // Number of trail elements
  const mouseSpeed = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  
  // Gradient effect ref
  const gradientRef = useRef(null);
  
  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      cursorX.set(clientX);
      cursorY.set(clientY);
      
      // Calculate mouse speed for dynamic effects
      const dx = clientX - lastMousePos.current.x;
      const dy = clientY - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      mouseSpeed.current = Math.min(distance, 30); // Cap the speed
      
      lastMousePos.current = { x: clientX, y: clientY };
    };
    
    // 添加滚动事件处理，在滚动时也生成轨迹
    const handleScroll = () => {
      // 不再生成轨迹，仅更新鼠标速度
      mouseSpeed.current = 5;
      // 不再添加轨迹点
      /*
      setTrails(prevTrails => {
        const newTrails = [{ 
          x: lastMousePos.current.x, 
          y: lastMousePos.current.y, 
          id: Date.now(),
          size: 5 + (mouseSpeed.current * 0.5),
          opacity: Math.min(0.8, 0.3 + (mouseSpeed.current * 0.02))
        }, ...prevTrails];
        
        return newTrails.slice(0, trailCount);
      });
      */
    };
    
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Generate orbital particles that rotate around the cursor
  useEffect(() => {
    // 不生成任何粒子，设置为空数组
    setParticles([]);
    // 返回空函数，不执行任何动画
    return () => {};
    
    /* 原代码已被注释掉
    const updateParticles = () => {
      const angleStep = (2 * Math.PI) / particleCount;
      const newParticles = [];
      
      for (let i = 0; i < particleCount; i++) {
        const angle = i * angleStep;
        
        // Calculate particle position based on cursorXSmooth and cursorYSmooth
        const x = cursorXSmooth.get();
        const y = cursorYSmooth.get();
        
        if (x && y) {
          newParticles.push({
            id: i,
            angle,
            x,
            y,
          });
        }
      }
      
      setParticles(newParticles);
      requestAnimationFrame(updateParticles);
    };
    
    const animationFrame = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(animationFrame);
    */
  }, []);

  // Generate trails based on cursor movement
  useEffect(() => {
    let timeout;
    
    const updateTrails = () => {
      // 不再生成轨迹，将trails设为空数组
      setTrails([]);
      
      /*
      const x = cursorXSmooth.get();
      const y = cursorYSmooth.get();
      
      if (x && y) {
        setTrails(prevTrails => {
          // Add new position at the start
          const newTrails = [{ 
            x, 
            y, 
            id: Date.now(),
            size: 5 + (mouseSpeed.current * 0.5), // Dynamic size based on speed
            opacity: Math.min(0.8, 0.3 + (mouseSpeed.current * 0.02)) // Dynamic opacity
          }, ...prevTrails];
          
          // Limit trail length
          return newTrails.slice(0, trailCount);
        });
      }
      */
      
      timeout = setTimeout(updateTrails, 30); // Update more frequently
    };
    
    updateTrails();
    return () => clearTimeout(timeout);
  }, []);
  
  // Gradient animation effect for outer glow
  useEffect(() => {
    const updateGradient = () => {
      const time = Date.now() * 0.001; // Time in seconds
      const hue1 = (time * 10) % 360;
      const hue2 = ((time * 10) + 120) % 360;
      
      if (gradientRef.current) {
        gradientRef.current.style.background = 
          `radial-gradient(circle at center, 
            hsla(${hue1}, 100%, 60%, 0.8), 
            hsla(${hue2}, 100%, 60%, 0))`;
      }
      
      // 不调用动画函数，以避免不必要的计算
      // const animation = requestAnimationFrame(updateGradient);
      // return () => cancelAnimationFrame(animation);
      return () => {}; // 空函数，不执行任何动画
    };
    
    // 不调用动画函数，以避免不必要的计算
    // const animation = requestAnimationFrame(updateGradient);
    // return () => cancelAnimationFrame(animation);
    return () => {}; // 空函数，不执行任何动画
  }, []);
  
  // Calculate cursor variant based on current type
  const currentVariant = variants[cursorType] || variants.default;
  
  return (
    <div className="cursor">
      {/* 渐变背景元素依然保留在DOM中，但通过CSS display:none隐藏 */}
      <motion.div 
        ref={gradientRef}
        className="cursor-gradient"
        style={{
          x: cursorXSmooth,
          y: cursorYSmooth,
          scale: cursorType === 'default' ? 1 : currentVariant.gradientScale || 1.2,
        }}
        animate={{
          opacity: currentVariant.gradientOpacity || 0.5,
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Main cursor dot */}
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorXDot,
          y: cursorYDot,
          backgroundColor: currentVariant.color || 'var(--primary)',
          scale: cursorType === 'default' ? 1 : currentVariant.scale || 1,
        }}
        animate={{
          opacity: currentVariant.opacity || 1,
          boxShadow: `0 0 10px 2px ${currentVariant.color || 'var(--primary)'}`
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* 环形元素依然保留在DOM中，但通过CSS display:none隐藏 */}
      <motion.div
        className="cursor-ring cursor-ring-1"
        style={{
          x: cursorXSmooth,
          y: cursorYSmooth,
          borderColor: currentVariant.color || 'var(--primary)',
        }}
        animate={{
          scale: cursorType === 'default' ? 1 : currentVariant.ringScale || 1.2,
          opacity: currentVariant.ringOpacity || 0.6,
        }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        className="cursor-ring cursor-ring-2"
        style={{
          x: cursorXSmooth,
          y: cursorYSmooth,
          borderColor: currentVariant.secondaryColor || currentVariant.color || 'var(--primary)',
        }}
        animate={{
          scale: cursorType === 'default' ? 0.8 : currentVariant.ringScale * 0.7 || 0.9,
          opacity: currentVariant.ringOpacity * 0.8 || 0.5,
        }}
        transition={{ duration: 0.3, delay: 0.05 }}
      />
      
      {/* Particle effects */}
      <AnimatePresence>
        {particles.map((particle) => {
          const orbitRadius = cursorType === 'default' ? 
            30 + (Math.sin(Date.now() * 0.003 + particle.angle) * 5) : 
            (currentVariant.orbitRadius || 40) + (Math.sin(Date.now() * 0.003 + particle.angle) * 8);
          
          const x = particle.x + Math.cos(particle.angle + (Date.now() * 0.002)) * orbitRadius;
          const y = particle.y + Math.sin(particle.angle + (Date.now() * 0.002)) * orbitRadius;
          
          const size = cursorType === 'default' ? 
            4 + (Math.sin(Date.now() * 0.004 + particle.angle) * 2) : 
            (currentVariant.particleSize || 5) + (Math.sin(Date.now() * 0.004 + particle.angle) * 3);
          
          return (
            <motion.div
              key={particle.id}
              className="cursor-particle"
              style={{
                x,
                y,
                backgroundColor: currentVariant.particleColor || currentVariant.color || 'var(--primary)',
                width: size,
                height: size,
                opacity: cursorType === 'default' ? 0.6 : currentVariant.particleOpacity || 0.7,
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: particle.id * 0.1,
              }}
            />
          );
        })}
      </AnimatePresence>
      
      {/* Trail effect */}
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            className="cursor-trail"
            initial={{ 
              opacity: trail.opacity, 
              scale: 1,
              x: trail.x,
              y: trail.y,
              width: trail.size,
              height: trail.size,
            }}
            animate={{ 
              opacity: 0, 
              scale: 0,
              x: trail.x,
              y: trail.y,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
              left: 0, 
              top: 0,
              backgroundColor: index % 2 === 0 ? 
                currentVariant.trailColor || 'var(--primary)' : 
                currentVariant.secondaryColor || currentVariant.trailColor || 'var(--secondary)',
              boxShadow: `0 0 6px ${index % 2 === 0 ? 
                currentVariant.trailColor || 'var(--primary)' : 
                currentVariant.secondaryColor || 'var(--secondary)'}`
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Interactive button component with enhanced hover effects
const InteractiveButton = ({ icon, text, color, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <motion.button
      className="interactive-btn"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 0 20px ${color || 'var(--primary)'}40`,
        borderColor: color || 'var(--primary)',
        backgroundColor: `rgba(${color === 'var(--purple)' ? '156, 107, 255' : color === 'var(--teal)' ? '100, 255, 218' : '255, 62, 127'}, 0.15)`
      }}
      whileTap={{ scale: 0.95 }}
    >
      {icon && <i className={`fa-solid ${icon}`} style={{ color: color || 'var(--primary)' }}></i>}
      <span>{text}</span>
      
      {/* Add subtle particle animation inside button */}
      <motion.span 
        className="btn-particles"
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, ${color || 'var(--primary)'}15 0%, transparent 70%)`,
            `radial-gradient(circle at 80% 70%, ${color || 'var(--primary)'}15 0%, transparent 70%)`
          ]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
    </motion.button>
  );
};

// Enhanced image button component
const ImageButton = ({ src, alt, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <motion.div
      className="image-btn"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div className="image-glow" />
      
      <motion.img 
        src={src} 
        alt={alt}
        whileHover={{ scale: 1.1 }}
      />
      
      <motion.div 
        className="overlay"
        initial={{ opacity: 0 }}
        whileHover={{ 
          opacity: 1,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)'
        }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <i className="fa-solid fa-expand" style={{ color: 'white', fontSize: '1.5rem' }}></i>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced icon button component
const IconButton = ({ icon, color, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <motion.div
      className="icon-btn"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      whileHover={{ 
        scale: 1.1,
        boxShadow: `0 0 20px ${color || 'var(--primary)'}60`,
        borderColor: color || 'var(--primary)',
        backgroundColor: `rgba(${color === 'var(--purple)' ? '156, 107, 255' : color === 'var(--teal)' ? '100, 255, 218' : '255, 62, 127'}, 0.15)`
      }}
      whileTap={{ scale: 0.9, rotate: 10 }}
    >
      <motion.i 
        className={`fa-solid ${icon}`} 
        style={{ color: color || 'var(--primary)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <motion.div 
        className="icon-glow"
        style={{ backgroundColor: color || 'var(--primary)' }}
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};

// Enhanced text effect
const TextEffect = ({ text, color, onMouseEnter, onMouseLeave }) => {
  const words = text.split(' ');
  
  return (
    <div 
      className="text-effect"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ 
            display: 'inline-block',
            marginRight: '0.5rem',
            color: color || 'var(--light)',
            position: 'relative',
            zIndex: 1
          }}
          whileHover={{
            y: -10,
            color: color || 'var(--primary)',
            textShadow: `0 0 8px ${color || 'var(--primary)'}80`,
            transition: { 
              type: 'spring', 
              stiffness: 300
            }
          }}
        >
          {word}
          {/* Add a glow effect under each word */}
          <motion.span 
            className="text-glow"
            style={{ backgroundColor: color || 'var(--primary)' }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileHover={{ 
              opacity: 0.15, 
              scale: 1.2,
              transition: { duration: 0.3 } 
            }}
          />
        </motion.span>
      ))}
    </div>
  );
};

// Enhanced scroll indicator
const ScrollIndicator = ({ onClick }) => {
  return (
    <motion.div 
      className="scroll-indicator"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div className="scroll-text">Scroll Down</motion.div>
      <motion.div 
        className="scroll-icon-container"
      >
        <motion.div 
          className="scroll-icon-glow"
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="scroll-icon"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <i className="fa-solid fa-chevron-down"></i>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Main App component
const App = () => {
  const [cursorType, setCursorType] = useState('default');
  
  // Enhanced cursor variants with more properties
  const cursorVariants = {
    default: {
      scale: 0.6,
      ringScale: 1,
      gradientScale: 1,
      orbitRadius: 30,
      particleSize: 4,
      color: 'var(--primary)',
      secondaryColor: 'var(--secondary)',
      opacity: 1,
      ringOpacity: 0.6,
      particleOpacity: 0.7,
      gradientOpacity: 0.2,
      trailColor: 'var(--primary)'
    },
    button: {
      scale: 0.4,
      ringScale: 1.6,
      gradientScale: 2,
      orbitRadius: 40,
      particleSize: 6,
      color: 'var(--primary)',
      secondaryColor: 'var(--secondary)',
      opacity: 0.9,
      ringOpacity: 0.5,
      particleOpacity: 0.8,
      gradientOpacity: 0.3,
      trailColor: 'var(--primary)'
    },
    image: {
      scale: 0.5,
      ringScale: 1.4,
      gradientScale: 1.8,
      orbitRadius: 35,
      particleSize: 5,
      color: 'var(--teal)',
      secondaryColor: 'var(--primary)',
      opacity: 0.8,
      ringOpacity: 0.4,
      particleOpacity: 0.9,
      gradientOpacity: 0.25,
      trailColor: 'var(--teal)'
    },
    text: {
      scale: 0.7,
      ringScale: 1.3,
      gradientScale: 2.2,
      orbitRadius: 50,
      particleSize: 7,
      color: 'var(--purple)',
      secondaryColor: 'var(--teal)',
      opacity: 0.7,
      ringOpacity: 0.3,
      particleOpacity: 0.6,
      gradientOpacity: 0.4,
      trailColor: 'var(--purple)'
    },
    icon: {
      scale: 0.3,
      ringScale: 2,
      gradientScale: 1.5,
      orbitRadius: 45,
      particleSize: 5,
      color: 'var(--secondary)',
      secondaryColor: 'var(--primary)',
      opacity: 0.8,
      ringOpacity: 0.7,
      particleOpacity: 0.8,
      gradientOpacity: 0.35,
      trailColor: 'var(--secondary)'
    }
  };
  
  const handleButtonsSection = () => {
    document.getElementById('buttons-section').scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleImagesSection = () => {
    document.getElementById('images-section').scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleTextSection = () => {
    document.getElementById('text-section').scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="app-container">
      {/* Enhanced custom cursor */}
      <EnhancedCursor cursorType={cursorType} variants={cursorVariants} />
      
      {/* Hero section */}
      <section className="hero" id="home">
        <h1>Interactive Mouse Effects</h1>
        <p>
          Explore different cursor interactions with various UI elements.
          Move your mouse around and see how the cursor transforms based on what you're hovering over.
        </p>
        
        <div className="buttons-container">
          <InteractiveButton 
            text="Button Effects" 
            icon="fa-hand-pointer"
            onMouseEnter={() => setCursorType('button')}
            onMouseLeave={() => setCursorType('default')}
            onClick={handleButtonsSection}
          />
          
          <InteractiveButton 
            text="Image Effects" 
            icon="fa-image"
            color="var(--teal)"
            onMouseEnter={() => setCursorType('image')}
            onMouseLeave={() => setCursorType('default')}
            onClick={handleImagesSection}
          />
          
          <InteractiveButton 
            text="Text Effects" 
            icon="fa-font"
            color="var(--purple)"
            onMouseEnter={() => setCursorType('text')}
            onMouseLeave={() => setCursorType('default')}
            onClick={handleTextSection}
          />
        </div>
        
        <ScrollIndicator onClick={handleButtonsSection} />
      </section>
      
      {/* Buttons section */}
      <section id="buttons-section">
        <h2>Button Interactions</h2>
        <p>
          Hover over these buttons to see how the cursor changes.
          Each button has a unique hover interaction effect.
        </p>
        
        <div className="buttons-container">
          <InteractiveButton 
            text="Hover Me" 
            icon="fa-star"
            onMouseEnter={() => setCursorType('button')}
            onMouseLeave={() => setCursorType('default')}
          />
          
          <InteractiveButton 
            text="Click Me" 
            icon="fa-circle-play"
            onMouseEnter={() => setCursorType('button')}
            onMouseLeave={() => setCursorType('default')}
          />
          
          <InteractiveButton 
            text="Explore" 
            icon="fa-compass"
            onMouseEnter={() => setCursorType('button')}
            onMouseLeave={() => setCursorType('default')}
          />
          
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
            <IconButton 
              icon="fa-heart"
              onMouseEnter={() => setCursorType('icon')}
              onMouseLeave={() => setCursorType('default')}
            />
            
            <IconButton 
              icon="fa-bell"
              onMouseEnter={() => setCursorType('icon')}
              onMouseLeave={() => setCursorType('default')}
            />
            
            <IconButton 
              icon="fa-share"
              onMouseEnter={() => setCursorType('icon')}
              onMouseLeave={() => setCursorType('default')}
            />
            
            <IconButton 
              icon="fa-bookmark"
              onMouseEnter={() => setCursorType('icon')}
              onMouseLeave={() => setCursorType('default')}
            />
          </div>
        </div>
        
        <ScrollIndicator onClick={handleImagesSection} />
      </section>
      
      {/* Images section */}
      <section id="images-section">
        <h2>Image Interactions</h2>
        <p>
          Images have their own special cursor effect.
          Hover over these images to see how the cursor transforms.
        </p>
        
        <div className="buttons-container">
          <ImageButton 
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" 
            alt="Code on a screen"
            onMouseEnter={() => setCursorType('image')}
            onMouseLeave={() => setCursorType('default')}
          />
          
          <ImageButton 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" 
            alt="Neon gaming setup"
            onMouseEnter={() => setCursorType('image')}
            onMouseLeave={() => setCursorType('default')}
          />
          
          <ImageButton 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" 
            alt="Laptop and code"
            onMouseEnter={() => setCursorType('image')}
            onMouseLeave={() => setCursorType('default')}
          />
        </div>
        
        <ScrollIndicator onClick={handleTextSection} />
      </section>
      
      {/* Text effects section */}
      <section id="text-section">
        <h2>Text Interactions</h2>
        <p>
          Text elements have their own special cursor and hover effects.
          Hover over these text elements to see how they interact.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <TextEffect 
            text="Hover Over This Text"
            onMouseEnter={() => setCursorType('text')}
            onMouseLeave={() => setCursorType('default')}
          />
          
          <TextEffect 
            text="Each Word Has Its Own Animation"
            color="var(--teal)"
            onMouseEnter={() => setCursorType('text')}
            onMouseLeave={() => setCursorType('default')}
          />
          
          <TextEffect 
            text="Interactive Typography Effect"
            color="var(--secondary)"
            onMouseEnter={() => setCursorType('text')}
            onMouseLeave={() => setCursorType('default')}
          />
        </div>
        
        <div className="buttons-container" style={{ marginTop: '3rem' }}>
          <InteractiveButton 
            text="Back to Top" 
            icon="fa-arrow-up"
            onMouseEnter={() => setCursorType('button')}
            onMouseLeave={() => setCursorType('default')}
            onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </section>
    </div>
  );
};

// Render the App
ReactDOM.createRoot(document.getElementById('root')).render(<App />); 