import { useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { 
  FiCode, 
  FiDatabase, 
  FiLayers, 
  FiServer, 
  FiGlobe, 
  FiCpu, 
  FiGitBranch,
  FiCloud
} from 'react-icons/fi';

const SkillsSection = styled.section`
  padding: 120px 0 80px;
`;

const SkillsContainer = styled.div`
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled(motion.div)`
  background: var(--surface-light);
  border-radius: 15px;
  padding: 1.5rem;
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

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CategoryIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: rgba(79, 70, 229, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-light);
  
  .dark-mode & {
    background: rgba(99, 102, 241, 0.2);
    color: var(--primary-dark);
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary-light);
  
  .dark-mode & {
    color: var(--text-primary-dark);
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SkillItem = styled.div`
  background: ${props => props.$level === 'advanced' ? 'rgba(79, 70, 229, 0.25)' : 
    props.$level === 'intermediate' ? 'rgba(79, 70, 229, 0.2)' : 'rgba(79, 70, 229, 0.15)'};
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #4338ca;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .dark-mode & {
    background: ${props => props.$level === 'advanced' ? 'rgba(99, 102, 241, 0.35)' : 
      props.$level === 'intermediate' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.2)'};
    color: #ffffff;
  }
`;

const CertificationsSection = styled.div`
  margin-top: 4rem;
`;

const CertificationsTitle = styled(motion.h3)`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--text-primary-light);
  
  .dark-mode & {
    color: var(--text-primary-dark);
  }
`;

const CertificationsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const CertificationCard = styled(motion.div)`
  background: var(--surface-light);
  border-radius: 15px;
  padding: 1.5rem;
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

const CertificationTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary-light);
  
  .dark-mode & {
    color: var(--text-primary-dark);
  }
`;

const CertificationIssuer = styled.p`
  font-size: 0.9rem;
  color: var(--primary-light);
  margin-bottom: 1rem;
  
  .dark-mode & {
    color: var(--primary-dark);
  }
`;

const CertificationDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-secondary-light);
  
  .dark-mode & {
    color: var(--text-secondary-dark);
  }
`;

const Skills = () => {
  useEffect(() => {
    document.title = 'Skills | Ishaan Verma';
  }, []);

  const skillCategories = [
    {
      title: 'Languages',
      icon: <FiCode size={24} />,
      skills: [
        { name: 'JavaScript', level: 'advanced' },
        { name: 'C++', level: 'advanced' },
        { name: 'Python', level: 'intermediate' },
        { name: 'Java', level: 'intermediate' },
        { name: 'HTML/CSS', level: 'advanced' }
      ]
    },
    {
      title: 'Frontend',
      icon: <FiLayers size={24} />,
      skills: [
        { name: 'React.js', level: 'advanced' },
        { name: 'Flutter', level: 'intermediate' },
        { name: 'Express.js', level: 'intermediate' },
        { name: 'CSS', level: 'advanced' },
        { name: 'HTML', level: 'advanced' }
      ]
    },
    {
      title: 'Backend',
      icon: <FiServer size={24} />,
      skills: [
        { name: 'Spring Boot', level: 'intermediate' },
        { name: 'Node.js', level: 'intermediate' },
        { name: 'Flask', level: 'basic' },
        { name: 'Express.js', level: 'intermediate' }
      ]
    },
    {
      title: 'Databases',
      icon: <FiDatabase size={24} />,
      skills: [
        { name: 'MySQL', level: 'intermediate' },
        { name: 'MongoDB', level: 'intermediate' },
        { name: 'Database Management Systems', level: 'intermediate' }
      ]
    },
    {
      title: 'AI & ML',
      icon: <FiCpu size={24} />,
      skills: [
        { name: 'TensorFlow', level: 'intermediate' },
        { name: 'Hugging Face', level: 'intermediate' },
        { name: 'Machine Learning', level: 'intermediate' },
        { name: 'Generative AI', level: 'intermediate' }
      ]
    },
    {
      title: 'Tools & Platforms',
      icon: <FiGlobe size={24} />,
      skills: [
        { name: 'Git', level: 'advanced' },
        { name: 'GitHub', level: 'advanced' },
        { name: 'Google Cloud', level: 'intermediate' },
        { name: 'APIs', level: 'intermediate' }
      ]
    },
    {
      title: 'Concepts',
      icon: <FiGitBranch size={24} />,
      skills: [
        { name: 'Operating Systems', level: 'intermediate' },
        { name: 'Virtual Memory', level: 'intermediate' },
        { name: 'Data Structures and Algorithms', level: 'advanced' },
        { name: 'Object-Oriented Programming', level: 'advanced' },
        { name: 'Computer Networks', level: 'intermediate' }
      ]
    },
    {
      title: 'Cloud & DevOps',
      icon: <FiCloud size={24} />,
      skills: [
        { name: 'Cloud Computing', level: 'intermediate' },
        { name: 'Problem Solving', level: 'advanced' },
        { name: 'Cloud Computing', level: 'intermediate' }
      ]
    }
  ];

  const certifications = [
    {
      title: 'Cloud Computing',
      issuer: 'IIT Madras (NPTEL)',
      description: 'Comprehensive certification covering cloud architecture, deployment models, and service paradigms.'
    },
    {
      title: 'Bits and Bytes of Computer Networking',
      issuer: 'Coursera',
      description: 'In-depth study of computer networking fundamentals, protocols, and architecture.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <SkillsSection id="skills">
      <SkillsContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          My technical expertise and proficiencies.
        </SectionSubtitle>
        
        <SkillsGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skillCategories.map((category, index) => (
            <SkillCategory 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)' }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <CategoryHeader>
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryTitle>{category.title}</CategoryTitle>
              </CategoryHeader>
              
              <SkillsList>
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem key={skillIndex} $level={skill.level}>
                    {skill.name}
                  </SkillItem>
                ))}
              </SkillsList>
            </SkillCategory>
          ))}
        </SkillsGrid>
        
        <CertificationsSection>
          <CertificationsTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Certifications
          </CertificationsTitle>
          
          <CertificationsList
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {certifications.map((cert, index) => (
              <CertificationCard 
                key={index}
                variants={itemVariants}
              >
                <CertificationTitle>{cert.title}</CertificationTitle>
                <CertificationIssuer>{cert.issuer}</CertificationIssuer>
                <CertificationDescription>{cert.description}</CertificationDescription>
              </CertificationCard>
            ))}
          </CertificationsList>
        </CertificationsSection>
      </SkillsContainer>
    </SkillsSection>
  );
};

export default Skills;