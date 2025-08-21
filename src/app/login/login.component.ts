import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formGroup!: FormGroup;
  isValid: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.formGroup = this.formBuilder.group({
      usuario: new FormControl('', [Validators.required]),
      contraseña: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getFormChanges('contraseña', this.formGroup, (value: any) => {});
  }

  goToHome() {
    this.router.navigate(['/Home'], {});
  }

  getFormChanges(control: string, formGroup: FormGroup, fn: any) {
    const observable = formGroup.get(control);
    if (observable != null) {
      observable.valueChanges.subscribe({
        next: fn,
      });
    }
  }
}
