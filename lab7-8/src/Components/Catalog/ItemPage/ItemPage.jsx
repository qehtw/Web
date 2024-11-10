import React, { useContext , useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allGrocieries } from '../../../allGrocieries/allGrocieries';
import './ItemPage.css';

const ItemPage = () => {
  const { id } = useParams();
  const { items } = useContext(allGrocieries);
  const navigate = useNavigate();

  const item = items.find(item => item.id === parseInt(id));
  if (!item) return <p>Item not found</p>;

  return (
    <div className="item-page">
      <div className="item-image-container">
        <img src={item.image} alt={item.name} className="item-image" />
        <p className="price">Price: ${item.price.toFixed(2)}</p>
      </div>
      <div className="item-details">
        <h1>{item.className}</h1>
        <p className="description">{item.description}</p>
        <div className="button-container">
          <button className="back-button" onClick={() => navigate(-1)}>Go back</button>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;





