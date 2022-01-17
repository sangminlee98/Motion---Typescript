export class ImageComponent {
    private element: HTMLLIElement;
    constructor(title: string, url: string) {
        const template = document.createElement('template');
        template.innerHTML = `
        <li class="image">
            <div class="image__holder"><img class="image__thumbnail"></div>
            <p class="image__title"></p>
        </li>`;
        this.element = template.content.firstElementChild! as HTMLLIElement;
        const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
        imageElement.src = url;
        const titleElement = this.element.querySelector('.image__title')! as HTMLParagraphElement;
        titleElement.textContent = title;        
    };
    attachTo(parent: HTMLElement, position: InsertPosition='afterbegin') {
        parent.insertAdjacentElement(position, this.element);
    }
}