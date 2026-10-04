// Claire & Daniel — V2
// À compléter avant la mise en ligne :
// 1. potUrl avec le lien de votre cagnotte
// 2. rsvpEmail si vous utilisez encore la version RSVP par email
const CONFIG = {
  potUrl: "#",
  rsvpEmail: "A_REMPLACER_PAR_VOTRE_EMAIL"
};

const potLink = document.getElementById("pot-link");
if (potLink) potLink.href = CONFIG.potUrl;

// Menu mobile
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    menuToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  });
  document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  }));
}

// RSVP provisoire via email — sera remplacé par un vrai formulaire en ligne en V3.
const rsvpForm = document.getElementById("rsvp-form");
if (rsvpForm) {
  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent("RSVP mariage Claire & Daniel");
    const body = encodeURIComponent(
`Nom & prénom : ${data.get("name")}
Réponse : ${data.get("attendance")}
Adultes : ${data.get("adults")}
Enfants : ${data.get("children")}
Vendredi 23 avril : ${data.get("friday")}
Dimanche 25 avril : ${data.get("sunday")}
Allergies / régime : ${data.get("diet")}
Message : ${data.get("message") || ""}`
    );
    if (CONFIG.rsvpEmail.includes("@")) {
      window.location.href = `mailto:${CONFIG.rsvpEmail}?subject=${subject}&body=${body}`;
    } else {
      alert("Le formulaire est prêt. Il reste simplement à renseigner votre adresse e-mail dans script.js.");
    }
  });
}

// Compte à rebours
const target = new Date("2027-04-24T14:30:00+02:00").getTime();
const boxes = document.querySelectorAll("#countdown strong");
function updateCountdown() {
  const diff = target - Date.now();
  if (diff <= 0) {
    boxes.forEach(b => b.textContent = "0");
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;
  [days, hours, minutes, seconds].forEach((v, i) => boxes[i].textContent = String(v).padStart(2, "0"));
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Petites apparitions discrètes au scroll
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add("is-visible"));
}
