import { Component } from './components/component.js';
import { Composable, PageComponent, PageItemComponent } from './components/page.js'
import { InputDialog } from './components/page/dialog/dialog.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const imgComponent = new ImageComponent('이미지제목','https://picsum.photos/300/150');
    this.page.addChild(imgComponent);
    const videoComponent = new VideoComponent('비디오제목','https://www.youtube.com/watch?v=iZ9csAfU5Os');  
    this.page.addChild(videoComponent);
    const noteComponent = new NoteComponent('노트제목','노트내용');
    this.page.addChild(noteComponent);
    const todoComponent = new TodoComponent('TodoList','first','second');
    this.page.addChild(todoComponent);

    const imageBtn = document.querySelector('#new-image')! as HTMLButtonElement;
    imageBtn.addEventListener('click', () => {
      const dialog = new InputDialog();
      dialog.setOnCloseListener(() => {
        dialog.removeFrom(document.body);
      });
      dialog.setOnSubmitListener(() => {
        // 추가 이벤트
        dialog.removeFrom(document.body);
      });
      dialog.attachTo(document.body);
    })
  };
}

new App(document.querySelector('.document')! as HTMLElement);
