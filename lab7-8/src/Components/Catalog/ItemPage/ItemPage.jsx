import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItemById } from '../../../server/api';
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../../../redux/cartAction'; 
import './ItemPage.css';

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedType, setSelectedType] = useState('')

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [displayedPrice, setDisplayedPrice] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetchItemById(id);
      setItem(response.data);
      setDisplayedPrice(response.data.price); 
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (item) {
      setDisplayedPrice(item.price * count);
    }
  }, [count, item]);

  const handleAddToCart = () => {
    
    if (!selectedSize && !selectedType) {
      alert('Please select size and type');
      return;
  }

    const itemWithCount = { ...item, selectedSize, selectedType ,count };
    dispatch(addToCart(itemWithCount));
    navigate('/CartPage');
  };

  if (loading) return <p>Loading...</p>; 
  if (!item) return <p>Item not found</p>; 

  return (
    <div className="item-page">
      <div className="item-image-container">
        <img src={`/images/${item.image}`} alt={item.name} className="catalog-item-image" />
        <p className="price">Price: ${displayedPrice.toFixed(2)}</p>
      </div>
      <div className="item-details">
        <h1>{item.name}</h1>
        Size: 
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
              <option value="">Select size</option>
              {Array.isArray(item.sizes) && item.sizes.map((size, index) => (
                <option key={index} value={size}>{size}</option>
              ))}
            </select>
            Type: 
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="">Select type</option>
              {Array.isArray(item.types) && item.types.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
        <p className="description">{item.description}</p>
        <div className="countable-field">
          <label>Count</label>
          <input 
            type="number" 
            value={count} 
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value, 10) || 1))} 
          />
        </div>
        <div className="button-container">
          <button className="back-button" onClick={() => navigate(-1)}>Go back</button>
          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
