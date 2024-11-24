import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { removeFromCart, clearCart,updateCartItemCount, loadCartFromLocalStorage } from '../../redux/cartAction';
import Button from './Button';
import './CartPage.css';

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadCartFromLocalStorage());
    }, [dispatch]);

    useEffect(() => {
        console.log('Updated cart items in CartPage:', cartItems);
    }, [cartItems]);
    

    const handleRemove = (id,selectedSize,selectedType, category) => {
        dispatch(removeFromCart(id,selectedSize,selectedType ,category));
    };

    const handleUpdateCount = (id, category,selectedSize ,selectedType, newCount) => {
        console.log('Updating count for:', { id, category, selectedSize, selectedType, newCount });
        if (newCount > 0) {
            dispatch(updateCartItemCount(id, category ,selectedSize,selectedType, newCount));
        } else {
            handleRemove(id,category,selectedSize,selectedType); 
        }
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.count;
        }, 0).toFixed(2);
    };
    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <>
                <p className="empty-cart-message"> Try to add smth into the cart<br/> | <br/> |<br/> V </p>
                <button className="back-button" onClick={() => navigate("/services")}>Catalog</button>
                </>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={`${item.id}-${item.category}`} className="cart-item">
                                <img src={`/images/${item.image}`} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4 className="cart-item-name">{item.name}</h4>
                                    <p className="cart-item-color">Category: {item.category}</p>
                                    <p className="cart-item-size">Size: {item.selectedSize}</p>
                                    <p className="cart-item-size">Type: {item.selectedType}</p>
                                    <p className="cart-item-price">Price per item: ${item.price.toFixed(2)}</p>
                                    <div className="cart-item-quantity">
                                        <button
                                            className="quantity-button"
                                            onClick={() =>
                                                handleUpdateCount(item.id, item.category, item.selectedSize, item.selectedType, item.count - 1)
                                            }
                                        >
                                            -
                                        </button>
                                        <span>{item.count}</span>
                                        <button
                                            className="quantity-button"
                                            onClick={() =>
                                                handleUpdateCount(item.id, item.category, item.selectedSize, item.selectedType, item.count + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="cart-item-total">
                                        Total: ${(item.price * item.count).toFixed(2)}
                                    </p>
                                    <Button
                                        className="remove-button"
                                        onClick={() => handleRemove(item.id,item.selectedSize,item.selectedType ,item.category)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Cart Summary</h3>
                        <p>Total Price: ${getTotalPrice()}</p>
                        <Button className="clear-cart-button" onClick={handleClearCart}>
                            Clear Cart
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};


export default CartPage;