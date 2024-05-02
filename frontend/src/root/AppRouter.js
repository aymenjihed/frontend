// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/dashboard';
import Pagechauffeur from '../pages/pagechauffeur'
import Signin from '../pages/signin';
import Menu from '../components/menu';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<React.Fragment><Menu  /><Dashboard  /></React.Fragment>} />
        
        <Route path="/chauffeur" element={<React.Fragment><Menu  /><Pagechauffeur  /></React.Fragment>} />
        <Route path="/login" element={<React.Fragment><Signin  /></React.Fragment>} />
        
    
       
      </Routes>
    </Router>
  );
};

export default AppRouter;
