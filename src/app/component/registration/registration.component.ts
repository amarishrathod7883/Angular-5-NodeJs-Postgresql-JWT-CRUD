import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit 
{

  rForm: any;
  registerData: any = {};
  mailValid = false;
  public error: string;

  constructor(
    private auth: AuthService, 
    private router: Router,
    private fb: FormBuilder,) 
  { 
    this.rForm = fb.group({
      'username': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  ngOnInit() 
  {

  }

  checkMailFormat(email) 
  {
    this.mailValid = false;
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email !== null && email !== '') 
    {
      if (email && !EMAIL_REGEXP.test(email)) 
      {
        this.mailValid = true;
        this.rForm.get('email').setValue('');
      }
    }
  }

  public addUserRegistration(formdata) 
  {
    console.log("formdata", formdata);

    if (this.rForm.valid) 
    {
      this.auth.register(formdata)
      .subscribe(res => 
      {
        console.log("res", res);
        if(res.success == true)
        {
          this.auth.setToken(res);
          this.router.navigate(['products']);
        }
        else
        {
          this.error = res.message;
          $(function () {
            $("#flash").css({ "color": "red", "font-size": "14px" });
            $('#flash').delay(10).fadeIn('normal', function () {
              $(this).delay(2500).fadeOut();
            });
          });
        }
      });
    }
    else
    {
      Object.keys(this.rForm.controls).forEach(field => 
      {
        const control = this.rForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
