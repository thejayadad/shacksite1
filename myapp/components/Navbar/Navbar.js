'use client'

import Link from 'next/link'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '@/redux/cartSlice'; // Import the clearCart action



const Navbar = () => {
    const { data: session } = useSession()
    const wallets = useSelector((state) => state.cart.wallets)
    const dispatch = useDispatch();

    const handleClearCart = () => {
      // Dispatch the action to clear the cart
      dispatch(clearCart());
    };
  
  return (
    <header className='px-4 py-12'>
        <div className='max-w-screen-xl mx-auto flex justify-between'>
            <Link href={'/'}>Cookies</Link>
            <div className='flex gap-2'>
            {
            session?.user
              ? (
                <div>
                  { (
                    <>
                    <div className='flex gap-2'>
                     <Link
                     href={'/cart'}
                     >
                    <span>{wallets?.length}</span>
                    <AiOutlineShoppingCart />
                     </Link>
                     <button
                      onClick={() => {
                        signOut();
                        handleClearCart();
                      }}
                    >
                      Logout
                    </button>
                    </div>
                    </>
                  )}
                </div>
              )
              : (
                <>
                  <Link href='/login'>Login</Link>
                  <Link href='/register'>Register</Link>
                </>
              )
          }
            </div>
        </div>
    </header>
  )
}

export default Navbar