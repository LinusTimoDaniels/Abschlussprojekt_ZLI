import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContactPage from './pages/contactpage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element:
    <div>
      <App />
    </div>
  },
   {
    path: "ContactPage",
    element:
    <div>
      <ContactPage />
    </div>


  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);
