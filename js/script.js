window.addEventListener("load", function () {
  const navbar = document.querySelector(".animate-navbar");
  navbar.classList.add("show-navbar");
});

window.addEventListener("load", function () {
  const heading = document.querySelector(".h1-animate");
  heading.classList.add("show-h1");
  // Delay the paragraph animation by 500ms (0.5s)
  setTimeout(() => {
    const para = document.querySelector(".p-animate");
    para.classList.add("show-p");
  }, 500);
  // Delay the button animation by 700ms (0.5s)
  setTimeout(() => {
    const button = this.document.querySelector(".btn-group-animate");
    button.classList.add("show-btn");
  }, 700);
  // Delay the marquee animation by 700ms (0.5s)
  setTimeout(() => {
    const marquee = document.querySelector(".marquee-animate");
    marquee.classList.add("show-marquee");
  }, 700);
});

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".section-one");
  const items = section.querySelectorAll(
    ".col-12, .rounded-4, .track-box, .send-money-box, .teamwork, .pay-box"
  );

  // Add reveal-item class to all target elements
  items.forEach((item) => item.classList.add("reveal-item"));

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add parent animation
          section.classList.add("show-section");

          // Stagger animation for each child
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("show-section");
            }, index * 200); // 200ms delay between items
          });

          observer.unobserve(section); // Animate only once
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  observer.observe(section);
});

const sectionTwo = document.querySelector(".section-two");
sectionTwo.classList.add("hidden");
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.classList.remove("hidden");
    } else {
      entry.target.classList.remove("visible");
      entry.target.classList.add("hidden");
    }
  });
};

const observer = new IntersectionObserver(observerCallback, options);
observer.observe(sectionTwo);

const seeker = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Section enter hua -> show
        entry.target.classList.add("show");
      } else {
        // Section chhod ke gaya -> hide
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.2, // 20% element visible hone par trigger
  }
);

// Select section-three elements in order
const items = [
  document.querySelector(".section-three h2"),
  document.querySelector(".section-three img"),
  ...document.querySelectorAll(
    ".first-box, .second-box, .third-box, .fourth-box"
  ),
];

// Apply reveal class and observe each
items.forEach((item, index) => {
  item.classList.add("reveal");
  // Stagger effect with delay
  item.style.transitionDelay = `${index * 0.3}s`;
  seeker.observe(item);
});

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: "#scroll-section",
  start: "top top", // Only activates when this section reaches top
  end: "bottom top+=80%", // 3000px scroll area
  scrub: 1,
  pin: true, // GSAP will pin it, not CSS
  markers: false, // Keep this ON to check visually
});

const data = [
  {
    number: "110%",
    text: "Get your savings back!",
    title: "The numbers really tell the story",
  },
  { number: "85%", text: "Customer Satisfaction", title: "We value users" },
  { number: "60K", text: "Active Users", title: "Community Growing" },
  { number: "99.9%", text: "Server Uptime", title: "Performance Matters" },
];

const mainNum = document.getElementById("mainNum");
const subText = document.getElementById("subText");
const titleText = document.getElementById("title");
const pageCount = document.getElementById("pageCount");
const dotsContainer = document.getElementById("dotsContainer");

