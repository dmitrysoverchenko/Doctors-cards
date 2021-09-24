export class Element {
  createElement(tagName, classNames = [], text = "") {
    const element = document.createElement(tagName);
    if (text) {
      element.textContent = text;
    }
    element.classList.add(...classNames);
    return element;
  }

  addClass(element, classes = []) {
    element.classList.add(...classes);
  }
  removeClass(element, classes = []) {
    element.classList.remove(...classes);
  }
}

export class Input extends Element {
  constructor(
    type,
    name,
    placeholder = "",
    className = ["form-control"],
    value = "",
    handleChange
  ) {
    super();
    this.type = type;
    this.name = name;
    this.className = className;
    this.placeholder = placeholder;
    this.handleChange = handleChange;
    this.value = value;
  }

  render() {
    this.input = this.createElement("input", this.className);
    this.input.type = this.type;
    this.input.name = this.name;
    this.input.placeholder = this.placeholder;
    if (this.value) {
      this.input.value = this.value;
    }
    this.input.addEventListener("change", this.handleChange);
    return this.input;
  }
}

export class Select extends Element {
  constructor(
    options = [],
    name,
    placeholder = "",
    handleChange,
    className = ["form-control"],
    value = ""
  ) {
    super();
    this.options = options;
    this.name = name;
    this.placeholder = placeholder;
    this.className = className;
    this.value = value;
    this.handleChange = handleChange;
  }

  render() {
    this.selectWrapper = this.createElement("div", ["select-wrapper"]);
    this.selectPlaceholder = this.createElement(
      "p",
      ["select-placeholder"],
      this.placeholder
    );

    this.select = this.createElement("select", this.className);
    this.select.name = this.name;
    this.select.value = this.value;
    this.options.forEach((el) => {
      this.option = this.createElement("option", ["option"], el);
      if (this.value == el) {
        this.option.selected = true;
      }
      this.option.value = el;
      this.select.appendChild(this.option);
    });
    this.select.addEventListener("change", this.handleChange);

    this.selectWrapper.append(this.selectPlaceholder, this.select);
    return this.selectWrapper;
  }
}


export class Textarea extends Element {
  constructor(name, className, placeholder = "", value = "", handleChange) {
    super();
    this.name = name;
    this.className = className;
    this.handleChange = handleChange;
    this.value = value;
    this.placeholder = placeholder;
  }

  render() {
    this.textarea = this.createElement("textarea", this.className);
    this.textarea.name = this.name;
    this.textarea.placeholder = this.placeholder;
    this.textarea.value = this.value;

    return this.textarea;
  }
}

export class Button extends Element {
  constructor(type, text, className, handleClick) {
    super();
    this.type = type;
    this.text = text;
    this.className = className;
    this.handleClick = handleClick;
  }

  render() {
    this.button = this.createElement("button", this.className, this.text);
    this.button.type = this.type;
    this.button.addEventListener("click", this.handleClick);
    return this.button;
  }
}
