import db from "@/lib/db";
import Wallet from "@/models/Wallet";


export async function GET(req){
    await db.connect()

    try {
        const wallets = await Wallet.find({})
        return new Response(JSON.stringify(wallets), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500})
        
    }
}


export async function POST(req) {
    await db.connect()

    try {
        const body = await req.json()
        const newWallet = await Wallet.create(body)

        return new Response(JSON.stringify(newWallet), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}