$(document).ready(function () {

  // ===========
  // Mobile menu
  // ============
  $(".toggle-menu").click(function () {
    $(this).toggleClass("active");
    $("#menu").toggleClass("open");
  });
  $("#menu ul a").click(function () {
    $(".toggle-menu").removeClass("active");
    $("#menu").removeClass("open");
  });
  // =====================
  // marquee + fancybox
  // =====================

  // Fancy box


  if ($(".fancybox").length > 0) {
    let list = document.querySelectorAll(".list");
    let itemBox = document.querySelectorAll(".itembox");
    let boxFancy = document.querySelectorAll(".fancybox");

    Fancybox.bind("[data-fancybox]", {
      Thumbs: {
        autoStart: false,
      }
    });

    $('[data-fancybox]').fancybox({
      loop: false
    });
    for (let i = 0; i < list.length; i++) {
      list[i].addEventListener("click", function () {
        for (let j = 0; j < list.length; j++) {
          list[j].classList.remove("active");
        }
        this.classList.add("active");

        let dataFilter = this.getAttribute("data-filter");

        for (let k = 0; k < itemBox.length; k++) {
          itemBox[k].classList.remove("active");
          itemBox[k].classList.add("hide");

          if (
            itemBox[k].getAttribute("data-item") == dataFilter ||
            dataFilter == "all"
          ) {
            itemBox[k].classList.remove("hide");
            itemBox[k].classList.add("active");
          }
        }
        for (let m = 0; m < boxFancy.length; m++) {
          boxFancy[m].classList.remove("active");
          Fancybox.bind("[data-fancybox].active", {
            groupAll: false
          });
          if (
            boxFancy[m].getAttribute("data-item") == dataFilter ||
            dataFilter == "all"
          ) {
            boxFancy[m].classList.add("active");
            Fancybox.bind("[data-fancybox].active", {
              groupAll: true
            });
          }
        }
      });
    }
  }

  // marquee


  function AutoScrollSlider(selector, direction, fancyattribute, AnimationTime) {
    //   Rto right


    $(`.marquee-scroll .${selector}`).css('animation-duration', `${AnimationTime}s`)
    $(document).on("mouseover", `.marquee-inner.${selector} li`, function () {
      $(this).addClass("hover");
    });
    $(document).on("mouseout", `.marquee-inner.${selector} li`, function () {
      $(this).removeClass("hover");
    });
    //   var elements = 2;
    for (var i = 0; i < 2; i++) {
      $(`.marquee-inner.${selector}`).clone().prependTo(`.marquee-scroll.${direction}`);
    }

    $(`.marquee-scroll.${direction} ul`).each(function (i) {
      i = i + 1;
      $(this).attr('fancyattribute', `${fancyattribute}-${i}`);
      $(this).find('li a').attr('data-fancybox', this.attributes.fancyattribute.value);;
    });

    var liEle = [];
    var liEle = $(`.marquee-scroll.${direction} li`);
  }
  AutoScrollSlider("right-to-left", 'right', "fancyattribute1", 40);
  AutoScrollSlider("left-to-right", 'left', "fancyattribute2", 40);


  // =============
  // Video Play
  // ============
  var video = document.getElementById("myVideo");

  $(".play").click(function (e) {

    if (video.paused) {
      video.play();
      $("#play").hide();
      $("#pause").show();
    } else {
      video.pause();
      $("#play").show();
      $("#pause").hide();
    }
  });
  // ================
  // Spliting text
  // ===============

  const swiftUpElements = document.querySelectorAll('.split');
  swiftUpElements.forEach(elem => {

    const words = elem.textContent.split(' ');
    elem.innerHTML = '';

    words.forEach((el, index) => {
      if (el === "") {
        words[index] = `<span class="parent empty"><span class="child">${words[index]}</span></span>`;
      } else {
        words[index] = `<span class=${""}><span class="child">${words[index]}</span></span>`;
      }
    });
    elem.innerHTML = words.join(' ');
  });

  swiftUpElements.forEach((section, index) => {

    ScrollTrigger.create({
      trigger: section,
      start: 'top 95%',
      end: 'top 0%',
      markers: false,
      once: true,
      toggleActions: 'play reverse none reverse',
      toggleClass: {
        targets: section,
        className: "active"
      },

    })

  });
  // ==============================
  // Gsap SlideUpOnLoad animation
  // ==============================
  function SlideUpOnLoad(selector, y, opacity, delay) {
    const select2 = document.querySelectorAll(selector);
    gsap.utils.toArray(select2).forEach((slidedown) => {
      gsap.set(slidedown, {
        y: y,
        opacity: opacity,
      });
      gsap.to(slidedown, {
        y: "0",
        duration: 2,
        delay: delay,
        ease: "power2.out",
        opacity: 1,
      });

    });
  }
  SlideUpOnLoad(".hero-content p", 20, 0, 0.4);
  SlideUpOnLoad(".hero-content button", 20, 0, .8);


  // ==============================
  // Gsap Stagger Animation
  // ==============================
  function staggerAnim(selector, staggerTime, y) {
    const selectorelm = document.querySelectorAll(selector);
    gsap.set(selectorelm, {
      opacity: 0,
      y: y
    });

    let Start, End;
    if (window.innerWidth > 768) {
      Start = "top 80%";
      End = "bottom 20%";

    } else {
      Start = "top 60%";
      End = "bottom 0%";
    }

    ScrollTrigger.batch(selectorelm, {
      scrub: 2,
      start: Start,
      end: End,
      markers: false,
      onEnter: batch => gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: staggerTime,

      }),
      onLeave: batch => gsap.to(batch, {
        opacity: 0,
        y: y,

      }),
      onEnterBack: batch => gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: staggerTime
      }),
      onLeaveBack: batch => gsap.to(batch, {
        opacity: 0,
        y: y
      }),

    });

    ScrollTrigger.addEventListener("refreshInit", () => gsap.set(selectorelm, {
      y: y,   opacity: 0
    }));
  }
  setTimeout(() => {
    // staggerAnim(".about-img-grid > * ", 0.1, 100);
      staggerAnim(".blog .row > * ", 0.1, 100);
      staggerAnim(".our-mission .title-block > * ", 0.1, 100);


  }, 300);


  // ==============================
  // Gsap Horizontal scroll
  // ==============================
  function horizontalScroll(selector){



    let horizontalSections = document.querySelectorAll(".projects");

    horizontalSections.forEach((horizontalSection) => {
      let pinWrap = horizontalSection.querySelector(selector);
      let pinWrapWidth = pinWrap.offsetWidth;
      let horizontalScrollLength = pinWrapWidth - window.innerWidth;


      gsap.to(pinWrap, {
        scrollTrigger: {

          scrub: true,
          trigger: horizontalSection,
          pin: true,
          pinSpacing:true,
          start: "top top",
          end: () => `+=${pinWrapWidth}`,
          invalidateOnRefresh: true
        },
        x: -horizontalScrollLength,
        ease: "none"
      });
    });

  }
  horizontalScroll(".pin-wrap")
