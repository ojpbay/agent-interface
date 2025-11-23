import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DocumentsStore } from '../../stores/documents.store';
import { CommonModule } from '@angular/common';
import { PrettyJsonViewerComponent } from '../../components/pretty-json-viewer/pretty-json-viewer.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [CommonModule, PrettyJsonViewerComponent, MatButtonModule, RouterModule],
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss'],
})
export class DocumentViewComponent implements OnInit {
  doc: any | null = null;
  private route = inject(ActivatedRoute);
  private docsStore = inject(DocumentsStore);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.doc = this.docsStore.getById(id);
  }
}
