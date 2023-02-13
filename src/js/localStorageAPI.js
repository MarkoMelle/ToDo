export default class LocalStorageAPI {
  static setItems(...cards) {
    cards.forEach((card) => {
      let items = card.items.map((item) => {
        if (item.textContent !== '') {
          return item.textContent;
        }
        return undefined;
      });
      items = items.filter((e) => e !== undefined);
      localStorage.setItem(card.id, JSON.stringify(items));
    });
  }

  static getItems(...cards) {
    cards.forEach((card) => {
      try {
        if (localStorage[card.id]) {
          const items = JSON.parse(localStorage[card.id]);
          items.forEach((item) => {
            card.addItem(item);
          });
        }
      } catch (error) {
        const message = document.querySelector('.message');
        message.classList.remove('hidden');
        setTimeout(() => message.classList.add('hidden'), 7000);
        localStorage.removeItem(card.id);
      }
    });
  }
}
