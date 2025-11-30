import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, Usuario } from '../../servicios/usuarios/auth.service.ts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  usuario: Usuario | null = null;
  estaLogueado: boolean = false;
  esAdmin: boolean = false;
  mostrarMenuUsuario: boolean = false;
  private usuarioSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuarioSubscription = this.authService.usuarioActual$.subscribe(
      (usuario) => {
        this.usuario = usuario;
        this.estaLogueado = !!usuario;
        this.esAdmin = usuario?.rol === 'admin';
      }
    );
  }

  ngOnDestroy() {
    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe();
    }
  }

  toggleMenuUsuario() {
    this.mostrarMenuUsuario = !this.mostrarMenuUsuario;
  }

  cerrarMenuUsuario() {
    this.mostrarMenuUsuario = false;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.mostrarMenuUsuario = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    });
  }

  irAPerfil() {
    this.mostrarMenuUsuario = false;
    this.router.navigate(['/perfil']);
  }

  irAAdmin() {
    this.mostrarMenuUsuario = false;
    this.router.navigate(['/admin']);
  }
}