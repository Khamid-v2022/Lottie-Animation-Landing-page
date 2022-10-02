/*CONVERT TO HORIZONTAL SCROLL*/

let prevHoveredEls = [];
var curr_state = "close";

let prevElId = "";
const container = document.querySelector("#container");
// detect scroll
container.addEventListener("wheel", (e) => {
  e.preventDefault();
  container.scrollLeft += e.deltaY + e.deltaX;

  updateMousePos(e);

  let hoveredEls = document.elementsFromPoint(e.pageX, e.pageY);
  // hoveredEls = hoveredEls.filter(
  //   (el) =>
  //   el.classList.contains("view-link") || el.classList.contains("email-link")
  // );

  hoveredEls = hoveredEls.filter(
    (el) =>
    el.classList.contains("view-link") || el.classList.contains("no-hover")
  );

  let flag_check = '';
  let local_prevId = prevElId;
  
  hoveredEls.forEach((el) => {
    let id = el.id;
    console.log("prev:", local_prevId, "::Now:", id);
    
    if(local_prevId != id){
      if(local_prevId == "")
        quee.push('open');
      else if(id == "")
        quee.push('close');
      else{
        quee.push('close');
        quee.push('open');
      }
    }else{
      if(id != "")
        quee.push('open');
      else
        quee.push('close');
    }
    local_prevId = id;
  });
  prevElId = local_prevId;
  // hoveredEls = hoveredEls.filter(
  //   (el) =>
  //   el.classList.contains("view-link") || el.classList.contains("email-link")
  // );
  // const notHoveredEls = prevHoveredEls.filter(
  //   (el) => !hoveredEls.includes(el)
  // );

  // hoveredEls.forEach((el) => {
  //   if(curr_state != 'open')
  //     el.handlePointerEnter();
  // });

  // notHoveredEls.forEach((el) => {
  //   if(curr_state != 'close')
  //     el.handlePointerLeave();
  // });

  // prevHoveredEls = hoveredEls;
});

/*LOAD ANIMATIONS*/

const animElems = document.querySelectorAll("[data-anim]");
const anims = {};
animElems.forEach((el) => {
  const animId = el.dataset.anim;
  anims[animId] = bodymovin.loadAnimation({
    container: el,
    path: `js/json/${animId}.json`,
    renderer: "svg",
    loop: el.dataset.loop === "",
    autoplay: el.dataset.autoplay === "",
  });
});

/*MENU BUTTON & WIPE*/

function doWipeAnim(href, newTab) {
  if (!newTab) {
    document.getElementById("MENUWIPE").style.zIndex = "7";
    anims["MENUWIPE"].addEventListener("complete", function () {
      location.href = href;
    });
    anims["MENUWIPE"].goToAndPlay(0, true);
  } else {
    window.open(href, '_blank').focus();
  }
}

const viewAndEmailLinks = [
  ...document.querySelectorAll(".view-link, .email-link"),
];
const regularAnchors = [...document.querySelectorAll("a")].filter(function (el) {
  return viewAndEmailLinks.indexOf(el) === -1;
});

/*HOME BUTTON & WIPE*/

let homeplay = document.getElementById("homebutton");
homeplay.onclick = function () {
  document.getElementById("HOMEWIPE").style.zIndex = "7";
  anims["HOMEWIPE"].goToAndPlay(1, true);
};

anims["HOMEWIPE"].addEventListener("complete", function () {
  location.href = "http://www.lawsonbolecek.com/web/home/index.html";
});

/*BACK BUTTON & WIPE*/

let backplay = document.getElementById("backbutton");
backplay.onclick = function () {
  document.getElementById("BACKWIPE").style.zIndex = "7";
  anims["BACKWIPE"].goToAndPlay(1, true);
};

anims["BACKWIPE"].addEventListener("complete", function () {
  location.href = "http://www.lawsonbolecek.com/web/home/index.html";
});

/*RESET WAYPOINTS ON PAGE RESIZE*/

window.addEventListener("resize",
  function () {
    Waypoint.refreshAll()
  }
);

/*REFRESH ON NAVIGATE BACK */

window.addEventListener("pageshow", function (event) {
  var historyTraversal =
    event.persisted ||
    (typeof window.performance != "undefined" &&
      window.performance.navigation.type === 2);
  if (historyTraversal) {
    // Handle page restore.
    document.getElementById("MENUWIPE").style.zIndex = "0";
    anims["MENUWIPE"].goToAndStop(0, true);
  }
});

/*LANDING DRIP LOOP*/

anims["HC1BR"].onComplete = function () {
  anims["HC1BD"].goToAndPlay(0, true);
};

/*CIRCLE FOLLOWING MOUSE*/

let mouseX = innerWidth * 0.5 - 60;
let mouseY = innerHeight * 0.5 - 60;
let xp = yp = 0;
const circleEl = document.querySelector("#circle");

function updateMousePos(e) {
  mouseX = e.pageX - 60;
  mouseY = e.pageY - 60;
}
document.body.addEventListener("pointermove", updateMousePos);

