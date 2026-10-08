/* Vanguard & Mercer CPA — Home page behavior
   Only real UI behavior: mobile navigation. No form handling or backend. */
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("mobile-nav");
  if (!toggle || !menu) return;

  var icon = toggle.querySelector(".material-symbols-outlined");
  var desktopQuery = window.matchMedia("(min-width: 1024px)");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
    if (icon) icon.textContent = open ? "close" : "menu";
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Close after choosing a link
  menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  // Close with Escape and return focus to the toggle
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset when the layout switches to desktop
  desktopQuery.addEventListener("change", function (event) {
    if (event.matches) setOpen(false);
  });
})();
const consultationForm = document.querySelector("#consultation-form");

if (consultationForm) {
  consultationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(consultationForm);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message")
    };

    try {
      const response = await fetch("https://cpa-website-n12z.onrender.com/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        consultationForm.reset();
      } else {
        alert(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting consultation:", error);
      alert("Unable to send your consultation request.");
    }
  });
}
