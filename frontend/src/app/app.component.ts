import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarAssistantComponent } from './components/sidebar-assistant/sidebar-assistant.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppStore } from './stores/app.store';

@Component({
  standalone: true,
  imports: [RouterModule, TopNavComponent, SidebarAssistantComponent, MatSidenavModule, MatIconModule, MatButtonModule, MatToolbarModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public appStore = inject(AppStore);
}
