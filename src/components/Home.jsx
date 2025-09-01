import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import styled from 'styled-components';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  z-index: 5;
  position: relative;
  
  @media (max-width: 992px) {
    order: 2;
  }
`;

const HeroImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 5;
  
  @media (max-width: 992px) {
    order: 1;
    margin-bottom: 2rem;
  }
`;

const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 50%;
  border: 6px solid var(--primary-light);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 2;
  filter: brightness(1.05) contrast(1.05);
  
  .dark-mode & {
    border-color: var(--primary-dark);
    filter: brightness(1.1) contrast(1.1);
  }
  
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
  
  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
`;

const ImageBackground = styled.div`
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--primary-light), var(--secondary-light), var(--accent-light));
  opacity: 0.9;
  filter: blur(20px);
  z-index: 1;
  animation: pulse 4s infinite alternate, rotate 15s linear infinite;
  
  .dark-mode & {
    background: linear-gradient(45deg, var(--primary-dark), var(--secondary-dark), var(--accent-dark));
    opacity: 0.95;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1) rotate(0deg);
    }
    100% {
      transform: scale(1.1) rotate(0deg);
    }
  }
  
  @keyframes rotate {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  @media (max-width: 768px) {
    width: 270px;
    height: 270px;
  }
  
  @media (max-width: 480px) {
    width: 220px;
    height: 220px;
  }
`;

const Greeting = styled(motion.p)`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: var(--primary-light);
  
  .dark-mode & {
    color: var(--primary-dark);
  }
`;

const Name = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Highlight = styled.span`
  background: linear-gradient(90deg, #4f46e5, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

const Subtitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-secondary-light);
  
  .dark-mode & {
    color: var(--text-secondary-dark);
  }
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 600px;
  
  @media (max-width: 992px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(90deg, var(--primary-light), var(--secondary-light));
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(79, 70, 229, 0.3);
  }
  
  .dark-mode & {
    background: linear-gradient(90deg, var(--primary-dark), var(--secondary-dark));
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: var(--text-primary-light);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid var(--primary-light);
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    background: var(--primary-light);
    color: white;
    transform: translateY(-3px);
  }
  
  .dark-mode & {
    color: var(--text-primary-dark);
    border-color: var(--primary-dark);
    
    &:hover {
      background: var(--primary-dark);
      color: white;
    }
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--surface-light);
  color: var(--text-primary-light);
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px);
    background: var(--primary-light);
    color: white;
  }
  
  .dark-mode & {
    background: var(--surface-dark);
    color: var(--text-primary-dark);
    
    &:hover {
      background: var(--primary-dark);
      color: white;
    }
  }
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(79, 70, 229, 0.1), rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
  background-size: 300% 300%;
  top: -250px;
  right: -250px;
  z-index: 0;
  animation: gradientShift 15s ease infinite;
  
  &:before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(45deg, rgba(79, 70, 229, 0.1), rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
    background-size: 300% 300%;
    bottom: -150px;
    left: -150px;
    animation: gradientShift 15s ease infinite reverse;
  }
  
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  .dark-mode & {
    background: linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(167, 139, 250, 0.1), rgba(244, 114, 182, 0.1));
    background-size: 300% 300%;
    
    &:before {
      background: linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(167, 139, 250, 0.1), rgba(244, 114, 182, 0.1));
      background-size: 300% 300%;
    }
  }
`;

const Home = () => {
  useEffect(() => {
    document.title = 'Ishaan Verma | Portfolio';
  }, []);

  return (
    <HeroSection>
      <BackgroundDecoration />
      <HeroContainer>
        <HeroContent>
          <Greeting
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hello, I'm
          </Greeting>
          
          <Name
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Highlight>Ishaan Verma</Highlight>
            </motion.span>
          </Name>
          
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Full Stack Developer
          </Subtitle>
          
          <Description
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ display: 'inline-block' }}
            >
              I'm a Computer Science student at VIT Bhopal with a passion for building innovative web applications.
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              style={{ display: 'inline-block' }}
            >
              Experienced in React, Spring Boot, and AI integration.
            </motion.span>
          </Description>
          
          <ButtonContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PrimaryButton href="#contact" onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }}>
              Contact Me <FiArrowRight />
            </PrimaryButton>
            <SecondaryButton href="#projects" onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }}>
              View Projects
            </SecondaryButton>
            <SecondaryButton href="/Ishaan_Verma_Resume.pdf" download="Ishaan_Verma_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume <FiDownload />
            </SecondaryButton>
          </ButtonContainer>
          
          <SocialLinks
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <SocialLink href="https://github.com/ishaanv18" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub size={20} />
              </SocialLink>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <SocialLink href="https://linkedin.com/in/ishaan-verma-03s" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin size={20} />
              </SocialLink>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <SocialLink href="mailto:ishaan.verma36@gmail.com" aria-label="Email">
                <FiMail size={20} />
              </SocialLink>
            </motion.div>
          </SocialLinks>
        </HeroContent>
        
        <HeroImageContainer>
          <ImageBackground />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <ProfileImage src="/Ishaan-image.jpg" alt="Ishaan Verma" />
          </motion.div>
        </HeroImageContainer>
      </HeroContainer>
    </HeroSection>
  );
};

export default Home;