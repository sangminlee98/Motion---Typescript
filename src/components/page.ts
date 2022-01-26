import { BaseComponent, Component } from './component.js';

export interface Composable {
  addChild(child: Component): void;
}
type DragState = 'start' | 'enter' | 'end' | 'leave';
type OnCloseListener = () => void;
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;
interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
}

export class PageItemComponent extends BaseComponent<HTMLLIElement> implements SectionContainer {
  private listener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>
  constructor() {
    super(
      `<li class="page-item" draggable="true">
        <section class="page-item__body"></section>
        <div class="page-item__controls">
          <button class="close">x</button>
        </div>
      </li>`);
      const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
      closeBtn.addEventListener('click', () => {
        this.listener && this.listener();
      });

      this.element.addEventListener('dragstart', (event: DragEvent) => {
        this.onDragStart(event);
      })
      this.element.addEventListener('dragend', (event: DragEvent) => {
        this.onDragEnd(event);
      })
      this.element.addEventListener('dragenter', (event: DragEvent) => {
        this.onDragEnter(event);
      })
      this.element.addEventListener('dragleave', (event: DragEvent) => {
        this.onDragLeave(event);
      })
  }
  onDragStart(_: DragEvent) {
    this.notifyDragObservers('start')
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObservers('end')
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObservers('enter')
  }
  onDragLeave(_: DragEvent) {
    this.notifyDragObservers('leave')
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  addChild(child: Component) {
    const container = this.element.querySelector('.page-item__body')! as HTMLElement;
    child.attachTo(container);
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.listener = listener;
  }
  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
    this.element.addEventListener('dragover', (event: DragEvent) => {
      this.onDragOver(event);
    })
    this.element.addEventListener('drop', (event: DragEvent) => {
      this.onDrop(event);
    })
  };
  onDragOver(event: DragEvent) {
    event.preventDefault();
    console.log('drag over', event)
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    console.log('drop', event);
  }
  addChild(section: Component) {
    const pageItemComponent = new this.pageItemConstructor()
    pageItemComponent.addChild(section);
    pageItemComponent.attachTo(this.element, 'beforeend');
    pageItemComponent.setOnCloseListener(() => {
      pageItemComponent.removeFrom(this.element);
    });
    pageItemComponent.setOnDragStateListener((target: SectionContainer, state: DragState) => {
      console.log(target, state);
    })
  }
}