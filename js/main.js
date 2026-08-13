document.addEventListener("DOMContentLoaded", () => {
    fetch("header.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("header-container").innerHTML = html;

            initLanguageSystem();
        })
        .catch(error => console.error("Error al cargar el header:", error));
});

function initLanguageSystem() {
    const langButtons = document.querySelectorAll("[data-language]");
    
    langButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const lang = button.dataset.language;
            loadLanguage(lang);
        });
    });

    const savedLanguage = localStorage.getItem("preferred_language") || "es";
    loadLanguage(savedLanguage);
}

function loadLanguage(lang) {
    const textsToChange = document.querySelectorAll("[data-section]");

    fetch(`./languages/header/${lang}.json`)
        .then(res => res.json())
        .then(data => {
            textsToChange.forEach((el) => {
                const section = el.dataset.section;
                const value = el.dataset.value;

                if (data[section] && data[section][value]) {
                    el.innerText = data[section][value];
                }
            });
            localStorage.setItem("preferred_language", lang);
        })
        .catch(error => console.error("Error cargando el idioma:", error));
}