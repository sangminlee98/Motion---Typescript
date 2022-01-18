import { BaseComponent } from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLLIElement> {
  constructor(title: string, sourceCode: string) {
    super(`
    <li class="video">
      <div class="video__holder"></div>
      <p class="video__title"></p>
    </li>`);
    const videoElement = this.element.querySelector('.video__holder')! as HTMLElement;
    videoElement.innerHTML = sourceCode;
    const iframeElement = this.element.querySelector('iframe')! as HTMLIFrameElement;
    iframeElement.style.width = '300px';
    iframeElement.style.height = '150px';
    const titleElement = this.element.querySelector('.video__title')! as HTMLParagraphElement;
    titleElement.textContent = title;
  }
}