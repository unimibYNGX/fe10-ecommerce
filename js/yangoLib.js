function add(name, id) {
  document.getElementById(id).classList.add(name);
  // console.log("added " + name + " to " + id);
}

function remove(name, id) {
  document.getElementById(id).classList.remove(name);
}

function show(id) {
  remove("hidden", id);
}

function hide(id) {
  add("hidden", id);
}

function hideByClass(class_id) {
  var arr = document.getElementsByClassName(class_id);
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    element.classList.add("hidden");
  }
}
function showByClass(class_id) {
  var arr = document.getElementsByClassName(class_id);
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    element.classList.remove("hidden");
  }
}

function set(id, attr, value) {
  var el = document.getElementById(id);
  el.style.setProperty(attr, value);
}

function setByClass(class_id, attr, value) {
  var els = document.getElementsByClassName(class_id);
  for (let i = 0; i < els.length; i++) {
    const element = els[i];
    element.style.setProperty(attr, value);
  }
}

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

function mobile() {}

function desktop() {}

window.addEventListener("resize", function (event) {
  checkSize("device", "max-width: 645px");
});
checkSize("device", "max-width: 645px");
