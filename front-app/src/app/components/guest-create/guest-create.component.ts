import { Router, ActivatedRoute } from '@angular/router';
import { GuestService } from '../../services/guest.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-guest-create',
  templateUrl: './guest-create.component.html',
  styleUrls: ['./guest-create.component.css']
})

export class GuestCreateComponent implements OnInit {
  submitted = false;
  guestForm: FormGroup;
  public id: string;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private guestService: GuestService,
    private route : ActivatedRoute,
  ) {
    this.mainForm();

  }
 ;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  mainForm() {
    this.guestForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      status: ['Pending']
    })
  }


  // Getter to access form control
  get myForm(){
    return this.guestForm.controls;
  }

  onSubmit() {
    console.log( this.id);
    this.submitted = true;
    if (!this.guestForm.valid) {
      return false;
    } else {
      this.guestService.createGuest(this.guestForm.value, this.id).subscribe(
        (res) => {
          console.log('Guest successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/events-list'))
        }, (error) => {
          console.log(error);

        });
    }
  }

}


