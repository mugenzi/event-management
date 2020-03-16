import { Component, OnInit } from '@angular/core';
import { GuestService } from '../../services/guest.service';



@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit {

  Guest:any = [];

  constructor(private guestService: GuestService) {
    this.readGuest();
  }

  ngOnInit(): void {
  }

  readGuest(){
    this.guestService.getGuests().subscribe((data) => {
     this.Guest = data;
    })
  }


  removeGuest(guest, index) {
    if(window.confirm('Are you sure?')) {
        this.guestService.deleteGuest(guest._id).subscribe((data) => {
          this.Guest.splice(index, 1);
        }
      )
    }
  }

}
