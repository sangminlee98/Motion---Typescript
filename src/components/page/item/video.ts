import { BaseComponent } from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLLIElement> {
  constructor(title: string, sourceCode: string) {
    super(`
    <li class="video">
      <div class="video__holder"></div>
      <p class="video__title"></p>
    </li>`);
    const videoComponent = this.element.querySelector('.video__holder')! as HTMLElement;
    videoComponent.innerHTML = sourceCode;
    const iframeComponent = this.element.querySelector('iframe')! as HTMLIFrameElement;
    iframeComponent.style.width = '300px';
    iframeComponent.style.height = '150px';
    const titleComponent = this.element.querySelector('.video__title')! as HTMLParagraphElement;
    titleComponent.textContent = title;
  }
}