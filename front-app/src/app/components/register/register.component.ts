import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  registerForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private registerService: RegisterService
  ) {
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname:  ['', [Validators.required]],
      email:     ['', [Validators.required]],
      password:     ['', [Validators.required]] //password:     ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

    // Getter to access form control
    get myForm(){
      return this.registerForm.controls;
    }

    onSubmit() {
      this.submitted = true;
      if (!this.registerForm.valid) {
        return false;
      } else {
        this.registerService.register(this.registerForm.value).subscribe(
          (res) => {
            console.log('Successfully Registered!')
            this.router.navigate(['/login']);
          }, (error) => {
            console.log(error);
          });
      }
    }

}
