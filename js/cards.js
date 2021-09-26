import { Element } from "./elements.js";
import { deleteCard } from "./API.js";
import { EditCard } from "./editCard.js";
import { getCards } from "./API.js";

export class AllCards extends Element {
  constructor(cards) {
    super();
    this.cards = cards;
  }

  render() {
    const wrapperCards = document.querySelector(".cards_wrapper");
    if (this.cards.length == 0) {
      wrapperCards.innerHTML = "";
      this.noItems = this.createElement(
        "div",
        ["no-items"],
        "There are no visits assigned"
      );
      wrapperCards.append(this.noItems);
    } else {
      wrapperCards.innerHTML = "";
      this.cards.forEach((card) => {
        const renderCard = new Card(card);
        wrapperCards.append(renderCard.render());
      });
    }
    return wrapperCards;
  }
}

export class Card extends Element {
  constructor(cardInfo) {
    super();
    this.cardInfo = cardInfo;
  }

  deleteCard = () => {
    deleteCard(this.cardInfo.id).then((res) => {
      renderAllCards();
    });
  };

  renderHeaderCard = () => {
    this.header = this.createElement("div", ["card-header"]);
    this.iconDiv = this.createElement("div", ["icon-div"]);
    this.deleteIcon = this.createElement("i", ["bi", "bi-trash-fill"]);
    this.deleteIcon.addEventListener("click", this.deleteCard);
    this.editIcon = this.createElement("i", ["bi", "bi-pencil-square"]);
    this.editIcon.addEventListener("click", () => {
      this.editCard = new EditCard(this.cardInfo);
      this.editCard.render();
    });
    this.doctor = this.createElement(
      "p",
      ["card-text", "card-text-header"],
      this.cardInfo.doctor
    );
    this.fullName = this.createElement(
      "p",
      ["card-text", "card-text-name"],
      `Patient name : ${this.cardInfo.fullName}`
    );
    this.leadMoreButton = this.createElement("i", [
      "bi",
      "bi-caret-down-square",
    ]);
    this.leadMoreButton.addEventListener("click", () => {
      const body = document.querySelector(`.card-body-${this.cardInfo.id}`);
      body.style.display = "block";
      this.leadMoreButton.style.display = "none";
    });
    this.iconDiv.append(this.editIcon, this.deleteIcon);
    this.header.append(
      this.iconDiv,
      this.doctor,
      this.fullName,
      this.leadMoreButton
    );
    return this.header;
  };
  renderTherapist = () => {
    this.purpose = this.createElement(
      "p",
      ["card-text"],
      `Purpose of visit : ${this.cardInfo.purposeOfVisit}`
    );
    this.urgent = this.createElement(
      "p",
      ["card-text", "urgency"],
      `Urgency : ${this.cardInfo.urgency}`
    );
    this.details = this.createElement(
      "p",
      ["card-text", "card-text-description"],
      `Description : ${this.cardInfo.description}`
    );
    this.patientAge = this.createElement(
      "p",
      ["card-text"],
      `Age : ${this.cardInfo.age}`
    );
    this.visitStatus = this.createElement(
      "p",
      ["card-text", "status"],
      this.cardInfo.status
    );
    this.bodyElement.push(
      this.purpose,
      this.urgent,
      this.details,
      this.patientAge,
      this.visitStatus
    );
  };
  renderDentist = () => {
    this.purpose = this.createElement(
      "p",
      ["card-text"],
      `Purpose of visit : ${this.cardInfo.purposeOfVisit}`
    );
    this.urgent = this.createElement(
      "p",
      ["card-text", "urgency"],
      `Urgency : ${this.cardInfo.urgency}`
    );
    this.details = this.createElement(
      "p",
      ["card-text", "card-text-description"],
      `Description : ${this.cardInfo.description}`
    );

    this.lastVisit = this.createElement(
      "p",
      ["card-text"],
      `Last visit : ${this.cardInfo.dateLastVisit}`
    );
    this.visitStatus = this.createElement(
      "p",
      ["card-text", "status"],
      this.cardInfo.status
    );
    this.bodyElement.push(
      this.purpose,
      this.urgent,
      this.details,
      this.lastVisit,
      this.visitStatus
    );
  };
  renderCardiologist = () => {
    this.purpose = this.createElement(
      "p",
      ["card-text"],
      `Purpose of visit : ${this.cardInfo.purposeOfVisit}`
    );
    this.urgent = this.createElement(
      "p",
      ["card-text", "urgency"],
      `Urgency : ${this.cardInfo.urgency}`
    );
    this.details = this.createElement(
      "p",
      ["card-text", "card-text-description"],
      `Description : ${this.cardInfo.description}`
    );
    this.patientAge = this.createElement(
      "p",
      ["card-text"],
      `Age : ${this.cardInfo.age}`
    );
    this.bodyMass = this.createElement(
      "p",
      ["card-text"],
      `Body mass index : ${this.cardInfo.bodyMassIndex}`
    );
    this.diseases = this.createElement(
      "p",
      ["card-text"],
      `Patient past diseases : ${this.cardInfo.pastDiseases}`
    );
    this.currentPressure = this.createElement(
      "p",
      ["card-text"],
      `Patient current pressure : ${this.cardInfo.pressure}`
    );
    this.visitStatus = this.createElement(
      "p",
      ["card-text", "status"],
      this.cardInfo.status
    );
    this.bodyElement.push(
      this.purpose,
      this.urgent,
      this.details,
      this.patientAge,
      this.bodyMass,
      this.diseases,
      this.currentPressure,
      this.visitStatus
    );
  };
  renderBody() {
    this.body = this.createElement("div", [`card-body-${this.cardInfo.id}`]);
    this.hideButton = this.createElement("i", ["bi", "bi-caret-up-square"]);
    this.hideButton.addEventListener("click", () => {
      const body = document.querySelector(`.card-body-${this.cardInfo.id}`);
      body.style.display = "none";
      this.leadMoreButton.style.display = "block";
    });
    this.body.style.display = "none";
    this.bodyElement = [];

    if (this.cardInfo.doctor === "Therapist") {
      this.renderTherapist();
    }
    if (this.cardInfo.doctor === "Dentist") {
      this.renderDentist();
    }
    if (this.cardInfo.doctor === "Cardiologist") {
      this.renderCardiologist();
    }
    this.body.append(...this.bodyElement, this.hideButton);

    return this.body;
  }

  render() {
    this.card = this.createElement("div", ["card"]);
    this.card.append(this.renderHeaderCard(), this.renderBody());
    return this.card;
  }
}

export const renderAllCards = async (filterCards) => {
  let cards;
  if (filterCards) {
    cards = filterCards;
  } else {
    cards = await getCards();
  }
  const renderCards = new AllCards(cards);
  renderCards.render();
};
