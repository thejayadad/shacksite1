import WalletCard from '@/components/WalletCard/WalletCard'

export async function fetchWallets(){
  const res = await fetch('http://localhost:3000/api/wallet', {cache: 'no-store'})

  return res.json()
}


export default async function Home() {
  const wallets = await fetchWallets()
  return (
    <main>
      homePage
      {wallets?.length > 0
      ? wallets.map((wallet) => (
        <WalletCard key={wallet._id} wallet={wallet} />

      )) : <h3 className='text-center'>Wallets are loading</h3>
      }
    </main>
  )
}
