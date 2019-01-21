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

    public addEdge(from: SimpleActivityUIElement, to: SimpleActivityUIElement, outboundConnectionSlot: number = 0): EdgeUIElement {
        const edgeItem: EdgeUIElement = new EdgeUIElement(from, to, outboundConnectionSlot);
        this.items.add(edgeItem);
        this.itemEvent.next({ type: ListEventType.ITEM_ADDED, item: edgeItem });
        return edgeItem;
    }
}


export enum ListEventType {
    LIST_CREATED, ITEM_ADDED, ITEM_REMOVED, ITEM_MODIFIED
}
