$(document).ready(function () {
  $(".toggle-menu").click(function () {
    $(this).toggleClass("active");
    $("#menu").toggleClass("open");
  });
  $("#menu ul a").click(function () {
    $(".toggle-menu").removeClass("active");
    $("#menu").removeClass("open");
  });
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
    const selcetor = document.querySelectorAll(selector);
    gsap.set(selector, {
      opacity: 0,
      y: y
    });

    let Start, End;
    if (window.offsetWidth > 768) {
      Start = "top 80%";
      End = "bottom 20%";

    } else {
      Start = "top 80%";
      End = "bottom 0%";
    }

    ScrollTrigger.batch(selcetor, {
      onEnter: batch => gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: staggerTime
      }),
      onLeave: batch => gsap.to(batch, {
        opacity: 0,
        y: y
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

      start: Start,
      end: End,
      markers: false,
    });


  }
  staggerAnim(".about-img-grid > * , .about-content *", 0.2, 20);
  // ==============================
  // Gsap Horizontal scroll
  // ==============================
  let pinWrap = document.querySelector(".pin-wrap");
  let pinWrapWidth = pinWrap.offsetWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;
  // Pinning and horizontal scrolling
  gsap.to(pinWrap, {
    scrollTrigger: {
      scrub: true,
      trigger: ".projects",
      pin: true,
      markers: false,
      // anticipatePin: 1,
      start: "top top",
      end: pinWrapWidth
    },
    x: -horizontalScrollLength,
    ease: "none"
  });

});