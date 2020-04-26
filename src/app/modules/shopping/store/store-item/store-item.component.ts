import { Component, OnInit, Input } from '@angular/core';
import { Invite } from 'src/app/models/invite.model';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss'],
})
export class StoreItemComponent implements OnInit {
  @Input() invite: Invite;
  constructor() {}

  ngOnInit() {
    console.log('Invite ', this.invite);
  }
}
