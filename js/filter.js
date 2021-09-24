import { Element, Select, Input, Button } from "./elements.js";
import { renderAllCards } from "./cards.js";

export class Filter extends Element {
  constructor(cards) {
    super();
    this.cards = cards;
    this.filterCards = null;
  }

  render() {
    const filterWrapper = document.querySelector(".filter");
    this.inputSearch = new Input(
      "text",
      "search",
      "Search",
      ["form-control"],
      ""
    );

    this.selectStatus = new Select(
      ["All", "Open", "Done"],
      "status",
      "Status:"
    );
    this.selectPriority = new Select(
      ["All", "High", "Normal", "Low"],
      "urgency",
      "Urgency:"
    );

    this.searchButton = new Button(
      "button",
      "Search",
      ["btn", "enter-btn", "filter-btn"],
      this.search
    );
    filterWrapper.append(
      this.inputSearch.render(),
      this.selectStatus.render(),
      this.selectPriority.render(),
      this.searchButton.render()
    );
  }

  search = () => {
    const filteredCards = document.querySelectorAll(".card");
    const filteredInput = document.getElementsByName("search")[0];
    const filteredStatus = document.getElementsByName("status")[0];
    const filteredUrgency = document.getElementsByName("urgency")[0];
    filteredCards.forEach((el) => {
      const filterCardHeader = el.querySelector(".card-text-header");
      const filterCardDescription = el.querySelector(".card-text-description");
      const filterCardStatus = el.querySelector(".status");
      const filterCardUrgency = el.querySelector(".urgency");
      el.classList.add("card--hide");

      if (
        (filteredInput.value === "" ||
          filterCardHeader.textContent
            .toUpperCase()
            .includes(`${filteredInput.value}`.toUpperCase()) ||
          filterCardDescription.textContent
            .toUpperCase()
            .includes(`${filteredInput.value}`.toUpperCase())) &&
        (filteredStatus.options[filteredStatus.options.selectedIndex].value ===
          "All" ||
          filterCardStatus.textContent.includes(
            `${
              filteredStatus.options[filteredStatus.options.selectedIndex].value
            }`
          )) &&
        (filteredUrgency.options[filteredUrgency.options.selectedIndex]
          .value === "All" ||
          filterCardUrgency.textContent.includes(
            `${
              filteredUrgency.options[filteredUrgency.options.selectedIndex]
                .value
            }`
          ))
      ) {
        el.classList.remove("card--hide");
      }
    });
  };
}
