import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ClerkProvider } from '@clerk/clerk-react';
import localization from '@/clerk/localization';
import './index.css';
import App from './App';
import appearance from './clerk/clerkStyles';

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const SIGNIN_URL = import.meta.env.VITE_CLERK_SIGN_IN_URL;
const SIGNUP_URL = import.meta.env.VITE_CLERK_SIGN_UP_URL;

if (!PUBLISHABLE_KEY) {
  console.error('Clerk Publishable Key is missing. Add it to the .env file.');
  throw new Error('Clerk Publishable Key is missing.');
}

console.log(PUBLISHABLE_KEY, SIGNIN_URL, SIGNUP_URL);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div className='dark font-inter text-white'>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider 
            publishableKey={PUBLISHABLE_KEY} 
            signInUrl={SIGNIN_URL}
            signUpUrl={SIGNUP_URL}
            localization={localization}
            signInFallbackRedirectUrl='/'
            signUpFallbackRedirectUrl='/'
            appearance={appearance}
        >
          <App />
        </ClerkProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </div>
);

