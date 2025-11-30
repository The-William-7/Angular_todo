import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../servicios/usuarios/auth.service.ts';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  recordarme: boolean = false;
  cargando: boolean = false;
  mensajeError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.mensajeError = 'Por favor completa todos los campos';
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (resultado: { success: any; message: string; }) => {
        this.cargando = false;
        if (resultado.success) {
          this.router.navigate(['/catalogo']);
        } else {
          this.mensajeError = resultado.message;
        }
      },
      error: (error: any) => {
        this.cargando = false;
        this.mensajeError = 'Error al iniciar sesión';
        console.error('Login error:', error);
      }
    });
  }

  // Login rápido para testing
  loginRapido(tipo: 'usuario' | 'admin') {
    if (tipo === 'usuario') {
      this.email = 'usuario@ejemplo.com';
      this.password = 'password123';
    } else {
      this.email = 'admin@ejemplo.com';
      this.password = 'admin123';
    }
    this.onSubmit();
  }
}