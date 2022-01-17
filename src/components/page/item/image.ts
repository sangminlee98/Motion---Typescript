import { BaseComponent } from '../../component.js';

export class ImageComponent extends BaseComponent<HTMLLIElement> {
    constructor(title: string, url: string) {
        super(`
        <li class="image">
            <div class="image__holder"><img class="image__thumbnail"></div>
            <p class="image__title"></p>
        </li>`);
        const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
        imageElement.src = url;
        const titleElement = this.element.querySelector('.image__title')! as HTMLParagraphElement;
        titleElement.textContent = title;        
    };
}