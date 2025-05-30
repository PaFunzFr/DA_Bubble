import { Injectable, signal } from '@angular/core';
import { ToastInterface } from '../interfaces/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class SignalsService {
  constructor() {}

  focusChat = signal<boolean>(false);
  focusThread = signal<boolean>(false);
  startConversation = signal<boolean>(false);
  sendingMessage = signal<boolean>(false);
  
  showWorkspace = signal<boolean>(true);
  showThread = signal<boolean>(false);
  showCreateChannel = signal<boolean>(false);
  
  scrollChannelToBottom = signal<boolean>(false);
  
  // Signal for current User-ID
  currentUid = signal<string>('');
  
  // Signalmethods for showing the different dialogs at login-section
  isLoginDialog = signal<boolean>(true);
  isRegisterDialog = signal<boolean>(false);
  isChoosingAvatarDialog = signal<boolean>(false);
  isPasswordForgottenDialog = signal<boolean>(false);
  isPasswordResetDialog = signal<boolean>(false);
  
  backToLogin() {
    this.isLoginDialog.set(true);
    this.isRegisterDialog.set(false);
    this.isChoosingAvatarDialog.set(false);
    this.isPasswordForgottenDialog.set(false);
    this.isPasswordResetDialog.set(false);
  }

  showRegisterDialog() {
    this.isLoginDialog.set(false);
    this.isRegisterDialog.set(true);
    this.isChoosingAvatarDialog.set(false);
    this.isPasswordForgottenDialog.set(false);
    this.isPasswordResetDialog.set(false);
  }

  goToAvatarChoice() {
    this.isLoginDialog.set(false);
    this.isRegisterDialog.set(false);
    this.isChoosingAvatarDialog.set(true);
    this.isPasswordForgottenDialog.set(false);
    this.isPasswordResetDialog.set(false);
  }

  showPasswordForgottenDialog() {
    this.isPasswordForgottenDialog.set(true);
    this.isLoginDialog.set(false);
    this.isRegisterDialog.set(false);
    this.isChoosingAvatarDialog.set(false);
    this.isPasswordResetDialog.set(false);
  }

  showPasswordResetDialog() {
    this.isLoginDialog.set(false);
    this.isRegisterDialog.set(false);
    this.isChoosingAvatarDialog.set(false);
    this.isPasswordForgottenDialog.set(false);
    this.isPasswordResetDialog.set(true);
  }

  // Signals for toasts
  toast = signal<ToastInterface>({
    message: '',
    type: 'create',
    isOpen: false,
    isAnimated: false,
    icon: ''
  });

  triggerToast(message: string, type: ToastInterface['type'], icon: string = '') {
    this.toast.set({
      message,
      type,
      icon,
      isOpen: true,
      isAnimated: false
    });
    setTimeout(() => this.toast.update(t => ({ ...t, isAnimated: true })), 10);
    setTimeout(() => this.toast.update(t => ({ ...t, isAnimated: false })), 3000);
    setTimeout(() => this.toast.update(t => ({ ...t, isOpen: false })), 3500);
  }
}
