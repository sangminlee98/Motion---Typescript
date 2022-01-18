import { BaseComponent } from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLLIElement> {
  constructor(title: string, url: string) {
    super(`
    <li class="video">
      <div class="video__holder">
        <iframe
          class="video__iframe"
          width="300" 
          height="150" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
      <p class="video__title"></p>
    </li>`);
    const iframeElement = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
    iframeElement.src = url;
    const titleElement = this.element.querySelector('.video__title')! as HTMLParagraphElement;
    titleElement.textContent = title;
  }
}