// Claire & Daniel — V2 mise à jour
const CONFIG = {
  potUrl: "#", // Remplacer par le lien de votre cagnotte
  rsvpEmail: "A_REMPLACER_PAR_VOTRE_EMAIL", // option de secours par e-mail
  googleSheetEndpoint: "" // Coller ici l’URL /exec du script Google Apps Script
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
if (rsvpForm) {
  rsvpForm.addEventListener("submit", async e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const days = data.getAll("days");
    const notComing = data.get("notComing");
    if (!days.length && !notComing) { alert("Sélectionnez au moins une journée de présence, ou cochez l’option si vous ne pourrez malheureusement pas venir."); return; }
    if (days.length && notComing) { alert("Choisissez soit les journées de présence, soit l’option indiquant que vous ne pourrez pas venir."); return; }

    const payload = {
      name: data.get("name") || "",
      presence: notComing || days.join(", "),
      adults: data.get("adults") || "",
      children: data.get("children") || "",
      diet: data.get("diet") || "",
      message: data.get("message") || "",
      submittedAt: new Date().toISOString()
    };

    if (CONFIG.googleSheetEndpoint) {
      try {
        await fetch(CONFIG.googleSheetEndpoint, {
          method: "POST", mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });
        alert("Merci ! Votre réponse a été envoyée. 💛");
        rsvpForm.reset();
      } catch (err) {
        alert("L’envoi automatique a échoué. Merci de réessayer ou de nous contacter directement.");
      }
      return;
    }

    const subject = encodeURIComponent("RSVP mariage Claire & Daniel");
    const body = encodeURIComponent(`Nom & prénom : ${payload.name}\nPrésence : ${payload.presence}\nAdultes : ${payload.adults}\nEnfants : ${payload.children}\nAllergies / régime / besoins : ${payload.diet}\nMessage : ${payload.message}`);
    if (CONFIG.rsvpEmail.includes("@")) {
      window.location.href = `mailto:${CONFIG.rsvpEmail}?subject=${subject}&body=${body}`;
    } else {
      alert("Le formulaire n’est pas encore connecté. Suivez le guide README pour le relier à Google Sheets.");
    }
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
