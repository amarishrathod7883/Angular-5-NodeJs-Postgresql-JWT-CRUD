import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit 
{
  rForm: any;
  loginData: any = {};
  public error: string;

  constructor(
    private auth: AuthService, 
    private router: Router,
    private fb: FormBuilder,) 
  { 
    this.rForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  ngOnInit() 
  {
  }

  public addUserLogin(formdata) 
  {
    console.log("formdata", formdata);

    if (this.rForm.valid) 
    {
      this.auth.login(formdata)
      .subscribe(res => 
      {
        if(res.success == true)
        {
          this.auth.setToken(res);
          this.router.navigate(['products']);
        }
        else
        {
          this.error = res.message;
          this.rForm.reset();
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
