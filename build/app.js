import { PageComponent, PageItemComponent } from './components/page.js';
import { InputDialog } from './components/page/dialog/dialog.js';
import { MediaSectionInput } from './components/page/dialog/input/media-input.js';
import { TextSectionInput } from './components/page/dialog/input/text-input.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
class App {
    constructor(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
        this.bindDialogToElement('#new-image', MediaSectionInput, input => new ImageComponent(input.title, input.url));
        this.bindDialogToElement('#new-video', MediaSectionInput, input => new VideoComponent(input.title, input.url));
        this.bindDialogToElement('#new-note', TextSectionInput, input => new NoteComponent(input.title, input.body));
        this.bindDialogToElement('#new-todo', TextSectionInput, input => new TodoComponent(input.title, input.body));
    }
    ;
    bindDialogToElement(selector, inputComponenet, makeSection) {
        const element = document.querySelector(selector);
        element.addEventListener('click', () => {
            const dialog = new InputDialog();
            const input = new inputComponenet();
            dialog.addChild(input);
            dialog.attachTo(this.dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const imgComponent = makeSection(input);
                this.page.addChild(imgComponent);
                dialog.removeFrom(this.dialogRoot);
            });
        });
    }
}
new App(document.querySelector('.document'), document.body);
