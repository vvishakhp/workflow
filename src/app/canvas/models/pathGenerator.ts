import { Point } from './rectangle';

type MoveType = 'm' | 'M';
type MoveLineType = 'h' | 'H' | 'v' | 'V';
type LineType = 'l' | 'L';

export class PathGenerator {

    path = 'M';
    private previousPoint: Point = null;

    constructor(private start: Point, private cornerRadius = 5, private allowDiagonalLines = false) {
        this.path += `${start.x},${start.y}`;
        this.previousPoint = start;
    }

    public move(to: Point, type: MoveType = 'm') {
        this.path += `${type}${to.x},${to.y}`;
    }

    public addPoint(point: Point) {
        if (this.allowDiagonalLines) {
            this.drawLine(point, 'L');
        } else {
            if (this.previousPoint.x === point.x) {
                this.moveLine(point.y, 'V');
            } else if (this.previousPoint.y === point.y) {
                this.moveLine(point.x, 'H');
            } else {
                this.moveLine(point.x, 'H');
                this.moveLine(point.y, 'V');
            }
        }

        this.previousPoint = point;
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
