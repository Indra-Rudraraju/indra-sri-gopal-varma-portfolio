const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const year = document.querySelector("#current-year");

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  }
});

const questChoices = document.querySelectorAll(".quest-option");
const questResult = document.querySelector(".quest-result-copy");
const questLink = document.querySelector(".quest-result-link");

const questStories = {
  product: {
    message:
      "You picked practical products. I led the Online Auction & Bidding System, bringing Python, SQL, and JavaScript together in one app.",
    project: "#project-auction",
    linkText: "See the auction project",
  },
  ai: {
    message:
      "You picked pattern-finding. My Bone Fracture Detection project explored machine learning and YOLO to identify patterns in medical images.",
    project: "#project-fracture",
    linkText: "See the ML project",
  },
  trust: {
    message:
      "You picked trust and security. I built a blockchain-based evidence system focused on making important records harder to tamper with.",
    project: "#project-blockchain",
    linkText: "See the blockchain project",
  },
};

questChoices.forEach((button) => {
  button.addEventListener("click", () => {
    const story = questStories[button.dataset.questChoice];
    if (!story || !questResult || !(questLink instanceof HTMLAnchorElement)) {
      return;
    }

    questChoices.forEach((choice) => {
      choice.setAttribute("aria-pressed", String(choice === button));
    });
    questResult.textContent = story.message;
    questLink.href = story.project;
    questLink.textContent = story.linkText;
    questLink.hidden = false;
  });
});

const revealElements = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
