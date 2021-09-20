import { Element, Select, Input, Button } from "./elements.js";
import { renderAllCards } from "./cards.js";

export class Filter extends Element {
  constructor(cards) {
    super();
    this.cards = cards;
    this.filterCards = null;
  }

  filterForPriority = (e) => {
    const value = e.target.value;
    if (value !== "All") {
      this.filterCards = this.filterCards
        ? this.filterCards.filter((card) => card.priority === value)
        : this.cards.filter((card) => card.priority === value);
    } else {
      this.filterCards = this.cards;
    }
    renderAllCards(this.filterCards);
  };

  filterForStatus = (e) => {};

  handlerSearch = () => {
    const input = document.getElementsByName("search")[0];
    const value = input.value;
    if (value !== "") {
      this.filterCards = this.filterCards
        ? this.filterCards.filter((card) =>
            card.description.toUpperCase().includes(value.toUpperCase())
          )
        : this.cards.filter((card) =>
            card.description.toUpperCase().includes(value.toUpperCase())
          );
    } else {
      this.filterCards = this.cards;
    }
    renderAllCards(this.filterCards);
  };

  render() {
    const filterWrapper = document.querySelector(".filter");
    this.inputSearch = new Input(
      "text",
      "search",
      "Search",
      ["form-control"],
      "",
      this.handlerSearch
    );

    this.selectStatus = new Select(
      ["Status", "All", "Open", "Done"],
      "status",
      "Status",
      this.filterForStatus
    );
    this.selectPriority = new Select(
      ["Priority", "All", "High", "Normal", "Low"],
      "priority",
      "Priority",
      this.filterForPriority
    );

    this.searchButton = new Button(
      "button",
      "Search",
      ["btn", "btn-info", "enter-btn", "filter-btn"],
      this.handlerSearch
    );
    filterWrapper.append(
      this.inputSearch.render(),
      this.selectStatus.render(),
      this.selectPriority.render(),
      this.searchButton.render()
    );
  }
}
