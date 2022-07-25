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
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    lb_close();
  }
});
