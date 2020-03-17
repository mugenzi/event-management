export class Event {
   name: string;
   eventDate: string;
   eventType: string;
   eventStatus: string;
   eventVenu = new EventVenue();
}


export class EventVenue {
  address = new Address();
  location = new Location();
}

export class Address {
     street: string;
     city: string;
     state: string;
     zipcode:string
}

export class Location {
  lat: string;
  long:string;
}


