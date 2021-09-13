// import {
//   authorization,
//   createVisit,
//   getCards,
//   deleteCard,
//   editCard,
// } from "./js/API";
// const email = "sometrialemail24@gmai.com";
// const password = "trialpass231";

// authorization(email, password).then(async (res) => {
//   console.log(res);
// });

fetch("https://ajax.test-danit.com/api/v2/cards/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "youasf34r@email.com",
    password: "passworsfg435d",
  }),
})
  .then((response) => response.text())
  .then((token) => console.log(token));
