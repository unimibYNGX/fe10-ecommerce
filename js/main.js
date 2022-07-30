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
  return false;
}

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
  return false;
}

function getPos(attribute, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].classList.contains(attribute)) return i;
  }
  return -1;
}

function showMain(n) {
  if (n != null) {
    var image = document.getElementById("main-img");
    var pos = n + 1;
    image.src = "images/images-main/image-product-" + pos + ".jpg";
  }
}
function lb_showMain(n) {
  if (n != null) {
    var lb_image = document.getElementById("lb-img");
    var pos = n + 1;
    lb_image.src = "images/images-main/image-product-" + pos + ".jpg";
  }
}

function lb_close() {
  hide("lightbox");
}
function lb_open() {
  show("lightbox");
  var pos = getPos("selected", document.getElementsByClassName("thumb-img"));
  lb_showMain(pos);
  lb_select(pos);
}

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

function amount(op) {
  var amount = document.getElementById("amount");
  var current = parseInt(amount.textContent);
  switch (op) {
    case "minus":
      if (current > 0) {
        current -= 1;
        amount.innerHTML = current;
        updateAddtocart();
      }
      break;
    case "plus":
      if (current < Number.MAX_SAFE_INTEGER) {
        current += 1;
        amount.innerHTML = current;
        updateAddtocart();
      }
      break;
    default:
      break;
  }
}

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

function updateAddtocart() {
  var btn = document.getElementById("addtocart");
  var count = document.getElementById("amount").textContent;
  if (count < 1) {
    add("hover-disabled", "addtocart");
  } else {
    remove("hover-disabled", "addtocart");
  }
}
updateAddtocart();

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

function addProds(arr) {
  var code = "";
  var grouped_arr = groupProds(arr);
  for (let i = 0; i < grouped_arr.length; i++) {
    var prod = grouped_arr[i][0];
    code +=
      '<div class="cart-item">' +
      '<div class="item-left"><div class="div-item-thumb"><img class="img-item" src="' +
      prod.image +
      '" alt=""></div></div>' +
      '<div class="item-middle">' +
      '<div class="item-middle-top">' +
      prod.title +
      "</div>" +
      '<div class="item-middle-bottom">' +
      "$" +
      prod.price.toFixed(2) +
      " x " +
      grouped_arr[i].length +
      " <div class='total'>" +
      "&nbsp; $" +
      (prod.price * grouped_arr[i].length).toFixed(2) +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="item-right">' +
      '<img src="images/icon-delete.svg" class="btn item-bin">' +
      "</div></div>";
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

function getImageN(id) {
  switch (id) {
    case "FLES":
      return 1;
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

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

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
