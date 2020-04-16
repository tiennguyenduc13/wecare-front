import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { OrgService } from 'src/app/services/org.service';
import { Profile } from 'src/app/models/profile.model';
import { ActivatedRoute } from '@angular/router';
import { Org } from 'src/app/models/org.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  isLoading = false;
  org: Org;
  members: Profile[] = [];

  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private orgService: OrgService,
    private authService: AuthService
  ) {}
  loadOrg(orgId: string) {
    this.isLoading = true;
    this.orgService.loadOrg(orgId).subscribe((org: Org) => {
      this.isLoading = false;
      this.org = org;

      this.loadMembers();
    });
  }

  ngOnInit() {
    console.log('ttt ngOnInit');
    this.route.paramMap.subscribe((paramMap) => {
      console.log('ngOnInit', paramMap);
      const orgId = paramMap.get('orgId');
      this.loadOrg(orgId);
    });
  }

  loadMembers() {
    this.isLoading = true;
    this.orgService
      .loadMembers(this.authService.userId, this.org._id)
      .subscribe((members: Profile[]) => {
        this.isLoading = false;
        this.members = members;
        console.log('ttt ionViewWillEnter', this.members);
      });
  }
  onReview(inviteId: string) {
    this.isLoading = true;
  }
}
