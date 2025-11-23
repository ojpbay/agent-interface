import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { DocumentsStore } from '../../stores/documents.store';
import { DocumentsUploadComponent } from '../documents-upload/documents-upload.component';

@Component({
  standalone: true,
  imports: [CommonModule, DocumentsUploadComponent, MatCardModule, MatListModule, RouterModule],
  selector: 'app-documents-index',
  templateUrl: './documents-index.component.html',
  styleUrls: ['./documents-index.component.scss'],
})
export class DocumentsIndexComponent {
  public docsStore = inject(DocumentsStore);
}
