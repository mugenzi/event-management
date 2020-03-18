import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})

export class EventCreateComponent implements OnInit {
  submitted = false;
  eventForm: FormGroup;
  EventProfile:any = ['Wedding', 'Conference']

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private eventService: EventService
  ) {
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required]],
      eventDate: ['', [Validators.required]],
      eventType: ['', [Validators.required]],
      eventStatus: ['', [Validators.required,]],
      lat: ['', [Validators.required]],
      long: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipcode: ['', [Validators.required]]
    })
  }

  // Choose eventType with select dropdown
  updateProfile(e){
    this.eventForm.get('eventType').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.eventForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.eventForm.valid) {
      return false;
    } else {
      this.eventService.createEvent(this.eventForm.value).subscribe(
        (res) => {
          console.log('Event successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/events-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}


