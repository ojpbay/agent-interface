import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarAssistantComponent } from './components/sidebar-assistant/sidebar-assistant.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';

@Component({
  standalone: true,
  imports: [RouterModule, TopNavComponent, SidebarAssistantComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