// Create dots
data.forEach((_, i) => {
  const dot = document.createElement("li");
  dot.addEventListener("click", () => scrollToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll("#dotsContainer li");

function updateContent(i) {
  gsap.to(".display-percentage", { opacity: 0, y: -30, duration: 0.3 });
  gsap.to(".caption-text", { opacity: 0, y: -20, duration: 0.3 });

  setTimeout(() => {
    mainNum.textContent = data[i].number;
    subText.textContent = data[i].text;
    titleText.textContent = data[i].title;
    pageCount.textContent = `${String(i + 1).padStart(2, "0")} / 04`;

    dots.forEach((dot, idx) => dot.classList.toggle("active", idx === i));

    gsap.to(".display-percentage", { opacity: 1, y: 0, duration: 0.4 });
    gsap.to(".caption-text", { opacity: 1, y: 0, duration: 0.4 });
  }, 300);
}

// ScrollTrigger magic
data.forEach((_, i) => {
  ScrollTrigger.create({
    trigger: ".scroll-wrapper",
    start: `${i * 100}vh center`,
    end: `${(i + 1) * 100}vh center`,
    onEnter: () => updateContent(i),
    onEnterBack: () => updateContent(i),
  });
});

// Dot click scroll
function scrollToSlide(i) {
  gsap.to(window, { scrollTo: i * window.innerHeight, duration: 1 });
}

// Initial load
updateContent(0);

const section = document.querySelector(".section-five");
const title = document.querySelector(".section-five .title-one");
const cards = document.querySelectorAll(".section-five .card-item");

const section5Observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        section.classList.add("visible");
        setTimeout(() => {
          title.classList.add("visible");
        }, 200);

        setTimeout(() => {
          cards.forEach((card) => {
            card.classList.add("visible");
          });
        }, 500);
      } else {
        section.classList.remove("visible");
        title.classList.remove("visible");
        cards.forEach((card) => {
          card.classList.remove("visible");
        });
      }
    });
  },
  { threshold: 0.2 }
);

section5Observer.observe(section);

let slider = document.querySelector(".slider");
let images = gsap.utils.toArray(".img");

function sliderCircle() {
  let radius = slider.offsetWidth / 2;
  let center = slider.offsetWidth / 2;
  let total = images.length;
  let slice = (2 * Math.PI) / total;

  images.forEach((item, i) => {
    let radian = i * slice;

    let x = radius * Math.sin(radian) + center;
    let y = -radius * Math.cos(radian) + center;

    gsap.set(item, {
      rotation: radian + "rad",
      xPercent: -50,
      yPercent: -50,
      x: x,
      y: y,
    });
  });
}

sliderCircle();

window.addEventListener("resize", sliderCircle);

gsap.to(".slider", {
  rotate: () => -360,
  ease: "none",
  duration: images.length,
  scrollTrigger: {
    start: "top top",
    end: "+=" + images.length * window.innerHeight,
    scrub: 1,
    trigger: ".section-six",
    pin: true,
    anticipatePin: 1,
    onLeave: () => {
      gsap.to(".section-six", {
        opacity: 0.9,
        duration: 0.8,
        ease: "power1.out",
      });
    },
    onEnterBack: () => {
      gsap.to(".section-six", {
        opacity: 1,
        duration: 0.8,
        ease: "power1.out",
      });
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".section-six");
  const titleBox = document.querySelector(".title-two");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          titleBox.classList.add("animate");
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(section);
});

function duplicateCards(id) {
  const wrapper = document.getElementById(id);
  const clone = wrapper.innerHTML;
  wrapper.innerHTML += clone; // 🔥 doubled cards → seamless loop
}

duplicateCards("scrollLeft");
duplicateCards("scrollRight");



const observer7 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-up");
      } else {
        entry.target.classList.remove("show-up");
      }
    });
  },
  {
    threshold: 0.05,
  }
);
const elementsToObserve = document.querySelectorAll(
  ".title-three-heading, .title-three-content, .scrolling-container"
);
elementsToObserve.forEach((element) => {
  observer7.observe(element);
});



document.addEventListener("DOMContentLoaded", () =>{
  const section = document.querySelector(".section-eight");
  const heading = document.querySelector(".sec8-heading");
  const button = document.querySelector(".sec8-btn");
  const logos = document.querySelectorAll(".logo-box");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heading.classList.add("show-sec8");
        button.classList.add("show-sec8");
        logos.forEach((logo, i) => {
          setTimeout(() => {
            logo.classList.add("show-sec8");
          }, 150*i);
        });
      } else {
        heading.classList.remove("show-sec8");
        button.classList.remove("show-sec8");
        logos.forEach(logo => logo.classList.remove("show-sec8"));
      }
    });
  }, {
    threshold:0.2
  });
  observer.observe(section);
});


const toggle = document.getElementById("billingToggle");

const yearly = document.getElementById("yearlyLabel");
const monthly = document.getElementById("monthlyLabel");

