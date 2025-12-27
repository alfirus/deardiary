"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha as useGoogleLib } from 'react-google-recaptcha-v3';

// Define our custom context shape
interface RecaptchaContextType {
	executeRecaptcha: (action: string) => Promise<string>;
}

const RecaptchaContext = createContext<RecaptchaContextType | null>(null);

export function useRecaptcha() {
	const context = useContext(RecaptchaContext);
	if (!context) {
		throw new Error('useRecaptcha must be used within a ReCaptchaProvider');
	}
	return context;
}

export function ReCaptchaProvider({ children }: { children: React.ReactNode }) {
	const isDev = process.env.NODE_ENV === 'development';

	if (isDev) {
		// In Dev, provide a mock implementation
		return (
			<RecaptchaContext.Provider
				value={{
					executeRecaptcha: async (action) => {
						console.log(`[Dev] Mock ReCaptcha executed for action: ${action}`);
						return 'dev_token';
					},
				}}
			>
				{children}
			</RecaptchaContext.Provider>
		);
	}

	// In Prod, wrap with Library Provider AND our Bridge
	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? 'key_not_found'}
			scriptProps={{
				async: false,
				defer: false,
				appendTo: 'head',
				nonce: undefined,
			}}
		>
			<RecaptchaBridge>{children}</RecaptchaBridge>
		</GoogleReCaptchaProvider>
	);
}

function RecaptchaBridge({ children }: { children: React.ReactNode }) {
	const { executeRecaptcha } = useGoogleLib();

	// We wrap the library's executeRecaptcha to ensure it matches our interface
	const wrappedExecute = async (action: string) => {
		if (!executeRecaptcha) {
			console.warn('ReCaptcha not ready yet');
			return '';
		}
		return executeRecaptcha(action);
	};

	return <RecaptchaContext.Provider value={{ executeRecaptcha: wrappedExecute }}>{children}</RecaptchaContext.Provider>;
}
