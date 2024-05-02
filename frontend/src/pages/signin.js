import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();

    // Si un token est déjà présent, redirigez l'utilisateur
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
      return;
    }

    // Si aucun token n'est présent, effectuez la demande de connexion
    try {
      const response = await fetch('https://backend-aflb.vercel.app/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Stockez le jeton JWT dans localStorage ou un autre moyen sécurisé
        localStorage.setItem('token', data.token);
        alert("Votre code est correcte");

        // Redirigez l'utilisateur vers la page appropriée
        navigate('/');
      } else {
        // Gérez les erreurs d'authentification ici
        console.error('Erreur d\'authentification');
        alert("Votre code incorrecte");
      }
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
    }
  };

  useEffect(() => {
    // Vérifiez si un token est déjà présent dans le localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Redirigez l'utilisateur vers la page appropriée
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="scontainer">
      <img src="assets/imgs/logotaxiexpress.png" alt="Logo" className="logo" />
      <form className="form-container" onSubmit={handleSignin}>
        <h2>Sign In</h2>
        <div className="row">
          <i className="fas fa-user"></i>
          <input type="email" placeholder="Email or Phone" onChange={(e) => setEmail(e.target.value)}  required />
        </div>
        <div className="row">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value) }required />
        </div>
        <div className="pass"><a href="#">Forgot password?</a></div>
        <div className="row button">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default Signin;
