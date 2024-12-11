const sidebar = document.querySelector(".sidebar")
const sidebarToggle = document.querySelector(".sidebar-toggler");
const menuToggle = document.querySelector(".menu-toggler");

const collapsedSidebarHeight = "56px";
const fullSidebarHeight = "calc(100vh - 32px)";

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});

