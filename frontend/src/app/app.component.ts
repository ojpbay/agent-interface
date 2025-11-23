import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SidebarAssistantComponent } from './components/sidebar-assistant/sidebar-assistant.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
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
