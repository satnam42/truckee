import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  accessList: any = [
      { role:'Driver', 
        pages:[
          {page:'/Components/Driver/driver_profile'},
          {page:'/Components/Driver/driver_dashboard'},
          {page:'/Components/Driver/assigned_loads'}
        ]
      },
      { role:'Carrier', 
        pages:[
          {page:'/Components/Carrier/carrier_profile'},
          {page:'/Components/Carrier/carrier_dashboard'},
          {page:'/Components/Carrier/drivers'},
          {page:'/Components/Carrier/carriers'},
          {page:'/Components/Carrier/associated-carriers'},
          {page:'/Components/Carrier/requested-carriers'},
          {page:'/Components/Carrier/vehicals'},
          {page:'/Components/Carrier/loads'},
          {page:'/Components/Carrier/new-load'},
          {page:'/Components/Carrier/assigned_loads'}
        ]
      },
      { role:'Admin', 
        pages:[
          {page:'/Components/Admin/admin_dashboard'}
        ]
      }
  ];

  constructor(
    public authService: AuthService,
    public router: Router,
    public sharedService: SharedService
  ) { }

  role:any;
  flag:string="";
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      this.flag="false";
      if (this.authService.isLoggedIn() !== true) {
        window.alert("Access not allowed!");
        this.router.navigate(['log-in'])
      } else {
        debugger
        this.role=this.sharedService.getStorage("role");
        for(let access of this.accessList) {
          if(this.role==access.role) {
            for(let page of access.pages) {
              if(page.page===state.url) {
                this.flag="true";
                break;
              } 
            }
          }
        }
      }
      if(this.flag=="true") {
        return true
      } else {
        window.alert("Access not allowed!");
        localStorage.setItem("access_token", 'null');
        this.sharedService.localStorageclear();    // Clear tocken from local storage 
        this.router.navigate(['']); 
        return false;
      }
  }
  
}
