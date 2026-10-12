// Claire & Daniel — V2 mise à jour
const CONFIG = {
  potUrl: "#", // Remplacer par le lien de votre cagnotte
  rsvpEmail: "A_REMPLACER_PAR_VOTRE_EMAIL", // option de secours par e-mail
  googleSheetEndpoint: "https://script.google.com/macros/s/AKfycbwdAHY7X-DdLRSUW8D8HefccGuIa16MLY69DW0AcNkEcT0J-urvIQI7XTBExaPJCAo9/exec" // Coller ici l’URL /exec du script Google Apps Script
};

const potLink = document.getElementById("pot-link");
if (potLink && CONFIG.potUrl !== "#") {
  potLink.href = CONFIG.potUrl;
  const note = potLink.parentElement.querySelector("small");
  if (note) note.textContent = "Merci pour votre participation à notre voyage de noces 💛";
}

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
  }));
}

const rsvpForm = document.getElementById("rsvp-form");
const guestList = document.getElementById("guest-list");
const guestTemplate = document.getElementById("guest-template");
let guestCounter = 0;

function addGuest() {
  const fragment = guestTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".guest-card");
  guestCounter += 1;
  card.dataset.guestId = String(guestCounter);
  card.querySelector("legend").textContent = `Personne ${guestCounter}`;
  const type = card.querySelector('[data-field="type"]');
  const age = card.querySelector('[data-field="age"]');
  const email = card.querySelector('[data-field="email"]');
  const phone = card.querySelector('[data-field="phone"]');
  const contact = card.querySelector(".adult-contact");
  function updateType() {
    const child = type.value === "child";
    age.disabled = !child;
    age.required = child;
    contact.hidden = child;
    email.required = !child;
    phone.required = !child;
    email.disabled = child;
    phone.disabled = child;
  }
  type.addEventListener("change", updateType);
  updateType();
  card.querySelector(".remove-guest").addEventListener("click", () => {
    card.remove(); renumberGuests();
  });
  card.querySelectorAll(".not-coming").forEach(box => box.addEventListener("change", () => {
    if (box.checked) card.querySelectorAll('[data-day]:not(.not-coming)').forEach(other => { other.checked = false; });
  }));
  card.querySelectorAll('[data-day]:not(.not-coming)').forEach(box => box.addEventListener("change", () => {
    if (box.checked) card.querySelector(".not-coming").checked = false;
  }));
  guestList.appendChild(fragment);
  renumberGuests();
}
function renumberGuests() {
  guestList.querySelectorAll(".guest-card").forEach((card, index) => {
    card.querySelector("legend").textContent = `Personne ${index + 1}`;
    card.querySelector(".remove-guest").hidden = guestList.querySelectorAll(".guest-card").length === 1;
  });
}
const addGuestButton = document.getElementById("add-guest");
if (addGuestButton && guestList) addGuestButton.addEventListener("click", addGuest);
if (guestList && guestTemplate) addGuest();

if (rsvpForm) {
  rsvpForm.addEventListener("submit", async e => {
    e.preventDefault();
    if (!rsvpForm.reportValidity()) return;
    const household = rsvpForm.querySelector('[name="household"]').value.trim();
    const message = rsvpForm.querySelector('[name="message"]').value.trim();
    const cards = [...guestList.querySelectorAll(".guest-card")];
    if (!cards.length) { alert("Ajoutez au moins une personne à votre réponse."); return; }
    const people = [];
    for (const card of cards) {
      const get = key => card.querySelector(`[data-field="${key}"]`).value.trim();
      const days = [...card.querySelectorAll('[data-day]:checked')].map(el => el.dataset.day);
      if (!days.length) { alert(`Merci d’indiquer la présence de ${get("firstName")} ${get("lastName")} (ou de cocher « Ne pourra pas venir »).`); card.scrollIntoView({behavior:"smooth",block:"center"}); return; }
      if (days.includes("Absent(e)") && days.length > 1) { alert("Pour une personne absente, cochez uniquement « Ne pourra pas venir »."); return; }
      people.push({
        firstName: get("firstName"), lastName: get("lastName"), type: get("type"),
        age: get("type") === "child" ? get("age") : "",
        email: get("type") === "adult" ? get("email") : "",
        phone: get("type") === "adult" ? get("phone") : "",
        presence: days.includes("Absent(e)") ? "Ne pourra pas venir" : days.join(" + "),
        diet: get("diet"), household, message
      });
    }
    const payload = { household, message, people, submittedAt: new Date().toISOString() };
    if (CONFIG.googleSheetEndpoint) {
      try {
        await fetch(CONFIG.googleSheetEndpoint, {
          method: "POST", mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });
        alert("Merci ! Votre réponse a été envoyée. 💛 Si vous le souhaitez, vérifiez que la page de confirmation s’affiche avant de fermer.");
        rsvpForm.reset(); guestList.innerHTML = ""; guestCounter = 0; addGuest();
      } catch (err) {
        alert("L’envoi automatique a échoué. Merci de réessayer ou de nous contacter directement.");
      }
      return;
    }
    alert("Le formulaire n’est pas encore connecté à Google Sheets. Suivez le guide README pour activer la réception des réponses.");
  });
}

const target = new Date("2027-04-24T14:30:00+02:00").getTime();
const boxes = document.querySelectorAll("#countdown strong");
function updateCountdown() {
  const diff = target - Date.now();
  if (diff <= 0) { boxes.forEach(b => b.textContent = "0"); return; }
  const values = [Math.floor(diff / 86400000), Math.floor(diff / 3600000) % 24, Math.floor(diff / 60000) % 60, Math.floor(diff / 1000) % 60];
  values.forEach((v, i) => boxes[i].textContent = String(v).padStart(2, "0"));
}
updateCountdown(); setInterval(updateCountdown, 1000);
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); } }), { threshold: .08 });
  reveals.forEach(el => observer.observe(el));
} else reveals.forEach(el => el.classList.add("is-visible"));
