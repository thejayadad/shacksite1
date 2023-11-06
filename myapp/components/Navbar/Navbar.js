'use client'

import Link from 'next/link'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { AiOutlineShoppingCart } from 'react-icons/ai'


const Navbar = () => {
    const { data: session } = useSession()
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
                    <div className='flex gap-2'>
                      <button onClick={() => {signOut()}}>Logout</button>
                      <Link href='/create-blog'>Create</Link>
                    </div>
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