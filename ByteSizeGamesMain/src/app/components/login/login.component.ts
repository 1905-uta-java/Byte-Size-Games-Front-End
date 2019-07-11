import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { async, timeout } from 'q';
import { timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';



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
  //user;
  
  counter = 5;

  constructor(private modalService: BsModalService, private LoginService: LoginServiceService, private router: Router,
    private route: ActivatedRoute, private http : HttpClient) {}
 
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  ngOnInit() {
    
  }




   doLogin(username_ : string, password_ : string){
    let url = "http://ec2-3-19-30-93.us-east-2.compute.amazonaws.com:8082/login";
    this.http.post(url, {"username" : username_, "password" : password_}).subscribe(data => {
    sessionStorage.setItem("User", JSON.stringify(data));
    let user = JSON.parse(sessionStorage.getItem("User"));
    if (user === null || user.firstName === null ||user.lastName === null) {
      sessionStorage.removeItem("User");
      this.path_ = '/login';
      console.log(sessionStorage.length)
      window.sessionStorage.clear();
      localStorage.clear();
      }
    else{
      this.path_ = '/play';
      console.log(this.path_);
      this.router.navigateByUrl('/play');


    }
    });
  }
  submitForm(username : string, user_Pass : string, user_Pass_2: string, first_Name : string, last_Name, email : string) {
    console.log("Form submitted" + "Login.components.ts  out of sub");
    this.LoginService.createTheAccount(username, user_Pass, user_Pass_2, first_Name, last_Name, email);
    console.log("Yo these null? " + username, user_Pass, user_Pass_2, first_Name, last_Name, email);
  }
  
   
  
}

  


