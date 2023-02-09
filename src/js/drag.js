
export default class DragDrop {
  constructor(cards) {
    this.cards = cards
  }
  overlap
  addListeners(...args) {
    args.forEach((item) => {
      item.addEventListener('mousedown', (event) => {
        if(event.target.closest('img')) {
          return;
        }
        const oldPosition = item.cloneNode(true)
        const newPosition = item.cloneNode(true)
        oldPosition.classList.add('overlap');
        newPosition.classList.add('overlap');


        let shiftX = event.clientX - item.getBoundingClientRect().left;
        let shiftY = event.clientY - item.getBoundingClientRect().top;
        let itemWidth = item.offsetWidth;
        item.before(oldPosition);

        item.classList.add('list-item--dragged');
        document.body.append(item);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
          item.style.left = pageX - shiftX + 'px';
          item.style.top = pageY - shiftY + 'px';
          item.style.width = itemWidth + 'px';
        }

        let currentDroppable = null;
        let isMoved = false;


        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);

          item.hidden = true;
          let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          item.hidden = false;

          if (!elemBelow) return;

          let droppableBelow = elemBelow.closest('.list');

          if (currentDroppable != droppableBelow) {
            if (currentDroppable) {
              isMoved = false;
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) {
              isMoved = true;
              droppableBelow.append(newPosition);
            }
          }
        }

        document.addEventListener('mousemove', onMouseMove);

        item.onmouseup = function () {
          if (!isMoved) {
            item.style = false;
            item.classList.remove('list-item--dragged');
            oldPosition.replaceWith(item);
          } else {
            item.style = false;
            item.classList.remove('list-item--dragged');
            newPosition.replaceWith(item);
            oldPosition.remove()
          }

          document.removeEventListener('mousemove', onMouseMove);
          item.onmouseup = null;
        };


      });
      item.ondragstart = (e) => {
        return false;
      }
    })
  }
}

