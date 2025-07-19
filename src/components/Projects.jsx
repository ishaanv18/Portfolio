import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiLayers } from 'react-icons/fi';
import styled from 'styled-components';

const ProjectsSection = styled.section`
  padding: 120px 0 80px;
`;

const ProjectsContainer = styled.div`
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
  margin-bottom: 2rem;
  max-width: 600px;
  
  .dark-mode & {
    color: var(--text-secondary-dark);
  }
`;

const ProjectFilters = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  
  @media (max-width: 576px) {
    justify-content: center;
  }
`;

const FilterButton = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s ease;
  background: ${props => props.$active ? 'var(--primary-light)' : 'var(--surface-light)'};
  color: ${props => props.$active ? 'white' : 'var(--text-primary-light)'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .dark-mode & {
    background: ${props => props.$active ? 'var(--primary-dark)' : 'var(--surface-dark)'};
    color: ${props => props.$active ? 'white' : 'var(--text-primary-dark)'};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: var(--surface-light);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    filter: drop-shadow(0 0 8px rgba(79, 70, 229, 0.4));
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
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

const ProjectImage = styled.div`
  height: 200px;
  background: linear-gradient(45deg, var(--primary-light), var(--secondary-light));
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .dark-mode & {
    background: linear-gradient(45deg, var(--primary-dark), var(--secondary-dark));
  }
`;

const ProjectIcon = styled.div`
  font-size: 3rem;
  color: white;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary-light);
  
  .dark-mode & {
    color: var(--text-primary-dark);
  }
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary-light);
  margin-bottom: 1.5rem;
  flex: 1;
  
  .dark-mode & {
    color: var(--text-secondary-dark);
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  background: rgba(79, 70, 229, 0.1);
  color: var(--primary-light);
  
  .dark-mode & {
    background: rgba(99, 102, 241, 0.2);
    color: var(--primary-dark);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-light);
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--secondary-light);
  }
  
  .dark-mode & {
    color: var(--primary-dark);
    
    &:hover {
      color: var(--secondary-dark);
    }
  }
`;

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  useEffect(() => {
    document.title = 'Projects | Ishaan Verma';
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Work Force Management',
      description: 'A full-stack workforce management system with role-based access for employees, HR, admin, and managers. Features include attendance tracking, leave management, payroll, shift assignments, performance reviews, and task management.',
      image: 'wfm',
      icon: <FiLayers size={48} />,
      tech: ['React.js', 'Spring Boot', 'MongoDB'],
      category: 'fullstack',
      github: 'https://github.com/ishaanv18/wfm',
      demo: '#'
    },
    {
      id: 2,
      title: 'ArriBot',
      description: 'A customizable AI chatbot handling technical, non-technical, and emotional intelligence queries. Includes secure user registration, authentication with OTP verification, and a responsive UI design.',
      image: 'chatbot',
      icon: <FiCode size={48} />,
      tech: ['Spring Boot', 'Hugging Face', 'HTML', 'CSS', 'JavaScript'],
      category: 'ai',
      github: 'https://github.com/ishaanv18/arribot',
      demo: '#'
    },
    {
      id: 3,
      title: 'AI Dungeon Master',
      description: 'A procedural storytelling game with dynamic, Gemini-driven narratives based on user choices. Features text generation and NLP for interactive and evolving narratives, with reinforcement learning for personalized gameplay.',
      image: 'game',
      icon: <FiCode size={48} />,
      tech: ['React.js', 'Flask', 'Gemini API', 'Python'],
      category: 'ai',
      github: 'https://github.com/ishaanv18/ai-dungeon',
      demo: '#'
    },
    {
      id: 4,
      title: 'Mental Wellness App',
      description: 'A web application for stress recovery and mental well-being developed during a Health Hackathon at Johns Hopkins University. Focuses on emotional wellness with interactive features.',
      image: 'wellness',
      icon: <FiCode size={48} />,
      tech: ['React.js', 'Node.js', 'Express.js'],
      category: 'frontend',
      github: 'https://github.com/ishaanv18/wellness-app',
      demo: '#'
    }
  ];

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filter));
    }
  }, [filter]);

  return (
    <ProjectsSection id="projects">
      <ProjectsContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Check out some of my recent work and personal projects.
        </SectionSubtitle>
        
        <ProjectFilters
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FilterButton 
            $active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            $active={filter === 'fullstack'} 
            onClick={() => setFilter('fullstack')}
          >
            Full Stack
          </FilterButton>
          <FilterButton 
            $active={filter === 'frontend'} 
            onClick={() => setFilter('frontend')}
          >
            Frontend
          </FilterButton>
          <FilterButton 
            $active={filter === 'ai'} 
            onClick={() => setFilter('ai')}
          >
            AI Projects
          </FilterButton>
        </ProjectFilters>
        
        <ProjectsGrid>
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <ProjectImage>
                  <ProjectIcon>{project.icon}</ProjectIcon>
                </ProjectImage>
                
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  
                  <TechStack>
                    {project.tech.map((tech, index) => (
                      <TechTag key={index}>{tech}</TechTag>
                    ))}
                  </TechStack>
                  
                  <ProjectLinks>
                    <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                      <FiGithub /> GitHub
                    </ProjectLink>
                    <ProjectLink href={project.demo} target="_blank" rel="noopener noreferrer">
                      <FiExternalLink /> Live Demo
                    </ProjectLink>
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </ProjectsContainer>
    </ProjectsSection>
  );
};

export default Projects;