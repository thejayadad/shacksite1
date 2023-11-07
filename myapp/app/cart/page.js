'use client'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeWallet, clearCart } from '@/redux/cartSlice';
import { loadStripe } from '@stripe/stripe-js'


const Cart = () => {
  const { wallets } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  const handleRemoveWallet = (wallet) => {
    dispatch(removeWallet({ id: wallet?.id }));
  };

  console.log('Wallets in Redux state:', wallets);

  const totalPrice = () => {
    return wallets.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  console.log('Total Price:', totalPrice());
  const handleClearCart = () => {
    dispatch(clearCart());
  };


  const handleCheckout = async () => {
    const lineItems = wallets.map((wallet) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: wallet.title
                },
                unit_amount: wallet.price * 100
            },
            quantity: wallet.quantity
        }
    })

    const res = await fetch("http://localhost:3000/api/checkout", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(lineItems)
    })

    const data = await res.json()

    const stripe = await stripePromise
    handleClearCart();

    await stripe.redirectToCheckout({ sessionId: data.id })

}


  return (
    <section className='px-4 py-8'>
      <div className='max-w-screen-xl mx-auto'>
        <h2>Your Cart</h2>
        <ul>
          {wallets.map((wallet) => (
            <li key={wallet.id}>
              {wallet.title} - ${wallet.price} x {wallet.quantity}
              <button onClick={() => handleRemoveWallet(wallet)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total Price: ${totalPrice().toFixed(2)}</p>
        <span onClick={handleCheckout} disabled={wallets?.length === 0}>Order</span>
      </div>
    </section>
  );
};

export default Cart;
