import { Element, Select } from "./elements.js";
import { Form } from "./form.js";
import { createVisit } from "./API.js";
import { renderAllCards } from "./cards.js";
import { modal } from "./modal.js";

class Visit extends Element {
  constructor() {
    super();
    this.commonFields = [
      {
        field: "input",
        type: "text",
        title: "fullName",
        placeholder: "Full name",
      },
      {
        field: "input",
        type: "text",
        title: "purposeOfVisit",
        placeholder: "Your visit purpose",
      },
      {
        field: "select",
        title: "urgency",
        options: ["Standart", "Priority", "Emergency"],
      },
      {
        field: "textarea",
        type: "textarea",
        title: "description",
        placeholder: "Description",
      },
    ];
  }

  chooseDoctor = (event) => {
    let value = event.target.value;
    const form = document.querySelector("form");

    if (form) {
      this.createVisit.removeChild(form);
    }

    if (value === "Cardiologist") {
      this.visitDoctor = new VisitCardiologist(this.commonFields);
      return this.createVisit.append(this.visitDoctor.render());
    }
    if (value === "Dantist") {
      this.visitDoctor = new VisitDantist(this.commonFields);
      return this.createVisit.append(this.visitDoctor.render());
    }
    if (value === "Therapist") {
      this.visitDoctor = new VisitTherapist(this.commonFields);
      return this.createVisit.append(this.visitDoctor.render());
    }
  };

  render() {
    this.createVisit = this.createElement("div", ["create-visit"]);
    const select = new Select(
      ["Cardiologist", "Dantist", "Therapist"],
      "Doctor",
      this.chooseDoctor
    );
    this.createVisit.append(select.render());
    return this.createVisit;
  }
}
export const visit = new Visit();

class VisitCardiologist {
  constructor(commonFields) {
    this.commonFields = commonFields;
    this.createVisitForm = [
      ...this.commonFields,
      {
        field: "input",
        type: "text",
        title: "pressure",
        placeholder: "Norman pressure",
      },
      {
        field: "input",
        type: "text",
        title: "bodyMassIndex",
        placeholder: "Body Mass Index",
      },
      {
        field: "textarea",
        type: "textarea",
        title: "pastDiseases",
        placeholder: "Past diseases of the cardiovascular system",
      },
      { field: "input", type: "text", title: "age", placeholder: "Age" },
      {
        field: "button",
        type: "submit",
        text: "Create",
        eventListener: this.handlerCreateVisit,
      },
    ];
  }

  handlerCreateVisit = (e) => {
    const elements = e.target.elements;
    let formData = { doctor: "Cardiologist" };
    this.createVisitForm.forEach((el) => {
      if (el.title) {
        formData = { ...formData, [el.title]: elements[el.title].value };
      }
    });
    createVisit(formData).then((response) => {
      if (response) {
        renderAllCards();
        modal.hide();
      }
    });
  };

  render() {
    this.VisitCardiologist = new Form(this.createVisitForm);
    return this.VisitCardiologist.render();
  }
}

class VisitDantist {
  constructor(commonFields) {
    this.commonFields = commonFields;
    this.createVisitForm = [
      ...this.commonFields,
      {
        field: "input",
        type: "text",
        title: "dateLastVisit",
        placeholder: "Date of your last visit",
      },
      {
        field: "button",
        type: "submit",
        text: "Create",
        eventListener: this.handlerCreateVisit,
      },
    ];
  }

  handlerCreateVisit = (e) => {
    const elements = e.target.elements;
    let formData = { doctor: "Dantist" };
    this.createVisitForm.forEach((el) => {
      if (el.title) {
        formData = { ...formData, [el.title]: elements[el.title].value };
      }
    });
    createVisit(formData).then((response) => {
      if (response) {
        renderAllCards();
        modal.hide();
      }
    });
  };

  render() {
    this.VisitDantist = new Form(this.createVisitForm);
    return this.VisitDantist.render();
  }
}

class VisitTherapist {
  constructor(commonFields) {
    this.commonFields = commonFields;
    this.createVisitForm = [
      ...this.commonFields,
      { field: "input", type: "text", title: "age", placeholder: "Age" },
      {
        field: "button",
        type: "submit",
        text: "Create",
        eventListener: this.handlerCreateVisit,
      },
    ];
  }

  handlerCreateVisit = (e) => {
    const elements = e.target.elements;
    let formData = { doctor: "Therapist" };
    this.createVisitForm.forEach((el) => {
      if (el.title) {
        formData = { ...formData, [el.title]: elements[el.title].value };
      }
    });
    createVisit(formData).then((response) => {
      if (response) {
        renderAllCards();
        modal.hide();
      }
    });
  };

  render() {
    this.VisitTherapist = new Form(this.createVisitForm);
    return this.VisitTherapist.render();
  }
}
