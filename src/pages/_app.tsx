import type { AppProps } from 'next/app';
import Layout from '../components/layout/defaultLayout';
import '../css/main.css';

function MyApp({ Component, pageProps }: AppProps) {
  const LayoutComponent = (Component as any).Layout || Layout;

  return (
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}

export default MyApp;
