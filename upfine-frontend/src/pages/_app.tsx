import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../components/Header.css';

config.autoAddCss = false;
library.add(fas);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
