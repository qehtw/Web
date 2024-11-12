import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItems } from '../../../server/api'; // Ensure this is a function that fetches data from the backend
import './ItemPage.css';

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setGroceries] = useState([]); // State to store the items
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // State to track quantity

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetchItems();
        setGroceries(response.data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  if (loading) return <p>Loading...</p>;

  const item = items.find(item => item.id === parseInt(id));
  if (!item) return <p>Item not found</p>;

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    if(e.target.value < 0 ) setQuantity('')
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
