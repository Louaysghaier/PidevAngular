import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: '',
  };

  constructor(private snack:MatSnackBar , private login: LoginService , private router:Router){}

  ngOnInit():void {}
  
  formSubmit(){

   // console.log('login button clicked');

    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    
    ){
      this.snack.open('Username is required !!','', {
        duration:3000,
      });
      return;
    }

    if(
      this.loginData.password.trim() == '' ||
      this.loginData.password== null
    ){
      this.snack.open('Password is required !!' , '',{
        duration:3000,
      });
      return;
    }

    this.login.generateToken(this.loginData).subscribe(
      (data:any) =>
      {
      console.log('success');
      console.log(data);

      //login 
      this.login.loginUser(data.token);
      this.login.getCurrentUser().subscribe(
        (user:any)=>{
       this.login.setUser(user);
         console.log(user);
     
      //   //redirect::ADMIN
    
        if(this.login.getUserRole() == 'ADMIN'){
      //     //admin dashboard
     // window.location.href='/admin';
   
        
      this.router.navigate(['admin']);
      this.login.loginStatusSubject.next(true);
      //  //this.login.loginStatusSubject.next(true);

        }
        else if(this.login.getUserRole() == 'NORMAL'){
      //   //redirect..NORMAL
      //window.location.href ='/user-dashboard';
      
      this.router.navigate(['user-dashboard']);
      this.login.loginStatusSubject.next(true);
      // this.role ='/user-dashboard';
      }
      else{
          this.login.logout();
     // location.reload();
      //    console.log("logout")

      //   }
       } 
      });
      

    },
    (error)=> {
      console.log('Error !');
      console.log(error);
      this.snack.open("Invalid Details !! try again" , '', {
        duration:3000,
      });
    }

    )



}}
