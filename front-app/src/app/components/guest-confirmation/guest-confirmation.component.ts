import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'app-guest-confirmation',
  templateUrl: './guest-confirmation.component.html',
  styleUrls: ['./guest-confirmation.component.css']
})
export class GuestConfirmationComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private guestService:GuestService, private router: Router) { }

  eventId:string;
  guestId:string;
    ngOnInit(){
        this.eventId = this.activatedRoute.snapshot.params['eventId'];
        this.guestId = this.activatedRoute.snapshot.params['guestId'];
        localStorage.setItem('eventId', this.eventId);
        localStorage.setItem('guestId', this.guestId);
    }

    guestConfirm() {
        this.guestService.guestConfirmation(this.guestId,this.eventId, 'Confirmed').subscribe(
          (res) => {
            console.log('Approved Successfully')
            this.router.navigate(['']);
          }, (error) => {
            console.log(error);
          });
       
    }

    guestDecline() {
      this.guestService.guestConfirmation(this.guestId,this.eventId, 'Rejected').subscribe(
        (res) => {
          console.log('Approved Successfully')
          this.router.navigate(['']);
        }, (error) => {
          console.log(error);
        });
     
  }

}
