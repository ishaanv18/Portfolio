import { useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--background-light);
  z-index: 9999;
  
  .dark-mode & {
    background-color: var(--background-dark);
  }
`;

const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const LogoText = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, var(--primary-light), var(--secondary-light), var(--accent-light));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  
  .dark-mode & {
    background: linear-gradient(90deg, var(--primary-dark), var(--secondary-dark), var(--accent-dark));
    -webkit-background-clip: text;
    background-clip: text;
  }
`;

const LoadingBar = styled.div`
  width: 200px;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  
  .dark-mode & {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const LoadingProgress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, var(--primary-light), var(--secondary-light));
  border-radius: 4px;
  
  .dark-mode & {
    background: linear-gradient(90deg, var(--primary-dark), var(--secondary-dark));
  }
`;

const LoadingText = styled(motion.p)`
  font-size: 1rem;
  color: var(--text-secondary-light);
  margin-top: 1rem;
  
  .dark-mode & {
    color: var(--text-secondary-dark);
  }
`;

const Loader = () => {
  useEffect(() => {
    // Disable scrolling while loader is active
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Re-enable scrolling when loader is removed
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <LoaderContainer>
      <LoaderContent>
        <LogoText
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ishaan Verma
        </LogoText>
        
        <LoadingBar>
          <LoadingProgress
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </LoadingBar>
        
        <LoadingText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Loading amazing stuff...
        </LoadingText>
      </LoaderContent>
    </LoaderContainer>
  );
};

export default Loader;