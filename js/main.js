const langButtons = document.querySelectorAll("[data-language]");
const textsToChange = document.querySelectorAll("[data-section]");

// 1. Función para cargar el archivo JSON del idioma seleccionado
function loadLanguage(lang) {
    fetch(`./languages/index/${lang}.json`)
        .then(res => res.json())
        .then(data => {
            textsToChange.forEach((el) => {
                const section = el.dataset.section;
                const value = el.dataset.value;

                if (data[section] && data[section][value]) {
                    el.innerHTML = data[section][value];
                }
            });

            // Guardar la preferencia en localStorage
            localStorage.setItem("preferred_language", lang);
        })
        .catch(error => console.error("Error cargando el idioma:", error));
}

// 2. Escuchar los clics en los botones de idioma
langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const lang = button.dataset.language;
        loadLanguage(lang);
    });
});

// 3. Al cargar la página, verificar si hay un idioma guardado
document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem("preferred_language") || "es"; // "es" como idioma por defecto
    loadLanguage(savedLanguage);
});