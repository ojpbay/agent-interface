import { Injectable } from '@angular/core';
import { DocumentModel } from '../models';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  private docs: DocumentModel[] = [];

  list(): DocumentModel[] {
    return this.docs.slice().reverse();
  }

  add(payload: Partial<DocumentModel>): DocumentModel {
    const doc: DocumentModel = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,
      filename: payload.filename || 'unnamed',
      uploadedAt: new Date().toISOString(),
      rawContent: payload.rawContent || '',
      contentType: payload.contentType || 'application/parquet',
    };
    this.docs.push(doc);
    return doc;
  }

  get(id: string) {
    return this.docs.find((d) => d.id === id) || null;
  }
}
