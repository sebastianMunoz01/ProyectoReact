import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppPreview from './Bryan';
createRoot(document.getElementById('root')).render(
  <HashRouter><AppPreview /></HashRouter>
);