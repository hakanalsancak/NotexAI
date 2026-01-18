import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'NotexAI - AI-Powered Note Taking',
  description: 'Transform your thoughts into beautifully organized notes with AI assistance',
  keywords: ['notes', 'ai', 'productivity', 'writing', 'organization'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="mesh-bg" />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'toast-custom',
            duration: 4000,
            style: {
              background: 'rgba(36, 59, 83, 0.95)',
              color: '#e2e8f0',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#f59e0b',
                secondary: '#102a43',
              },
            },
            error: {
              iconTheme: {
                primary: '#f43f5e',
                secondary: '#102a43',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
