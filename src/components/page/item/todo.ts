import { BaseComponent } from './../../component.js';
export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, ...todoList: string[]) {
    super(`
    <section class="todo">
      <h3 class="todo__title"></h3>
      <ul class="todo__list">
      </ul>
    </section>`);
    const titleElement = this.element.querySelector('.todo__title')! as HTMLHeadingElement;
    titleElement.textContent = title;
    const listElement = this.element.querySelector('.todo__list')! as HTMLUListElement;
    todoList.map(list => {
      const listItem = document.createElement('li');
      const checkboxInput = document.createElement('input')! as HTMLInputElement;
      checkboxInput.type = 'checkbox';
      listItem.appendChild(checkboxInput);
      checkboxInput.insertAdjacentText('afterend',list);
      listElement.appendChild(listItem);
    });
  }
}