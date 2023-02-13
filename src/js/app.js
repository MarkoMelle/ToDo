import CardList from './CardList';
import LocalStorageAPI from './localStorageAPI';
import DragAndDrop from './Drag';

const cards = [];
let currentId = 0;
document.querySelectorAll('.list-container').forEach((card) => {
  cards.push(new CardList(card, currentId));
  currentId += 1;
});
const dragAndDrop = new DragAndDrop(cards);
cards.forEach((card) => {
  card.addDragDrop(dragAndDrop);
});

LocalStorageAPI.getItems(...cards);

/**
 * Обработчки на изменения внутри карточек(для drag&drop) и открытия формы. Когда открываем форму, другие закрываем.
*/

// let targets = Array.from(document.querySelectorAll('.list-container'));

// const config = {
//    childList: true,
//    attributes: true
// };

// let activeFormId =null;

// const callback = function (mutationsList) {
//    for (let mutation of mutationsList) {
//       if (mutation.type === 'attributes' && mutation.target.dataset.isChanged !== false && mutation.target.classList.contains('list')) {
//          cards.forEach(card => {
//             if(card.list.dataset.isChanged) {
//                card.getItems();
//             }
//          })
//          LocalStorageAPI.setItems(...cards);
//       } else if (mutation.type === 'attributes' && mutation.target.classList.contains('add-form')) {
//          if(activeFormId === null) {
//             activeFormId = mutation.target.dataset.id
//          } else if (!mutation.target.classList.contains('hidden')){
//             activeFormId = mutation.target.dataset.id;
//             cards.forEach(card => {
//                if(card.addForm.dataset.id !== activeFormId)
//                card.closeForm()
//             })
//          }

//       }
//    }
//    return;
// };
// const observer = new MutationObserver(callback);
// targets.forEach(target => {
//    observer.observe(target.querySelector('.list'), config);
//    observer.observe(target.querySelector('.add-form'), config);
// })
