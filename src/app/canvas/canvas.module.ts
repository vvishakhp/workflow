import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasViewComponent } from './components/canvas-view/canvas-view.component';
import { CanvasViewService } from './services/canvasView.service';

@NgModule({
  declarations: [CanvasViewComponent],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [CanvasViewComponent]
})
export class CanvasModule { }
