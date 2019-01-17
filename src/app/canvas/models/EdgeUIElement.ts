import { Point } from './rectangle';
import { UIElement } from './uiElements';
import { PathGenerator } from './pathGenerator';

export class EdgeUIElement extends UIElement {
    public points: Point[] = [];
    public pathGen: PathGenerator;
    public path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    public constructor(...points: Point[]) {
        super();
        this.points = [...points];
        this.element = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.element.appendChild(this.path);
        this.updateAttr();
        this.updateStyle();
    }

    public addPoint(point: Point) {
        this.points.push(point);
    }

    public moveBy(point: Point) {
        this.points.forEach(p => p.moveBy(point));
        this.updateAttr();
    }

    public updateAttr() {
        this.pathGen = null;
        this.points.forEach(p => {
            if (this.pathGen) {
                this.pathGen.drawLine(p, 'L');
            } else {
                this.pathGen = new PathGenerator(p);
            }
        });
        if (this.pathGen) {
            this.path.setAttributeNS(null, 'd', this.pathGen.getPath());
        }
    }
    public updateStyle() {
        this.element.setAttributeNS(null, 'fill', 'none');
        if (this.highlighted) {
            this.element.setAttributeNS(null, 'stroke', 'green');
            this.element.setAttributeNS(null, 'stroke-width', '4');
        } else {
            this.element.setAttributeNS(null, 'stroke', 'black');
            this.element.setAttributeNS(null, 'stroke-width', '1');
            this.element.setAttributeNS(null, 'stroke-dasharray', 'none');
            this.element.setAttributeNS(null, 'marker-end', 'url(#triangle)');
        }
    }
    public isPointInside(point: Point) {
        const ofset = 3;
        return false;
    }
}
