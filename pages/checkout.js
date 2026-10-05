import { products } from "../data/products.js";

import { getCart, updateQuantity, removeFromCart } from "../cart/cart.js";

import { renderHeader, updateCartCount } from "../components/header.js";

renderHeader();

const checkoutItems = document.querySelector("#checkout-items");

const itemsTotalElement = document.querySelector("#items-total");
const shippingElement = document.querySelector("#shipping");
const orderTotalElement = document.querySelector("#order-total");

function renderCheckout() {
  const cart = getCart();

  checkoutItems.innerHTML = "";

  if (cart.length === 0) {
    checkoutItems.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty.</h2>
        <a href="index.html">SHOP TRIASWEAR</a>
      </div>
    `;

    updateTotals();
    updateCartCount();

    return;
  }

  cart.forEach((cartItem) => {
    const product = products.find(
      (product) => product.id === cartItem.productId
    );

    if (!product) {
      return;
    }

    const subtotal = product.price * cartItem.quantity;

    const cartItemElement = document.createElement("div");

    cartItemElement.classList.add("checkout-item");

    cartItemElement.innerHTML = `
      <img
  src="${product.image}"
  alt="${product.name}"
  class="checkout-image"
>

      <div class="checkout-product-info">

        <h2>${product.name}</h2>

        <p>$${product.price.toFixed(2)}</p>

        <div class="quantity-controls">

          <button
            class="decrease"
            data-id="${product.id}"
          >
            -
          </button>

          <span>${cartItem.quantity}</span>

          <button
            class="increase"
            data-id="${product.id}"
          >
            +
          </button>

        </div>

        <button
          class="remove"
          data-id="${product.id}"
        >
          REMOVE
        </button>

      </div>

      <div class="subtotal">
        $${subtotal.toFixed(2)}
      </div>
    `;

    checkoutItems.appendChild(cartItemElement);
  });

  addCheckoutEvents();

  updateTotals();

  updateCartCount();
}

function addCheckoutEvents() {
  const increaseButtons = document.querySelectorAll(".increase");

  increaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);

      updateQuantity(productId, 1);

      renderCheckout();
    });
  });

  const decreaseButtons = document.querySelectorAll(".decrease");

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);

      updateQuantity(productId, -1);

      renderCheckout();
    });
  });

  const removeButtons = document.querySelectorAll(".remove");

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);

      removeFromCart(productId);

      renderCheckout();
    });
  });
}

function updateTotals() {
  const cart = getCart();

  let itemsTotal = 0;

  cart.forEach((cartItem) => {
    const product = products.find(
      (product) => product.id === cartItem.productId
    );

    if (product) {
      itemsTotal += product.price * cartItem.quantity;
    }
  });

  let shipping = 4.99;

  if (itemsTotal >= 70 || itemsTotal === 0) {
    shipping = 0;
  }

  const orderTotal = itemsTotal + shipping;

  itemsTotalElement.textContent = `$${itemsTotal.toFixed(2)}`;

  shippingElement.textContent =
    shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;

  orderTotalElement.textContent = `$${orderTotal.toFixed(2)}`;
}

renderCheckout();