const plusAmount = document.getElementById("plusAmount");
const businessAmount = document.getElementById("businessAmount");

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    // MONTHLY PRICING
    yearly.classList.remove("active");
    monthly.classList.add("active");

    plusAmount.textContent = "69";
    businessAmount.textContent = "89";

  } else {
    // YEARLY PRICING
    yearly.classList.add("active");
    monthly.classList.remove("active");

    plusAmount.textContent = "59";
    businessAmount.textContent = "99";
  }
});


document.addEventListener("DOMContentLoaded", () =>{
  const section = document.querySelector(".pricing-section");
  const heading = document.querySelector(".pricing-section-heading");
  const para = document.querySelector(".pricing-section-para");
  const planBoxes = document.querySelectorAll(".plan-box");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heading.classList.add("show-sec9");
        para.classList.add("show-sec9");
        planBoxes.forEach((planBox, i) => {
          setTimeout(() => {
            planBox.classList.add("show-sec9");
          }, 150*i);
        });
      } else {
        heading.classList.remove("show-sec9");
        para.classList.remove("show-sec9");
        planBoxes.forEach(planBox => planBox.classList.remove("show-sec9"));
      }
    });
  }, {
    threshold:0.2
  });
  observer.observe(section);
});


document.addEventListener("DOMContentLoaded", () => {

  const section = document.querySelector(".compare-section");
  const heading = document.querySelector(".compare-section-heading");
  const rowWrapper = document.querySelector(".row-wrapper");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        heading.classList.add("show-compare");
        setTimeout(() => {
          rowWrapper.classList.add("show-compare");
        }, 800);
      } else {
        heading.classList.remove("show-compare");
        rowWrapper.classList.remove("show-compare");
      }

    });
  }, { threshold: 0.2 });

  observer.observe(section);
});


//blog-section

document.addEventListener("DOMContentLoaded", () =>{
  const section = document.querySelector(".blog-section");
  const heading = document.querySelector(".blog-section-heading");
  const cards = document.querySelectorAll(".animate-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heading.classList.add("show-blog-section");
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add("show-blog-section");
          }, 200*i);
        });
      } else {
        heading.classList.remove("show-blog-section");
        cards.forEach(card => card.classList.remove("show-blog-section"));
      }
    });
  }, {
    threshold:0.2
  });
  observer.observe(section);
});



document.querySelectorAll(".accordion-button").forEach(btn => {
        btn.addEventListener("click", () => {
            // Close all other open buttons by removing the 'open' class
            document.querySelectorAll(".accordion-button").forEach(b => {
                if (b !== btn) b.classList.remove("open");
            });

            // Toggle the 'open' class on the clicked button
            // This triggers the custom CSS rotation and opacity change
            btn.classList.toggle("open");
        });
});


const faqSection = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");   // enter animation
        } else {
            entry.target.classList.remove("show"); // exit animation
        }
    });
}, {
    threshold: 0.2
});

// Select all elements you want to animate
document.querySelectorAll(".fade-up").forEach(el => faqSection.observe(el));


document.addEventListener("DOMContentLoaded", () =>{
  const section = document.querySelector(".contactUs-section");
  const heading = document.querySelector(".contactus-section-heading");
  const para = document.querySelector(".contactus-section-para");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heading.classList.add("show-contactus-section");
        setTimeout(() => {
          para.classList.add("show-contactus-section");
        }, 300);
      } else {
        heading.classList.remove("show-contactus-section");
        para.classList.remove("show-contactus-section");
      }
    });
  }, {
    threshold:0.3
  });
  observer.observe(section);
});


document.querySelectorAll('.effect span').forEach(span => {
  span.setAttribute('data-text', span.textContent.trim());
});


const footerItems = document.querySelectorAll('.footer-animate');

const observer8 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      footerItems.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add('show');
        }, i * 200); // stagger delay 200ms
      });

    } else {

      footerItems.forEach(item => {
        item.classList.remove('show');
      });

    }
  });
}, { threshold: 0.2 }); // 20% section visible

observer8.observe(document.querySelector('.footer-section'));


window.addEventListener("load", function () {
    document.querySelector(".copyright-section").classList.add("show");
  });