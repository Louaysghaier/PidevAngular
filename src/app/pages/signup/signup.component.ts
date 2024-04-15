import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  json: { username: string; password: string; firstname: string; lastname: string; email: string; phone: string; } | undefined;


  constructor(private userservice:UserService ,private authService: AccountService ,private snack:MatSnackBar){}

  public user:User ={
    username:'',
    password:'',
    name:'',
    lastname:'',
    email:'',
    Role: '',

    number:0,

  }

    ngOnInit():void {};

  formSubmit(){
console.log(this.user)
if(this.user.username=='' ||this.user.username==null){
  
 this.snack.open('Usernname is required !!!','', {
    duration:3000,
 
  });
  
 
  return;
} 
const roleName = this.user.Role||'NORMAL'; 

//addUser:userService
this.authService.register(this.user,roleName).subscribe((data:any)=>{
  localStorage.setItem('email', this.user.email||'');

  //success
  console.log(data);
  //alert('success');
  Swal.fire('ouvrir votre mail pour activer votre compte !!');
  
},
(error) =>{
  console.log(error);
  //alert something wrong
 this.snack.open('something went wrong !!','', {
    duration:3000,
  });
}
)
};

}
  
