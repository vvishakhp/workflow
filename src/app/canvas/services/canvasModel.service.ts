import { Injectable } from '@angular/core';
import { CanvasViewService } from './canvasView.service';
import { SimpleActivityUIElement } from '../models/simpleActivityUIElement';
import { LinkedList } from 'typescript-collections';



@Injectable({ providedIn: 'root' })
export class CanvasModelService {

    public get xPadding() { return 300; }
    public get yPadding() { return 50; }

    public activityRegistry: Map<string, (x: number, y: number) => ActivityViewItem> = new Map();
    public activityItems: LinkedList<ActivityViewItem> = new LinkedList();

    public constructor(private canvasView: CanvasViewService) {

    }

    public addActivityType(name: string, constructFun: (x: number, y: number) => ActivityViewItem) {
        this.activityRegistry.set(name, constructFun);
    }

    public addActivity(type: string, parentId: string, atSlot: number): string {
        if (this.activityRegistry.has(type)) {
            if (this.activityItems.elementAtIndex(0)) {
                const parentItem = this.activityItems.toArray().find(item => item.id === parentId);
                if (parentItem) {
                    if (parentItem.numSlots >= atSlot) {
                        atSlot--;

                        // Add the activity Item
                        const newChild = this.activityRegistry.get(type)(parentItem.xIndex + atSlot, parentItem.yIndex + 1);
                        this.canvasView.addItem(newChild.ui);
                        newChild.children[0] = parentItem.children[atSlot];
                        const oldChild = parentItem.children[atSlot];
                        parentItem.children[atSlot] = newChild;

                        this.canvasView.addEdge(parentItem.ui, newChild.ui, atSlot);
                        if (oldChild) {
                            this.canvasView.addEdge(newChild.ui, oldChild.ui, 0);
                        }
                        this.activityItems.add(newChild);


                        return newChild.id;
                    } else {
                        throw new Error('Critical Error - trying to add at a slot that is not valid');
                    }
                } else {
                    throw new Error('Critical Error - No activity with the specified Parent Name : ' + parentId);
                }
            } else if (type === 'start') {
                const view = this.activityRegistry.get(type)(0, 0);
                this.activityItems.add(view);
                this.canvasView.addItem(view.ui);
                return view.id;
            }
        } else {
            throw new Error('Critical Error - Tried to add unknown activity type : ' + type);
        }
        return null;
    }
}

export class ActivityViewItem {

    private static idCounter = 0;

    xIndex = 0;
    yIndex = 0;

    id: string;
    ui: SimpleActivityUIElement;
    children: ActivityViewItem[];
    numSlots = 1;

    constructor() {

    }

    public static newId() {
        return 'id' + this.idCounter++;
    }
}
