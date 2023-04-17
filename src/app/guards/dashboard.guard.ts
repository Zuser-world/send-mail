import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  statePath : boolean = false;
  constructor (
    private toastr: ToastrService,
    private router: Router,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.statePath){
        console.log('Bienvenido')
        this.toastr.success("Bienvenido", "Success!!")
        return this.statePath
      } 
  
      console.log('You don`t have permission to activate')
      this.toastr.error('You don`t have permission', 'Error')
      this.router.navigate(['/login']);
      return this.statePath
  }
  
}
