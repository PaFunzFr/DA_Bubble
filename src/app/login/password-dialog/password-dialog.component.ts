import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SignalsService } from '../../services/signals.service';
import { getAuth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-password-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './password-dialog.component.html',
  styleUrl: './password-dialog.component.scss',
})
export class PasswordDialogComponent {
  signalService = inject(SignalsService);
  emailInput: string = '';
  infoMessage: string = '';
  errorMessage: string = '';
  auth = getAuth();

  /**
   * Called when the login form is submitted.
   * Sets the submission flag if the login is not a guest login.
   * @param ngForm - The Angular form instance.
   */
  onSubmit(ngForm: NgForm) {}

  async sendMailForNewPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email, {
        // Optional: use of a continueUrl
        url: 'http://localhost:4200/login',
        handleCodeInApp: true,
      });
      this.signalService.triggerToast('Email sent', 'update', '/assets/icons/login/send.svg');
      setTimeout(() => {
        this.signalService.backToLogin();
      }, 2500);
    } catch (error: any) {
      this.signalService.triggerToast("Error", error)
    }
  }
}
