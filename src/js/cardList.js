
export default class CardList {
   constructor(element) {
      this.element = element;
      // this.cards = [];
      // this.init();

      this.openFormBtn = this.element.querySelector('.open-form');
      this.closeFormBtn = this.element.querySelector('.close-form');
      this.addForm = this.element.querySelector('.add-form');


      this.list = this.element.querySelector('.list');
      this.listItem = this.element.querySelector('.list-item');
      this.addBtn = this.element.querySelector('.add-item');
      this.input = this.element.querySelector('.input');
      this.deleteBtn = this.element.querySelectorAll('.delete-item');
      this.deleteBtn.forEach(e => {
         e.onclick = this.removeItem.bind(this);
      })

      /**
       * Бинд обработчиков событий
       */
      this.openFormBtn.onclick = this.openForm.bind(this);
      this.closeFormBtn.onclick = this.closeForm.bind(this);
      this.addBtn.onclick = this.addItem.bind(this);
   }

   openForm() {
      this.addForm.classList.remove('hidden');
   }

   closeForm() {
      this.addForm.classList.add('hidden');
   }

   addItem(e) {
      e.preventDefault();
      const text = this.input.value;
      this.input.value = '';
      const li = document.createElement('li');
      li.classList.add('list-item');
      li.innerHTML = `<span class="list-item__text">${text}</span><button class="delete-item"><img src="./img/cross.svg" alt=""></button>`;
      this.list.appendChild(li);
      this.addForm.classList.add('hidden');
      li.querySelector('.delete-item').addEventListener('click', this.removeItem.bind(this));
   }

   removeItem(e) {
      e.target.closest('.list-item').remove();
      if (this.list.children.length === 0) {
         this.list.classList.add('hidden');
      }
   }

}

