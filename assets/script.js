function CreateCAR(position) {
  var img = document.createElement("img");
  img.src = "assets/PngItem_1509028.png";
  switch (position) {
    case "left":
      img.classList.add("carobject");
      img.classList.add("lefte");
      img.setAttribute("data-direct", "straight");
      break;
    case "right":
      img.classList.add("carobject");
      img.classList.add("righte");
      img.setAttribute("data-direct", "right");
      break;
    case "center":
      img.classList.add("carobject");
      img.classList.add("centere");
      img.setAttribute("data-direct", "left");
      break;
    default:
      break;
  }
  document.getElementById("body").appendChild(img);
}

CreateCAR("left");
CreateCAR("right");
CreateCAR("center");
function move(object, direction) {
  if (direction == "straight") {
    for (var i = 0; i < 100; i++) {
      setTimeout(() => {
        object.style.marginLeft = i + "%";
      }, 300);
    }
  } else if (direction == "right") {
    let right = object.style.right;
    for (var i = 0; i < 100; i++) {
      setTimeout(() => {
        object.style.marginRight = i + "%";
      }, 300);
    }
  } else if (direction == "left") {
    for (var i = 0; i < 30; i++) {
      setTimeout(() => {
        object.style.marginBottom = i + "%";
      }, 0);
    }
    setTimeout(() => {
      object.style.transform = "rotate(-180deg)";
    }, 100);
    setTimeout(() => {
      for (var i = 0; i < 150; i++) {
        setTimeout(() => {
          object.style.marginRight = i + "%";
        }, 800);
      }
    }, 2000);
  }
}

function road(side) {
  let carobjects = document.querySelectorAll(".carobject." + side);
  for (var i = 0; i < carobjects.length; i++) {
    move(carobjects[i], carobjects[i].getAttribute("data-direct"));
  }
}
var greenlight = true;
//setInterval(() => road(), 300);

class traffic {
  constructor(start) {
    this.activeLight = start;
  }
  changeLight(side) {
    let circles = document.querySelectorAll(".container ." + side + ".circle");
    console.log(side + ": " + this.activeLight);
    circles[this.activeLight].className = "circle " + side;
    this.activeLight++;

    if (this.activeLight > 2) {
      this.activeLight = 0;
    }

    const currentLight = circles[this.activeLight];

    currentLight.classList.add(currentLight.getAttribute("color"));
    if (this.activeLight == 2) {
      setTimeout(() => road(side + "e"), 0);
    }
    if (side == "center") {
      setInterval(() => {
        this.changeLight("center", 2);
        //setInterval(() => road("centere"), 300);
      }, 8000);
      CreateCAR("center");
    }
    if (side == "left" && this.activeLight == 2) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }
}
var trafficleft = new traffic(0);
var trafficright = new traffic(0);
var trafficcenter = new traffic(1);

setInterval(() => {
  trafficleft.changeLight("left", 0);
}, 5000);
setInterval(() => {
  trafficright.changeLight("right", 0);
}, 5000);
setTimeout(() => {
  trafficcenter.changeLight("center", 1);
  //setInterval(() => road("centere"), 300);
}, 2000);
