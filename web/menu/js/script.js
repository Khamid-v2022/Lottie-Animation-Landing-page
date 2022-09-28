/*CONVERT TO HORIZONTAL SCROLL*/ 

container.addEventListener('wheel', ev => {
  ev.preventDefault();
  container.scrollLeft += ev.deltaY + ev.deltaX;
});

/*LOAD ANIMATIONS*/ 

const animElems = document.querySelectorAll("[data-anim]");
const anims = {};
animElems.forEach(el => {
  const animId = el.dataset.anim;
  anims[animId] = bodymovin.loadAnimation({
    container: el,
    path: `js/json/${animId}.json`,
    renderer: 'svg',
    loop: el.dataset.loop === "",
    autoplay: el.dataset.autoplay === "",
  });
});

/*REFRESH ON NAVIGATE BACK */

window.addEventListener("pageshow", function (event) {
  var historyTraversal =
    event.persisted ||
    (typeof window.performance != "undefined" &&
      window.performance.navigation.type === 2);
  if (historyTraversal) {
    // Handle page restore.
      document.getElementById("MMW").style.zIndex = "0";
      anims["MMW"].goToAndStop(0, true);
      document.getElementById("MHW").style.zIndex = "0";
      anims["MHW"].goToAndStop(0, true);
      anims["MC1"].goToAndPlay(0, true);
  }
});

/*MENU BUTTON & WIPE*/

let menuplay = document.getElementById("menubutton");
menuplay.onclick = function () {
    location.href = "http://www.lawsonbolecek.com/web/menu/index.html";
};

/*HOME BUTTON & WIPE*/

let homeplay = document.getElementById("homebutton");
homeplay.onclick = function () {
  document.getElementById("MHW").style.zIndex = "7";
  anims["MHW"].goToAndPlay(1, true);
};

anims["MHW"].addEventListener("complete", function () {
  location.href = "http://www.lawsonbolecek.com/web/home/index.html";
});

/*BACK BUTTON & WIPE*/

let backplay = document.getElementById("backbutton");
backplay.onclick = function () {
  document.getElementById("MBW").style.zIndex = "7";
  anims["MBW"].goToAndPlay(1, true);
};

anims["MBW"].addEventListener("complete", function () {
     window.history.back()
});
