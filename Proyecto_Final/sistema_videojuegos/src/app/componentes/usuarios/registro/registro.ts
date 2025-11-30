import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // ✅ Router importado correctamente
import { AuthService } from '../../../servicios/usuarios/auth.service.ts';


@Component({
  selector: 'app-registro',
  imports: [FormsModule, CommonModule, RouterModule], // ✅ RouterModule incluido
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  // Datos del formulario
  datosRegistro = {
    email: '',
    password: '',
    confirmarPassword: '',
    nombre: '',
    apellido: '',
    telefono: '',
    fechaNacimiento: '',
    aceptaTerminos: false
  };

  // Estados
  cargando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  constructor(
    private authService: AuthService, // Servicio de autenticación
    private router: Router // ✅ Router inyectado correctamente
  ) {}

  onSubmit() {
    // Validaciones
    if (!this.validarFormulario()) {
      return;
    }

    this.cargando = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    const datosUsuario = {
      email: this.datosRegistro.email,
      nombre: this.datosRegistro.nombre,
      apellido: this.datosRegistro.apellido,
      telefono: this.datosRegistro.telefono,
      fechaNacimiento: this.datosRegistro.fechaNacimiento ? new Date(this.datosRegistro.fechaNacimiento) : undefined
    };

    this.authService.registrar(
      this.datosRegistro.email,
      this.datosRegistro.password,
      datosUsuario
    ).subscribe({
      next: (resultado) => {
        this.cargando = false;
        if (resultado.success) {
          this.mensajeExito = resultado.message;
          // Redirigir después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/login']); // ✅ Ahora funciona
          }, 2000);
        } else {
          this.mensajeError = resultado.message;
        }
      },
      error: (error) => {
        this.cargando = false;
        this.mensajeError = 'Error en el registro. Intenta nuevamente.';
        console.error('Registro error:', error);
      }
    });
  }

  validarFormulario(): boolean {
    // Validar campos requeridos
    if (!this.datosRegistro.email || 
        !this.datosRegistro.password || 
        !this.datosRegistro.confirmarPassword ||
        !this.datosRegistro.nombre || 
        !this.datosRegistro.apellido) {
      this.mensajeError = 'Por favor completa todos los campos requeridos';
      return false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.datosRegistro.email)) {
      this.mensajeError = 'Por favor ingresa un email válido';
      return false;
    }

    // Validar contraseña
    if (this.datosRegistro.password.length < 6) {
      this.mensajeError = 'La contraseña debe tener al menos 6 caracteres';
      return false;
    }

    // Validar confirmación de contraseña
    if (this.datosRegistro.password !== this.datosRegistro.confirmarPassword) {
      this.mensajeError = 'Las contraseñas no coinciden';
      return false;
    }

    // Validar términos
    if (!this.datosRegistro.aceptaTerminos) {
      this.mensajeError = 'Debes aceptar los términos y condiciones';
      return false;
    }

    // Validar edad (mayor de 13 años)
    if (this.datosRegistro.fechaNacimiento) {
      const fechaNacimiento = new Date(this.datosRegistro.fechaNacimiento);
      const hoy = new Date();
      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      const mes = hoy.getMonth() - fechaNacimiento.getMonth();
      
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }

      if (edad < 13) {
        this.mensajeError = 'Debes tener al menos 13 años para registrarte';
        return false;
      }
    }

    return true;
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  getPasswordStrengthClass(): string {
    const password = this.datosRegistro.password;
    if (!password) return 'strength-weak';
    
    if (password.length < 6) return 'strength-weak';
    if (password.length < 8) return 'strength-medium';
    
    // Verificar fortaleza básica
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strengthFactors = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars];
    const strengthScore = strengthFactors.filter(Boolean).length;
    
    if (strengthScore >= 3) return 'strength-strong';
    if (strengthScore >= 2) return 'strength-medium';
    return 'strength-weak';
  }

  getPasswordStrengthText(): string {
    const strengthClass = this.getPasswordStrengthClass();
    switch (strengthClass) {
      case 'strength-weak': return 'Contraseña débil';
      case 'strength-medium': return 'Contraseña media';
      case 'strength-strong': return 'Contraseña fuerte';
      default: return '';
    }
  }

  // Rellenar datos de prueba
  rellenarDatosPrueba() {
    this.datosRegistro = {
      email: 'nuevo@usuario.com',
      password: 'Password123!',
      confirmarPassword: 'Password123!',
      nombre: 'María',
      apellido: 'García',
      telefono: '+1234567890',
      fechaNacimiento: '1995-05-15',
      aceptaTerminos: true
    };
  }
}