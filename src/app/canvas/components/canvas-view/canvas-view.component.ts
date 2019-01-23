import {
  Component, OnInit, ViewChild, ElementRef, AfterViewInit,
} from '@angular/core';
import { Point } from '../../models/rectangle';
import { CanvasViewService, ListEventType } from '../../services/canvasView.service';
import { CanvasModelService } from '../../services/canvasModel.service';

@Component({
  selector: 'app-canvas-view',
  templateUrl: './canvas-view.component.html',
  styleUrls: ['./canvas-view.component.scss'],
  providers: [
    CanvasViewService,
    CanvasModelService
  ]
})
export class CanvasViewComponent implements OnInit, AfterViewInit {

  @ViewChild('svg_element', { read: ElementRef }) svg: ElementRef;

  public graphHeight = 500;
  public graphWidth = 500;

  public graphZoom = 0.75;
  public graphTranslate = new Point();

  public loading = true;

  constructor(public viewService: CanvasViewService, public modelService: CanvasModelService) {

  }


  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.viewService.subscribe((type, item) => {
      if (type === ListEventType.ITEM_ADDED) {
        this.loading = true;
        const svg = this.svg.nativeElement as SVGSVGElement;
        svg.appendChild(item.render());
        this.loading = false;
      }
      this.updateSvgSize();
    });
  }

  public updateSvgSize() {
    if (this.svg) {
      const svg = this.svg.nativeElement as SVGSVGElement;
      const box = svg.getBBox();
      this.graphHeight = (box.height < 600) ? 600 : box.height + 200;
      this.graphWidth = (box.width < 600) ? 600 : box.width + 200;

      svg.style.transform = `scale(${this.graphZoom}) translate(${this.graphTranslate.x}px, ${this.graphTranslate.y}px)`;
    }
  }
}
