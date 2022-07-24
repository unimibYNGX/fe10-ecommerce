function select(n) {
  if (n != null) {
    var arr = document.getElementsByClassName("thumb-img");
    // for(let i = 0; i < arr.length; i++) {
    //     if(arr[i].classList.contains("selected")){
    //         if(i!=n)
    //         {
    //             arr[i].classList.remove("selected")
    //             arr[n-1].classList.add("selected")
    //             return true
    //         }
    //     }
    // }
    var currentPos = getPos("selected", arr)
    console.log("current: " + currentPos + ", n: " + n)
    if (currentPos != n) {
      arr[currentPos].classList.remove("selected");
      arr[n-1].classList.add("selected");
    }
  }
  return false;
}

function getPos(attribute, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].classList.contains(attribute)) return i;
  }
  return -1;
}
