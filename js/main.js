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

// function getPos(attribute, arr) {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i].classList.contains(attribute)) return i;
//   }
//   return -1;
// }

function showMain(n) {
  if (n != null) {
    var image = document.getElementById("main-img");
    var pos = n + 1;
    image.src = "images/images-main/image-product-" + pos + ".jpg";
  }
}