// ======================
// Gsap scaleUp animation
// ======================
  function scaleUp(selector,InitialScalepos,EndScalepos,StartRadius,EndRadius) {
    const select2 = document.querySelectorAll(selector);
    gsap.utils.toArray(select2).forEach((slideup) => {
      gsap.set(slideup, {
        scale: InitialScalepos,
        x: "0%",
        y: "0%",
        borderRadius:StartRadius,
        opacity: 0.8
      });
      gsap.to(slideup, {
        scrollTrigger: {
          trigger: slideup,
          scrub: 3,
          markers: false,
          start: "top 100%",
          end: "top 50%",
        },
        scale: EndScalepos,
        x: "0%",
        y: "0",
        borderRadius:EndRadius,
        opacity: 1
      });

    });
  }
  scaleUp(".circle",0.2,1,"100%","100%");
  scaleUp(".video-view",0.9,1,"100%","0");
// ======================
// Gsap SlideUp animation
// ======================
  function SlideUp(selector, y, scrub, opacity) {
    const select2 = document.querySelectorAll(selector);
    gsap.utils.toArray(select2).forEach((slidedown) => {
      gsap.set(slidedown, {
        y: y,
        opacity: opacity,
      });
      gsap.to(slidedown, {
        scrollTrigger: {
          trigger: slidedown,
          scrub: 3,
          markers: false,
          ease: Power2.easeOut,
          start: "top 100%",
          duration: 1,
          end: "bottom 75%",
        },

        y: "0",
        opacity: 1,
      });

    });
  }

  SlideUp(".slider-gallery > div", 20, 3, 0.8);
  SlideUp(".home-about>div * ", 30, 3, 0.8);
  SlideUp(".about-content > * , .facts > * ,.about-img-grid > *,.about-small-desc > *",30, 3,0.8);


// ========================
// Text scroll Animation
// =======================
function TextScrollFunction(selector, StartPositionX, EndPositionX) {
  window.addEventListener("load", function () {
    gsap.utils.toArray(selector).forEach((textanim) => {
      gsap.set(textanim, {
        x: StartPositionX,
      });
      gsap.to(textanim, {
        scrollTrigger: {
          trigger: textanim,
          pin: false,
          scrub: true,
          markers: false,
          start: "top 100%",
          end: "bottom 0%",
        },
        x: EndPositionX,
        duration: 1000,
        ease: "none",
      });
    });
  });
}
TextScrollFunction(".text1", "-100%", "-200%");


//
$(".numberanim").each(function(index, element) {

  var count = $(this),
      zero = {val:0},
      num = count.data("number"),
      split = (num + "").split("."),
      decimals = split.length > 1 ? split[1].length : 0;

    console.log(num)
    console.log(typeof num)

    if (typeof num == 'string') {
      num = parseInt(num.split(',').join(''))
    }

    console.log(num)
    console.log(typeof num)

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    gsap.to(zero, {
      val: num,
      duration: 2,
      scrollTrigger: element,

      onUpdate: function() {
        count.text(numberWithCommas(zero.val.toFixed(decimals)));
      }
    });
});



});