import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import styled from 'styled-components';

const FooterSection = styled.footer`
  background: var(--surface-light);
  padding: 3rem 0 1.5rem;
  position: relative;
  
  .dark-mode & {
    background: var(--surface-dark);
  }
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, var(--primary-light), var(--secondary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  .dark-mode & {
    background: linear-gradient(90deg, var(--primary-dark), var(--secondary-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const FooterDescription = styled.p`
  color: var(--text-secondary-light);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  
  .dark-mode & {
    color: var(--text-secondary-dark);
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: var(--text-primary-light);
  
  .dark-mode & {
    color: var(--text-primary-dark);
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.8rem;
  
  a {
    color: var(--text-secondary-light);
    text-decoration: none;
    transition: color 0.3s ease;
    display: inline-flex;
    align-items: center;
    
    &:hover {
      color: var(--primary-light);
    }
    
    .dark-mode & {
      color: var(--text-secondary-dark);
      
      &:hover {
        color: var(--primary-dark);
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
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
  background: var(--background-light);
  color: var(--text-primary-light);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    background: var(--primary-light);
    color: white;
  }
  
  .dark-mode & {
    background: var(--background-dark);
    color: var(--text-primary-dark);
    
    &:hover {
      background: var(--primary-dark);
      color: white;
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  
  .dark-mode & {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Copyright = styled.p`
  color: var(--text-secondary-light);
  font-size: 0.9rem;
  
  .dark-mode & {
    color: var(--text-secondary-dark);
  }
`;

const ScrollToTop = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(90deg, var(--primary-light), var(--secondary-light));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border: none;
  z-index: 10;
  
  &:hover {
    transform: translateY(-3px);
  }
  
  .dark-mode & {
    background: linear-gradient(90deg, var(--primary-dark), var(--secondary-dark));
  }
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <FooterSection>
      <FooterContainer>
        <FooterContent>
          <FooterColumn>
            <FooterLogo>Ishaan Verma</FooterLogo>
            <FooterDescription>
              A passionate Full Stack Developer with expertise in React, Node.js, and modern web technologies. Building innovative solutions to solve real-world problems.
            </FooterDescription>
            <SocialLinks>
              <SocialLink href="https://github.com/ishaanv18" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub size={18} />
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/ishaan-verma-03s" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin size={18} />
              </SocialLink>
              <SocialLink href="mailto:ishaan.verma36@gmail.com" aria-label="Email">
                <FiMail size={18} />
              </SocialLink>
            </SocialLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLinks>
              <FooterLink>
                <a href="#home">Home</a>
              </FooterLink>
              <FooterLink>
                <a href="#about">About</a>
              </FooterLink>
              <FooterLink>
                <a href="#experience">Experience</a>
              </FooterLink>
              <FooterLink>
                <a href="#projects">Projects</a>
              </FooterLink>
              <FooterLink>
                <a href="#skills">Skills</a>
              </FooterLink>
              <FooterLink>
                <a href="#contact">Contact</a>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Contact Info</FooterTitle>
            <FooterLinks>
              <FooterLink>
                <a href="mailto:ishaan.verma36@gmail.com">ishaan.verma36@gmail.com</a>
              </FooterLink>
              <FooterLink>
                <a href="tel:+919315176799">+91 9315176799</a>
              </FooterLink>
              <FooterLink>
                <a href="#">Ghaziabad, Uttar Pradesh, India</a>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>© {new Date().getFullYear()} Ishaan Verma. All rights reserved.</Copyright>
        </FooterBottom>
      </FooterContainer>
      
      <ScrollToTop
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiArrowUp size={20} />
      </ScrollToTop>
    </FooterSection>
  );
};

export default Footer;