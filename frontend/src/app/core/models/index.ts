export interface DocumentModel {
  id: string;
  filename: string;
  uploadedAt: string;
  rawContent: string;
  contentType?: string;
}
