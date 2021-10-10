import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  hide:boolean=true;
  passwordInput:any;
  returnUrl?: string;

  constructor(
    private loginService:LoginService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm=this.createLoginForm()
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login()
  {
    if(this.loginForm.valid)
    {
      let obj={
        username:this.loginForm.controls['username'].value,
        password:this.loginForm.controls['password'].value
      }

      this.loginService.login(obj)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
          },
          error => {
              this.loginForm.controls['username'].setErrors({invalid: true});
              this.loginForm.controls['password'].setErrors({invalid: true});
              // console.error(error);
          });

    }

  }

  enterSubmit($event:any)
  {
    if($event.key === 'Enter')
    {
     if(this.loginForm.valid){
       this.login()
     }
    }
  }

  createLoginForm(){
    return new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    });
  }
}
