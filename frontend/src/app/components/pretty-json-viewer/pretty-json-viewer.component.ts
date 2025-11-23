import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-pretty-json-viewer',
  templateUrl: './pretty-json-viewer.component.html',
  styleUrls: ['./pretty-json-viewer.component.scss'],
})
export class PrettyJsonViewerComponent implements OnChanges {
  @Input() jsonText = '';
  pretty = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (this.jsonText) {
      try {
        const parsed = JSON.parse(this.jsonText);
        this.pretty = JSON.stringify(parsed, null, 2);
      } catch (e) {
        // not JSON, show raw text
        this.pretty = this.jsonText;
      }
    } else {
      this.pretty = 'No content';
    }
  }
}
