import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  actions: {
    addToCart(product) {
      const existingItem = this.cartItems.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.cartItems.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.id !== productId)
    },
    updateQuantity(productId, quantity) {
      const item = this.cartItems.find(item => item.id === productId)
      if (item && quantity > 0) {
        item.quantity = quantity
      } else if (item && quantity <= 0) {
        this.removeFromCart(productId)
      }
    },
    clearCart() {
      this.cartItems = []
    },
  },
  getters: {
    cartItemCount: (state) => state.cartItems.reduce((total, item) => total + item.quantity, 0),
    cartTotal: (state) => state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
  },
})