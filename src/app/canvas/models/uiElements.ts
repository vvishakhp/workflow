import { Point } from './rectangle';

export abstract class UIElement {
    protected element: SVGElement;
    public selected = false;
    public highlighted = false;

    public render(): SVGElement {
        return this.element;
    }

    public setSelected(selected: boolean = true) {
        this.selected = selected;
        this.updateStyle();
    }

    public setHighlighted(highlighted: boolean = true) {
        this.highlighted = highlighted;
        this.updateStyle();
    }

    public abstract updateAttr();
    public abstract updateStyle();

    public abstract isPointInside(point: Point): boolean;
}


