import { createRoot } from 'react-dom/client';
import './global.css';
import 'react-datepicker/dist/react-datepicker.css';
import App from './pages';
import { registerServiceWorker } from './sw-register';

registerServiceWorker();

createRoot(document.getElementById('root')!).render(<App />);
