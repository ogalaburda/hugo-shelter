import type { AppProps } from 'next/app';
import Layout from '../components/layout/defaultLayout';
import { FavoritesProvider } from 'context/favoritesContext';
import '../css/main.css';

function MyApp({ Component, pageProps }: AppProps) {
  const LayoutComponent = (Component as any).Layout || Layout;

  return (
    <FavoritesProvider> {/* Wrap everything in the FavoritesProvider */}
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
    </FavoritesProvider>
  );
}

export default MyApp;
