import './globals.css';

export const metadata = {
  title: 'Ecommerce store',
  description: 'Quality over Price',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <main>{children}</main>
      </body>
    </html>
  );
}
