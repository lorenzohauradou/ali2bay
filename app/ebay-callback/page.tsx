'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { fetchApi } from '@/config/api'

export default function EbayCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('Processing eBay callback...'); // Debug log
        
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const savedState = localStorage.getItem('ebay_oauth_state')

        if (!code || !state) {
          console.error('Missing code or state');
          router.push('/');
          return;
        }

        if (state !== savedState) {
          console.error('State mismatch');
          router.push('/');
          return;
        }

        const response = await fetchApi('/ebay-callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, state })
        });

        console.log('Callback response:', response); // Debug log

        // Pulisci lo state salvato
        localStorage.removeItem('ebay_oauth_state');
        
        // Redirect alla home
        router.push('/');
      } catch (error) {
        console.error('Callback error:', error);
        router.push('/');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Connessione a eBay in corso...</h1>
        <p className="text-gray-600">Attendi mentre completiamo la configurazione...</p>
      </div>
    </div>
  );
}