import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UsersService } from '../../services/users.service';
import { FormsModule } from '@angular/forms';
import { ChannelsService } from '../../services/channels.service';
import { SignalsService } from '../../services/signals.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService = inject(AuthenticationService);
  usersService = inject(UsersService);
  channelsService = inject(ChannelsService);
  signalService = inject(SignalsService);
  searchInput: string = '';
  hoverMenu: boolean = false;


  /** Logs out the current user and closes the logout popup. */
  logout() {
    this.authService.signOutUser();
  }

  get searchResultsChannel() {
    const searchTerm = this.searchInput.trim().toLowerCase();
    if (!searchTerm) return [];
    const matches = this.channelsService.channels.filter(channel =>
      channel.channelName.toLowerCase().includes(searchTerm)
    );
    return matches.length > 0 ? matches : [];
  }

  get searchResultsUser() {
    const searchTerm = this.searchInput.trim().toLowerCase();
    if (!searchTerm) return [];
    const matches = this.usersService.users.filter(user =>
      user.name.toLowerCase().includes(searchTerm)
    );
    return matches.length > 0 ? matches : [];
  }

  get searchResultsDirectMessages() {
    return '';
  }

  showThread(id: string) {
    localStorage.setItem("currentChannel", id);
    this.channelsService.subscribeToChannelMessages(id);
    this.signalService.scrollChannelToBottom.set(true);
  }

}
