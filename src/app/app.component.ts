import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <app-visualizer></app-visualizer>
      <app-footer></app-footer>
  `
})
export class AppComponent {
  title = 'sorting-visualizer';
}
