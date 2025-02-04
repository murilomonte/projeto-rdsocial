let themeSwitcher = document.querySelector("#themeSwitcher");
themeSwitcher.addEventListener("click", () => {
  if (document.querySelector("html").className == "default-mode") {
    document.querySelector("#light-mode-icon").style.display = "block";
    document.querySelector("#dark-mode-icon").style.display = "none";
    document.querySelector("html").className = "alternative-mode";
  } else {
    document.querySelector("html").className = "default-mode";
    document.querySelector("#light-mode-icon").style.display = "none";
    document.querySelector("#dark-mode-icon").style.display = "block";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia('(prefers-colors-scheme: dark')) {
    document.querySelector("#light-mode-icon").style.display = "none";
    document.querySelector("#dark-mode-icon").style.display = "block";
  } else {
    document.querySelector("#light-mode-icon").style.display = "block";
    document.querySelector("#dark-mode-icon").style.display = "none";
  }
});
