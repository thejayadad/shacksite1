'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addWallet } from '@/redux/cartSlice';
import { useDispatch } from 'react-redux';

const WalletDetail = (ctx) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    // Define a function to fetch the individual wallet by ID
    const fetchWallet = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/wallet/${ctx.params.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch wallet');
        }

        const walletData = await response.json();
        setWallet(walletData);
      } catch (error) {
        console.error('Error fetching wallet:', error);
      }
    };

    fetchWallet();
  }, [ctx.params.id]);

  const handleAddToCart = () => {
    if (wallet) {
      dispatch(
        addWallet({
          ...wallet,
          quantity: 1,
        })
      );
    }
  };

  return (
    <section>
      <h2>Wallet Detail</h2>
      {wallet ? (
        <div>
          <h3>Wallet Name: {wallet.title}</h3>
          <p>Balance: {wallet.desc}</p>
          <p>Price: {wallet.price}</p>
          <button onClick={handleAddToCart}>Add To Cart</button>
        </div>
      ) : (
        <p>Loading wallet details...</p>
      )}
      <Link href="/wallets">Back to Wallets</Link>
    </section>
  );
};

export default WalletDetail;
