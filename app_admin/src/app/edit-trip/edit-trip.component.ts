import { Component, OnInit } from '@angular/core';
import { Trip } from 'models/trip';
import {Router } from "@angular/router";
@Component({
  selector: 'app-edit',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // retrieve stashed tripId
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
    alert("Something wrong, couldn't find where I stashedtripCode!");
    this.router.navigate(['']);
    return;
    }
    console.log('EditTripComponent#onInit found tripCode ' + tripCode);
    // initialize form
    this.editForm = this.formBuilder.group({
    _id: [],
    code: [tripCode, Validators.required],
    name: ['', Validators.required],
    length: ['', Validators.required],
    start: ['', Validators.required],
    resort: ['', Validators.required],
    perPerson: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required],
    })
    console.log('EditTripComponent#onInit calling TripDataService#getTrip(\'' + tripCode + '\')');
    this.tripService.getTrip(tripCode)
    .then(data => {
    console.log(data);
    // Don't use editForm.setValue() as it will throw console error
    this.editForm.patchValue(data[0]);
    })
    }
    onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
    this.tripService.updateTrip(this.editForm.value)
    .then(data => {
    console.log(data);
    this.router.navigate(['']);
    });
  }
}
    
    

}
