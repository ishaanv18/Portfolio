import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import styled from 'styled-components';

const ContactSection = styled.section`
  padding: 120px 0 80px;
`;

const ContactContainer = styled.div`
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled(motion.form)`
  background: var(--surface-light);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  .dark-mode & {
    background: var(--surface-dark);
  }
  
  @media (max-width: 992px) {
    order: 2;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-primary-light);
  
  .dark-mode & {
    color: var(--text-primary-dark);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary-light);
  
  .dark-mode & {
    color: var(--text-primary-dark);
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 2px solid ${props => props.error ? 'var(--error)' : 'rgba(0, 0, 0, 0.1)'};
  background: var(--surface-light);
  color: var(--text-primary-light);
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-light);
  }
  
  .dark-mode & {
    background: var(--surface-dark);
    border-color: ${props => props.error ? 'var(--error)' : 'rgba(255, 255, 255, 0.1)'};
    color: var(--text-primary-dark);
    
    &:focus {
      border-color: var(--primary-dark);
    }
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 2px solid ${props => props.error ? 'var(--error)' : 'rgba(0, 0, 0, 0.1)'};
  background: var(--surface-light);
  color: var(--text-primary-light);
  transition: border-color 0.3s ease;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-light);
  }
  
  .dark-mode & {
    background: var(--surface-dark);
    border-color: ${props => props.error ? 'var(--error)' : 'rgba(255, 255, 255, 0.1)'};
    color: var(--text-primary-dark);
    
    &:focus {
      border-color: var(--primary-dark);
    }
  }
`;

const ErrorMessage = styled.p`
  color: var(--error);
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(90deg, var(--primary-light), var(--secondary-light));
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  .dark-mode & {
    background: linear-gradient(90deg, var(--primary-dark), var(--secondary-dark));
  }
`;

const ContactInfo = styled(motion.div)`
  @media (max-width: 992px) {
    order: 1;
  }
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-primary-light);
  
  .dark-mode & {
    color: var(--text-primary-dark);
  }
`;

const ContactInfoText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  color: var(--text-secondary-light);
  
  .dark-mode & {
    color: var(--text-secondary-dark);
  }
`;

const ContactInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ContactIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(79, 70, 229, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-light);
  flex-shrink: 0;
  
  .dark-mode & {
    background: rgba(99, 102, 241, 0.2);
    color: var(--primary-dark);
  }
`;

const ContactInfoContent = styled.div`
  flex: 1;
`;

const ContactInfoLabel = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-primary-light);
  
  .dark-mode & {
    color: var(--text-primary-dark);
  }
`;

const ContactInfoValue = styled.p`
  font-size: 1rem;
  color: var(--text-secondary-light);
  
  .dark-mode & {
    color: var(--text-secondary-dark);
  }
`;

const ContactInfoLink = styled.a`
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

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
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

const FormSuccess = styled(motion.div)`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid var(--success);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  color: var(--success);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  useEffect(() => {
    document.title = 'Contact | Ishaan Verma';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Create a mailto link with the form data
      const mailtoLink = `mailto:ishaan.verma36@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\n\nEmail: ${formData.email}\n\nMessage: ${formData.message}`
      )}`;
      
      // Open the user's email client
      window.open(mailtoLink, '_blank');
      
      // Show success message and reset form
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1000);
    }
  };

  return (
    <ContactSection id="contact">
      <ContactContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Me
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get in touch with me for collaborations or opportunities.
        </SectionSubtitle>
        
        <ContactContent>
          <ContactForm
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
          >
            <FormTitle>Send Me a Message</FormTitle>
            
            {submitSuccess && (
              <FormSuccess
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Your message has been prepared! If your email client opened, please send the email to complete the process. I'll get back to you soon.
              </FormSuccess>
            )}
            
            <FormGroup>
              <FormLabel htmlFor="name">Your Name</FormLabel>
              <FormInput 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="John Doe"
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="email">Your Email</FormLabel>
              <FormInput 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="john@example.com"
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="subject">Subject</FormLabel>
              <FormInput 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                placeholder="Project Inquiry"
              />
              {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="message">Your Message</FormLabel>
              <FormTextarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                placeholder="Hello Ishaan, I'd like to discuss..."
              />
              {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
            </FormGroup>
            
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'} <FiSend />
            </SubmitButton>
          </ContactForm>
          
          <ContactInfo
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactInfoTitle>Contact Information</ContactInfoTitle>
            <ContactInfoText>
              Feel free to reach out to me through any of the following channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </ContactInfoText>
            
            <ContactInfoList>
              <ContactInfoItem>
                <ContactIconWrapper>
                  <FiMail size={24} />
                </ContactIconWrapper>
                <ContactInfoContent>
                  <ContactInfoLabel>Email</ContactInfoLabel>
                  <ContactInfoValue>
                    <ContactInfoLink href="mailto:ishaan.verma36@gmail.com">
                      ishaan.verma36@gmail.com
                    </ContactInfoLink>
                  </ContactInfoValue>
                </ContactInfoContent>
              </ContactInfoItem>
              
              <ContactInfoItem>
                <ContactIconWrapper>
                  <FiPhone size={24} />
                </ContactIconWrapper>
                <ContactInfoContent>
                  <ContactInfoLabel>Phone</ContactInfoLabel>
                  <ContactInfoValue>
                    <ContactInfoLink href="tel:+919315176799">
                      +91 9315176799
                    </ContactInfoLink>
                  </ContactInfoValue>
                </ContactInfoContent>
              </ContactInfoItem>
              
              <ContactInfoItem>
                <ContactIconWrapper>
                  <FiMapPin size={24} />
                </ContactIconWrapper>
                <ContactInfoContent>
                  <ContactInfoLabel>Location</ContactInfoLabel>
                  <ContactInfoValue>Bhopal, Madhya Pradesh, India</ContactInfoValue>
                </ContactInfoContent>
              </ContactInfoItem>
            </ContactInfoList>
            
            <ContactInfoTitle>Connect With Me</ContactInfoTitle>
            <SocialLinks>
              <SocialLink href="https://github.com/ishaanv18" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub size={20} />
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/ishaan-verma-03s" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin size={20} />
              </SocialLink>
              <SocialLink href="mailto:ishaan.verma36@gmail.com" aria-label="Email">
                <FiMail size={20} />
              </SocialLink>
            </SocialLinks>
          </ContactInfo>
        </ContactContent>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;