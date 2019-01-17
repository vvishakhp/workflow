import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

export class Point {
    public constructor(public x: number = 0, public y: number = 0) {

    }

    public clone() {
        return new Point(this.x, this.y);
    }

    public moveTo(point: Point): Point {
        this.x = point.x;
        this.y = point.y;
        return this;
    }

    public moveBy(point: Point): Point {
        this.x += point.x;
        this.y += point.y;
        return this;
    }
}

export class Rectangle extends Point {
    public constructor(public x: number, public y: number, public h: number, public w: number) {
        super(x, y);
    }

    public clone() {
        return new Rectangle(this.x, this.y, this.h, this.w);
    }

    public resizeTo(h: number, w: number) {
        this.h = h;
        this.w = w;
    }

    public resizeBy(h: number, w: number) {
        this.h += h;
        this.w += w;
    }

    public scale(factor: number) {
        this.h *= factor;
        this.w *= factor;
    }

    public isInside(point: Point): boolean {
        const h2 = this.h / 2;
        const w2 = this.w / 2;
        const p = new Point(Math.abs(point.x - this.x), Math.abs(point.y - this.y));
        return p.x <= w2 && p.y <= h2;
    }

    public getVertex(vetrex: RectangleVertex) {
        let x = 0; const x2 = this.w / 2;
        let y = 0; const y2 = this.h / 2;
        if (vetrex === RectangleVertex.TOP_LEFT) {
            x = this.x - x2;
            y = this.y - y2;
        } else if (vetrex === RectangleVertex.TOP_RIGHT) {
            x = this.x + x2;
            y = this.y - y2;
        } else if (vetrex === RectangleVertex.BOTTOM_LEFT) {
            x = this.x - x2;
            y = this.y + y2;
        } else if (vetrex === RectangleVertex.BOTTOM_RIGHT) {
            x = this.x + x2;
            y = this.y + y2;
        }
        return new Point(x, y);
    }
}

export enum RectangleVertex {
    TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT
}
