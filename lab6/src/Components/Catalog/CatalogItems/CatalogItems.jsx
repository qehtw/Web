import React from 'react';
import { Link } from 'react-router-dom';
import '../CatalogItems/CatalogItems.css'

const CatalogItem = ({ id, name, price, description, image }) => {
  return (
    <div className="catalog-item">
      <img src={image} alt={name} className="catalog-item-image" />
      <p>{name}</p>
      <p className="catalog-price">Price: ${price}</p>
      <Link to={`/item/${id}`} className="catalog-view-more">Нажміть на мене</Link>
    </div>
  );
};

export default CatalogItem;