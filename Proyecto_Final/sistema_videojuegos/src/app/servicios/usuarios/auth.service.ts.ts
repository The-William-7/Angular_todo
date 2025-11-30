import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

// Interfaces para tipado fuerte
export interface Usuario {
  uid: string;
  email: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  fechaNacimiento?: Date;
  rol: 'usuario' | 'admin';
  fechaRegistro: Date;
  direcciones?: Direccion[];
  metodosPago?: MetodoPago[];
}

export interface Direccion {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  esPrincipal: boolean;
}

export interface MetodoPago {
  id: string;
  tipo: 'tarjeta' | 'paypal';
  ultimosDigitos?: string;
  fechaExpiracion?: string;
  esPrincipal: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual = new BehaviorSubject<Usuario | null>(null);
  public usuarioActual$ = this.usuarioActual.asObservable();

  // Usuario de ejemplo (luego será Firebase Auth)
  private usuarioEjemplo: Usuario = {
    uid: '1',
    email: 'usuario@ejemplo.com',
    nombre: 'Juan',
    apellido: 'Pérez',
    telefono: '+1234567890',
    fechaNacimiento: new Date('1990-01-01'),
    rol: 'usuario',
    fechaRegistro: new Date('2024-01-01'),
    direcciones: [
      {
        id: '1',
        nombre: 'Casa',
        direccion: 'Calle Principal 123',
        ciudad: 'Ciudad de México',
        codigoPostal: '12345',
        pais: 'México',
        esPrincipal: true
      }
    ],
    metodosPago: [
      {
        id: '1',
        tipo: 'tarjeta',
        ultimosDigitos: '4242',
        fechaExpiracion: '12/25',
        esPrincipal: true
      }
    ]
  };

  constructor() {
    // Simular que hay un usuario loggeado (para pruebas)
    this.usuarioActual.next(this.usuarioEjemplo);
  }

  // 🔐 REGISTRO DE USUARIO
  registrar(email: string, password: string, datos: any): Observable<{success: boolean, message: string}> {
    console.log('Registrando usuario:', { email, datos });
    
    // Simulación de registro exitoso
    return of({
      success: true,
      message: 'Usuario registrado exitosamente'
    });
  }

  // 🔑 LOGIN
  login(email: string, password: string): Observable<{success: boolean, message: string, usuario?: Usuario}> {
    console.log('Login attempt:', email);
    
    // Simulación de login
    if (email === 'admin@ejemplo.com' && password === 'admin123') {
      const adminUser: Usuario = {
        ...this.usuarioEjemplo,
        email: 'admin@ejemplo.com',
        rol: 'admin'
      };
      this.usuarioActual.next(adminUser);
      return of({
        success: true,
        message: 'Login exitoso',
        usuario: adminUser
      });
    } else if (email === this.usuarioEjemplo.email && password === 'password123') {
      this.usuarioActual.next(this.usuarioEjemplo);
      return of({
        success: true,
        message: 'Login exitoso',
        usuario: this.usuarioEjemplo
      });
    } else {
      return of({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }
  }

  // 🚪 LOGOUT
  logout(): Observable<{success: boolean}> {
    this.usuarioActual.next(null);
    return of({ success: true });
  }

  // 🔄 RECUPERAR CONTRASEÑA
  recuperarPassword(email: string): Observable<{success: boolean, message: string}> {
    console.log('Recuperando password para:', email);
    return of({
      success: true,
      message: 'Se ha enviado un enlace de recuperación a tu email'
    });
  }

  // 👤 ACTUALIZAR PERFIL
  actualizarPerfil(datos: Partial<Usuario>): Observable<{success: boolean, message: string}> {
    const usuarioActual = this.usuarioActual.value;
    if (usuarioActual) {
      const usuarioActualizado = { ...usuarioActual, ...datos };
      this.usuarioActual.next(usuarioActualizado);
      return of({
        success: true,
        message: 'Perfil actualizado exitosamente'
      });
    }
    return of({
      success: false,
      message: 'No hay usuario loggeado'
    });
  }

  // 🏠 GESTIONAR DIRECCIONES
  agregarDireccion(direccion: Omit<Direccion, 'id'>): Observable<{success: boolean, message: string}> {
    const usuario = this.usuarioActual.value;
    if (usuario) {
      const nuevaDireccion: Direccion = {
        ...direccion,
        id: Date.now().toString()
      };
      
      const direcciones = usuario.direcciones || [];
      usuario.direcciones = [...direcciones, nuevaDireccion];
      this.usuarioActual.next(usuario);
      
      return of({
        success: true,
        message: 'Dirección agregada exitosamente'
      });
    }
    return of({
      success: false,
      message: 'No hay usuario loggeado'
    });
  }

  eliminarDireccion(id: string): Observable<{success: boolean, message: string}> {
    const usuario = this.usuarioActual.value;
    if (usuario && usuario.direcciones) {
      usuario.direcciones = usuario.direcciones.filter(d => d.id !== id);
      this.usuarioActual.next(usuario);
      return of({
        success: true,
        message: 'Dirección eliminada exitosamente'
      });
    }
    return of({
      success: false,
      message: 'No se pudo eliminar la dirección'
    });
  }

  // 💳 GESTIONAR MÉTODOS DE PAGO
  agregarMetodoPago(metodo: Omit<MetodoPago, 'id'>): Observable<{success: boolean, message: string}> {
    const usuario = this.usuarioActual.value;
    if (usuario) {
      const nuevoMetodo: MetodoPago = {
        ...metodo,
        id: Date.now().toString()
      };
      
      const metodosPago = usuario.metodosPago || [];
      usuario.metodosPago = [...metodosPago, nuevoMetodo];
      this.usuarioActual.next(usuario);
      
      return of({
        success: true,
        message: 'Método de pago agregado exitosamente'
      });
    }
    return of({
      success: false,
      message: 'No hay usuario loggeado'
    });
  }

  eliminarMetodoPago(id: string): Observable<{success: boolean, message: string}> {
    const usuario = this.usuarioActual.value;
    if (usuario && usuario.metodosPago) {
      usuario.metodosPago = usuario.metodosPago.filter(m => m.id !== id);
      this.usuarioActual.next(usuario);
      return of({
        success: true,
        message: 'Método de pago eliminado exitosamente'
      });
    }
    return of({
      success: false,
      message: 'No se pudo eliminar el método de pago'
    });
  }

  // 🛡️ VERIFICACIONES
  estaLogueado(): boolean {
    return this.usuarioActual.value !== null;
  }

  esAdmin(): boolean {
    return this.usuarioActual.value?.rol === 'admin';
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioActual.value;
  }
}