import { Component } from '@angular/core';
import { CanvasViewService } from './canvas/services/canvasView.service';
import { Rectangle, Point } from './canvas/models/rectangle';
import { RectangleUIElement } from './canvas/models/rectangleUIElement';
import { SimpleActivityUIElement } from './canvas/models/simpleActivityUIElement';
import { delay } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workflow';

  constructor(private canvasView: CanvasViewService) {
    this.addItems();
  }

  private async addItems() {
    await this.delay(2000);
    const rectangles: SimpleActivityUIElement[] = [];

    rectangles.push(this.createRectangle(new Point(100, 100), 'One'));
    rectangles.push(this.createRectangle(new Point(100, 300), 'Two'));
    rectangles.push(this.createRectangle(new Point(300, 100), 'Three'));
    rectangles.push(this.createRectangle(new Point(300, 300), 'Four'));
    rectangles.forEach(rect => {
      this.canvasView.addItem(rect);
    });

    const edge = this.canvasView.addEdge(rectangles[0], rectangles[0]);

    for (const source of rectangles) {
      for (const dest of rectangles) {
        if (source !== dest) {
          // await delay(1000);
          debugger;
          edge.fromVertex = source;
          edge.toVertex = dest;
          edge.updateAttr();
        }
      }
    }
  }

  private createRectangle(point: Point, label: string): SimpleActivityUIElement {
    const rectangle = new SimpleActivityUIElement(new Rectangle(point.x, point.y, 50, 120));
    rectangle.setLabel(label);
    rectangle.setInboundVertext(new Point(0, -1), '-v');
    rectangle.setOutboundVertices({ point: new Point(0, 1), direction: '+v' });
    return rectangle;
  }

  async delay(duration: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }
}

