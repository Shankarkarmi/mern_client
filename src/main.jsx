import { StrictMode } from 'react'; 
import { createRoot } from 'react-dom/client';  
import App from './App.jsx';  
import './index.css';
import { AuthProvider } from './store/auth.jsx';
import { ToastContainer, Bounce } from 'react-toastify'; // Importing Bounce transition
import 'react-toastify/dist/ReactToastify.css';  // Make sure toast styles are imported

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </AuthProvider>
  </StrictMode>
);
