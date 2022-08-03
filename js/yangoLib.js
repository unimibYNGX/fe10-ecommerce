// Adds an attribute to an element found by its id
// Beware: the attribute to add needs to be legit, any unknown attribute won't be added
// The id needs to be
function add(name, id) {
  document.getElementById(id).classList.add(name);
}

// Same as the add(name, id) function, but it removes a given attribute,
// If the attribute is not found/doesn't exist, nothing will happen
function remove(name, id) {
  document.getElementById(id).classList.remove(name);
}

// Shows a single element (by its id) by removing its 'hidden' attribute
// The 'hidden' attribute's content is 'display: none'
function show(id) {
  remove("hidden", id);
}

// Hides a single element (by its id) by giving it the 'hidden' attribute
function hide(id) {
  add("hidden", id);
}

// Same function as hide(id), but used when hiding multiple elements with the same class
function hideByClass(class_id) {
  var arr = document.getElementsByClassName(class_id);
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    element.classList.add("hidden");
  }
}

// Same as above, but shows them
function showByClass(class_id) {
  var arr = document.getElementsByClassName(class_id);
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    element.classList.remove("hidden");
  }
}

// Sets an attribute and its value to a single element (by its id)
function set(id, attr, value) {
  var el = document.getElementById(id);
  el.style.setProperty(attr, value);
}

// Same as above, but for multiple elements with the same class
function setByClass(class_id, attr, value) {
  var els = document.getElementsByClassName(class_id);
  for (let i = 0; i < els.length; i++) {
    const element = els[i];
    element.style.setProperty(attr, value);
  }
}

// Returns the position of the element that contains a certain attribute
// Beware, this should be used when there's ONLY a single wanted attribute in the array
function getPos(attribute, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].classList.contains(attribute)) return i;
  }
  return -1;
}

// Confronts the current window's properties (i.e. height, width) with a given query,
// then calls the corresponding function based on the given request
function checkSize(request, query) {
  var x = window.matchMedia("(" + query + ")");
  switch (request) {
    case "device":
      x.matches ? mobile() : desktop();
      break;
    case "font-size":
      x.matches ? small() : big();
      break;
    default:
      console.log("request not recognized");
      break;
  }
}

// Called when the website needs to be shown in mobile size, any element adjustment is written here
var deviceState = "";
function mobile() {
  deviceState = "mobile";
  hideByClass("top-btn");
  hide("hr");

  set("bottom", "flex-wrap", "wrap");
  set("bottom", "margin-top", "0");

  set("bottom-left", "width", "100%");
  set("bottom-left", "margin-right", "0px");
  set("bottom-left", "margin-left", "0px");

  hide("div-thumb-img");

  set("bottom-right", "width", "100%");
  set("bottom-right", "margin-right", "0px");
  set("bottom-right", "margin-left", "0px");

  set("div-amount", "width", "100%");
  set("div-amount", "justify-content", "space-between");
  set("div-amount", "margin-right", "0px");

  set("addtocart", "width", "100%");

  set("main", "margin-bottom", "100px");

  set("top", "justify-content", "space-between");
  set("top", "padding-left", "10%");
  set("top", "padding-right", "14%");

  show("menu");

  set("top-rightside", "margin-right", "0");

  set("logo", "padding", "0");

  set('cart-card', 'top', '112.5%')
  set('cart-card', 'right', '12.5%')
  set('cart-card', 'width', '75%')

  show("top-cart");
  show("top-avatar");

  // document.getElementById("main-img").onclick = "";
  remove("btn", "div-main-img");
  set("div-main-img", "position", "relative");
  document
    .getElementById("div-prev")
    .style.setProperty("display", "flex", "important");
  document
    .getElementById("div-next")
    .style.setProperty("display", "flex", "important");

  // add('mobile-cart-card', 'cart-card')
}

// Same as above, but for desktop, deviceState will be used for lb_open()
function desktop() {
  deviceState = "desktop";
  showByClass("top-btn");
  show("hr");
  show("div-thumb-img");
  hide("menu");
  add("btn", "div-main-img");
  $("div").attr("style", "");
  document
    .getElementById("counter")
    .style.setProperty("display", "none", "important");
  document
    .getElementById("div-prev")
    .style.setProperty("display", "none", "important");
  document
    .getElementById("div-next")
    .style.setProperty("display", "none", "important");
  // document.getElementById("main-img").onmousedown = "lb_open()";
}

// Calls checkshize() when the viewport is being resized
window.addEventListener("resize", function (event) {
  checkSize("device", "max-width: 900px");
});
checkSize("device", "max-width: 900px");

hideByClass("attribution");
