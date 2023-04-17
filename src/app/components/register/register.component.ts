import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { ErrorEmailService } from 'src/app/services/error-email.service';
import { Router } from '@angular/router';
import { DashboardGuard } from 'src/app/guards/dashboard.guard';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {}
  registerUser: FormGroup;
  loading: boolean = false;
  dataUser: any  = [];
  constructor (
    private fb: FormBuilder,
    private authFire: AngularFireAuth,
    private toastr: ToastrService,
    private errorEmail: ErrorEmailService,
    private router: Router,
    private guard: DashboardGuard
  ){
    this.registerUser = this.fb.group({
      email: ['', [Validators.required, Validators.email,]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rpassword: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  register(){
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const rpassword = this.registerUser.value.rpassword;
    console.log(`Usuario \n==> ${email}\nPassword\n==> ${password}\nRepeatPassword\n==> ${rpassword}`)
    // this.dataUser  = {
    //   email: email,
    //   password: password,
    //   repeatPassword: rpassword,
    //   fechaCreacion: new Date()
    // }
    this.loading = true;
    this.authFire.createUserWithEmailAndPassword(email, password).then(
      () => {
      this.loading = false;
      this.toastr.success('New user create', 'Success!!')
      this.guard.statePath = true
      this.router.navigate(['/dashboard'])
    }).catch((error) => {
      // this.loading = false;
      console.log(error)
      this.toastr.error(this.errorEmail.firebaseError(error.code), "Error")
      this.loading = false;
    })
  }
}
