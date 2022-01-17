import { ImageComponent } from './page/item/image.js';

export class PageComponent {
    private element: HTMLUListElement;
    private imgPage: ImageComponent;
    constructor() {
        this.element = document.createElement('ul');
        this.element.setAttribute('class','page');
        this.imgPage = new ImageComponent('제목','https://picsum.photos/300/150');
        this.imgPage.attachTo(this.element);
    };
    attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
        parent.insertAdjacentElement(position, this.element);
    }
}