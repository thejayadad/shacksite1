import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wallets: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addWallet: (state, action) => {
            const wallet = state.wallets.find((wallet) => wallet.id === action.payload.id)

            if (wallet) {
                wallet.quantity = action.payload.quantity
            } else {
                state.wallets.push(action.payload)
            }
        },
        removeWallet: (state, action) => {
            state.wallets = state.wallets.filter((wallet) => wallet.id !== action.payload.id)
        }
    }
})

export const { addWallet, removeWallet } = cartSlice.actions

export default cartSlice.reducer