import DragDrop from "./drag";

export default class CardList {
   constructor(element) {
      this.element = element;
      this.cards = [];
      this.dragDrop = new DragDrop()
      /**
       * Элементы формы добавления новой карточки
       */
      this.openFormBtn = this.element.querySelector('.open-form');
      this.closeFormBtn = this.element.querySelector('.close-form');
      this.addForm = this.element.querySelector('.add-form');
      this.list = this.element.querySelector('.list');
      this.listItem = this.element.querySelector('.list-item');
      this.addBtn = this.element.querySelector('.add-item');
      this.input = this.element.querySelector('.input');
      /**
       * Карточки внутри контейнера
       */
      this.items = Array.from(this.element.querySelectorAll('.list-item'))
      /**
       * Добавление всех обработчиков на карточку
       */
      this.itemAddListeners(...this.items);
      /**
       * Бинд обработчиков событий
       */
      this.openFormBtn.onclick = this.openForm.bind(this);
      this.closeFormBtn.onclick = this.closeForm.bind(this);
      this.addBtn.onclick = this.addItem.bind(this);
   }
   /**
    * Добавляет обработчики на карточку
    */
   itemAddListeners(...items) {
      items.forEach(item => {
         let deleteBtn = item.querySelector('.delete-item');
         let editBtn = item.querySelector('.edit-item');

         deleteBtn.onclick = this.removeItem.bind(this);
         editBtn.onclick = this.editItem.bind(this);
         this.dragDrop.addListeners(item);
      })
   }
   /**
    * Открывает форму добавления новой карточки
    */
   openForm() {
      this.addForm.classList.remove('hidden');
   }
   /**
    * Закрывает форму добавления новой карточки
    */
   closeForm() {
      this.addForm.classList.add('hidden');
   }
   /**
    * Добавляет новую карточку
    */
   addItem(e) {
      e.preventDefault();
      this.list.classList.remove('hidden');
      const text = this.input.value;
      this.input.value = '';
      const li = document.createElement('li');
      li.classList.add('list-item');
      li.innerHTML = `<span class="list-item__text">${text}</span><button class="delete-item"><img src="./img/cross.svg" alt=""></button><button class="edit-item"><img src="./img/edit.svg" alt="edit"></button>`;
      this.list.appendChild(li);
      this.addForm.classList.add('hidden');
      li.querySelector('.delete-item').addEventListener('click', this.removeItem.bind(this));
      this.itemAddListeners(li)
   }
   /**
    * Редактирует карточку
    */
   editItem(e) {
      const item = e.target.closest('.list-item');
      const text = e.target.closest('.list-item').querySelector('.list-item__text');

      const input = document.createElement('textarea');
      input.classList = text.classList
      input.value = text.textContent;
      input.setAttribute('maxlength', '250')
      text.replaceWith(input);

      this.dragDrop.removeListeners(item);
      input.focus();
      input.onblur = () => {
         text.textContent = input.value;
         input.replaceWith(text);
         this.dragDrop.addListeners(item)
      };
   }
   /**
    * Удаляет карточку
    */
   removeItem(e) {
      e.target.closest('.list-item').remove();
      if (this.list.children.length === 0) {
         this.list.classList.add('hidden');
      }
      this.items = this.items.filter(item => item !== e.target.closest('.list-item'));
   }
}

