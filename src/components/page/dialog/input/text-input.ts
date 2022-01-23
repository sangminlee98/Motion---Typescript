import { TextData } from './../dialog.js';
import { BaseComponent } from '../../../component.js';

export class TextSectionInput extends BaseComponent<HTMLElement> implements TextData {
  constructor() {
    super(`<div>
            <div class="form__container">
              <label for="title">Title</label>
              <input type="text" id="title">
            </div>
            <div class="form__container">
              <label for="body">Body</label>
              <textarea type="text" id="body" row=3></textarea>
            </div>
          </div>`);
  }
  get title(): string {
    const title = this.element.querySelector('#title')! as HTMLInputElement;
    return title.value;
  };
  get body(): string {
    const body = this.element.querySelector('#body')! as HTMLInputElement;
    return body.value;
  }
}