import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInterface } from '../../interfaces/user.interface';
import { AuthenticationService } from '../../services/authentication.service';
import { SignalsService } from '../../services/signals.service';
import { RouterLink } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss',
})
export class RegisterDialogComponent {
  auth = inject(Auth);
  authService = inject(AuthenticationService);
  signalService = inject(SignalsService);
  usersService = inject(UsersService);

  formSubmitted = false;
  passwordVisible: Boolean = false;
  nameInput: string = '';
  emailInput: string = '';
  passwordInput: string = '';
  privacyPolicyAccepted: boolean = false;

  backToLogin() {
    this.signalService.isLoginDialog.set(true);
    this.signalService.isRegisterDialog.set(false);
    this.signalService.isChoosingAvatarDialog.set(false);
    this.signalService.isPasswordForgottenDialog.set(false);
    this.signalService.isPasswordResetDialog.set(false);
  }

  /** Toggles the visibility of the password input field. */
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(ngForm: NgForm) {
    this.formSubmitted = true;
  }

  goToAvatarChoice() {
    this.signalService.isLoginDialog.set(false);
    this.signalService.isRegisterDialog.set(false);
    this.signalService.isChoosingAvatarDialog.set(true);
    this.signalService.isPasswordForgottenDialog.set(false);
    this.signalService.isPasswordResetDialog.set(false);
  }

      /**
     * Creates a new user with the given credentials and navigates to the summary page.
     * @param nameInput string - user's full name
     * @param mailInput string - user's email address
     * @param password string - user's password
     */
    async createUser(nameInput: string, mailInput: string, password: string) {
        const user:UserInterface = { name: nameInput, email: mailInput, status: 'online', avatarId: "" }
        if (this.userAlreadyExists(user.name)) return;
        const userCredential = await this.authService.createUser(user.email, password, user.name);
        const uid = userCredential.user.uid;
        this.usersService.addUser(uid, user);
        this.signalService.currentUid.set(uid);

        this.goToAvatarChoice();
    }

    /**
     * Checks whether a user with the same email already exists in the local list.
     * @param mail string - email to check
     * @returns boolean - true if the user already exists
     */
    userAlreadyExists(mail: string): boolean {
        return (
            this.usersService.users.some(user => user.email.trim().toLowerCase() === mail.trim().toLowerCase())
        );
    }
}
