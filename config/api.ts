export const API_URL = process.env.NEXT_PUBLIC_API_URL || (
  process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5001'  
    : 'https://ali2bay.com' 
);

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || API_URL;
  const fullUrl = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  };

  try {
    console.log('Chiamata API a:', fullUrl, 'con opzioni:', { ...defaultOptions, ...options });
    
    const response = await fetch(fullUrl, {
      ...defaultOptions,
      ...options,
    });

    // Log dettagliato della risposta
    console.log('Risposta ricevuta:', {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Dettagli errore:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Errore HTTP ${response.status}: ${errorText || response.statusText}`);
    }

    const data = await response.json().catch(() => null);
    if (!data) {
      console.error('Risposta vuota o non valida');
      throw new Error('Risposta non valida dal server');
    }

    return data;
  } catch (error) {
    console.error('Errore durante la chiamata API:', error);
    throw error;
  }
};