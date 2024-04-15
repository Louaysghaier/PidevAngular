import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rememberMe : boolean = false; 

  loginData = {
    username: '',
    password: '',
  };

  constructor(private snack:MatSnackBar , private loginservice: AccountService , private router:Router){}

  ngOnInit():void {}
  onRememberMeChange(): void {
    // This method is called when the value of the "Remember me" checkbox changes
    console.info('Remember me value changed:', this.rememberMe);
  }
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
    this.loginservice.login(this.loginData.username,  this.loginData.password).subscribe(
      (response) => {      
        console.log('User logged in successfully!');
        const accessToken = response.accessToken;
        const   refreshToken = response.refreshToken;
        
        // Check if rememberMe is true, then store tokens in localStorage
        if (this.rememberMe === true) {
          // Store data in cookies with an expiration date
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() +20 ); // Expires in 20 days
          document.cookie = `user=${encodeURIComponent(JSON.stringify(response))};expires=${encodeURIComponent(expirationDate.toUTCString())};path=/`;
          document.cookie = `accessToken=${encodeURIComponent(accessToken)};expires=${encodeURIComponent(expirationDate.toUTCString())};path=/`;
          document.cookie = `refreshToken=${encodeURIComponent(refreshToken)};expires=${encodeURIComponent(expirationDate.toUTCString())};path=/`;

        } else {
          // Store data in session cookies (cookies without expiration)
          document.cookie = `user=${encodeURIComponent(JSON.stringify(response))}; path=/`;
          document.cookie = `accessToken=${encodeURIComponent(accessToken)}; path=/`;
          document.cookie = `refreshToken=${encodeURIComponent(refreshToken)}; path=/`;
          
        }
       
        const userAuthorities = response.authorities.map((authority:any) => authority.authority);
        console.log('User authorities:', userAuthorities);
        
        if (userAuthorities[0].includes("NORMAL")) {
          console.log('User is a normal user');
          this.router.navigate(['/user-dashboard']);
     
        } else if (userAuthorities[0].includes("ADMIN")) {
          console.log('User is an admin');
          this.router.navigate(['/admin']); 
        }
        

      }
   ,
    (error)=> {
      console.log('Error !');
      console.log(error);
      this.snack.open("Invalid Details !! try again" , '', {
        duration:3000,
      });
    }

    )



}}
