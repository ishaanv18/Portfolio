import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 0;
  backdrop-filter: blur(10px);
  background: ${props => props.$darkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(249, 250, 251, 0.8)'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span, .last-name {
    background: linear-gradient(90deg, #4f46e5, #8b5cf6, #ec4899);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  position: relative;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    background: linear-gradient(90deg, #4f46e5, #8b5cf6);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.$darkMode ? 'var(--text-primary-dark)' : 'var(--text-primary-light)'};
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background: ${props => props.$darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'};
    transform: scale(1.05);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.$darkMode ? 'var(--text-primary-dark)' : 'var(--text-primary-light)'};
  transition: background-color 0.3s ease;
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  &:hover {
    background: ${props => props.$darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 250px;
  background: ${props => props.$darkMode ? 'var(--surface-dark)' : 'var(--surface-light)'};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 200;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
  backdrop-filter: blur(3px);
`;

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];
  
  return (
    <NavbarContainer $darkMode={darkMode} style={{ boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none' }}>
      <NavContent>
        <Logo href="#home" onClick={() => scrollToSection('home')}>
          <span>Ishaan</span> <span>Verma</span>
        </Logo>
        
        <NavLinks>
          {navItems.map((item) => (
            <NavLink 
              key={item.id} 
              href={`#${item.id}`} 
              $active={activeSection === item.id ? 1 : 0}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.label}
            </NavLink>
          ))}
          
          <ThemeToggle $darkMode={darkMode} onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </ThemeToggle>
        </NavLinks>
        
        <MobileMenuButton $darkMode={darkMode} onClick={toggleMobileMenu} aria-label="Open menu">
          <FiMenu size={24} />
        </MobileMenuButton>
      </NavContent>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <Overlay 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
            
            <MobileMenu 
              $darkMode={darkMode}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <MobileMenuHeader>
                <Logo href="#home" onClick={() => scrollToSection('home')}>
                  <span>I</span><span>V</span>
                </Logo>
                <ThemeToggle $darkMode={darkMode} onClick={toggleDarkMode} aria-label="Toggle dark mode">
                  {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                </ThemeToggle>
                <MobileMenuButton $darkMode={darkMode} onClick={toggleMobileMenu} aria-label="Close menu">
                  <FiX size={24} />
                </MobileMenuButton>
              </MobileMenuHeader>
              
              <MobileNavLinks>
                {navItems.map((item) => (
                  <NavLink 
                    key={item.id} 
                    href={`#${item.id}`} 
                    $active={activeSection === item.id ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </MobileNavLinks>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </NavbarContainer>
  );
};

export default Navbar;