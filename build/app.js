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
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
        const imageBtn = document.querySelector('#new-image');
        imageBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const mediaSection = new MediaSectionInput();
            dialog.addChild(mediaSection);
            dialog.attachTo(dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const imgComponent = new ImageComponent(mediaSection.title, mediaSection.url);
                this.page.addChild(imgComponent);
                dialog.removeFrom(dialogRoot);
            });
        });
        const videoBtn = document.querySelector('#new-video');
        videoBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const mediaSection = new MediaSectionInput();
            dialog.addChild(mediaSection);
            dialog.attachTo(dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const videoComponent = new VideoComponent(mediaSection.title, mediaSection.url);
                this.page.addChild(videoComponent);
                dialog.removeFrom(dialogRoot);
            });
        });
        const noteBtn = document.querySelector('#new-note');
        noteBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const textSection = new TextSectionInput();
            dialog.addChild(textSection);
            dialog.attachTo(dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const noteComponent = new NoteComponent(textSection.title, textSection.body);
                this.page.addChild(noteComponent);
                dialog.removeFrom(dialogRoot);
            });
            const todoBtn = document.querySelector('#new-todo');
            todoBtn.addEventListener('click', () => {
                const dialog = new InputDialog();
                const textSection = new TextSectionInput();
                dialog.addChild(textSection);
                dialog.attachTo(dialogRoot);
                dialog.setOnCloseListener(() => {
                    dialog.removeFrom(dialogRoot);
                });
                dialog.setOnSubmitListener(() => {
                    const todoComponent = new TodoComponent(textSection.title, textSection.body);
                    this.page.addChild(todoComponent);
                    dialog.removeFrom(dialogRoot);
                });
            });
        });
    }
    ;
}
new App(document.querySelector('.document'), document.body);
