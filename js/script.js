"use strict";

// Trick to set the date input to today's date
date.min = new Date().toISOString().split("T")[0];

///////////////////////////////////////////////////////////
// Sticky navigation
const sectionHeroEl = document.querySelector(".section-hero");
const logoEl = document.querySelector(".logo");

const obs = new IntersectionObserver(
  function (entries) {
    const [ent] = entries;

    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
      logoEl.src = "img/justGo-logo-dark.png";
    } else {
      document.body.classList.remove("sticky");
      logoEl.src = "img/justGo-logo-light.png";
    }
  },
  {
    // Inside the viewport
    root: null,
    threshold: 0,
    rootMargin: "-60px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Making the mobile navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Preventing the default behavior of the form
const formEl = document.querySelectorAll(".form");

formEl.forEach(function (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    form.reset();
  });
})

///////////////////////////////////////
// Button scrolling
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile navigation
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

///////////////////////////////////////
// Changing the color of the svg icons using deSVG.js
window.addEventListener('load', function () {
  deSVG('.category-icon', true);
});

///////////////////////////////////////
// General One Page Slider
class Slider {
  constructor(slides, btnLeft, btnRight, gap = 100) {
    // All slides as one class
    this.slides = document.querySelectorAll(slides);

    // Navigating the slides
    this.btnLeft = document.querySelector(btnLeft);
    this.btnRight = document.querySelector(btnRight);

    // Slides gap
    this.gap = gap;

    this.currentSlide = 0;
    this.maxSlide = this.slides.length;

    this._goToSlide();
    this._nextSlide();
    this._prevSlide();
  }

  // This function loops through all the slides and sets their transform property to translateX(100 * (i - slide))%.
  //@param [slide=0] - The slide to go to.
  _goToSlide(slide = 0) {
    this.slides.forEach((s, i) => (s.style.transform = `translateX(${this.gap * (i - slide)}%)`));
  }


  // When the right button is clicked, if the current slide is the last slide, go to the first slide,
  // otherwise go to the next slide.
  _nextSlide() {
    this.btnRight.addEventListener("click", () => {
      this.currentSlide === this.maxSlide - 1 ? this.currentSlide = 0 : this.currentSlide++;

      this._goToSlide(this.currentSlide);
    });
  }

  // When the left button is clicked, if the current slide is 0, then set the current slide to the max
  // slide minus 1, otherwise, subtract 1 from the current slide.
  _prevSlide() {
    this.btnLeft.addEventListener("click", () => {
      this.currentSlide === 0 ? this.currentSlide = this.maxSlide - 1 : this.currentSlide--;

      this._goToSlide(this.currentSlide);
    });
  }
}

const sliderHero = new Slider(".hero-slide", ".hero-slider__btn--left", ".hero-slider__btn--right");
const sliderTestimonials = new Slider(".testimonials-slide", ".testimonial__btn--left", ".testimonial__btn--right", 105);

///////////////////////////////////////
// Locations slider
const swiper = new Swiper('.locations-content', {
  // Optional parameters
  direction: 'horizontal',
  slidesPerView: 4,
  spaceBetween: 25,
  loop: true,
  fade: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    570: {
      slidesPerView: 2,
    },
    780: {
      slidesPerView: 3,
    },
    1250: {
      slidesPerView: 4,
    },
  }
});


// const slider = function () {
//   const slides = document.querySelectorAll(".slide");
//   const btnLeft = document.querySelector(".slider__btn--left");
//   const btnRight = document.querySelector(".slider__btn--right");

//   let currentSlide = 0;
//   const maxSlide = slides.length;

//   // Functions
//   const goToSlide = function (slide = 0) {
//     slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
//   }

//   // Next slide
//   const nextSlide = function () {
//     if (currentSlide === maxSlide - 1) {
//       currentSlide = 0;
//     } else {
//       currentSlide++;
//     }

//     goToSlide(currentSlide);
//   }

//   // Previous slide
//   const prevSlide = function () {
//     if (currentSlide === 0) {
//       currentSlide = maxSlide - 1;
//     } else {
//       currentSlide--;
//     }

//     goToSlide(currentSlide);
//   }

//   // Init
//   goToSlide(0);

//   // Event handlers
//   btnRight.addEventListener("click", nextSlide);
//   btnLeft.addEventListener("click", prevSlide);

//   document.addEventListener("keydown", function (e) {
//     if (e.key === "ArrowLeft") prevSlide();
//     e.key === "ArrowRight" && nextSlide();
//   });
// }
// slider();