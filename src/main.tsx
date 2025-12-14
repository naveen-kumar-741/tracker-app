import { createRoot } from 'react-dom/client';
import './global.css';
import 'react-datepicker/dist/react-datepicker.css';
import App from './pages';

createRoot(document.getElementById('root')!).render(<App />);
