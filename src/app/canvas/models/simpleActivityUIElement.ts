import { Rectangle, Point } from './rectangle';
import { UIElement } from './uiElements';
import { RectangleUIElement } from './rectangleUIElement';

export type ExtrudeDirection = '+v' | '+h' | '-h' | '-v';

export class SimpleActivityUIElement extends RectangleUIElement {

    private inboundVertex: { point: Point, direction: ExtrudeDirection } = { point: new Point(), direction: '-v' };
    private outboundVertices: { point: Point, direction: ExtrudeDirection }[] = [];

    private labelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    public constructor(public rectangle: Rectangle, drawRectangle = true, updateSelf = true) {
        super(rectangle, drawRectangle);
        this.element.appendChild(this.labelElement);
        if (updateSelf) {
            this.updateAttr();
            this.updateStyle();
        }
    }

    private calcRatoPoint(ratioPoint: Point): Point {
        const x = this.rectangle.w * ratioPoint.x;
        const y = this.rectangle.h * ratioPoint.y;
        return new Point(x, y);
    }

    private calcAbsoluteRationPoint(point: Point) {
        const x = point.x / 2 + this.rectangle.x;
        const y = point.y / 2 + this.rectangle.y;
        return new Point(x, y);
    }

    public setInboundVertex(ratioPoint: Point, extrudeDirection: ExtrudeDirection = '+v') {
        this.inboundVertex.point = this.calcRatoPoint(ratioPoint);
    }

    public setOutboundVertices(...ratioPoints: { point: Point, direction: ExtrudeDirection }[]) {
        ratioPoints.forEach(point => {
            this.outboundVertices.push({
                point: this.calcRatoPoint(point.point), direction: point.direction
            });
        });
    }

    public getInboundVertex(): { point: Point, direction: ExtrudeDirection } {
        return {
            point: this.calcAbsoluteRationPoint(this.inboundVertex.point), direction: this.inboundVertex.direction
        };
    }

    public getOutboundVertex(index: number): { point: Point, direction: ExtrudeDirection } {
        return {
            point: this.calcAbsoluteRationPoint(this.outboundVertices[index].point),
            direction: this.outboundVertices[index].direction
        };
    }

    public setLabel(lblText: string) {
        this.labelElement.innerHTML = lblText;
    }

    public updateAttr() {
        super.updateAttr();
        this.labelElement.setAttributeNS(null, 'x', (this.rectangle.w / 2).toString());
        this.labelElement.setAttributeNS(null, 'y', (this.rectangle.h / 2).toString());
        this.labelElement.setAttributeNS(null, 'text-anchor', 'middle');
        this.labelElement.setAttributeNS(null, 'alignment-baseline', 'central');
    }

    public updateStyle() {
        super.updateStyle();
        this.labelElement.setAttributeNS(null, 'fill', '#00a2e5');
    }
    public isPointInside(point: Point): boolean {
        return super.isPointInside(point);
    }
}
