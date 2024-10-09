import './globals.css';
import Header from './components/Header';
export const metadata = {
  title: 'Ecommerce store',
  description: 'Quality over Price',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <main>
        <Header
        title="Quality Over Price"
        description="Visit our online store"
      />

          {children}
          
          </main>
          
      </body>
    </html>
  );
}
