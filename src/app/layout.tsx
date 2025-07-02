import { Metadata } from 'next';
import './globals.scss';
import './reset.scss';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Just Swim Manager',
  description: 'Swimming Pool Customer Manager Service',
  icons: {
    icon: '/favicon.ico',
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html>
      <body>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <div id="modal-portal" />
        <div id="toast-portal" />
      </body>
    </html>
  );
}
