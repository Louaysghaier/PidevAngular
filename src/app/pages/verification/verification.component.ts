import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OTP } from 'src/app/models/OTP';
import { OTPSERVICE } from 'src/app/services/OTP.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {

  fg: FormGroup= new FormGroup({});

  constructor(private router: Router, private otpservice: OTPSERVICE) { }
  email: string = localStorage.getItem('email') || '';
  newotp: OTP | undefined; 

  ngOnInit(): void {

  this.fg = new FormGroup({
    code: new FormControl('', [Validators.required])});}
    resend() {
      this.otpservice.resendOTP(this.email).subscribe((newotp: OTP) => {
        this.newotp = newotp;
        console.log('Generated OTP:', newotp.identification);
        Swal.fire("check your mail again !");
      }, error => {
        console.error('Error while resending OTP:', error);
        Swal.fire("An error occurred while resending OTP. Please try again later .");
      }
      
      
      );
    }
    submitfg() {
      if (this.fg.valid) {
        this.otpservice.verifyOTP( this.fg.value.code).subscribe((result) => {
          console.log('OTP verified successfully!');
          this.otpservice.userstatus(this.email, result).subscribe(resp => {
            console.log('User status updated successfully!');
          }, (error) => { console.error('Error while updating user status:', error); });
          Swal.fire("OTP verified successfully!");
          this.router.navigate(['/login']);
        }, (error) => {
          console.error('Error while verifying OTP:', error);
          Swal.fire("An error occurred while verifying OTP. Please try again later.");
        });
      }
}
}
