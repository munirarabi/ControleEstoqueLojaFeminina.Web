import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar o FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // console.log(response);
        const token = response.data; // Substitua pela propriedade do token retornado pela sua API
        this.authService.saveToken(token);
        this.router.navigate(['/products']);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        console.log(error)
      },
    });
  }
}
