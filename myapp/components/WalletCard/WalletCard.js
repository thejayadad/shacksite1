
import Link from 'next/link'
import React from 'react'

const WalletCard = ({wallet: {title, desc, imageUrl, _id}}) => {
  return (
   <Link
    href={`/wallet/${_id}`}
   >
    <img 
    src={imageUrl}
    alt={title}
    />
    <h3>{title}</h3>
   </Link>
  )
}

export default WalletCard