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

// Shows the lightbox, doesn't show when in mobile mode
function lb_open() {
  if (deviceState == "desktop") {
    console.log("opened lb");
    show("lightbox");
    var pos = getPos("selected", document.getElementsByClassName("thumb-img"));
    lb_showMain(pos);
    lb_select(pos);
  }
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
var pos = 0;
function mobileMove(direction) {
  var array = document.getElementsByClassName("thumb-img");
  // console.log("current pos" + pos + ", going " + direction);
  switch (direction) {
    case "prev":
      if (pos == 0) {
        pos = array.length - 1;
        showMain(pos);
      } else {
        pos -= 1;
        showMain(pos);
      }
      break;
    case "next":
      if (pos == array.length - 1) {
        pos = 0;
        showMain(pos);
      } else {
        pos += 1;
        showMain(pos);
      }
      break;
    default:
      break;
  }
  // console.log("pos at " + pos);
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
var cart_open = false;
function cart() {
  var cart = "cart-card";
  var cart_elem = document.getElementById(cart);
  if (cart_elem.classList.contains("hidden")) {
    cart_open = true;
    show(cart);
    document.getElementById("img-cart").classList.add("dark");
    console.log("opening cart");
  } else {
    cart_open = false;
    hide(cart);
    document.getElementById("img-cart").classList.remove("dark");
    console.log("closing cart");
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
  updateCart();
  updateAddtocart();
  updateCounter();
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
          '<img src="images/icon-delete.svg" id="item-bin" class="btn item-bin" onclick="removeItem(`' + prod.id + '`)">' +
        '</div>' + 
      '</div>';
  }
  return code;
}

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
  document.getElementById("amount").innerHTML = 1;
}
updateCart();

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

/* var firstclick = true;
window.addEventListener("click", function (e) {
  console.clear();
  console.log("fc: " + firstclick);
  var cart = "cart-card";
  if (cart_open) {
    if (!this.document.getElementById(cart).contains(e.target)) {
      if (firstclick) {
        console.log("clicked in1");
        firstclick = false;
      } else {
        var bin = this.document.getElementById("item-bin");
        if (bin == null) {
          console.log("clicked out1");
          cart_open = false;
          hide(cart);
          document.getElementById("top-cart").classList.remove("dark");
          firstclick = true;
        } else {
          if (!this.document.getElementById("item-bin").contains(e.target)) {
            console.log("clicked out2");
            cart_open = false;
            hide(cart);
            document.getElementById("top-cart").classList.remove("dark");
            firstclick = true;
          }
        }
      }
    } else {
      console.log("clicked in2");
    }
  }
  console.log("cart: " + cart_open);
  updateCart2();
});
function updateCart2() {
  if (document.getElementById("cart-card").classList.contains("hidden")) {
    cart_open = false;
  } else {
    cart_open = true;
  }
} */

// Removes the correspondent item in the cart by 1
function removeItem(id) {
  console.log(cart_elems);
  for (let i = 0; i < cart_elems.length; i++) {
    if (cart_elems[i].id == id) {
      cart_elems.splice(i, 1);
      break;
    }
  }
  updateCart();
  updateAddtocart();
  updateCounter();
}

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

function getSidebarState() {
  return !document.getElementById("sidebar").classList.contains("out");
}

//opens and closes the sidebar
function sidebar() {
  var isSidebarOpen = getSidebarState();
  var sb = document.getElementById("sidebar");
  var sbd = document.getElementById("sidebar-darken");
  if (isSidebarOpen) {
    // closing sidebar
    sb.style.setProperty("left", "-65%");
    sb.classList.add("out");
    sbd.classList.add("out");
    fade("close");
  } else {
    // opening sidebar
    sb.style.setProperty("left", "0%");
    sb.classList.remove("out");
    sbd.classList.remove("out");
    fade("open");
  }
}

// sbop = sidebar opacity
var sbop = 0;
var sbd = document.getElementById("sidebar-darken");
var fadeSpeed = 5;
var fadeSpeed2 = 20;
sbd.style.opacity = sbop;
function fade(op) {
  console.log("checking...");
  checkFade()
  if (op == "open") {
    if (sbop < 0.7) {
      sbop += 0.025;
      setTimeout(function () {
        fade("open");
      }, fadeSpeed);
      console.log("x");
    }
    sbd.style.opacity = sbop;
  }
  if (op == 'close') {
    if(sbop > 0) {
      sbop -= 0.025;
      setTimeout(function() {
        fade('close');
      }, fadeSpeed2);
      console.log('z');
    }
    sbd.style.opacity = sbop;
  }
  checkFade()
}
function checkFade() {
  var o = sbd.style.opacity;
  if (o <= 0) {
    sbd.classList.add('hidden')
    return true;
  }
  if (o > 0) {
    sbd.classList.remove('hidden')
    return false;
  }
}
checkFade()
