import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, Direccion, MetodoPago, Usuario } from '../../../servicios/usuarios/auth.service.ts';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit, OnDestroy {
  usuario: Usuario | null = null;
  private usuarioSubscription!: Subscription;

  // Estados del formulario
  editandoPerfil: boolean = false;
  editandoDireccion: boolean = false;
  editandoMetodoPago: boolean = false;
  
  // Datos temporales para edición
  datosPerfilTemp: any = {};
  direccionTemp: Partial<Direccion> = {};
  metodoPagoTemp: Partial<MetodoPago> = {};
  
  // Estados
  cargando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';
  seccionActiva: string = 'perfil';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuarioSubscription = this.authService.usuarioActual$.subscribe(
      (usuario) => {
        this.usuario = usuario;
        if (usuario) {
          this.datosPerfilTemp = { ...usuario };
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe();
    }
  }

  // 🔄 CAMBIAR SECCIÓN
  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
    this.limpiarMensajes();
    this.cancelarEdicion();
  }

  // 👤 GESTIÓN DE PERFIL
  iniciarEdicionPerfil() {
    this.editandoPerfil = true;
    this.datosPerfilTemp = { ...this.usuario };
  }

  cancelarEdicionPerfil() {
    this.editandoPerfil = false;
    this.datosPerfilTemp = { ...this.usuario };
    this.limpiarMensajes();
  }

  guardarPerfil() {
    if (!this.validarPerfil()) {
      return;
    }

    this.cargando = true;
    this.authService.actualizarPerfil(this.datosPerfilTemp).subscribe({
      next: (resultado) => {
        this.cargando = false;
        if (resultado.success) {
          this.editandoPerfil = false;
          this.mensajeExito = resultado.message;
          setTimeout(() => this.limpiarMensajes(), 3000);
        } else {
          this.mensajeError = resultado.message;
        }
      },
      error: (error) => {
        this.cargando = false;
        this.mensajeError = 'Error al actualizar el perfil';
        console.error('Error perfil:', error);
      }
    });
  }

  validarPerfil(): boolean {
    if (!this.datosPerfilTemp.nombre || !this.datosPerfilTemp.apellido) {
      this.mensajeError = 'Nombre y apellido son requeridos';
      return false;
    }

    if (this.datosPerfilTemp.telefono && !/^\+?[\d\s-]+$/.test(this.datosPerfilTemp.telefono)) {
      this.mensajeError = 'Formato de teléfono inválido';
      return false;
    }

    return true;
  }

  // 🏠 GESTIÓN DE DIRECCIONES
  iniciarEdicionDireccion(direccion?: Direccion) {
    this.editandoDireccion = true;
    this.direccionTemp = direccion ? { ...direccion } : {
      nombre: '',
      direccion: '',
      ciudad: '',
      codigoPostal: '',
      pais: 'México',
      esPrincipal: false
    };
  }

  cancelarEdicionDireccion() {
    this.editandoDireccion = false;
    this.direccionTemp = {};
    this.limpiarMensajes();
  }

  guardarDireccion() {
    if (!this.validarDireccion()) {
      return;
    }

    this.cargando = true;
    this.authService.agregarDireccion(this.direccionTemp as any).subscribe({
      next: (resultado) => {
        this.cargando = false;
        if (resultado.success) {
          this.editandoDireccion = false;
          this.mensajeExito = resultado.message;
          setTimeout(() => this.limpiarMensajes(), 3000);
        } else {
          this.mensajeError = resultado.message;
        }
      },
      error: (error) => {
        this.cargando = false;
        this.mensajeError = 'Error al guardar la dirección';
        console.error('Error dirección:', error);
      }
    });
  }

  eliminarDireccion(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta dirección?')) {
      this.authService.eliminarDireccion(id).subscribe({
        next: (resultado) => {
          if (resultado.success) {
            this.mensajeExito = resultado.message;
            setTimeout(() => this.limpiarMensajes(), 3000);
          } else {
            this.mensajeError = resultado.message;
          }
        },
        error: (error) => {
          this.mensajeError = 'Error al eliminar la dirección';
          console.error('Error eliminar dirección:', error);
        }
      });
    }
  }

  validarDireccion(): boolean {
    if (!this.direccionTemp.nombre || 
        !this.direccionTemp.direccion || 
        !this.direccionTemp.ciudad || 
        !this.direccionTemp.codigoPostal) {
      this.mensajeError = 'Todos los campos de dirección son requeridos';
      return false;
    }
    return true;
  }

  // 💳 GESTIÓN DE MÉTODOS DE PAGO
  iniciarEdicionMetodoPago(metodo?: MetodoPago) {
    this.editandoMetodoPago = true;
    this.metodoPagoTemp = metodo ? { ...metodo } : {
      tipo: 'tarjeta',
      ultimosDigitos: '',
      fechaExpiracion: '',
      esPrincipal: false
    };
  }

  cancelarEdicionMetodoPago() {
    this.editandoMetodoPago = false;
    this.metodoPagoTemp = {};
    this.limpiarMensajes();
  }

  guardarMetodoPago() {
    if (!this.validarMetodoPago()) {
      return;
    }

    this.cargando = true;
    this.authService.agregarMetodoPago(this.metodoPagoTemp as any).subscribe({
      next: (resultado) => {
        this.cargando = false;
        if (resultado.success) {
          this.editandoMetodoPago = false;
          this.mensajeExito = resultado.message;
          setTimeout(() => this.limpiarMensajes(), 3000);
        } else {
          this.mensajeError = resultado.message;
        }
      },
      error: (error) => {
        this.cargando = false;
        this.mensajeError = 'Error al guardar el método de pago';
        console.error('Error método pago:', error);
      }
    });
  }

  eliminarMetodoPago(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este método de pago?')) {
      this.authService.eliminarMetodoPago(id).subscribe({
        next: (resultado) => {
          if (resultado.success) {
            this.mensajeExito = resultado.message;
            setTimeout(() => this.limpiarMensajes(), 3000);
          } else {
            this.mensajeError = resultado.message;
          }
        },
        error: (error) => {
          this.mensajeError = 'Error al eliminar el método de pago';
          console.error('Error eliminar método pago:', error);
        }
      });
    }
  }

  validarMetodoPago(): boolean {
    if (this.metodoPagoTemp.tipo === 'tarjeta') {
      if (!this.metodoPagoTemp.ultimosDigitos || !this.metodoPagoTemp.fechaExpiracion) {
        this.mensajeError = 'Para tarjeta, se requieren los últimos dígitos y fecha de expiración';
        return false;
      }
    }
    return true;
  }

  // 🛠️ MÉTODOS AUXILIARES
  limpiarMensajes() {
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  cancelarEdicion() {
    this.editandoPerfil = false;
    this.editandoDireccion = false;
    this.editandoMetodoPago = false;
    this.limpiarMensajes();
  }

  // 📊 ESTADÍSTICAS (placeholder)
  getEstadisticas() {
    return {
      juegosComprados: 12,
      juegosCompletados: 8,
      tiempoJugado: '156 horas',
      generoFavorito: 'Aventura'
    };
  }
}