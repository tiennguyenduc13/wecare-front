import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AlertController, IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { OrgService } from '../../../../services/org.service';
import { AuthService } from '../../../../services/auth.service';
import { Org } from '../../../../models/org.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message, IMessage } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';
import * as util from '../../../../shared/util';
import { InviteService } from 'src/app/services/invite.service';
import { IInvite, Invite } from 'src/app/models/invite.model';

@Component({
  selector: 'app-org',
  templateUrl: './org-social.page.html',
  styleUrls: ['./org-social.page.scss'],
})
export class OrgSocialPage implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private inviteService: InviteService,
    private orgService: OrgService,
    private authService: AuthService,
    private messageService: MessageService,
    private alertCtrl: AlertController
  ) {}
  isLoading = false;
  form: FormGroup;
  org: Org;
  messages: Message[] = [];
  message: IMessage;
  timerEnabled = false;

  loadMessages() {
    this.messageService
      .loadMessages(this.org._id)
      .subscribe((messages: Message[]) => {
        console.log('ttt  ', messages.length, this.messages.length);
        if (messages.length > this.messages.length) {
          this.messages = messages;
        }
      });
  }

  logScrolling() {
    console.log('logScrolling : When Scrolling');
  }

  loadOrg(orgId: string) {
    this.isLoading = true;
    this.orgService.loadOrg(orgId).subscribe((org: Org) => {
      this.isLoading = false;
      this.org = org;

      this.message = {
        userId: this.authService.userId,
        userName: this.authService.loginName,
        orgId: this.org._id,
        text: '',
        eventDate: new Date(null),
      };

      this.doIntervalRoutine();
    });
  }
  ionViewWillLeave() {
    this.timerEnabled = false;
  }
  doIntervalRoutine() {
    console.log(
      'Running doIntervalRoutine ',
      this.timerEnabled,
      this.loadMessages.length,
      new Date(),
      ' : ' + new Date().toString()
    );
    if (!this.timerEnabled) {
      return;
    }
    this.loadMessages();

    setTimeout(() => {
      this.doIntervalRoutine();
    }, 6000);
  }
  ngOnInit() {
    console.log('ttt ngOnInit');
    this.timerEnabled = true;
    this.route.paramMap.subscribe((paramMap) => {
      console.log('ngOnInit', paramMap);
      const orgId = paramMap.get('orgId');
      this.loadOrg(orgId);

      this.form = new FormGroup({
        messageText: new FormControl('', {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
      });
    });
  }
  ngOnDestroy() {
    this.timerEnabled = false;
  }
  getTime(eventDate: Date): string {
    return util.getTimeFormat(eventDate);
  }
  onSendMessage() {
    // if (!this.form.valid) {
    //   return;
    // }
    console.log('enter onSendMessage');
    this.isLoading = true;

    this.message.text = this.form.get('messageText').value;

    console.log('onSendMessage message', this.message);
    this.messageService
      .addMessage(this.message)
      .subscribe((newMessage: Message) => {
        this.isLoading = false;
        // add message to list
        // this.messages.push(newMessage);
        this.loadMessages();

        // reset form
        this.form.get('messageText').setValue('');
      });
  }

  onInvite() {
    this.alertCtrl
      .create({
        header: 'Invite someone to: ' + this.org.name,
        message: 'Enter invitee\'s email:',
        inputs: [
          {
            name: 'email',
            type: 'text',
            placeholder: 'Invitee\' email...',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: ');
            },
          },
          {
            text: 'Send Invitation',
            handler: (emailObj) => {
              const newInvite: IInvite = {
                inviterId: this.authService.userId,
                inviterEmail: this.authService.loginName,
                inviteDate: new Date(),
                orgId: this.org._id,
                inviteStatus: 'pending',
                inviteeId: '',
                inviteeEmail: emailObj.email,
                acceptDate: new Date(+0),
                inviteText:
                  'Invitation to join:' +
                  this.org.name +
                  ', from ' +
                  this.authService.loginName,
              };

              console.log('Confirm Okay newInvite ', newInvite);
              this.sendInvitation(newInvite);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  sendInvitation(newInvite: IInvite) {
    this.isLoading = true;
    this.inviteService.addInvite(newInvite).subscribe((invite: Invite) => {
      console.log('Added', invite);
      this.isLoading = false;
    });
  }
}
