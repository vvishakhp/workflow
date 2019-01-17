import {
  Component, OnInit, ViewChild, ElementRef, AfterViewInit,
} from '@angular/core';
import { Point, Rectangle } from '../../models/rectangle';
import { CanvasViewService, ListEventType } from '../../services/canvasView.service';

@Component({
  selector: 'app-canvas-view',
  templateUrl: './canvas-view.component.html',
  styleUrls: ['./canvas-view.component.scss']
})
export class CanvasViewComponent implements OnInit, AfterViewInit {

  @ViewChild('svg_element', { read: ElementRef }) svg: ElementRef;

  public graphHeight = 500;
  public graphWidth = 500;

  public graphZoom = 1;
  public graphTranslate = new Point();

  constructor(public viewService: CanvasViewService) {
  }


  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.viewService.subscribe((type, item) => {
      if (type === ListEventType.ITEM_ADDED) {
        const svg = this.svg.nativeElement as SVGSVGElement;
        svg.appendChild(item.render());
      }
      this.updateSvgSize();
    });
  }

  public updateSvgSize() {
    if (this.svg) {
      const svg = this.svg.nativeElement as SVGSVGElement;
      const box = svg.getBBox();
      this.graphHeight = (box.height < 500) ? 500 : box.height;
      this.graphWidth = (box.width < 500) ? 500 : box.width;

      svg.style.transform = `scale(${this.graphZoom}) translate(${this.graphTranslate.x}px, ${this.graphTranslate.y}px)`;
    }
  }
}
