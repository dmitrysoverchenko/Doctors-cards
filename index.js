import { modal } from "./js/modal.js";
// import { createVisit } from "./js/createVisit.js";
import { loginForm } from "./js/login.js";

const enterBtn = document.querySelector("#enter-btn");
// const createVisitBtn = document.querySelector(".create-visit-btn");

// createVisitBtn.addEventListener("click", function () {
//   document.body.prepend(modal.render("Create visit", createVisit.render()));
//   modal.show();
// });
enterBtn.addEventListener("click", function () {
  document.body.prepend(modal.render("Registration", loginForm.render()));
  modal.show();
});
