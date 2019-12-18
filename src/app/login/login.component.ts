import { Component, OnInit, Input } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string = ''
  userPassword: string = ''
  userCompany: string = ''
  userPlant: string = ''
  constructor(private router: Router) { }
  
  ngOnInit() {
   
  }

  login(event) {
    let obj = {
      userName: this.userName,
      userPassword: CryptoJS.AES.encrypt(JSON.stringify(this.userPassword), 'efi'),
      userCompany: this.userCompany,
      userPlant: this.userPlant
    }
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "userName": this.userName,
      }
  };
    this.router.navigate(['orderList', obj], navigationExtras)
  }
}
