
import LocalStorageAPI from "./localStorageAPI";

export default class DragAndDrop {
  constructor(cards) {
    this.cards = cards;
    this.isOutItem = false;
  }
  /**
   * Описывает всю логику перетаскивания карточки
   */
  dragAndDrop(event) {
    if (event.target.closest('img')) {
      return;
    }
    /**
     * Запрещаем выделение текста во время перетаскивания карточки
     */
    document.documentElement.setAttribute('onselectstart', "return false")
    /**
     * Исключаем перетаскивание вложенных элементов
     */
    const listItem = event.target.closest('.list-item');
    listItem.style.cursor = 'grabbing';

    /**
     * Фиксируем старую позицию карточки
     * 
     * Делаем клон карточки для отображения
     * предполагаемого места
     */
    const oldPosition = listItem.cloneNode(true)
    oldPosition.textContent = '';
    oldPosition.classList.add('hidden');
    listItem.parentNode.insertBefore(oldPosition, listItem);
    const newPosition = listItem.cloneNode(true)
    newPosition.classList.add('overlap');

    /**
     * Фиксируем положение курсора относительно карточки
     */
    let shiftX = event.clientX - listItem.getBoundingClientRect().left;
    let shiftY = event.clientY - listItem.getBoundingClientRect().top;
    let itemWidth = listItem.offsetWidth;

    /**
    * Переносим карточку в body
    */
    listItem.classList.add('list-item--dragged');
    document.body.append(listItem);
    oldPosition.parentNode.insertBefore(newPosition, oldPosition);

    moveAt(event.pageX, event.pageY);

    /**
     * Логика передвижения по viewport
     */
    function moveAt(pageX, pageY) {
      listItem.style.left = pageX - shiftX + 'px';
      listItem.style.top = pageY - shiftY + 'px';
      listItem.style.width = itemWidth + 'px';
    }

    /**
     * @currentDroppable потенциальный элемент для перетаскивания
     * @isDroppable доступен ли перенос карточки
     * @isItem перенос в список или между элементами
     */
    let currentDroppable = null;
    let isDroppable = false;
    let typeCurrent = false;
    let isItem = false;

    /**
     * Обработчик при движении мыши, куда и как может быть перенесена карточка
     */
    const onMouseMove = (event) => {
      moveAt(event.pageX, event.pageY);

      /**
     * @elemBelow элемент над которым курсор в данный момент
     */
      listItem.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      listItem.hidden = false;

      if (!elemBelow) return;
      /**
     * @droppableBelow ближайший доступный элемент от курсора
     */
      let droppableBelow = elemBelow.closest('.list-item') ? elemBelow.closest('.list-item') : elemBelow.closest('.list');
      /**
       * Отличаем попытку переноса в список от переноса между элементами
       */
      if (droppableBelow) {
        if (droppableBelow.classList.contains('list-item')) {
          typeCurrent = 'item';
        } else if (droppableBelow.classList.contains('list')) {
          typeCurrent = 'list';
        }
      } else {
        typeCurrent = 'container';
        droppableBelow = elemBelow.closest('.list-container');
      }
      /**
     * Обработка входа и выхода курсора в зону перетаскивания
     */
      if (currentDroppable != droppableBelow) {
        /**
       * Не в зоне переноса
       */
        if (currentDroppable) {
          if (currentDroppable.classList.contains('list-item')) {
            isItem = true;
          }
          isDroppable = false;
          if (currentDroppable.classList.contains('list-container')) {
            newPosition.classList.add('hidden');
          }
        }
        /**
         * В зоне переноса
         */
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          isDroppable = true;
          if (typeCurrent === 'item') {
            droppableBelow.parentNode.insertBefore(newPosition, droppableBelow);
          } else if (typeCurrent === 'list' && !isItem) {
            droppableBelow.append(newPosition);
          } else if (typeCurrent === 'container') {
            droppableBelow.querySelector('.list').append(newPosition);
          }

          newPosition.classList.remove('hidden');
        }
      }
    }
    /**
     * Обработчки на случай выхода курса за пределы страницы
     */

    document.addEventListener('mousemove', onMouseMove);

    /**
    * В обработчик завершения переноса карточки
    */

    listItem.onmouseup = () => {
      if (!isDroppable) {
        /**
        * Зона доступного переноса не достигнута, возвращаем элемент на место
        */
        newPosition.remove()
        document.documentElement.removeAttribute('onselectstart');
        listItem.removeAttribute('style');
        listItem.classList.remove('list-item--dragged');
        oldPosition.replaceWith(listItem)
      } else {
        /**
       * Перенос прошел успешно, удаляем старую позицию карточки и заменяем новую позицию на переносимый элемент
       */
        oldPosition.remove()
        document.documentElement.removeAttribute('onselectstart');
        listItem.removeAttribute('style');
        listItem.classList.remove('list-item--dragged');
        newPosition.replaceWith(listItem);
        this.cards.forEach((card) => {
          card.getItems();
        })
      }

      document.removeEventListener('mousemove', onMouseMove);
      listItem.onmouseup = null;
    };
  }
  /**
   * Добавляет обработчики на карточки
   */
  addListeners(...args) {
    args.forEach((item) => {
      item.addEventListener('mousedown', this.dragAndDrop.bind(this));
      item.ondragstart = (e) => {
        return false;
      }
    })
  }
  /**
  * Удаляет обработчики с карточки
  */
  removeListeners(...args) {
    args.forEach((item) => {
      item.removeEventListener('mousedown', this.dragAndDrop.bind(this));
    })
  }
}

