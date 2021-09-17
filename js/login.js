import { Form } from "./form.js";
import { authorization, getCards } from "./API.js";
import { Element } from "./elements.js";
import { modal } from "./modal.js";
import { renderAllCards } from "./cards.js";

// email: trial1010@gmail.com , password: 1010

class LoginForm extends Element {
  constructor() {
    super();
    this.createEnterForm = [
      {
        typeField: "input",
        type: "text",
        name: "email",
        placeholder: "e-mail",
      },
      {
        typeField: "input",
        type: "password",
        name: "password",
        placeholder: "password",
      },
      {
        typeField: "button",
        type: "submit",
        text: "Enter",
        functionClick: this.login,
      },
    ];
  }

  login = (form) => {
    // fetch("https://ajax.test-danit.com/api/v2/cards", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    //   body: JSON.stringify({
    //     title: "Визит к кардиологу",
    //     description: "Плановый визит",
    //     doctor: "Cardiologist",
    //     bp: "24",
    //     age: 23,
    //     weight: 70,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((response) => console.log(response));
    const enterBtn = document.querySelector("#enter-btn");
    const createVisitBtn = document.querySelector(".create-visit-btn");
    const email = form.target["email"].value;
    const password = form.target["password"].value;
    authorization(email, password).then(async (res) => {
      if (res) {
        enterBtn.style.display = "none";
        createVisitBtn.style.display = "block";
        const cards = await getCards();
        modal.hide();
        console.log(cards);
        renderAllCards();
      }
    });
  };

  render() {
    const enterForm = new Form(this.createEnterForm);
    return enterForm.render();
  }
}
export const loginForm = new LoginForm();
