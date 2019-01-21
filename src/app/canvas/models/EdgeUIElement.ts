import { Point, RectangleVertex } from './rectangle';
import { UIElement } from './uiElements';
import { PathGenerator } from './pathGenerator';
import { SimpleActivityUIElement, ExtrudeDirection } from './simpleActivityUIElement';
import { fromEvent } from 'rxjs';

export class EdgeUIElement extends UIElement {

    public points: Point[] = [];
    public pathGen: PathGenerator;
    public path = document.createElementNS('http://www.w3.org/2000/svg', 'path');


    public constructor(public fromVertex: SimpleActivityUIElement,
        public toVertex: SimpleActivityUIElement, private outboundConnectionSlot: number = 0) {
        super();

        this.element = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.element.appendChild(this.path);
        this.updateAttr();
        this.updateStyle();
    }

    public addPoint(point: Point) {
        if (point) {
            this.points.push(point);
        }
    }

    public moveBy(point: Point) {
        this.points.forEach(p => p.moveBy(point));
        this.updateAttr();
    }

    private movePoint(type: ExtrudeDirection, point: Point, length: number = 20): Point {
        const p = point.clone();
        p.x += (type === '+h') ? length : ((type === '-h') ? -length : 0);
        p.y += (type === '+v') ? length : ((type === '-v') ? -length : 0);
        return p;
    }

    public updateAttr() {

        const fromEdge = this.fromVertex.getOutboundVertex(this.outboundConnectionSlot);
        const toEdge = this.toVertex.getInboundVertex();

        this.clearPoints();
        this.addPoint(fromEdge.point);
        const p1 = this.movePoint(fromEdge.direction, fromEdge.point);
        const p2 = this.movePoint(toEdge.direction, toEdge.point);
        this.addPoint(p1);
        // tslint:disable-next-line:prefer-const
        let _p1: Point, _p2: Point;

        const minX = Math.min(this.fromVertex.rectangle.getVertex(RectangleVertex.TOP_LEFT).x,
            this.toVertex.rectangle.getVertex(RectangleVertex.TOP_LEFT).x);

        // if (p1.x > p2.x) {

        // } else if () {

        // }



        if (p1.y < p2.y && p1.x === p2.x) {
            _p1 = _p2 = null;
        } else {
            _p1 = new Point(minX - 20, p1.y);
            _p2 = new Point(minX - 20, p2.y);
        }

        this.addPoint(_p1); this.addPoint(_p2);


        // this.addPoint(new Point(p1.x, p2.y));

        this.addPoint(p2);
        this.addPoint(toEdge.point);


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

    public clearPoints() {
        this.points = [];
    }
}
