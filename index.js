import {
  authorization,
  createVisit,
  getCards,
  deleteCard,
  editCard,
} from "./js/API.js";
import tokenVerification from "./js/TokenVerification.js";
const email = "sorer4f@gmail.com";
const password = "dfddg33445";

const response = authorization(email, password).then((res) => {
  console.log(res);
});
console.log(localStorage.getItem("token"));
tokenVerification();
