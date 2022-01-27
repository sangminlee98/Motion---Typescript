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
    muteChildren(state) {
        if (state === 'mute') {
            this.element.classList.add('mute-children');
        }
        else {
            this.element.classList.remove('mute-children');
        }
    }
}
export class PageComponent extends BaseComponent {
    constructor(pageItemConstructor) {
        super('<ul class="page"></ul>');
        this.pageItemConstructor = pageItemConstructor;
        this.children = new Set();
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
        console.log('drop');
        if (!this.dropTarget)
            return;
        if (this.dragTarget && this.dragTarget !== this.dropTarget) {
            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, 'beforebegin');
        }
    }
    addChild(section) {
        const pageItemComponent = new this.pageItemConstructor();
        pageItemComponent.addChild(section);
        this.children.add(pageItemComponent);
        pageItemComponent.attachTo(this.element, 'beforeend');
        pageItemComponent.setOnCloseListener(() => {
            pageItemComponent.removeFrom(this.element);
            this.children.delete(pageItemComponent);
        });
        pageItemComponent.setOnDragStateListener((target, state) => {
            switch (state) {
                case 'start':
                    this.dragTarget = target;
                    this.updateSections('mute');
                    break;
                case 'end':
                    this.dragTarget = undefined;
                    this.updateSections('unmute');
                    break;
                case 'enter':
                    console.log('enter', target);
                    this.dropTarget = target;
                    break;
                case 'leave':
                    console.log('leave', target);
                    this.dropTarget = undefined;
                    break;
                default:
                    throw new Error(`unsupported state: ${state}`);
            }
        });
    }
    updateSections(state) {
        this.children.forEach((section) => {
            section.muteChildren(state);
        });
    }
}
