import { Point, RectangleVertex } from './rectangle';
import { UIElement } from './uiElements';
import { PathGenerator } from './pathGenerator';
import { SimpleActivityUIElement, ExtrudeDirection } from './simpleActivityUIElement';

export class EdgeUIElement extends UIElement {

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

    private movePoint(type: ExtrudeDirection, point: Point, length: number = 20): Point {
        const p = point.clone();
        p.x += (type === '+h') ? length : ((type === '-h') ? -length : 0);
        p.y += (type === '+v') ? length : ((type === '-v') ? -length : 0);
        return p;
    }

    public updateAttr() {
        const fromEdge = this.fromVertex.getOutboundVertex(this.outboundConnectionSlot);
        const toEdge = this.toVertex.getInboundVertex();

        const p1 = this.movePoint(fromEdge.direction, fromEdge.point);
        const p2 = this.movePoint(toEdge.direction, toEdge.point);

        const pathGen = new PathGenerator(fromEdge.point, 5, false);

        pathGen.addPoint(p1);
        if (p1.y < p2.y) {
            // Use straight connection
            pathGen.addPoint(new Point(p1.x, p2.y));
        } else {
            // Donot use straight connection
            const fromVert = this.fromVertex.rectangle.getVertex(RectangleVertex.TOP_LEFT);
            const toVert = this.toVertex.rectangle.getVertex(RectangleVertex.TOP_LEFT);
            const minX = Math.min(fromVert.x, toVert.x) - 20;
            const minY = Math.min(fromVert.y, toVert.y) - 20;

            pathGen.addPoint(new Point(minX, minY));
        }
        pathGen.addPoint(p2);

        pathGen.addPoint(toEdge.point);

        this.path.setAttributeNS(null, 'd', pathGen.getPath());
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
