import { LinkedList } from 'typescript-collections';
import { UIElement } from '../models/uiElements';
import { EdgeUIElement } from '../models/EdgeUIElement';
import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { RectangleUIElement } from '../models/rectangleUIElement';
import { SimpleActivityUIElement, ExtrudeDirection } from '../models/simpleActivityUIElement';
import { Point } from '../models/rectangle';

@Injectable({ providedIn: 'root' })
export class CanvasViewService {

    itemEvent = new ReplaySubject<{ type: ListEventType, item: UIElement }>();

    items: LinkedList<UIElement> = new LinkedList();

    public constructor() {

    }


    public addItem(item: RectangleUIElement) {
        this.items.add(item);
        this.itemEvent.next({ type: ListEventType.ITEM_ADDED, item: item });
    }

    public removeItem(item: UIElement | number) {
        if (typeof item === 'number') {
            this.items.removeElementAtIndex(item);
        } else {
            this.items.remove(item);
        }
    }

    public subscribe(callback: (type: ListEventType, item: UIElement) => void) {
        this.itemEvent.subscribe(evt => {
            callback(evt.type, evt.item);
        });
    }

    public updateAll() {
        this.items.forEach(item => {
            item.updateAttr();
            item.updateStyle();
        });
    }

    public addEdge(from: SimpleActivityUIElement, to: SimpleActivityUIElement, outboundConnectionSlot: number = 0) {
        const edgeItem: EdgeUIElement = new EdgeUIElement();
        const fromEdge = from.getOutboundVertex(outboundConnectionSlot);
        const toEdge = to.getInboundVertex();

        edgeItem.addPoint(fromEdge.point);
        const p1 = this.movePoint(fromEdge.direction, fromEdge.point);
        const p2 = this.movePoint(toEdge.direction, toEdge.point);
        edgeItem.addPoint(p1);
        let _p1: Point, _p2: Point;
        if (p1.x <= p2.x) {

        } else {

        }

        edgeItem.addPoint(new Point(p1.x, p2.y));

        edgeItem.addPoint(p2);
        edgeItem.addPoint(toEdge.point);

        edgeItem.updateAttr();

        this.items.add(edgeItem);
        this.itemEvent.next({ type: ListEventType.ITEM_ADDED, item: edgeItem });
    }

    private movePoint(type: ExtrudeDirection, point: Point, length: number = 20): Point {
        const p = point.clone();
        p.x += (type === '+h') ? length : ((type === '-h') ? -length : 0);
        p.y += (type === '+v') ? length : ((type === '-v') ? -length : 0);
        return p;
    }
}


export enum ListEventType {
    LIST_CREATED, ITEM_ADDED, ITEM_REMOVED, ITEM_MODIFIED
}
