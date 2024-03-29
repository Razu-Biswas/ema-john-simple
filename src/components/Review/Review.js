import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory()

    const handleProceedCheckout = () => {
        history.push('shipment')
    }

    const removeProduct = (productKey) => {

        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }


    useEffect(() => {
        //Cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);


        const cartProducts = productKeys.map(key => {
            // savedCart[key]
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });

        setCart(cartProducts);
    }, []);
    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={happyImage} alt="" />
    }
    return (
        <div className="twin-container d-flex">
            <div className="product-container">
                <div>
                    {
                        cart.map(pd => <ReviewItem
                            key={pd.key}
                            removeProduct={removeProduct}
                            product={pd}></ReviewItem>)
                    }
                    {
                        thankyou
                    }
                </div>

            </div>
            <div className="cart-container">
                    <Cart cart={cart}>
                        <button onClick={handleProceedCheckout}
                            className="review-button"
                        >
                            Proceed Checkout

                            </button>
                    </Cart>
                </div>
        </div>
    );
};

export default Review;