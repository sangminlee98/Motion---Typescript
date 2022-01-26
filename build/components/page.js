import { BaseComponent } from './component.js';
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`<li class="page-item" draggable="true">
        <section class="page-item__body"></section>
        <div class="page-item__controls">
          <button class="close">x</button>
        </div>
      </li>`);
        const closeBtn = this.element.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            this.listener && this.listener();
        });
        this.element.addEventListener('dragstart', (event) => {
            this.onDragStart(event);
        });
        this.element.addEventListener('dragend', (event) => {
            this.onDragEnd(event);
        });
        this.element.addEventListener('dragenter', (event) => {
            this.onDragEnter(event);
        });
        this.element.addEventListener('dragleave', (event) => {
            this.onDragLeave(event);
        });
    }
    onDragStart(_) {
        this.notifyDragObservers('start');
    }
    onDragEnd(_) {
        this.notifyDragObservers('end');
    }
    onDragEnter(_) {
        this.notifyDragObservers('enter');
    }
    onDragLeave(_) {
        this.notifyDragObservers('leave');
    }
    notifyDragObservers(state) {
        this.dragStateListener && this.dragStateListener(this, state);
    }
    addChild(child) {
        const container = this.element.querySelector('.page-item__body');
        child.attachTo(container);
    }
    setOnCloseListener(listener) {
        this.listener = listener;
    }
    setOnDragStateListener(listener) {
        this.dragStateListener = listener;
    }
}
export class PageComponent extends BaseComponent {
    constructor(pageItemConstructor) {
        super('<ul class="page"></ul>');
        this.pageItemConstructor = pageItemConstructor;
        this.element.addEventListener('dragover', (event) => {
            this.onDragOver(event);
        });
        this.element.addEventListener('drop', (event) => {
            this.onDrop(event);
        });
    }
    ;
    onDragOver(event) {
        event.preventDefault();
        console.log('drag over', event);
    }
    onDrop(event) {
        event.preventDefault();
        console.log('drop', event);
    }
    addChild(section) {
        const pageItemComponent = new this.pageItemConstructor();
        pageItemComponent.addChild(section);
        pageItemComponent.attachTo(this.element, 'beforeend');
        pageItemComponent.setOnCloseListener(() => {
            pageItemComponent.removeFrom(this.element);
        });
        pageItemComponent.setOnDragStateListener((target, state) => {
            console.log(target, state);
        });
    }
}
