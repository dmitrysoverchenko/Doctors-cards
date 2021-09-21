import { modal } from "./js/modal.js";
import { loginForm } from "./js/login.js";
import { visit } from "./js/visit.js";

const enterBtn = document.querySelector("#enter-btn");

enterBtn.addEventListener("click", function () {
  document.body.prepend(modal.render("Registration", loginForm.render()));
  modal.show();
});

const createVisitBtn = document.querySelector(".create-visit-btn");

createVisitBtn.addEventListener("click", function () {
  document.body.prepend(modal.render("Create visit", visit.render()));
  modal.show();
});