function updateViewBtnPos() {
  requestAnimationFrame(updateViewBtnPos);
  xp += ((mouseX - xp)/6);
  yp += ((mouseY - yp)/6);
  circleEl.style.transform = `translate(${xp}px, ${yp}px)`;
}
requestAnimationFrame(updateViewBtnPos);

/* LINK HOVER EFFECTS */

const view = bodymovin.loadAnimation({
  container: document.getElementById('view'),
  path: 'js/json/VIEW.json',
  renderer: 'svg',
  loop: false, 
  loop: false,
  autoplay: false,
});

const sayHi = bodymovin.loadAnimation({
  container: document.getElementById('sayhi'),
  path: 'js/json/SAYHI.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
});

/*SECTION CLICK/ENTER FUNCTIONALITY*/

const viewEls = document.querySelectorAll(".view-link");
const emailEls = document.querySelectorAll(".email-link");
const allClickables = [...viewEls, ...emailEls];

let isClickable = false;
let clickUrl = "#";
let isMailLink = false;
var quee = [];

function setUpBtns() {
  viewAndEmailLinks.forEach((el) => {
    const isViewEl = el.classList.contains("view-link");
    const anim = isViewEl ? view : sayHi;
    let myClickUrl = el.href;

    el.handlePointerEnter = (e) => {
      isClickable = true;
      clickUrl = myClickUrl;
      document.body.classList.add("pageclickable");
      isMailLink = !isViewEl;
      if(!quee.includes('open')){
        quee.push('open');
      }
    };

    el.handlePointerLeave = (e) => {
      isClickable = false;
      document.body.classList.remove("pageclickable");
      clickUrl = "#";
      if(!quee.includes('close')){
        quee.push('close');
      }
    };

    // detect mouse over
    el.addEventListener("pointerenter", () => {
      console.log("enter");
      el.handlePointerEnter()
    });
    el.addEventListener("pointerleave", () => {
      console.log("leave");
      el.handlePointerLeave()
    });
  });
}

document.addEventListener("click", (e) => {
  if (isClickable) {
    e.preventDefault();

    if (isMailLink) {
      doWipeAnim(clickUrl, true);
    } else {
      doWipeAnim(clickUrl);
    }
  }
});

setUpBtns();

function buttonAnimation(anim, direction, speed){
  anim.setDirection(direction);
  anim.setSpeed(speed);
  anim.play();
}

var shareFlag = true;

var animationInterval = setInterval(function(){
  if(quee.length > 0){
    for(let i = 0; i < quee.length; i++){
      if(shareFlag){
        if(quee[i] == 'close'){
          shareFlag = false;
          buttonAnimation(view, -1, 8);
          quee.splice(i, 1);
          curr_state = 'close';
          
          setTimeout(function(){
            shareFlag = true;
          }, 100);
        } else {
          shareFlag = false;
          buttonAnimation(view, 1, 3);
          
          quee.splice(i, 1);
          curr_state = 'open';
          
          setTimeout(function(){
            shareFlag = true;
          }, 200);
        }
      }
    }
  }
}, 50);


/*SCROLL-MOUSEMOVE*/

// var containerScroll = document.getElementById("container");

// containerScroll.onscroll = function(){     
//   document.getElementById("fade").style.zIndex = "7";
// };

// containerScroll.onmousemove = function(){   
//   document.getElementById("fade").style.zIndex = "0";  
// };
















/*HEADERS RIGHT*/

