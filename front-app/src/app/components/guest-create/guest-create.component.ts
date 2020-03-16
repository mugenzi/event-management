import { Router } from '@angular/router';
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

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private guestService: GuestService
  ) {
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.guestForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      status: ['']
    })
  }

  // Choose eventType with select dropdown
  updateProfile(e){
    this.guestForm.get('eventType').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.guestForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.guestForm.valid) {
      return false;
    } else {
      this.guestService.createGuest(this.guestForm.value, this.guestForm.get('_id')).subscribe(
        (res) => {
          console.log('Guest successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/guests-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}


