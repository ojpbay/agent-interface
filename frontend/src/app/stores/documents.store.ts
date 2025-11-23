import { getState, patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { DocumentModel } from '../core/models';

export const DocumentsStore = signalStore(
  { providedIn: 'root' },
  withState({ documents: [
    {
      id: 'sample-1',
      filename: 'sample-invoice.parquet',
      uploadedAt: '2025-11-01T12:00:00.000Z',
      rawContent: JSON.stringify({ invoice: 123, total: 49.99, currency: 'USD' }),
      contentType: 'application/parquet',
    },
    {
      id: 'sample-2',
      filename: 'sample-report.parquet',
      uploadedAt: '2025-11-02T09:30:00.000Z',
      rawContent: JSON.stringify({ title: 'Quarterly Report', pages: 12 }),
      contentType: 'application/parquet',
    },
  ] as DocumentModel[] }),
  withMethods((store) => ({
    list(): DocumentModel[] {
      return getState(store).documents.slice().reverse();
    },

    add(payload: Partial<DocumentModel>): DocumentModel {
      const doc: DocumentModel = {
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
        filename: payload.filename || 'unnamed',
        uploadedAt: new Date().toISOString(),
        rawContent: payload.rawContent || '',
        contentType: payload.contentType || 'application/parquet',
      };
      patchState(store, (s) => ({ documents: [doc, ...s.documents] }));
      return doc;
    },

    getById(id: string) {
      return getState(store).documents.find((d) => d.id === id) || null;
    },

    setAll(docs: DocumentModel[]) {
      patchState(store, { documents: docs });
    },
  }))
);
