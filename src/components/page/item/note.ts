import { BaseComponent } from '../../component.js';

export class NoteComponent extends BaseComponent<HTMLLIElement> {
  constructor(title: string, body: string) {
    super(`
    <li class="note">
      <h3 class="note__title"></h3>
      <p class="note__body"></p>
    </li>`);
    const titleElement = this.element.querySelector('.note__title')! as HTMLHeadingElement;
    titleElement.textContent = title;
    const bodyElement = this.element.querySelector('.note__body')! as HTMLParagraphElement;
    bodyElement.textContent = body;
  }
}