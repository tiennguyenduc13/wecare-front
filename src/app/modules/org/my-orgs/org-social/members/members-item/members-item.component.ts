import { Component, OnInit, Input } from '@angular/core';
import * as healthUtil from '../../../../../../shared/healthUtil';

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

  hasHealthProblem(healthSignals): boolean {
    const masterSignal = healthUtil.findMasterHealthSignal(healthSignals);
    return masterSignal !== 'normal';
  }
}
