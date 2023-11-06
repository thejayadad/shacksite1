import db from "@/lib/db";
import Wallet from "@/models/Wallet";

export async function GET(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const wallet = await Wallet.findById(id)

        return new Response(JSON.stringify(wallet), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}