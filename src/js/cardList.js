import LocalStorageAPI from './localStorageAPI';

export default class CardList {
  constructor(element, id) {
    this.element = element;
    this.id = id;
    this.onEdit = false;
    /**
      * Элементы формы добавления новой записи
      */
    this.openFormBtn = this.element.querySelector('.open-form');
    this.closeFormBtn = this.element.querySelector('.close-form');
    this.addForm = this.element.querySelector('.add-form');
    this.addForm.dataset.id = this.id;
    this.list = this.element.querySelector('.list');
    this.addBtn = this.element.querySelector('.add-item');
    this.input = this.element.querySelector('.input');
    /**
       * Записи внутри карточки
       */
    this.items = Array.from(this.element.querySelectorAll('.list-item'));
    /**
      * Добавление всех обработчиков на карточку
      */
    this.openFormBtn.onclick = this.openForm.bind(this);
    this.closeFormBtn.onclick = this.closeForm.bind(this);
    this.addBtn.onclick = this.addItemEvent.bind(this);
  }

  addDragDrop(obj) {
    this.dragDrop = obj;
  }

  /**
    * Добавляет обработчики на запись
    */
  getItems() {
    this.items = Array.from(this.element.querySelectorAll('.list-item'));
    LocalStorageAPI.setItems(this);
  }

  itemAddListeners(...items) {
    items.forEach((item) => {
      const deleteBtn = item.querySelector('.delete-item');
      const editBtn = item.querySelector('.edit-item');
      deleteBtn.onclick = this.removeItem.bind(this);
      editBtn.onclick = this.editItem.bind(this);
      this.dragDrop.addListeners(item);
    });
  }

  /**
    * Открывает форму добавления новой записи
    */
  openForm() {
    document.querySelectorAll('.add-form').forEach((form) => {
      form.classList.add('hidden');
    });
    document.querySelectorAll('.open-form').forEach((btn) => {
      btn.classList.remove('hidden');
    });
    this.addForm.classList.remove('hidden');
    this.openFormBtn.classList.add('hidden');
    this.input.focus();
  }

  /**
    * Закрывает форму добавления новой записи
    */
  closeForm() {
    this.addForm.classList.add('hidden');
    this.openFormBtn.classList.remove('hidden');
    this.input.value = '';
  }

  /**
    * Добавляет новую запись
    */
  addItem(text) {
    const li = document.createElement('li');
    li.classList.add('list-item');
    li.innerHTML = `<span class="list-item__text" tabindex="0">${text}</span><button class="delete-item"><img src="./img/cross.svg" alt="delete"></button><button class="edit-item"><img src="./img/edit.svg" alt="edit"></button>`;
    this.list.appendChild(li);
    this.addForm.classList.add('hidden');
    li.querySelector('.delete-item').addEventListener('click', this.removeItem.bind(this));
    this.itemAddListeners(li);
    this.items.push(li);
  }

  addItemEvent(e) {
    e.preventDefault();
    if (this.input.value.trim() === '') {
      this.input.focus();
      this.input.setAttribute('placeholder', 'Введите название карточки');
    } else {
      this.list.classList.remove('hidden');
      const text = this.input.value;
      this.input.value = '';
      this.addItem(text);
      LocalStorageAPI.setItems(this);
      this.input.removeAttribute('placeholder');
    }
    this.openFormBtn.classList.remove('hidden');
  }

  /**
    * Редактирует запись
    */
  editItem(e) {
    const item = e.target.closest('.list-item');
    const text = e.target.closest('.list-item').querySelector('.list-item__text');
    let input;
    if (this.onEdit === false) {
      this.onEdit = true;
      input = document.createElement('textarea');
      input.classList = text.classList;
      input.value = text.textContent;
      input.setAttribute('maxlength', '250');
      text.replaceWith(input);
      input.focus();
    }
    input.onblur = () => {
      setTimeout(() => {
        this.onEdit = false;
      }, 500);
      text.textContent = input.value.trim();
      input.replaceWith(text);
      this.dragDrop.addListeners(item);
      this.getItems();
      LocalStorageAPI.setItems(this);
    };
  }

  /**
    * Удаляет запись
    */
  removeItem(e) {
    e.target.closest('.list-item').remove();
    this.items = this.items.filter((item) => item !== e.target.closest('.list-item'));
    LocalStorageAPI.setItems(this);
  }
}
