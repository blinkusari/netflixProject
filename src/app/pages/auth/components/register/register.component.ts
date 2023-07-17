import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../../../core/services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitted = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
    },
      {
        validators: this.passwordConfirmationValidator,
      });
  }

  passwordConfirmationValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const passwordConfirmationControl = formGroup.get('password_confirmation');

    if (!passwordControl || !passwordConfirmationControl) {
      return null;
    }

    const password = passwordControl.value;
    const passwordConfirmation = passwordConfirmationControl.value;

    if (password !== passwordConfirmation) {
      passwordConfirmationControl.setErrors({ mismatch: true });
    } else {
      passwordConfirmationControl.setErrors(null);
    }

    return null;
  }

  signUp() {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value);
  }
}
