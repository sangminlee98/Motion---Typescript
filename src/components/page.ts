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
  muteChildren(state: 'mute' | 'unmute'): void;
  getBoundingRect(): DOMRect;
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
  muteChildren(state: 'mute' | 'unmute') {
    if(state === 'mute') {
      this.element.classList.add('mute-children');
    } else {
      this.element.classList.remove('mute-children');
    }
  }
  getBoundingRect(): DOMRect {
      return this.element.getBoundingClientRect();
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  private dropTarget?: SectionContainer;
  private dragTarget?: SectionContainer;
  private children = new Set<SectionContainer>();
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
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    if(!this.dropTarget) return;
    if(this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = event.clientY;
      const srcElement = this.dragTarget.getBoundingRect();
      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : 'afterend');
    }
  }
  addChild(section: Component) {
    const pageItemComponent = new this.pageItemConstructor()
    pageItemComponent.addChild(section);
    this.children.add(pageItemComponent);
    pageItemComponent.attachTo(this.element, 'beforeend');
    pageItemComponent.setOnCloseListener(() => {
      pageItemComponent.removeFrom(this.element);
      this.children.delete(pageItemComponent);
    });
    pageItemComponent.setOnDragStateListener((target: SectionContainer, state: DragState) => {
      switch(state) {
        case 'start' :
          this.dragTarget = target;
          this.updateSections('mute');
          break;
        case 'end' :
          this.dragTarget = undefined;
          this.updateSections('unmute');
          break;
        case 'enter' :
          this.dropTarget = target;
          break;
        case 'leave' :
          this.dropTarget = undefined;
          break;
        default :
          throw new Error(`unsupported state: ${state}`)
      }
    })
  }
  private updateSections(state: 'mute' | 'unmute') {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state);
    })
  }
}