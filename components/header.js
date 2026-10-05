import { getCartQuantity } from "../cart/cart.js";

export function renderHeader() {
  const header = document.querySelector("#header");

  header.innerHTML = `
    <header class="site-header">
      <a href="index.html" class="logo">TRIASWEAR</a>

      <nav>
        <a href="index.html">SHOP</a>

        <a href="checkout.html">
          CART (<span id="cart-count">${getCartQuantity()}</span>)
        </a>
      </nav>
    </header>
  `;
}

export function updateCartCount() {
  const cartCount = document.querySelector("#cart-count");

  if (cartCount) {
    cartCount.textContent = getCartQuantity();
  }
}