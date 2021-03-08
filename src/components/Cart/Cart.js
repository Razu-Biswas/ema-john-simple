import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    //use reduce
    // const total = cart.reduce((total, prd) => total + prd.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div className="cart-container">
            <h4 className="text-danger">Order Summary</h4>
            <p>Items Ordered :  {cart.reduce((total, quantity) => total + quantity.quantity,0)}</p>
            <p>Product Price: $ {formatNumber(total)}</p>
            <p><small>Shipping Cost: $ {shipping}</small></p>
            <p><small>Tax(10%) : $ {tax}</small></p>
            {/* <p>Total Price: ${total + shipping + Number(tax)}</p> */}
            <p>Total Price: $ {grandTotal}</p>
            <br />
                {
                    props.children
                }
            {/* <button className="review-button">Review Order</button> */}

        </div>
    );
};

export default Cart;