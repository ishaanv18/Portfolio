import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCode, FiBook, FiAward } from 'react-icons/fi';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 120px 0 80px;
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-light), var(--secondary-light));
    border-radius: 2px;
  }
  
  .dark-mode & {
    &::after {
      background: linear-gradient(90deg, var(--primary-dark), var(--secondary-dark));
    }
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary-light);
  margin-bottom: 3rem;
  max-width: 600px;
  
  .dark-mode & {
    color: var(--text-secondary-dark);
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.div`
  @media (max-width: 992px) {
    order: 2;
  }
`;

const AboutImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  
  @media (max-width: 992px) {
    order: 1;
    margin-bottom: 2rem;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  max-width: 450px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.7));
  animation: glowPulse 3s infinite alternate ease-in-out;
  transition: transform 0.3s ease;
  
  @keyframes glowPulse {
    0% {
      filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.7));
    }
    50% {
      filter: drop-shadow(0 0 25px rgba(99, 102, 241, 0.9));
    }
    100% {
      filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.7));
    }
  }
  
  &:hover {
    transform: scale(1.02);
  }
  
  .dark-mode & {
    animation: glowPulseDark 3s infinite alternate ease-in-out;
    
    @keyframes glowPulseDark {
      0% {
        filter: drop-shadow(0 0 15px rgba(129, 140, 248, 0.7));
      }
      50% {
        filter: drop-shadow(0 0 25px rgba(129, 140, 248, 0.9));
      }
      100% {
        filter: drop-shadow(0 0 15px rgba(129, 140, 248, 0.7));
      }
    }
  }
  
  @media (max-width: 992px) {
    margin: 0 auto;
    display: block;
    width: 100%;
  }
`;

const ImageDecoration = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  top: 0;
  left: 0;
  z-index: -1;
  
  &::before {
    content: '';
    position: absolute;
    width: 110%;
    height: 110%;
    top: -5%;
    left: -5%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(99, 102, 241, 0.3) 0%,
      rgba(99, 102, 241, 0.1) 50%,
      transparent 70%
    );
    animation: rotateSlow 10s linear infinite, pulseSlow 5s ease-in-out infinite alternate;
    z-index: -1;
  }
  
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes pulseSlow {
    0% { opacity: 0.7; transform: scale(1); }
    100% { opacity: 1; transform: scale(1.05); }
  }
  
  .dark-mode &::before {
    background: radial-gradient(
      circle,
      rgba(129, 140, 248, 0.3) 0%,
      rgba(129, 140, 248, 0.1) 50%,
      transparent 70%
    );
  }
  
  @media (max-width: 992px) {
    width: 100%;
    left: 0;
    transform: none;
  }
`;

const AboutParagraph = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: var(--text-primary-light);
  
  .dark-mode & {
    color: var(--text-primary-dark);
  }
`;

const AboutCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const AboutCard = styled(motion.div)`
  background: var(--surface-light);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    filter: drop-shadow(0 0 8px rgba(79, 70, 229, 0.4));
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 15px;
    padding: 2px;
    background: linear-gradient(
      45deg,
      rgba(79, 70, 229, 0) 0%,
      rgba(79, 70, 229, 0.3) 50%,
      rgba(79, 70, 229, 0) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  .dark-mode & {
    background: var(--surface-dark);
    
    &:hover {
      filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.5));
    }
    
    &::before {
      background: linear-gradient(
        45deg,
        rgba(99, 102, 241, 0) 0%,
        rgba(99, 102, 241, 0.3) 50%,
        rgba(99, 102, 241, 0) 100%
      );
    }
  }
`;

const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: rgba(79, 70, 229, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--primary-light);
  
  .dark-mode & {
    background: rgba(99, 102, 241, 0.2);
    color: var(--primary-dark);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: var(--text-secondary-light);
  
  .dark-mode & {
    color: var(--text-secondary-dark);
  }
`;

const About = () => {
  useEffect(() => {
    document.title = 'About | Ishaan Verma';
  }, []);

  return (
    <AboutSection id="about">
      <AboutContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get to know more about me, my background, and what drives me.
        </SectionSubtitle>
        
        <AboutContent>
          <AboutText>
            <AboutParagraph
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hello! I'm Ishaan Verma, a passionate Computer Science student at VIT Bhopal University. I'm currently pursuing my Bachelor's degree with a strong academic record (CGPA: 8.0/10).
            </AboutParagraph>
            
            <AboutParagraph
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              I specialize in full-stack development with expertise in React.js, Spring Boot, Flutter, and various AI technologies. My passion lies in creating innovative solutions that combine beautiful user interfaces with powerful backend systems.
            </AboutParagraph>
            
            <AboutParagraph
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              I recently completed an internship at Arrise Solutions where I developed backend features using Spring Boot and contributed to frontend development with Flutter and React. I'm particularly proud of my work on AI-powered chatbots and secure authentication systems.
            </AboutParagraph>
            
            <AboutCards>
              <AboutCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <CardIcon>
                  <FiUser size={24} />
                </CardIcon>
                <CardTitle>Education</CardTitle>
                <CardText>B.Tech in Computer Science at VIT Bhopal (2022-2026)</CardText>
              </AboutCard>
              
              <AboutCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <CardIcon>
                  <FiCode size={24} />
                </CardIcon>
                <CardTitle>Experience</CardTitle>
                <CardText>Full Stack Software Intern at Arrise Solutions</CardText>
              </AboutCard>
              
              <AboutCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <CardIcon>
                  <FiBook size={24} />
                </CardIcon>
                <CardTitle>Projects</CardTitle>
                <CardText>Developed WFM system, AI chatbot, and storytelling game</CardText>
              </AboutCard>
              
              <AboutCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <CardIcon>
                  <FiAward size={24} />
                </CardIcon>
                <CardTitle>Achievements</CardTitle>
                <CardText>Gold Medal at Annual Tech Fest 2025, Health Hackathon participant</CardText>
              </AboutCard>
            </AboutCards>
          </AboutText>
          
          <AboutImage>
            <ProfileImage 
              src="/Ishaan-image.jpg" 
              alt="Ishaan Verma"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <ImageDecoration />
          </AboutImage>
        </AboutContent>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;