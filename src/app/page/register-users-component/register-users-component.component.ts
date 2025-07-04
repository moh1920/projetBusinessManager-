import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RoleUser} from "../../models/RoleUser";
import {UserServiceService} from "../../services/user-service.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-register-users-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './register-users-component.component.html',
  styleUrl: './register-users-component.component.scss'
})
export class RegisterUsersComponentComponent implements OnInit{

  registerForm!: FormGroup;
  roles = Object.values(RoleUser);

  constructor(private fb: FormBuilder, private userService: UserServiceService) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      roleUser: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.userService.createUser(this.registerForm.value).subscribe({
        next: (res) => {
          console.log('Utilisateur créé avec succès', res);
          this.registerForm.reset();
        },
        error: (err) => {
          console.error('Erreur de création', err);
        }
      });
    }
  }

}
