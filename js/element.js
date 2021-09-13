class Element {
  createElement(tagName, classNames = [], text) {
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

export default Element;
