import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm, AbstractControl, ValidationErrors } from '@angular/forms';
import Swal from 'sweetalert2';
import { AccountService } from 'src/app/services/account.service';
import { OTPSERVICE } from 'src/app/services/OTP.service';
@Component({
  selector: 'app-loginforgetpassword',
  templateUrl: './loginforgetpassword.component.html',
  styleUrls: ['./loginforgetpassword.component.css']
})
export class LoginforgetpasswordComponent {

  token: string | undefined;
  fg: FormGroup= new FormGroup({});
  fgreset: FormGroup= new FormGroup({});
  showResetPasswordCard: boolean = false;

  constructor(private acountservice: AccountService, private router: Router,private otpservice:OTPSERVICE) {
    }

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
      const newPassword = control.get('newPassword');
      const confirmPassword = control.get('confirmPassword');
  
      if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
        return { passwordMismatch: true };
      }
  
      return null;
    }
    ngOnInit(): void {
      this.fg = new FormGroup({
        email: new FormControl('', [Validators.required]),
      });
      this.fgreset = new FormGroup({
        code: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      }, this.passwordMatchValidator);

}
public submitfg(): void {

if(this.fg.valid){
  this.acountservice.userForgetPassword(this.fg.value.email).subscribe( (response) => 
  { 
    this.showResetPasswordCard = true;
    Swal.fire({
      title: "Chek your mail",
      text: "code sent successfully to your mail",
      icon: "success"
    });
    //alert ("code sent successfully to your mail")

  },
  (error) => Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Mail not found!",
  }));

}}
public submitfgreset(): void {
if(this.fgreset.valid){

  const formData = {
        newPassword: this.fgreset.value.newPassword,
        code: this.fgreset.value.code,
      };
      this.acountservice.forgetPasswordbyemail(this.fg.value.email, formData).subscribe( (response) => {
        Swal.fire({
          //title: "The Internet?",
          text: "password changed successfully",
          icon: "success"
        });
       // alert ("password changed successfully")
        this.router.navigate(['/login']);
      },
     
      error => Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Try later!",
      }));

      
}
else{
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Form inputs invalide!",
  });

}

}

resendcode($event: any) {
  $event.preventDefault();
  this.submitfg();
}


}