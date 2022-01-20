import { BaseComponent, Component } from './component.js';

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
}

export class PageItemComponent extends BaseComponent<HTMLLIElement> implements SectionContainer {
  private listener?: OnCloseListener;
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
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
  };
  addChild(section: Component) {
    const pageItemComponent = new this.pageItemConstructor()
    pageItemComponent.addChild(section);
    pageItemComponent.setOnCloseListener(() => {
      pageItemComponent.removeFrom(this.element);
    })
    pageItemComponent.attachTo(this.element, 'beforeend');
  }
}
