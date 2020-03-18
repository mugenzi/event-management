import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    //private ngZone: NgZone,
    private authenticationService: AuthenticationService,
    private registerService: RegisterService
  ) {
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]] //password:     ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Getter to access form control
  get myForm() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return false;
    } else {
      let user = this.registerService.getLoggedUser(this.loginForm.value.email);
      this.authenticationService.login(this.loginForm.value).subscribe(
        (res) => {
          console.log('Login Successful!')
          //this.ngZone.run(() => this.router.navigateByUrl('/guests-list'))
          this.router.navigate(['/events-list']);
          //this.registerService.getLoggedUser(this.loginForm.value.email)
        }, (error) => {
          console.log(error);
        });
    }
  }


}
