const toggleBtn = document.getElementById("toggle-btn");
const body = document.body;
const icon = toggleBtn.querySelector("i");

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    toggleBtn.style.transform = "rotate(360deg)";
  } else {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    toggleBtn.style.transform = "rotate(0deg)";
  }
});
