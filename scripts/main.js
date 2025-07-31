
/*--- Menu toogle --- */
const menuToggle = document.getElementById("menuToggle");
const slideMenu = document.getElementById("slideMenu");
const overlay = document.getElementById("overlay");

menuToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    console.log("a");

    slideMenu.classList.toggle("active");
    overlay.style.display = slideMenu.classList.contains("active") ? "block" : "none";

    const icon = menuToggle.querySelector(".navbar-toggler-icon");
    if (slideMenu.classList.contains("active")) {
        icon.classList.add("close-icon");
    } else {
        icon.classList.remove("close-icon");
    }

    slideMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            closeSlideMenu()
        });
    });
});

document.addEventListener("click", function (e) {
    const isClickInside = slideMenu.contains(e.target) || menuToggle.contains(e.target);
    if (!isClickInside) {
        closeSlideMenu()
    }
});

overlay.addEventListener("click", function () {
    closeSlideMenu()
});

function closeSlideMenu() {
    slideMenu.classList.remove("active");
    overlay.style.display = "none";
    const icon = menuToggle.querySelector(".navbar-toggler-icon");
    if (slideMenu.classList.contains("active")) {
        icon.classList.add("close-icon");
    } else {
        icon.classList.remove("close-icon");
    }

    const openedSubmenus = slideMenu.querySelectorAll(".collapse.show");
    openedSubmenus.forEach((submenu) => {
        submenu.classList.remove("show");
        const toggle = slideMenu.querySelector(`[data-bs-target="#${submenu.id}"]`);
        if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
        }
    });

}


const scrollBtn = document.getElementById("scrollToTopBtn");
if (scrollBtn) {
    scrollBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const choice = localStorage.getItem('privacy-choice');
const banner = document.getElementById('privacy-banner');
const privacyOverlay = document.getElementById('privacy-overlay');

if (!choice && banner && privacyOverlay) {
    banner.style.display = 'block';
    privacyOverlay.style.display = 'block';
}
function acceptCookies() {
    localStorage.setItem('privacy-choice', 'accepted');
    banner.style.display = 'none';
    privacyOverlay.style.display = 'none';
}

function rejectCookies() {
    localStorage.setItem('privacy-choice', 'rejected');
    banner.style.display = 'none';
    privacyOverlay.style.display = 'none';
}

