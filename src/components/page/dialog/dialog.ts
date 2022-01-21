import { Composable } from '../../page.js';
import { BaseComponent, Component } from './../../component.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;
export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
  private onCloseListener?: OnCloseListener;
  private onSubmitListener?: OnSubmitListener;
  constructor() {
    super(`<dialog class="dialog">
            <div class="dialog__container">
              <button class="close">x</button>
              <div id="dialog__body"></div>
              <button class="submit">ADD</button>
            </div>
          </dialog>`);
    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    const submitBtn = this.element.querySelector('.submit')! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.onCloseListener && this.onCloseListener();
    };
    submitBtn.onclick = () => {
      this.onSubmitListener && this.onSubmitListener();
    }
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.onCloseListener = listener;
  }
  setOnSubmitListener(listener: OnSubmitListener) {
    this.onSubmitListener = listener;
  }
  addChild(child: Component) {
      const body = this.element.querySelector('#dialog__body')! as HTMLElement;
      child.attachTo(body);
  }
}