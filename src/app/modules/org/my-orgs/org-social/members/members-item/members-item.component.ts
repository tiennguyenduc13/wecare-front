import { Component, OnInit, Input } from '@angular/core';
import * as healthUtil from '../../../../../../shared/healthUtil';
import * as _ from 'lodash';

@Component({
  selector: 'app-members-item',
  templateUrl: './members-item.component.html',
  styleUrls: ['./members-item.component.scss'],
})
export class MembersItemComponent implements OnInit {
  @Input() member: object;
  constructor() {}

  ngOnInit() {
    console.log('member ', this.member);
  }

  hasHealthProblem(): boolean {
    const masterSignal = healthUtil.findMasterHealthSignal(
      _.get(this.member, 'healthSignals', [])
    );
    return masterSignal !== 'normal';
  }
  getName() {
    return _.get(this.member, 'name', '');
  }
  getEmail() {
    return _.get(this.member, 'email', '');
  }
}
