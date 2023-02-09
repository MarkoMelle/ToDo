import CardList from "./cardList";
import DragDrop from "./drag";

// const cardList = new CardList();
const cards = [];
document.querySelectorAll('.list-container').forEach(card => {
   cards.push(new CardList(card));
})

const items = Array.from(document.querySelectorAll('.list-item'))

const dragDrop = new DragDrop(cards);

dragDrop.addListeners(...items );