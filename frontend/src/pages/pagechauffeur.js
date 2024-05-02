import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Pagechauffeur = () => {
  const navigate = useNavigate();
  const [chauffeur, setChauffeur] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchChauffeur = async () => {
      try {
        const response = await fetch('https://backend-aflb.vercel.app/api/chauffeurs');
        const data = await response.json();
        setChauffeur(data);
      } catch (error) {
        console.error('Error fetching Chauffeur', error);
      }
    };

    fetchChauffeur();
    const token = localStorage.getItem('token');


    if (token) {
      navigate('/chauffeur');
    } else {
      navigate('/login');
    }

  }, []);

  const handleActive = async (chauffeurId) => {
    try {
        alert(`chauffeur with ID ${chauffeurId} est Active`);
      const response = await fetch(`https://backend-aflb.vercel.app/api/chauffeur/${chauffeurId}`, {
        method: 'PUT', // Utilisation de la méthode PATCH pour mettre à jour la commande
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ compte: "Active" }), // Mettez à jour confirmer à true
      });

      if (response.ok) {

        window.location.reload();
      } else {
        console.error('Failed to confirm chauffeur ');
      }
    } catch (error) {
      console.error('Error confirming chauffeur  ', error);
    }
  };

  const handleDesactive = async (chauffeurId) => {
    try {
        alert(`chauffeur with ID ${chauffeurId} est Active`);
      const response = await fetch(`https://backend-aflb.vercel.app/api/chauffeur/${chauffeurId}`, {
        method: 'PUT', // Utilisation de la méthode PATCH pour mettre à jour la commande
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ compte: "non Active" }), // Mettez à jour confirmer à true
      });

      if (response.ok) {

        window.location.reload();
      } else {
        console.error('Failed to confirm chauffeur ');
      }
    } catch (error) {
      console.error('Error confirming chauffeur  ', error);
    }
  };
  



  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredChauffeur = chauffeur.filter((men) =>
  men.txtFirstName && men.txtFirstName.toLowerCase().includes(searchTerm.toLowerCase())
);

 

  return (
    <div className="main">
      <div className="topbar">
        <div className="toggle">
          <ion-icon name="menu-outline"></ion-icon>
        </div>

        <div className="search">
          <label>
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <ion-icon name="search-outline"></ion-icon>
          </label>
        </div>

        <div className="user">
          <img src="assets/imgs/customer01.jpg" alt="" />
        </div>
      </div>


      <div className="details">
        <div className="recentOrders">
          <div className="cardHeader">
            <h2>Liste des chauffeurs</h2>
            <a href="#" className="btn">
              View All
            </a>
          </div>
          <div class="table-container">
  
          <table>
            <thead>
              <tr>
              <td>Name</td>
              <td>email</td>
              <td>NumeroDeTel</td>
              <td>Série Taxi</td>
              <td>compte</td>
              <td>Edit</td>
              </tr>
            </thead>

            <tbody>
              {filteredChauffeur.map((chauffeur) => (
                <tr key={chauffeur.id}>
                  <td>{chauffeur.txtFirstName} {chauffeur.txtLastName}</td>
                  <td>{chauffeur.email}</td> 
                  <td>{chauffeur.NumeroDeTel}</td>
                  <td>{chauffeur.Série}</td>
                  <td>
                      {chauffeur.compte === 'non Active' ? (
                        <span className="status return">{chauffeur.compte}</span>
                      ) : (
                        <span class="status delivered"> {chauffeur.compte}</span>
                      )}
                    </td>
                    <td><div className="cardActive"> <a href="#" className="btn" onClick={() => handleActive(chauffeur.id)}>
              Active
            </a></div></td>
            <td><div className="cardDesactive"> <a href="#" className="btn" onClick={() => handleDesactive(chauffeur.id)}>
              Desactive
            </a></div></td>
            <td><div className="cardedit"> <a href="#" className="btn" onClick={() => handleActive(chauffeur.id)}>
              edit
            </a></div></td>
                </tr>
              ))}
            </tbody>
          </table>
       
       </div>
        </div>
      </div>
    </div>
  );
};

export default Pagechauffeur;
