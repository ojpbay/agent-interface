import { inject, Injectable } from '@angular/core';
import { DocumentsStore } from '../../stores/documents.store';

@Injectable({ providedIn: 'root' })
export class AssistantService {
  public docsStore = inject(DocumentsStore);

  // Mocked reply: returns a short snippet referencing the document
  reply(documentId: string, question: string): string {
    const doc = this.docsStore.getById(documentId);
    if (!doc) return "I can't find that document.";
    const snippet = doc.rawContent ? doc.rawContent.toString().slice(0, 200) : '<no content>';
    return `Mock answer based on document '${doc.filename}': "${snippet.replace(/\n/g, ' ')}..."`;
  }
}
