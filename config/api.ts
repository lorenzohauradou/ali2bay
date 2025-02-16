export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ali2bay.com';
// export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ali2bay.com';

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        credentials: 'include',
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Si è verificato un errore');
    }

    return response.json();
};