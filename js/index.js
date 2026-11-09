document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem("preferred_language") || "es";
    loadIndexLanguage(savedLanguage);
});

document.addEventListener("languagechange", (event) => {
    loadIndexLanguage(event.detail.lang);
});

function loadIndexLanguage(lang) {
    const headerContainer = document.getElementById("header-container");
    const textsToChange = document.querySelectorAll("[data-section]");

    fetch(`./languages/index/${lang}.json`)
        .then(res => res.json())
        .then(data => {
            textsToChange.forEach((el) => {
                if (headerContainer && headerContainer.contains(el)) return;

                const section = el.dataset.section;
                const value = el.dataset.value;

                if (data[section] && data[section][value]) {
                    el.innerText = data[section][value];
                }
            });
        })
        .catch(error => console.error("Error cargando el idioma:", error));
}
