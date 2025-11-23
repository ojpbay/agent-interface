import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParquetParserService } from '../../core/services/parquet-parser.service';
import { DocumentsStore } from '../../stores/documents.store';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-documents-upload',
  templateUrl: './documents-upload.component.html',
  styleUrls: ['./documents-upload.component.scss'],
  providers: [ParquetParserService],
})
export class DocumentsUploadComponent {
  error: string | null = null;
  private parser = inject(ParquetParserService);
  private docsStore = inject(DocumentsStore);

  async onFile(event: any) {
    const f: File = event.target.files[0];
    if (!f) return;
    if (!f.name.endsWith('.parquet')) {
      this.error = 'Only .parquet files are accepted for the prototype.';
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      this.error = 'File exceeds 2MB prototype size limit.';
      return;
    }
    this.error = null;
    const parsed = await this.parser.parse(f);
    const doc = this.docsStore.add({ filename: f.name, rawContent: JSON.stringify(parsed), contentType: f.type || 'application/parquet' });
    console.log('Added doc', doc);
  }
}
