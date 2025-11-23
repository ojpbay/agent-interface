import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { AssistantService } from '../../core/services/assistant.service';
import { ChatStore } from '../../stores/chat.store';
import { DocumentsStore } from '../../stores/documents.store';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatListModule, MatInputModule, MatButtonModule],
  selector: 'app-sidebar-assistant',
  templateUrl: './sidebar-assistant.component.html',
  styleUrls: ['./sidebar-assistant.component.scss'],
  styles: [],
})
export class SidebarAssistantComponent implements OnInit {
  selectedDocumentId: string | null = null;
  inputText = '';
  private assistant: AssistantService = inject(AssistantService);
  public docsStore = inject(DocumentsStore);
  public chatStore = inject(ChatStore);

  ngOnInit(): void {
    const list = this.docsStore.list();
    if (list.length) this.selectedDocumentId = list[0].id;
    // messages are stored in ChatStore (signals)
  }

  onSelect(id: string) {
    this.selectedDocumentId = id;
  }

  send() {
    if (!this.inputText || !this.selectedDocumentId) return;
    const userMsg = { role: 'user', text: this.inputText, timestamp: new Date().toISOString() };
    this.chatStore.addMessage(this.selectedDocumentId, userMsg);
    const resp = this.assistant.reply(this.selectedDocumentId, this.inputText);
    this.chatStore.addMessage(this.selectedDocumentId, { role: 'assistant', text: resp, timestamp: new Date().toISOString() });
    this.inputText = '';
  }
}
