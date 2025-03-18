const mode = document.getElementById("toggle-dark-mode");
const icon = document.querySelector('#toggle-dark-mode i');

mode.addEventListener('click', () => {
    
    document.body.classList.toggle('dark-mode');

    if (icon.classList.contains("bi-moon")) {
        icon.classList.remove("bi-moon");
        icon.classList.add("bi-brightness-high-fill");
    } else {
        icon.classList.remove("bi-brightness-high-fill");
        icon.classList.add("bi-moon");
    }
    
});