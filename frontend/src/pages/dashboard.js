
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useMenuEffects from '../components/useMenuEffects';

const Dashboard = () => {
   // const logoSize = useMenuEffects();
   const navigate = useNavigate();
   
   useEffect(() => {
    
    const token = localStorage.getItem('token');


    if (token) {
      navigate('/');
    } else {
      navigate('/login');
    }

  }, []);
    return (
       
        
      
        
          
        <div className="main">
        <div className="topbar">
          <div className="toggle">
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <div className="search">
            <label>
              <input type="text" placeholder="Search here" />
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>

          <div className="user">
            <img src="assets/imgs/customer01.jpg" alt="" />
          </div>
        </div>

        <div className="cardBox">
          <div className="card">
            <div>
              <div className="numbers">1,504</div>
              <div className="cardName">Daily Views</div>
            </div>

            <div className="iconBx">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>

          <div className="card">
            <div>
              <div className="numbers">80</div>
              <div className="cardName">Sales</div>
            </div>

            <div className="iconBx">
              <ion-icon name="cart-outline"></ion-icon>
            </div>
          </div>

          <div className="card">
            <div>
              <div className="numbers">284</div>
              <div className="cardName">Comments</div>
            </div>

            <div className="iconBx">
              <ion-icon name="chatbubbles-outline"></ion-icon>
            </div>
          </div>

          <div className="card">
            <div>
              <div className="numbers">$7,842</div>
              <div className="cardName">Earning</div>
            </div>

            <div className="iconBx">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
          </div>
        </div>

        <div class="details">
                <div class="recentOrders">
                    <div class="cardHeader">
                        <h2>Recent Orders</h2>
                        <a href="#" class="btn">View All</a>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Payment</td>
                                <td>Status</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Star Refrigerator</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span class="status delivered">Delivered</span></td>
                            </tr>

                            <tr>
                                <td>Dell Laptop</td>
                                <td>$110</td>
                                <td>Due</td>
                                <td><span class="status pending">Pending</span></td>
                            </tr>

                            <tr>
                                <td>Apple Watch</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span class="status return">Return</span></td>
                            </tr>

                            <tr>
                                <td>Addidas Shoes</td>
                                <td>$620</td>
                                <td>Due</td>
                                <td><span class="status inProgress">In Progress</span></td>
                            </tr>

                            <tr>
                                <td>Star Refrigerator</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span class="status delivered">Delivered</span></td>
                            </tr>

                            <tr>
                                <td>Dell Laptop</td>
                                <td>$110</td>
                                <td>Due</td>
                                <td><span class="status pending">Pending</span></td>
                            </tr>

                            <tr>
                                <td>Apple Watch</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span class="status return">Return</span></td>
                            </tr>

                            <tr>
                                <td>Addidas Shoes</td>
                                <td>$620</td>
                                <td>Due</td>
                                <td><span class="status inProgress">In Progress</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

          <div className="recentCustomers">
            <div className="cardHeader">
              <h2>Recent Customers</h2>
            </div>

            <table>
              {/* Insert recent customers here */}
              <tr>
                            <td width="60px">
                                <div class="imgBx"><img src="assets/imgs/customer02.jpg" alt=""></img></div>
                            </td>
                            <td>
                                <h4>David <span>Italy</span></h4>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div class="imgBx"><img src="assets/imgs/customer01.jpg" alt=""></img></div>
                            </td>
                            <td>
                                <h4>Amit  <span>India</span></h4>
                            </td>
                        </tr>

            </table>
          </div>
        </div>
      </div>
          
      
    );
};

export default Dashboard;

