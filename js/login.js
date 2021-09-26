import { Form } from "./form.js";
import { authorization, getCards } from "./API.js";
import { Element } from "./elements.js";
import { modal } from "./modal.js";
import { renderAllCards } from "./cards.js";
import { Filter } from "./filter.js";

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
        const filter = new Filter(cards);
        filter.render();

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
