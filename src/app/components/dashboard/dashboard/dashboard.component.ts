import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {}
  constructor (
    private toastr: ToastrService,
    private authFire: AngularFireAuth,
    private router: Router,
  ) {}
  logOut():void {
    this.authFire.signOut()
    this.toastr.info("Hasta Luego", "Sucess") 
    this.router.navigate(['/login'])
  }
}
