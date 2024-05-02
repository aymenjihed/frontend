import useMenuEffects from './useMenuEffects';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Menu = () => {
  const logoSize = useMenuEffects();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimez le token du localStorage pour déconnecter l'utilisateur
    localStorage.removeItem('token');
    // Redirigez l'utilisateur vers la page de connexion
    navigate('/login'); // Utilisez navigate à la place de history.push
  };


  return (
    <div className="container">
      <div class="navigation">
        <ul>
          <li>
            <a href="#">
            <div className="logo-container" onClick={() => setLogoSize(logoSize === "normal" ? "small" : "normal")}>
                <img src="assets/imgs/logotaxiexpress.png" style={{ height: logoSize === "small" ? "70px" : "140px", width: logoSize === "small" ? "70px" : "140px" }} alt="" />
              </div>
            </a>
          </li>

          <li>
            <a href="/">
              <span class="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span class="title">Dashboard</span>
            </a>
          </li>

          <li>
            <a href="/chauffeur">
              <span class="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span class="title">Chauffeur</span>
            </a>
          </li>

          <li>
            <a href="#">
              <span class="icon">
                <ion-icon name="chatbubble-outline"></ion-icon>
              </span>
              <span class="title">Messages</span>
            </a>
          </li>

          <li>
            <a href="#">
              <span class="icon">
                <ion-icon name="help-outline"></ion-icon>
              </span>
              <span class="title">Help</span>
            </a>
          </li>

          <li>
            <a href="#">
              <span class="icon">
                <ion-icon name="settings-outline"></ion-icon>
              </span>
              <span class="title">Settings</span>
            </a>
          </li>

          <li>
            <a href="#">
              <span class="icon">
                <ion-icon name="lock-closed-outline"></ion-icon>
              </span>
              <span class="title">Password</span>
            </a>
          </li>

          <li>
            <a href="" onClick={handleLogout}>
              <span class="icon">
                <ion-icon name="log-out-outline" ></ion-icon>
              </span>
              <span class="title">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>

   
      
          
          </div>
        
  
   
  );
};

export default Menu;

