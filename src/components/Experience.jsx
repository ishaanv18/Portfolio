import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import styled from 'styled-components';

const ExperienceSection = styled.section`
  padding: 120px 0 80px;
`;

const ExperienceContainer = styled.div`
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

const ExperienceContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ExperienceTabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 1rem;
    
    &::-webkit-scrollbar {
      height: 5px;
    }
  }
`;

const ExperienceTab = styled.button`
  padding: 1rem;
  text-align: left;
  background: ${props => props.$active ? 'var(--surface-light)' : 'transparent'};
  color: ${props => props.$active ? 'var(--primary-light)' : 'var(--text-primary-light)'};
  border-radius: 8px;
  font-weight: ${props => props.$active ? '600' : '500'};
  transition: all 0.3s ease;
  border-left: ${props => props.$active ? '3px solid var(--primary-light)' : '3px solid transparent'};
  
  &:hover {
    background: var(--surface-light);
  }
  
  .dark-mode & {
    background: ${props => props.$active ? 'var(--surface-dark)' : 'transparent'};
    color: ${props => props.$active ? 'var(--primary-dark)' : 'var(--text-primary-dark)'};
    border-left: ${props => props.$active ? '3px solid var(--primary-dark)' : '3px solid transparent'};
    
    &:hover {
      background: var(--surface-dark);
    }
  }
  
  @media (max-width: 768px) {
    border-left: none;
    border-bottom: ${props => props.$active ? '3px solid var(--primary-light)' : '3px solid transparent'};
    white-space: nowrap;
    
    .dark-mode & {
      border-bottom: ${props => props.$active ? '3px solid var(--primary-dark)' : '3px solid transparent'};
    }
  }
`;

const ExperienceDetails = styled(motion.div)`
  background: var(--surface-light);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
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

const JobTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary-light);
  
  .dark-mode & {
    color: var(--text-primary-dark);
  }
`;

const CompanyName = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-light);
  
  .dark-mode & {
    color: var(--primary-dark);
  }
`;

const JobMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-secondary-light);
  font-size: 0.95rem;
  
  .dark-mode & {
    color: var(--text-secondary-dark);
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const JobDescription = styled.div`
  margin-bottom: 1.5rem;
`;

const JobResponsibilities = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ResponsibilityItem = styled.li`
  position: relative;
  padding-left: 1.5rem;
  line-height: 1.6;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.6rem;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--primary-light);
  }
  
  .dark-mode &::before {
    background: var(--primary-dark);
  }
`;

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  useEffect(() => {
    document.title = 'Experience | Ishaan Verma';
  }, []);

  const experiences = [
    {
      company: 'Arrise Solutions (India) Pvt. Ltd',
      title: 'Full Stack Software Intern',
      period: 'Oct 2024 - Dec 2024',
      location: 'Noida, Uttar Pradesh',
      responsibilities: [
        'Developed backend features using Spring Boot; contributed to frontend with Flutter and React.',
        'Built an AI-powered Chatbot using Hugging Face.',
        'Implemented a login page with OTP authentication and AI integration.',
        'Collaborated on testing for the Romania-based PWF360 (Pragmatic Workforce Management 360) project.'
      ]
    },
    {
      company: 'Health Hackathon',
      title: 'Web Developer',
      period: '2023',
      location: 'Johns Hopkins University, USA',
      responsibilities: [
        'Developed a web app for stress recovery and mental well-being during a Health Hackathon.',
        'Focused on emotional wellness features and user experience.',
        'Implemented responsive design and accessibility features.',
        'Collaborated with a cross-functional team to deliver a complete solution.'
      ]
    },
    {
      company: 'Ramanujan Club',
      title: 'Tech Contributor',
      period: '2025',
      location: 'Annual Tech Fest',
      responsibilities: [
        'Won Gold Medal in an event organized by the Ramanujan Club during the Annual Tech Fest 2025.',
        'Developed innovative technical solutions for the competition.',
        'Demonstrated problem-solving skills and technical expertise.',
        'Collaborated with team members to achieve the top position.'
      ]
    }
  ];

  return (
    <ExperienceSection id="experience">
      <ExperienceContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          My professional journey and achievements.
        </SectionSubtitle>
        
        <ExperienceContent>
          <ExperienceTabs>
            {experiences.map((exp, index) => (
              <ExperienceTab
                key={index}
                $active={activeTab === index}
                onClick={() => setActiveTab(index)}
              >
                {exp.company.split(' ')[0]}
              </ExperienceTab>
            ))}
          </ExperienceTabs>
          
          <ExperienceDetails
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <JobTitle>{experiences[activeTab].title}</JobTitle>
            <CompanyName>{experiences[activeTab].company}</CompanyName>
            
            <JobMeta>
              <MetaItem>
                <FiCalendar />
                <span>{experiences[activeTab].period}</span>
              </MetaItem>
              <MetaItem>
                <FiMapPin />
                <span>{experiences[activeTab].location}</span>
              </MetaItem>
            </JobMeta>
            
            <JobDescription>
              <JobResponsibilities>
                {experiences[activeTab].responsibilities.map((item, index) => (
                  <ResponsibilityItem key={index}>{item}</ResponsibilityItem>
                ))}
              </JobResponsibilities>
            </JobDescription>
          </ExperienceDetails>
        </ExperienceContent>
      </ExperienceContainer>
    </ExperienceSection>
  );
};

export default Experience;