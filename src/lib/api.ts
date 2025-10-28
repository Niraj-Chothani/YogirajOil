// API configuration for different environments
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://yogiraj-oil.vercel.app' // Same domain as frontend
  : 'http://localhost:8081';

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/api/contact`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

// Contact form submission function
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  message: string;
}) => {
  const response = await fetch(API_ENDPOINTS.CONTACT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to send message');
  }

  return response.json();
};
