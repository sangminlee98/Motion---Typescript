import { BaseComponent, Component } from './component.js';

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;
class PageItemComponent extends BaseComponent<HTMLLIElement> implements Composable{
  private listener: OnCloseListener | undefined;
  constructor() {
    super(
      `<li class="page-item">
        <section class="page-item__body"></section>
        <div class="page-item__controls">
          <button class="close">x</button>
        </div>
      </li>`);
      const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
      closeBtn.addEventListener('click', () => {
        this.listener && this.listener();
      })
  }
  addChild(child: Component) {
    const container = this.element.querySelector('.page-item__body')! as HTMLElement;
    child.attachTo(container);
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.listener = listener;
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor() {
    super('<ul class="page"></ul>');
  };
  addChild(section: Component) {
    const pageItemComponent = new PageItemComponent();
    pageItemComponent.addChild(section);
    pageItemComponent.setOnCloseListener(() => {
      pageItemComponent.removeFrom(this.element);
    })
    pageItemComponent.attachTo(this.element, 'beforeend');
  }
}