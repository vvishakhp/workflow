import { UIElement } from './uiElements';
import { Rectangle, RectangleVertex, Point } from './rectangle';

export class RectangleUIElement extends UIElement {

    private drawRectangle = true;
    private rect: SVGRectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    public constructor(public rectangle: Rectangle, drawRectangle = true, private cornerRadius = 5) {
        super();
        this.element = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.drawRectangle = drawRectangle;
        if (this.drawRectangle) {
            this.element.appendChild(this.rect);
        }
    }

    public updateAttr() {
        if (this.drawRectangle) {
            this.rect.setAttributeNS(null, 'height', this.rectangle.h.toString());
            this.rect.setAttributeNS(null, 'width', this.rectangle.w.toString());
            this.rect.setAttributeNS(null, 'fill', '#dff3fd');
            this.rect.setAttributeNS(null, 'stroke', '#00a2e5');
            this.rect.setAttributeNS(null, 'stroke-width', '1');
            this.rect.setAttributeNS(null, 'rx', this.cornerRadius.toString());
            this.rect.setAttributeNS(null, 'ry', this.cornerRadius.toString());

        }
        this.element.setAttributeNS(null, 'transform', `translate(` +
            `${this.rectangle.x - this.rectangle.w / 2},` +
            `${this.rectangle.y - this.rectangle.h / 2})`);
    }

    public updateStyle() {

    }

    public isPointInside(point: Point): boolean {
        return false;
    }

}
