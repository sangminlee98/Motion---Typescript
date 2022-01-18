import { BaseComponent } from '../../component.js';

export class NoteComponent extends BaseComponent<HTMLLIElement> {
  constructor(title: string, body: string) {
    super(`
    <li class="note">
      <h3 class="note__title"></h3>
      <p class="note__body"></p>
    </li>`);
    const titleComponent = this.element.querySelector('.note__title')! as HTMLHeadingElement;
    titleComponent.textContent = title;
    const bodyComponent = this.element.querySelector('.note__body')! as HTMLParagraphElement;
    bodyComponent.textContent = body;
  }
}