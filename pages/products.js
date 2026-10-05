import { products } from "../data/products.js";

import {
  addToCart
} from "../cart/cart.js";

import {
  renderHeader,
  updateCartCount
} from "../components/header.js";

renderHeader();

const productsContainer = document.querySelector("#products");

function renderProducts() {
  productsContainer.innerHTML = "";

  products.forEach(product => {
    const productCard = document.createElement("div");

    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img
  src="${product.image}"
  alt="${product.name}"
  class="product-image"
>

      <div class="product-info">
        <p class="product-category">${product.category}</p>

        <h3>${product.name}</h3>

        <p class="product-price">
          $${product.price.toFixed(2)}
        </p>

        <button data-id="${product.id}">
          ADD TO CART
        </button>
      </div>
    `;

    productsContainer.appendChild(productCard);
  });

  const buttons = document.querySelectorAll(".product-card button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);

      addToCart(productId);

      updateCartCount();

      button.textContent = "ADDED";

      setTimeout(() => {
        button.textContent = "ADD TO CART";
      }, 800);
    });
  });
}

renderProducts();