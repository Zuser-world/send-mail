import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardGuard } from 'src/app/guards/dashboard.guard';
import { ErrorEmailService } from 'src/app/services/error-email.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}
  loginUser: FormGroup;
  loading: boolean = false;
  constructor (
    private fb: FormBuilder,
    private authFire: AngularFireAuth,
    private toastr: ToastrService,
    private errorService: ErrorEmailService,
    private router: Router,
    private guard: DashboardGuard
  ){
    this.loginUser =  this.fb.group({
      email: ['', [Validators.required, Validators.email,]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  login(){
    const email = this.loginUser.value.email
    const password = this.loginUser.value.password

    this.authFire.signInWithEmailAndPassword(email, password).then((user) => {
      console.log(user)
      this.guard.statePath = true
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      this.loading = false;
      console.log(error)
      this.toastr.error(this.errorService.firebaseError(error.code), "Error")
    })
  }
}
