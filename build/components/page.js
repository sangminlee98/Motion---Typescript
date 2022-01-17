import { BaseComponent } from './component.js';
import { ImageComponent } from './page/item/image.js';
export class PageComponent extends BaseComponent {
    constructor() {
        super('<ul class="page"></ul>');
        const imgComponent = new ImageComponent('제목', 'https://picsum.photos/300/150');
        imgComponent.attachTo(this.element);
    }
    ;
}
