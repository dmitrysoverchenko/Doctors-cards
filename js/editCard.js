import { Element } from "./elements.js";
import { modal } from "./modal.js";
import { Form } from "./form.js";
import { editCard } from "./API.js";
import { renderAllCards } from "./cards.js";

export class EditCard extends Element {
  constructor(cardContent) {
    super();
    this.cardContent = cardContent;
  }
  handlerEditCard = (e) => {
    const elements = e.target.elements;
    let formData = { id: this.cardContent.id };
    this.editFormFields.forEach((el) => {
      if (el.name) {
        formData = { ...formData, [el.name]: elements[el.name].value };
        // console.log(formData);
      }
    });
    editCard(this.cardContent.id, formData).then((response) => {
      if (response) {
        renderAllCards();
        modal.hide();
      }
    });
  };

  renderEditForm() {
    this.editFormFields = [];
    for (let key in this.cardContent) {
      // console.log(key, this.cardContent[key]);
      if (
        key !== "id" &&
        key !== "urgency" &&
        key !== "description" &&
        key !== "doctor" &&
        key !== "status"
      ) {
        this.editFormFields.push({
          typeField: "input",
          type: "text",
          name: key,
          placeholder: "",
          value: this.cardContent[key],
        });
      }
      if (key == "urgency") {
        this.editFormFields.push({
          typeField: "select",
          name: "urgency",
          options: ["Normal", "Priority", "Emergency"],
          value: this.cardContent[key],
        });
      }
      if (key == "doctor") {
        this.editFormFields.push(
          {
            typeField: "select",
            name: "doctor",
            options: ["Cardiologist", "Dentist", "Therapist"],
            value: this.cardContent[key],
          }
        );
      }

      if (key == "status") {
        this.editFormFields.push({
          typeField: "select",
          name: "status",
          options: ["Open", "Done"],
          value: this.cardContent[key],
        });
      }

      if (key == "description") {
        this.editFormFields.push({
          typeField: "textarea",
          type: "textarea",
          name: "description",
          placeholder: "Description",
          value: this.cardContent[key],
        });
      }
      if (key == "pastDiseases") {
        this.editFormFields.push({
          typeField: "textarea",
          type: "textarea",
          name: "pastDiseases",
          placeholder: "Past diseases of the cardiovascular system",
          value: this.cardContent[key],
        });
      }
      // console.log(this.cardContent);
    }

    this.editFormFields.push({
      typeField: "button",
      type: "submit",
      text: "Edit",
      functionClick: this.handlerEditCard,
    });

    this.editForm = new Form(this.editFormFields);
    console.log(this.editFormFields);
    console.log(this.editForm);
    return this.editForm.render();
  }

  render() {
    document.body.prepend(modal.render("Edit card", this.renderEditForm()));
    modal.show();
  }
}
