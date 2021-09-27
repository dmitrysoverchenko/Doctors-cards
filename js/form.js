import { Element, Input, Select, Textarea, Button } from "./elements.js";

export class Form extends Element {
  constructor(config) {
    super();
    this.config = config;
  }
  render() {
    this.containerForm = this.createElement("form", ["form-horizontal"]);
    const items = this.config.map((configItem) => {
      let element;
      if (configItem.typeField === "input") {
        const { type, name, placeholder, value, handlerChange } = configItem;
        let input = new Input(
          type,
          name,
          placeholder,
          ["input-form", "form-control"],
          value,
          handlerChange
        );
        element = input.render();
      }
      if (configItem.typeField === "select") {
        const {
          handlerChange,
          name,
          placeholder = "",
          options,
          value,
        } = configItem;
        let select = new Select(
          options,
          name,
          placeholder,
          handlerChange,
          ["form-control"],
          value
        );
        element = select.render();
      }
      if (configItem.typeField === "textarea") {
        const { name, placeholder, value } = configItem;
        let textarea = new Textarea(name, ["form-control"], placeholder, value);
        element = textarea.render();
      }
      if (configItem.typeField === "button") {
        const { type, text, functionClick } = configItem;
        this.containerForm.addEventListener("submit", function (e) {
          e.preventDefault();
          functionClick(e);
        });
        let button = new Button(type, text, ["btn", "btn-info"], functionClick);
        element = button.render();
      }
      return element;
    });
    this.containerForm.append(...items);
    return this.containerForm;
  }
}
