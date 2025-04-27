// Importing React and ReactDOM from 'react-dom/client' for React 18+
import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import 'bootstrap/dist/css/bootstrap.min.css';


// Importing the root App component
import App from './App';

// Importing the global styles (optional, but usually you include some CSS here)
import './index.css';

// Create the root element in the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
