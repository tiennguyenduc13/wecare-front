import { Component, OnInit, Input } from '@angular/core';
import { Invite } from 'src/app/models/invite.model';

@Component({
  selector: 'app-members-item',
  templateUrl: './members-item.component.html',
  styleUrls: ['./members-item.component.scss'],
})
export class MembersItemComponent implements OnInit {
  @Input() invite: Invite;
  constructor() {}

  ngOnInit() {
    console.log('Invite ', this.invite);
  }
}
