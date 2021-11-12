import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerJSX & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> ;
    }
  }
}

interface ModelViewerJSX {
  src?:string,
  alt?:string,
  ar?:boolean,
  "ar-modes"?:string,
  "environment-image"?:string,
  "poster"?:string,
  "seamless-poster"?:boolean,
  "shadow-intensity"?:string,
  "camera-controls"?:boolean,
  'ios-src'?:string,
  "ar-status"?: string,
  link?:string,
  title?:string,


}
function MyApp({ Component, pageProps }) {
  
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}
export default MyApp
