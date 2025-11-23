import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { SidebarAssistantComponent } from './components/sidebar-assistant/sidebar-assistant.component';

@Component({
  standalone: true,
  imports: [RouterModule, TopNavComponent, SidebarAssistantComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
