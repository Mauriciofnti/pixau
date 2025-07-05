<template>
  <div class="cart-container">
    <h1>Carrinho de Compras</h1>
    <div v-if="cartItems.length === 0">
      <p>Seu carrinho está vazio.</p>
    </div>
    <div v-else>
      <div class="cart-item" v-for="item in cartItems" :key="item.id">
        <img :src="item.image" :alt="item.name" class="cart-item-image" />
        <div class="cart-item-details">
          <h3>{{ item.name }}</h3>
          <p>Preço: R${{ item.price.toFixed(2) }}</p>
          <div class="quantity-control">
            <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
          </div>
          <button class="remove-btn" @click="removeFromCart(item.id)">Remover</button>
        </div>
      </div>
      <div class="cart-summary">
        <p>Total de Itens: {{ cartItemCount }}</p>
        <p>Total: R${{ cartTotal.toFixed(2) }}</p>
        <button class="clear-cart-btn" @click="clearCart">Limpar Carrinho</button>
      </div>
    </div>
    <RouterLink to="/monitores">Continuar Comprando</RouterLink>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const { cartItems, cartItemCount, cartTotal } = cartStore
const { removeFromCart, updateQuantity, clearCart } = cartStore
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.cart-item-image {
  width: 100px;
  height: auto;
  margin-right: 20px;
}

.cart-item-details {
  flex-grow: 1;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.quantity-control button {
  padding: 5px 10px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
}

.remove-btn {
  background: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.cart-summary {
  margin-top: 20px;
  text-align: right;
}

.clear-cart-btn {
  background: #ff4444;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
}

a {
  display: inline-block;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
}
</style>