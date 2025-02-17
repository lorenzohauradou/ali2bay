export const API_URL = process.env.NEXT_PUBLIC_API_URL || (
  process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5001'  
    : 'https://api.ali2bay.com' 
);

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
    try {
        console.log('Calling API:', endpoint);
        
        const response = await fetch(endpoint, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};