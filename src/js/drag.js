
export default class DragDrop {
  constructor(cards) {
    this.cards = cards;
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
    let isItem = false;

    /**
     * Обработчик при движении мыши, куда и как может быть перенесена карточка
     */
    function onMouseMove(event) {
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
      let droppableBelow = elemBelow.closest('.list-container');
      /**
       * Отличаем попытку переноса в список от переноса между элементами
       */
      if (droppableBelow) {
        droppableBelow = elemBelow.closest('.list-item') ? elemBelow.closest('.list-item') : elemBelow.closest('.list-container');
        if (droppableBelow.classList.contains('list-item')) {
          isItem = true;
        } else {
          isItem = false;
        }
      }
      /**
     * Обработка входа и выхода курсора в зону перетаскивания
     */
      if (currentDroppable != droppableBelow) {
        /**
       * Не в зоне переноса
       */
        if (currentDroppable) {
          isDroppable = false;
          newPosition.classList.add('hidden');
        }
        /**
         * В зоне переноса
         */
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          isDroppable = true;
          newPosition.classList.remove('hidden');
          if (isItem) {
            droppableBelow.parentNode.insertBefore(newPosition, droppableBelow);
          } else {
            droppableBelow.querySelector('.list').append(newPosition);
          }
        }
      }
    }
    document.addEventListener('mousemove', onMouseMove);
    /**
    * В обработчик завершения переноса карточки
    */
    listItem.onmouseup = function () {
      if (!isDroppable) {
        /**
        * Зона доступного переноса не достигнута, возвращаем элемент на место
        */
        document.documentElement.removeAttribute('onselectstart');
        listItem.removeAttribute('style');
        listItem.classList.remove('list-item--dragged');
        oldPosition.replaceWith(listItem)
      } else {
        /**
       * Перенос прошел успешно
       */
        document.documentElement.removeAttribute('onselectstart');
        listItem.removeAttribute('style');
        listItem.classList.remove('list-item--dragged');
        newPosition.replaceWith(listItem);
      }
      /**
       * Удаляем стандартный обработчик браузера
       */
      document.removeEventListener('mousemove', onMouseMove);
      listItem.onmouseup = null;
    };
  }
  /**
   * Добавляет обработчики на карточки
   */
  addListeners(...args) {
    args.forEach((item) => {
      item.addEventListener('mousedown', this.dragAndDrop);
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
      item.removeEventListener('mousedown', this.dragAndDrop);
    })
  }
}

