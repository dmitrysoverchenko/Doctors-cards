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
          placeholder: "Urgency: ",
          name: "urgency",
          options: ["High", "Normal", "Low"],
        });
      }
      if (key == "doctor") {
        this.editFormFields.push({
          typeField: "select",
          name: "doctor",
          placeholder: "Doctor: ",
          options: ["Cardiologist", "Dentist", "Therapist"],
        });
      }

      if (key == "status") {
        this.editFormFields.push({
          typeField: "select",
          name: "status",
          placeholder: "Status: ",
          options: ["Open", "Done"],
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
    }

    this.editFormFields.push({
      typeField: "button",
      type: "submit",
      text: "Edit",
      functionClick: this.handlerEditCard,
    });

    this.editForm = new Form(this.editFormFields);
    return this.editForm.render();
  }

  render() {
    document.body.prepend(modal.render("Edit card", this.renderEditForm()));
    modal.show();
  }
}
