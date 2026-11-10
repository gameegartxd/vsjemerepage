document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem("preferred_language") || "es";
    loadComicLanguage(savedLanguage);
});

document.addEventListener("languagechange", (event) => {
    loadComicLanguage(event.detail.lang);
});

function loadComicLanguage(lang) {
    const headerContainer = document.getElementById("header-container");
    const textsToChange = document.querySelectorAll("[data-section]");

    fetch(`/languages/comic/${lang}.json`)
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
        .catch(error => console.error("Error cargando el idioma del comic:", error));
}