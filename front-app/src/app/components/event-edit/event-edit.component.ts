import { Event } from '../../models/event.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from '../../services/event.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})

export class EventEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  eventData: Event[];
  EventProfile:any = ['Wedding', 'Conference']
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateEvent();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEvent(id);
    this.editForm = this.fb.group({
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

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('eventType').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getEvent(id) {
    this.eventService.getEvent(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        eventDate: data['eventDate'],
        eventType: data['eventType'],
        eventStatus: data['eventStatus'],
      });
    });
  }

  updateEvent() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      eventDate: ['', [Validators.required]],
      eventType: ['', [Validators.required]],
      eventStatus: ['', [Validators.required,]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.eventService.updateEvent(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/event-list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}
