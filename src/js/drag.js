const items = document.querySelector('.items');

const itemsElements = document.querySelector('.items-item');

let activeItem;

const onMouseOver = (e) => {
  activeItem.style.top = e.clientY + 'px';
  activeItem.style.left = e.clientX + 'px';
}


const onMouseup = (e) => {
  let mouseUpItem
  if (e.target.classList.contains('items-item')) {
    mouseUpItem = e.target;
  } else {
    mouseUpItem = activeItem
  }
  items.insertBefore(activeItem, mouseUpItem)

  activeItem.classList.remove('dragged');
  activeItem = null;
  document.documentElement.removeEventListener('mouseup', onMouseup);
  document.documentElement.removeEventListener('mouseover', onMouseOver);
}



items.addEventListener('mousedown', (e) => {
  e.preventDefault();
  activeItem = e.target;
  activeItem.classList.add('dragged');

  document.documentElement.addEventListener('mouseup', onMouseup);
  document.documentElement.addEventListener('mousemove', onMouseOver);
})