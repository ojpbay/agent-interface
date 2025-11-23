import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { DocumentViewComponent } from './app/pages/document-view/document-view.component';
import { DocumentsIndexComponent } from './app/pages/documents-index/documents-index.component';

const routes = [
  { path: '', component: DocumentsIndexComponent },
  { path: 'documents', component: DocumentsIndexComponent },
  { path: 'documents/:id', component: DocumentViewComponent },
  { path: '**', redirectTo: '' },
];

if (process.env['NODE_ENV'] === 'production') {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideAnimations()],
}).catch((err) => console.error(err));
