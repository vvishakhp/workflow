import { SimpleActivityUIElement } from './simpleActivityUIElement';
import { Rectangle, Point } from './rectangle';

export class SvgUIElement extends SimpleActivityUIElement {

    private svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'image');

    public constructor(private svgName: string, rectangle: Rectangle) {
        super(rectangle, false, false);
        this.element.appendChild(this.svgEl);
        this.updateAttr();
        this.updateStyle();
    }

    public updateAttr() {
        this.svgEl.setAttributeNS(null, 'href', '/assets/svg/' + this.svgName);
        this.svgEl.setAttributeNS(null, 'height', this.rectangle.h + '');
        this.svgEl.setAttributeNS(null, 'width', this.rectangle.w + '');
        this.setLabel('');
        super.updateAttr();
    }

    public updateStyle() {
        super.updateStyle();
    }

    // cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow"

}
