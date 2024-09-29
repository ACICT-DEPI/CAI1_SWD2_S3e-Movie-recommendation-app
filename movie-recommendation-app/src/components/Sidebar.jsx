import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>MOVI</h2>
      </div>
      <nav>
        <ul>
          <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
          <li><Link to="/favourites"><i className="fas fa-heart"></i> Favourites</Link></li>
          <li><Link to="/trending"><i className="fas fa-fire"></i> Trending</Link></li>
          <li><Link to="/coming-soon"><i className="fas fa-clock"></i> Coming Soon</Link></li>
          <div className="spaced-section"></div>
          <li><Link to="/watch-list"><i className="fas fa-list"></i> Watch List</Link></li>
          <li><Link to="/social"><i className="fas fa-share-alt"></i> Social</Link></li>
          <div className="spaced-section"></div>
          <li><Link to="/settings"><i className="fas fa-cog"></i> Settings</Link></li>
          <li><Link to="/logout"><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