new Waypoint({
  element: document.getElementById("HH3"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HH2"].setDirection(1);
      anims["HH2"].setSpeed(1.5);
      anims["HH2"].playSegments([1, 19], true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return this.element.clientWidth
  }
});

new Waypoint({
  element: document.getElementById("HH4"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HH2"].setDirection(1);
      anims["HH2"].setSpeed(1.2);
      anims["HH2"].playSegments([20, 36], true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return this.element.clientWidth
  }
});

new Waypoint({
  element: document.getElementById("HH5"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HH2"].setDirection(1);
      anims["HH2"].setSpeed(1.2);
      anims["HH2"].playSegments([37, 55], true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return this.element.clientWidth
  }
});

new Waypoint({
  element: document.getElementById("HH6"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HH2"].setDirection(1);
      anims["HH2"].setSpeed(1.2);
      anims["HH2"].playSegments([56, 73], true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return this.element.clientWidth
  }
});

/*HEADERS CHANGE LEFT*/

new Waypoint({
  element: document.getElementById("HH3"),
  handler: function (direction) {
    if (direction === "left") {
      anims["HH2"].setDirection(-1);
      anims["HH2"].setSpeed(1.5);
      anims["HH2"].playSegments([19, 1], true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return this.element.clientWidth
  }
});

new Waypoint({
  element: document.getElementById("HH4"),
  handler: function (direction) {
    if (direction === "left") {
      anims["HH2"].setDirection(-1);
      anims["HH2"].setSpeed(1.2);
      anims["HH2"].playSegments([36, 20], true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return this.element.clientWidth
  }
});

new Waypoint({
  element: document.getElementById("HH5"),
  handler: function (direction) {
    if (direction === "left") {
      anims["HH2"].setDirection(-1);
      anims["HH2"].setSpeed(1.2);
      anims["HH2"].playSegments([55, 37], true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return this.element.clientWidth
  }
});

new Waypoint({
  element: document.getElementById("HH6"),
  handler: function (direction) {
    if (direction === "left") {
      anims["HH2"].setDirection(-1);
      anims["HH2"].setSpeed(1.2);
      anims["HH2"].playSegments([73, 58], true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return this.element.clientWidth
  }
});

/*WORK REVEAL RIGHT*/

new Waypoint({
  element: document.getElementById("HC4"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HC4"].setSpeed(1.0);
      anims["HC4"].goToAndPlay(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth - 300
  }
});

new Waypoint({
  element: document.getElementById("HC4BR"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HC4BR"].setSpeed(1.0);
      anims["HC4BR"].goToAndPlay(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth
  }
});

new Waypoint({
  element: document.getElementById("HC5"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HC5"].setSpeed(1.0);
      anims["HC5"].goToAndPlay(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth - 300
  }
});

new Waypoint({
  element: document.getElementById("HC5BR"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HC5BR"].setSpeed(1.0);
      anims["HC5BR"].goToAndPlay(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth
  }
});

new Waypoint({
  element: document.getElementById("HC6"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HC6"].setSpeed(1.0);
      anims["HC6"].goToAndPlay(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth - 300
  }
});

new Waypoint({
  element: document.getElementById("HC6BR"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HC6BR"].setSpeed(1.0);
      anims["HC6BR"].goToAndPlay(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth
  }
});

new Waypoint({
  element: document.getElementById("HC7"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HC7"].setSpeed(1.0);
      anims["HC7"].goToAndPlay(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth - 300
  }
});

new Waypoint({
  element: document.getElementById("HC7BR"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HC7BR"].setSpeed(1.0);
      anims["HC7BR"].goToAndPlay(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth
  }
});

new Waypoint({
  element: document.getElementById("HC8"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HC8"].setSpeed(1.0);
      anims["HC8"].goToAndPlay(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth - 300
  }
});

new Waypoint({
  element: document.getElementById("HC8BR"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HC8BR"].setSpeed(1.0);
      anims["HC8BR"].goToAndPlay(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth
  }
});

new Waypoint({
  element: document.getElementById("HC9"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HC9"].setSpeed(1.0);
      anims["HC9"].goToAndPlay(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth - 300
  }
});

new Waypoint({
  element: document.getElementById("HC9BR"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HC9BR"].setSpeed(1.0);
      anims["HC9BR"].goToAndPlay(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth
  }
});

/*WORK RESET LEFT*/

new Waypoint({
  element: document.getElementById("HC4"),
  handler: function (direction) {
    if (direction === "left") {
      anims["HC4"].setDirection(1);
      anims["HC4"].goToAndStop(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth - 50
  }
});

new Waypoint({
  element: document.getElementById("HH4"),
  handler: function (direction) {
    if (direction === "left") {
      anims["HC5"].setDirection(1);
      anims["HC5"].goToAndStop(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: "100",
});

new Waypoint({
  element: document.getElementById("HH4"),
  handler: function (direction) {
    if (direction === "left") {
      anims["HC5"].setDirection(1);
      anims["HC5"].goToAndStop(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: "100",
});

new Waypoint({
  element: document.getElementById("HC5"),
  handler: function (direction) {
    if (direction === "left") {
      anims["HC6"].setDirection(1);
      anims["HC6"].goToAndStop(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: "100",
});

new Waypoint({
  element: document.getElementById("HC6"),
  handler: function (direction) {
    if (direction === "left") {
      anims["HC7"].setDirection(1);
      anims["HC7"].goToAndStop(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: "100",
});

new Waypoint({
  element: document.getElementById("HC7"),
  handler: function (direction) {
    if (direction === "left") {
      anims["HC8"].setDirection(1);
      anims["HC8"].goToAndStop(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: "100",
});

new Waypoint({
  element: document.getElementById("HC8"),
  handler: function (direction) {
    if (direction === "left") {
      anims["HC9"].setDirection(1);
      anims["HC9"].goToAndStop(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: "100",
});

/*CONTACT REVEAL RIGHT*/

new Waypoint({
  element: document.getElementById("HC11L"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HC11L"].setSpeed(1.0);
      anims["HC11L"].goToAndPlay(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth - 100
  }
});

new Waypoint({
  element: document.getElementById("HC11R"),
  handler: function (direction) {
    if (direction === "right") {
      anims["HC11R"].setSpeed(1.0);
      anims["HC11R"].goToAndPlay(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth - 100
  }
});

/*CONTACT CLEAR LEFT*/

new Waypoint({
  element: document.getElementById("HC11L"),
  handler: function (direction) {
    if (direction === "left") {
      anims["HC11L"].setDirection(1);
      anims["HC11L"].goToAndStop(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth - 20
  }
});

new Waypoint({
  element: document.getElementById("HC11R"),
  handler: function (direction) {
    if (direction === "left") {
      anims["HC11R"].setDirection(1);
      anims["HC11R"].goToAndStop(0, true);
    }
  },
  context: container,
  horizontal: true,
  offset: function () {
    return window.innerWidth - 20
  }
});



