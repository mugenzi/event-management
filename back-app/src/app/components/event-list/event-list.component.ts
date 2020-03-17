import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})

export class EventListComponent implements OnInit {

  Event:any = [];

  constructor(private eventService: EventService) {
    this.readEvent();
  }

  ngOnInit() {}

  readEvent(){
    this.eventService.getEvents().subscribe((data) => {
     this.Event = data;
     console.log(data)
    })
  }

  removeEvent(event, index) {
    if(window.confirm('Are you sure?')) {
        this.eventService.deleteEvent(event._id).subscribe((data) => {
          this.Event.splice(index, 1);
        }
      )
    }
  }

}

