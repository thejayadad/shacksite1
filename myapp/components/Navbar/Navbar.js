'use client'

import Link from 'next/link'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useSelector } from 'react-redux'


const Navbar = () => {
    const { data: session } = useSession()
    const wallets = useSelector((state) => state.cart.wallets)
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
                      <button onClick={() => {signOut()}}>Logout</button>
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