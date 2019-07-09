import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginServiceService } from 'src/app/services/login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modalRef: BsModalRef;
  users : object; 

  username : string;
  user_Pass : string;
  user_Pass_2 : string;
  first_Name : string;
  last_Name : string;
  email : string;
  add_border : string;
  path_ : string;

  constructor(private modalService: BsModalService, private LoginService: LoginServiceService) {}
 
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  ngOnInit() {
  }

  doLogin(username_ : string, password_ : string) {
    this.LoginService.checkLogin(username_, password_);
    console.log(username_, password_);
    let user = JSON.parse(sessionStorage.getItem("User"));
    if (user.firstname === null || user.lastname === null) {
    this.add_border = "input-custom";
    //this.path_ = "/login";
    } else {
     // this.path_ = "/play";
    }
  }

  submitForm(username : string, user_Pass : string, user_Pass_2: string, first_Name : string, last_Name, email : string) {
    console.log("Form submitted" + "Login.components.ts  out of sub");
    this.LoginService.createTheAccount(username, user_Pass, user_Pass_2, first_Name, last_Name, email);
    console.log("Yo these null? " + username, user_Pass, user_Pass_2, first_Name, last_Name, email);
  }

}
