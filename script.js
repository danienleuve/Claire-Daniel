// Claire & Daniel — configuration
// Remplace ces deux valeurs avant la mise en ligne.
const CONFIG = {
  // Exemple : "https://www.votre-service-de-cagnotte.fr/..."
  potUrl: "#",
  // Exemple : "claireetdaniel@gmail.com"
  rsvpEmail: "A_REMPLACER_PAR_VOTRE_EMAIL"
};

// Cagnotte
const potLink = document.getElementById("pot-link");
potLink.href = CONFIG.potUrl;

// Menu mobile
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

// RSVP via email — V1 sans serveur.
// Nous pourrons remplacer ceci par un vrai formulaire en ligne.
document.getElementById("rsvp-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const subject = encodeURIComponent("RSVP mariage Claire & Daniel");
  const body = encodeURIComponent(
`Nom & prénom : ${data.get("name")}
Réponse : ${data.get("attendance")}
Adultes : ${data.get("adults")}
Enfants : ${data.get("children")}
Allergies / régime : ${data.get("diet")}
Message : ${data.get("message") || ""}`
  );
  if (CONFIG.rsvpEmail.includes("@")) {
    window.location.href = `mailto:${CONFIG.rsvpEmail}?subject=${subject}&body=${body}`;
  } else {
    alert("Le formulaire est prêt. Il reste simplement à renseigner votre adresse e-mail dans script.js.");
  }
});

// Compte à rebours
const target = new Date("2027-04-24T14:30:00+02:00").getTime();
const boxes = document.querySelectorAll("#countdown strong");
function updateCountdown(){
  const diff = target - Date.now();
  if(diff <= 0){
    boxes.forEach((b,i)=> b.textContent = "0");
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;
  [days,hours,minutes,seconds].forEach((v,i)=>boxes[i].textContent = String(v).padStart(2,"0"));
}
updateCountdown();
setInterval(updateCountdown,1000);
