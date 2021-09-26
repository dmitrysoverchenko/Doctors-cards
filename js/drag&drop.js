function dragDrop() {
  const dropCards = document.querySelectorAll(".card");
  dropCards.forEach((el) => {
    document.ondragstart = () => false;
    el.getBoundingClientRect();
    let css = getComputedStyle(el);

    el.onmousedown = (e) => {
      el.style.position = "absolute";
      let saveX = e.offsetX;
      let saveY = e.offsetY;

      document.onmousemove = (e) => {
        el.style.position = "absolute";
        el.style.top = e.pageY - parseInt(css.margin) - saveY + "px";
        el.style.left = e.pageX - parseInt(css.margin) - saveX + "px";
      };
    };

    el.onmouseup = (e) => {
      document.onmousemove = () => false;
    };
  });
}

export default dragDrop;
