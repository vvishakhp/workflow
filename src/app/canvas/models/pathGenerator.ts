import { Point } from './rectangle';

type MoveType = 'm' | 'M';
type HorizontalType = 'h' | 'H';
type VerticalType = 'v' | 'V';
type LineType = 'l' | 'L';

export class PathGenerator {

    path = 'M';
    constructor(private start: Point, private cornerRadius = 0) {
        this.path += `${start.x} ${start.y}`;
    }

    public move(to: Point, type: MoveType = 'm') {
        this.path += ` ${type} ${to.x} ${to.y}`;
    }

    public horizontal(to: number, type: HorizontalType = 'h') {
        this.path += ` ${type} ${to}`;
    }

    public vertical(to: number, type: VerticalType = 'v') {
        this.path += ` ${type} ${to}`;
    }

    public drawLine(to: Point, type: LineType = 'l') {
        this.path += ` ${type} ${to.x} ${to.y}`;
    }

    public getPath(): string {
        return this.path;
    }
}
