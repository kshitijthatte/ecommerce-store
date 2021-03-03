export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    const ifFound = cart.findIndex((product) => product._id === item._id);
    if (ifFound === -1) {
      cart.push({
        ...item,
        count: 1,
      });
    } else {
      console.log(cart[ifFound]);
      cart[ifFound] = { ...cart[ifFound], count: cart[ifFound].count + 1 };
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const changeCountInCart = (productId, change = "+") => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, index) => {
      if (product._id === productId) {
        if (change === "-") {
          if (product.count > 1) {
            product.count -= 1;
          }
        } else {
          product.count += 1;
        }
      }
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

export const removeItemFromCart = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, index) => {
      if (product._id === productId) {
        cart.splice(index, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const cartEmpty = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const getAmount = () => {
  let cart = [];
  let amount = 0;
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product) => {
      amount = amount + product.price * product.count;
    });
  }
  return amount;
};
