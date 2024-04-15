"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginforgetpasswordComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var LoginforgetpasswordComponent = /** @class */ (function () {
    function LoginforgetpasswordComponent(acountservice, router, otpservice) {
        this.acountservice = acountservice;
        this.router = router;
        this.otpservice = otpservice;
        this.showResetPasswordCard = false;
        this.token = undefined;
    }
    LoginforgetpasswordComponent.prototype.passwordMatchValidator = function (control) {
        var newPassword = control.get('newPassword');
        var confirmPassword = control.get('confirmPassword');
        if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
            return { passwordMismatch: true };
        }
        return null;
    };
    LoginforgetpasswordComponent.prototype.ngOnInit = function () {
        this.fg = new forms_1.FormGroup({
            email: new forms_1.FormControl('', [forms_1.Validators.required]),
            recaptcha: new forms_1.FormControl(null, [forms_1.Validators.required])
        });
        this.fgreset = new forms_1.FormGroup({
            code: new forms_1.FormControl('', [forms_1.Validators.required]),
            newPassword: new forms_1.FormControl('', [forms_1.Validators.required]),
            confirmPassword: new forms_1.FormControl('', [forms_1.Validators.required])
        }, this.passwordMatchValidator);
    };
    LoginforgetpasswordComponent.prototype.submitfg = function () {
        var _this = this;
        if (this.fg.valid) {
            this.acountservice.userForgetPassword(this.fg.value.email).subscribe(function (response) {
                _this.showResetPasswordCard = true;
                sweetalert2_1["default"].fire({
                    title: "Chek your mail",
                    text: "code sent successfully to your mail",
                    icon: "success"
                });
                //alert ("code sent successfully to your mail")
            }, function (error) { return sweetalert2_1["default"].fire({
                icon: "error",
                title: "Oops...",
                text: "Mail not found!"
            }); });
        }
    };
    LoginforgetpasswordComponent.prototype.submitfgreset = function () {
        var _this = this;
        if (this.fgreset.valid) {
            var formData = {
                newPassword: this.fgreset.value.newPassword,
                code: this.fgreset.value.code
            };
            this.acountservice.forgetPasswordbyemail(this.fg.value.email, formData).subscribe(function (response) {
                sweetalert2_1["default"].fire({
                    //title: "The Internet?",
                    text: "password changed successfully",
                    icon: "success"
                });
                // alert ("password changed successfully")
                _this.router.navigate(['/signin']);
            }, function (error) { return sweetalert2_1["default"].fire({
                icon: "error",
                title: "Oops...",
                text: "Try later!"
            }); });
        }
        else {
            sweetalert2_1["default"].fire({
                icon: "error",
                title: "Oops...",
                text: "Form inputs invalide!"
            });
        }
    };
    LoginforgetpasswordComponent.prototype.resendcode = function ($event) {
        $event.preventDefault();
        this.submitfg();
    };
    LoginforgetpasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-loginforgetpassword',
            templateUrl: './loginforgetpassword.component.html',
            styleUrls: ['./loginforgetpassword.component.css']
        })
    ], LoginforgetpasswordComponent);
    return LoginforgetpasswordComponent;
}());
exports.LoginforgetpasswordComponent = LoginforgetpasswordComponent;
