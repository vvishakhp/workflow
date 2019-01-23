import { Component } from '@angular/core';
import { delay } from 'q';
import { CanvasModelService, ActivityViewItem } from './canvas/services/canvasModel.service';
import { SvgUIElement } from './canvas/models/SvgUIElement';
import { Rectangle, Point } from './canvas/models/rectangle';
import { SimpleActivityUIElement } from './canvas/models/simpleActivityUIElement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workflow';

  constructor(private canvasModel: CanvasModelService) {


    this.addRegistryItems();

    this.addItems();
  }

  private async addItems() {
    await delay(500);
    let startId: string;
    let id = id1 = this.canvasModel.addActivity('start', null, 0);
    id = this.canvasModel.addActivity('simple_box', id1, 1);
    id = this.canvasModel.addActivity('simple_box', id, 1);
    id = this.canvasModel.addActivity('start', id, 1);
    id = this.canvasModel.addActivity('start', id, 1);
  }



  async delay(duration: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

  public addRegistryItems() {
    this.canvasModel.addActivityType('start', (xIndex: number, yIndex: number): ActivityViewItem => {
      const item = new ActivityViewItem();
      item.xIndex = xIndex;
      item.yIndex = yIndex;
      item.id = ActivityViewItem.newId();

      item.children = [null];
      item.numSlots = 1;
      item.ui = new SvgUIElement('start.icon.svg',
        new Rectangle(this.canvasModel.xPadding + (item.xIndex * 200),
          this.canvasModel.yPadding + (item.yIndex * 100), 50, 50));
      item.ui.setOutboundVertices({ point: new Point(0, 1), direction: '+v' });
      item.ui.setInboundVertex(new Point(0, -1), '-v');
      return item;
    });

    this.canvasModel.addActivityType('simple_box', (xIndex, yIndex) => {
      const item = new ActivityViewItem();
      item.xIndex = xIndex; item.yIndex = yIndex;
      item.id = ActivityViewItem.newId();

      item.children = [null];
      item.numSlots = 1;

      item.ui = new SimpleActivityUIElement(
        new Rectangle(this.canvasModel.xPadding + (item.xIndex * 200),
          this.canvasModel.yPadding + (item.yIndex * 100), 50, 120), true);

      item.ui.setLabel('Simple Box');

      item.ui.setOutboundVertices({ point: new Point(0, 1), direction: '+v' });
      item.ui.setInboundVertex(new Point(0, -1), '-v');
      return item;
    });

    this.canvasModel.addActivityType('stop', (xIndex, yIndex) => {
      const item = new ActivityViewItem();

      return item;
    });
  }
}

