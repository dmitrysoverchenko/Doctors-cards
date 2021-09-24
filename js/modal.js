import { Element } from "./elements.js";

export class Modal extends Element {
  constructor() {
    super();
  }
  show = () => {
    this.addClass(this.modalContainer, ["show"]);
  };

  hide = () => {
    this.removeClass(this.modalContainer, ["show"]);
    this.modalContainer.remove();
  };

  renderHeader(titleText) {
    this.modalHeader = this.createElement("div", ["modal-header"]);
    this.header = this.createElement("h2", ["header"], titleText);

    this.modalHeader.append(this.header);
    return this.modalHeader;
  }

  renderBody(bodyText) {
    this.modalBody = this.createElement("div", ["modal-body"]);
    this.modalBody.append(bodyText);
    return this.modalBody;
  }

  renderFooter() {
    this.modalFooter = this.createElement("div", ["modal-footer"]);
    this.button = this.createElement(
      "button",
      ["btn", "btn-outline-secondary"],
      "Close"
    );
    this.button.addEventListener("click", this.hide);
    this.modalFooter.append(this.button);

    return this.modalFooter;
  }

  render(titleText, bodyText) {
    this.modalContainer = this.createElement("div", ["modal"]);
    this.modalContainer.addEventListener("click", this.hide);
    const modalDialog = this.createElement("div", ["modal-dialog"]);
    const modalContent = this.createElement("div", ["modal-content"]);
    modalContent.addEventListener("click", (e) => e.stopPropagation());
    this.modalContainer.append(modalDialog);
    modalDialog.append(modalContent);
    modalContent.append(
      this.renderHeader(titleText),
      this.renderBody(bodyText),
      this.renderFooter()
    );
    return this.modalContainer;
  }
}
export const modal = new Modal();
