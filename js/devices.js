// Edit settings for responsive mobile and desktop
function settings_mobile() {
  deviceState = "mobile";

  hideByClass("top-btn");
  hide("hr");
  hide("div-thumb-img");

  show("menu");
  show("top-cart");
  show("top-avatar");
  show("sidebar");

  set("bottom", "flex-wrap", "wrap");
  set("bottom", "margin-top", "0");

  set("bottom-left", "width", "100%");
  set("bottom-left", "margin-right", "0px");
  set("bottom-left", "margin-left", "0px");

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

  set("top-rightside", "margin-right", "0");

  set("logo", "padding", "0");

  set("cart-card", "top", "112.5%");
  set("cart-card", "right", "12.5%");
  set("cart-card", "width", "75%");

  remove("btn", "div-main-img");
  set("div-main-img", "position", "relative");

  document
    .getElementById("div-prev")
    .style.setProperty("display", "flex", "important");
  document
    .getElementById("div-next")
    .style.setProperty("display", "flex", "important");
}

function settings_desktop() {
  deviceState = "desktop";

  hide("sidebar");
  hide("sidebar-darken");
  hide("menu");

  showByClass("top-btn");
  show("hr");
  show("div-thumb-img");

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
}