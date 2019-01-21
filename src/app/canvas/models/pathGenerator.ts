import { Point } from './rectangle';

type MoveType = 'm' | 'M';
type MoveLineType = 'h' | 'H' | 'v' | 'V';
type LineType = 'l' | 'L';

export class PathGenerator {

    path = 'M';
    constructor(private start: Point, private cornerRadius = 0) {
        this.path += `${start.x},${start.y}`;
    }

    public move(to: Point, type: MoveType = 'm') {
        this.path += `${type}${to.x},${to.y}`;
    }

    public moveLine(to: number, type: MoveLineType) {
        this.path += `${type}${to}`;
    }

    public drawLine(to: Point, type: LineType = 'l') {
        this.path += `${type}${to.x},${to.y}`;
    }

    public getPath(): string {
        return this.path;
    }
}
