import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItemById } from '../../../server/api';
import './ItemPage.css';

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null); // State for a single item
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const response = await fetchItemById(id);
        setItem(response.data);
      } catch (error) {
        console.error("Failed to fetch item:", error);
      } finally {
        setLoading(false);
      }
    };
    loadItem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found</p>;

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };
  const totalPrice = (item.price * quantity).toFixed(2);

  return (
    <div className="item-page">
      <div className="item-image-container">
        <p className="price">Price: ${totalPrice}</p>
        <img src={`/images/${item.image}`} alt={item.name} className="catalog-item-image" />
      </div>
      <div className="item-details">
        <h1>{item.name}</h1>
        <p className="description">{item.description}</p>
        <div className="countable-field">
          <label>Count</label>
          <input 
            type="number" 
            value={quantity} 
            onChange={handleQuantityChange} 
            min="1" 
          />
        </div>
        <div className="button-container">
          <button className="back-button" onClick={() => navigate(-1)}>Go back</button>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
