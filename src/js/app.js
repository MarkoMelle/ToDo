import CardList from './cardList';
import LocalStorageAPI from './localStorageAPI';
import DragAndDrop from './drag';

const cards = [];
let currentId = 0;
document.querySelectorAll('.list-container').forEach((card) => {
  cards.push(new CardList(card, currentId));
  currentId += 1;
});
const dragAndDrop = new DragAndDrop(cards);
cards.forEach((card) => {
  card.addDragDrop(dragAndDrop);
  card.itemAddListeners(...card.items);
});

LocalStorageAPI.getItems(...cards);
