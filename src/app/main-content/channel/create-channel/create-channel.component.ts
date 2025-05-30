import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ChannelInterface } from '../../../interfaces/channel.interface';
import { Timestamp } from 'firebase/firestore';
import { ChannelsService } from '../../../services/channels.service';
import { SignalsService } from '../../../services/signals.service';

@Component({
  selector: 'app-create-channel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss'
})
export class CreateChannelComponent {

  signalService = inject(SignalsService);
  channelService = inject(ChannelsService);
  channelNameInput: string = "";
  channelDescriptionInput: string = "";

  submitForm(ngForm: NgForm) {
    if (!ngForm.valid) return
    const channelData: ChannelInterface = {
      createdAt: Timestamp.fromDate(new Date()),
      channelName: this.channelNameInput,
      channelDescription: this.channelDescriptionInput,
      members: [],
    }
    // implement check for existing channelname
    // if channelNameInput === database channel name => return
    // console.log(channelData);
    this.channelService.addChannel(channelData);
    ngForm.reset();
  } 
}
