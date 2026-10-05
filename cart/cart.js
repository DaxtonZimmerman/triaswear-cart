let cart = JSON.parse(localStorage.getItem("triaswearCart")) || [];

function saveCart() {
  localStorage.setItem("triaswearCart", JSON.stringify(cart));
}

export function getCart() {
  return cart;
}

export function addToCart(productId) {
  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }

  saveCart();
}

export function updateQuantity(productId, amount) {
  const item = cart.find(item => item.productId === productId);

  if (!item) {
    return;
  }

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
}

export function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);

  saveCart();
}

export function getCartQuantity() {
  let totalQuantity = 0;

  cart.forEach(item => {
    totalQuantity += item.quantity;
  });

  return totalQuantity;
}