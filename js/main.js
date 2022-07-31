// Selects the image at n position
function select(n) {
  if (n != null) {
    var arr = document.getElementsByClassName("thumb-img");
    for (let i = 0; i < arr.length; i++) {
      arr[i].classList.remove("selected");
      arr[i].classList.remove("hover-disabled");
    }
    arr[n].classList.add("selected");
    arr[n].classList.add("hover-disabled");
    showMain(n);
  }
}

// Lightbox: selects the image at n position
function lb_select(n) {
  if (n != null) {
    var lb_arr = document.getElementsByClassName("lb-thumb-img");
    for (let i = 0; i < lb_arr.length; i++) {
      lb_arr[i].classList.remove("selected");
      lb_arr[i].classList.remove("hover-disabled");
    }
    lb_arr[n].classList.add("selected");
    lb_arr[n].classList.add("hover-disabled");
    lb_showMain(n);
  }
}

// Shows the main image based on the given n number
function showMain(n) {
  if (n != null) {
    var image = document.getElementById("main-img");
    var pos = n + 1;
    image.src = "images/images-main/image-product-" + pos + ".jpg";
  }
}

// Lightbox: shows the main image based on the given n number
function lb_showMain(n) {
  if (n != null) {
    var lb_image = document.getElementById("lb-img");
    var pos = n + 1;
    lb_image.src = "images/images-main/image-product-" + pos + ".jpg";
  }
}

// Hides/closes the lightbox 
function lb_close() {
  hide("lightbox");
}

// Shows the lightbox
function lb_open() {
  show("lightbox");
  var pos = getPos("selected", document.getElementsByClassName("thumb-img"));
  lb_showMain(pos);
  lb_select(pos);
}

// Lightbox: updates the images when any previous/next image command is called
function move(direction) {
  var array = document.getElementsByClassName("lb-thumb-img");
  for (let i = 0; i < array.length; i++) {
    if (array[i].classList.contains("selected")) var pos = i;
  }
  switch (direction) {
    case "prev":
      if (pos == 0) lb_select(array.length - 1);
      else lb_select(pos - 1);
      break;
    case "next":
      if (pos == array.length - 1) lb_select(0);
      else lb_select(pos + 1);
      break;
    default:
      break;
  }
}

// Updates the amount's counter when the minus/plus buttons are pressed
function amount(op) {
  var amount = document.getElementById("amount");
  var current = parseInt(amount.textContent);
  switch (op) {
    case "minus":
      if (current > 0) {
        current -= 1;
        amount.innerHTML = current;
      }
      break;
    case "plus":
      if (current < Number.MAX_SAFE_INTEGER) {
        current += 1;
        amount.innerHTML = current;
      }
      break;
    default:
      break;
  }
  updateAddtocart();
}

// Called when the top-cart button is pressed, shows/hides it
function cart() {
  var cart = "cart-card";
  var cart_elem = document.getElementById(cart);
  if (cart_elem.classList.contains("hidden")) {
    show(cart);
    document.getElementById("top-cart").classList.add("dark");
  } else {
    hide(cart);
    document.getElementById("top-cart").classList.remove("dark");
  }
}
cart();

// Pushes the products in the cart by their amount, updates the cart, addtocart button, counter
var cart_elems = [];
function addtocart(elem) {
  var count = parseInt(document.getElementById("amount").textContent);
  switch (elem) {
    case "FLES":
      for (let i = 1; i <= count; i++) {
        cart_elems.push(fles);
      }
      updateCart();
      updateAddtocart();
      updateCounter();
      break;
    default:
      break;
  }
}

// Updates the 'addtocart' button whenever the minus/plus buttons are pressed, disabling it when count is 0
function updateAddtocart() {
  var count = document.getElementById("amount").textContent;
  if (count < 1) {
    add("hover-disabled", "addtocart");
    add("hover-disabled", "icon-minus");
  } else {
    remove("hover-disabled", "addtocart");
    remove("hover-disabled", "icon-minus");
  }
}
updateAddtocart();

// Updates the cart-card section by checking the amount of the products added in the cart
function updateCart() {
  var cart = document.getElementById("cart-content");
  if (cart_elems.length > 0) {
    cart.innerHTML = "";
    cart.innerHTML = addProds(cart_elems);
    show("cart-checkout");
  } else {
    cart.innerHTML = "";
    cart.innerHTML = "<div class='cart-empty'>Your cart is empty</div>";
    hide("cart-checkout");
  }
  document.getElementById("amount").innerHTML = 0;
}
updateCart();

// Returns an array of the products grouped by their ID
function groupProds(arr) {
  const resultArr = arr.reduce(
    (item, index) => {
      if (typeof item.last === "undefined" || item.last !== index) {
        item.last = index;
        item.arr.push([]);
      }
      item.arr[item.arr.length - 1].push(index);
      return item;
    },
    { arr: [] }
  ).arr;
  return resultArr;
}

/*debug*/
function manualPush(product) {
  cart_elems.push(product);
}

// Returns an HTML template containing all the added products, grouped by their ID
// prettier-ignore
function addProds(arr) {
  var code = "";
  var grouped_arr = groupProds(arr);
  for (let i = 0; i < grouped_arr.length; i++) {
    var prod = grouped_arr[i][0];
    var length = grouped_arr[i].length;
    code +=
      '<div class="cart-item">' +
        '<div class="item-left">' + 
          '<div class="div-item-thumb">' + 
            '<img class="img-item" src="'+prod.image+'" alt="">' + 
          '</div>' + 
        '</div>' +
        '<div class="item-middle">' +
          '<div class="item-middle-top">'+prod.title+'</div>' +
          '<div class="item-middle-bottom">'+'$'+prod.price.toFixed(2)+' x '+ length +
            '<div class="total">' +
              '&nbsp; $'+(prod.price * length).toFixed(2) + 
            '</div>' + 
          '</div>' + 
        '</div>' +
        '<div class="item-right">' +
          '<img src="images/icon-delete.svg" class="btn item-bin">' +
        '</div>' + 
      '</div>';
  }
  return code;
}

class Product {
  constructor(id, title, price) {
    this.id = id;
    this.image =
      "images/images-thumb/image-product-" + getImageN(id) + "-thumbnail.jpg";
    this.title = title;
    this.price = price;
  }
}
const fles = new Product("FLES", "Fall Limited Edition Sneakers", 125);
const yang = new Product("YANG", "yangomango", 123);

// Returns the number of the image based on the id
function getImageN(id) {
  switch (id) {
    case "FLES":
      return 1;
    case "YANG":
      return 2;
    default:
      return "empty";
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    lb_close();
  }
  if (event.key === "ArrowLeft") {
    move("prev");
  }
  if (event.key === "ArrowRight") {
    move("next");
  }
});

// To check if a string is a JSON
function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

// Updates the counter over the top-cart button, called when adding products in the cart
function updateCounter() {
  var amount = cart_elems.length;
  var counter = document.getElementById("counter");
  if (amount > 0) {
    counter.innerHTML = amount;
    counter.style.setProperty("display", "flex", "important");
  } else {
    counter.style.setProperty("display", "none", "important");
  }
}
updateCounter();
