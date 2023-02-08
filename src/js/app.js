// const addForm = document.querySelector('.add-form');
// const openFormBtn = document.querySelector('.open-form');
// const closeFormBtn = document.querySelector('.close-form');

const cards = []

class cardList {
   constructor(element) {
      this.element = element;
      this.openFormBtn = this.element.querySelector('.open-form');
      this.closeFormBtn = this.element.querySelector('.close-form');
      this.addForm = this.element.querySelector('.add-form');
      this.list = this.element.querySelector('.list');
      this.listItem = this.element.querySelector('.list-item');
      this.deleteItem = this.element.querySelectorAll('.delete-item');
      this.deleteItem.forEach(e => {
         e.onclick = this.removeItem.bind(this);
      })

      this.openFormBtn.onclick = this.openForm.bind(this);
      this.closeFormBtn.onclick = this.closeForm.bind(this);
      // this.deleteItem.onclick = this.removeItem.bind(this);
   }

   openForm() {
      this.addForm.classList.remove('hidden');
   }

   closeForm() {
      this.addForm.classList.add('hidden');
   }

   // addItem() {

   // }

   removeItem(e) {
     e.target.closest('.list-item').remove();
     if(this.list.children.length === 0) {
      this.list.classList.add('hidden');
     }
   }
}

document.querySelectorAll('.list-container').forEach(card => {
   cards.push(new cardList(card));
})
