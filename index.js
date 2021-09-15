import { modal } from "./js/modal.js";
import { loginForm } from "./js/login.js";

const enterBtn = document.querySelector("#enter-btn");

enterBtn.addEventListener("click", function () {
  document.body.prepend(modal.render("Registration", loginForm.render()));
  modal.show();
});
