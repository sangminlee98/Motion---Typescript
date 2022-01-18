import { BaseComponent } from './component.js';
import { ImageComponent } from './page/item/image.js';
import { NoteComponent } from './page/item/note.js';
import { TodoComponent } from './page/item/todo.js';
import { VideoComponent } from './page/item/video.js';
export class PageComponent extends BaseComponent {
    constructor() {
        super('<ul class="page"></ul>');
        const imgComponent = new ImageComponent('제목', 'https://picsum.photos/300/150');
        imgComponent.attachTo(this.element);
        const noteComponent = new NoteComponent('Note', 'Note-body');
        noteComponent.attachTo(this.element);
        const todoComponent = new TodoComponent('Todo', 'first');
        todoComponent.attachTo(this.element);
        const videoComponent = new VideoComponent('제목', 'https://www.youtube.com/embed/n61ULEU7CO0');
        videoComponent.attachTo(this.element);
    }
    ;
}
