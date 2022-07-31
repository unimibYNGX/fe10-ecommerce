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
function mobile() {}

// Same as above, but for desktop
function desktop() {}

// Calls checkshize() when the viewport is being resized
window.addEventListener("resize", function (event) {
  checkSize("device", "max-width: 645px");
});
checkSize("device", "max-width: 645px");
