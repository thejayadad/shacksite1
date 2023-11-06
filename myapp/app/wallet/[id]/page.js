'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Replace 'next/navigation' with 'next/router'
import Link from 'next/link';

const WalletDetail = (ctx) => {
  const router = useRouter();

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

    // Call the fetchWallet function when the component mounts
    fetchWallet();
  }, [ctx.params.id]);

  return (
    <section>
      <h2>Wallet Detail</h2>
      {wallet ? (
        <div>
          <h3>Wallet Name: {wallet.title}</h3>
          <p>Balance: {wallet.desc}</p>
          <p>Balance: {wallet.price}</p>

        </div>
      ) : (
        <p>Loading wallet details...</p>
      )}
      <Link href="/wallets">Back to Wallets</Link>
    </section>
  );
};

export default WalletDetail;
