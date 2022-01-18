import { BaseComponent } from './../../component.js';
export class TodoComponent extends BaseComponent<HTMLLIElement> {
  constructor(title: string, ...todoList: string[]) {
    super(`
    <li class="todo">
      <h3 class="todo__title"></h3>
      <ul class="todo__list">
      </ul>
    </li>`);
    const titleComponent = this.element.querySelector('.todo__title')! as HTMLHeadingElement;
    titleComponent.textContent = title;
    const listComponent = this.element.querySelector('.todo__list')! as HTMLUListElement;
    todoList.map(list => {
      const listItem = document.createElement('li');
      listItem.textContent = list;
      listComponent.appendChild(listItem);
    });
  }
}