export const API_URL = process.env.NEXT_PUBLIC_API_URL || (
  process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000'  
    : 'https://api.ali2bay.com' 
);

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
    try {
        const response = await fetch(endpoint, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers,
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('Errore API:', response.status, errorData);
            throw new Error(errorData?.error || `Errore API: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Errore nella chiamata API:', error);
        throw error;
    }
};