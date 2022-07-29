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
  // console.log(amount + current);
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
  switch (elem) {
    case "FLES":
      cart_elems.push(fles);
      // console.log(cart_elems);
      updateCart();
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
    // console.log("adding");
  } else {
    remove("hover-disabled", "addtocart");
    // console.log("removing");
  }
}
updateAddtocart();

function updateCart() {
  // var count = document.getElementById("amount");
  var cart = document.getElementById("cart-content");
  if (cart_elems.length > 0) {
    console.log(cart_elems.length);
    cart.innerHTML = "";
    cart.innerHTML = addProds(cart_elems);
  }
}
function addProds(arr) {
  var code = "";
  arr.forEach((element) => {
    code +=
      '<div class="item"> <div class="div-item-thumb"><img src="' +
      element.image +
      '" alt=""></div> </div>';
  });
  return code;
}

class Product {
  constructor(id, title, price) {
    this.id = id;
    this.image = "images/images-thumb/image-product-" + getImageN(id) + "-thumbnail.jpg";
    this.title = title;
    this.price = price;
  }
}
const fles = new Product("FLES", "Fall Limited Edition Sneakers", 125);

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
