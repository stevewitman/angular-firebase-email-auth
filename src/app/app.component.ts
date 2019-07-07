import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebaseLogin';

  selectedVal: string;
  responseMessage: string = '';
  responseMessageType: string = '';
  emailInput: string;
  passwordInput: string;
  isForgotPassword: boolean;
  userDetails: any;


  constructor(
      private authService: AuthenticationService
  ) {
    this.selectedVal = 'login';
    this.isForgotPassword = false;
  }



  showMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = '';
    }, 2000);
  }


  public onValChange(val: string) {
    this.showMessage('', '');
    this.selectedVal = val;
  };


  isUserLoggedIn() {
    this.userDetails = this.authService.isUserLoggedIn();
  }


  logoutUser() {
    this.authService.logout()
      .then(res => {
        console.log(res);
        this.userDetails = undefined;
        localStorage.removeItem('user');
      }, err => {
        this.showMessage('danger', err.message);
      });
  }


  loginUser() {
    this.responseMessage = '';
    this.authService.login(this.emailInput, this.passwordInput)
      .then(res => {
        console.log(res);
        this.showMessage('success', 'Successfully logged in!');
        this.isUserLoggedIn();
      }, err => {
        this.showMessage('danger', err.message);
      });
  }


  registerUser() {
    this.authService.register(this.emailInput, this.passwordInput)
      .then(res => {


        this.authService.sendEmailVerification().then(res => {
          console.log(res);
          this.isForgotPassword = false;
          this.showMessage("success", "Registration Successful! Please Verify Your Email");
        }, err => {
          this.showMessage("danger", err.message);
        });
        this.isUserLoggedIn();


      }, err => {
        this.showMessage("danger", err.message);
      });
  }


  forgotPassword() {
    this.authService.sendPasswordResetEmail(this.emailInput)
      .then(res => {
        console.log(res);
        this.isForgotPassword = false;
        this.showMessage('success', 'Please check your email');
      }, err => {
        this.showMessage('danger', err.message);
      });
  }


  googleLogin() {
    this.authService.loginWithGoogle()
    .then(res => {
      console.log(res);
      this.showMessage('success', 'Successfully Logged In With Google');
      this.isUserLoggedIn();
    }, err => {
      this.showMessage('danger', err.message);
    });
  }

}
