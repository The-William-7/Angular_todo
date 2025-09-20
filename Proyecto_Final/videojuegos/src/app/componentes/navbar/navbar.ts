import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;
  userInitials: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Escuchar cambios en la autenticación
    this.afAuth.authState.subscribe(user => {
      this.isLoggedIn = !!user;
      this.user = user;
      
      if (user && user.displayName) {
        this.userInitials = this.getUserInitials(user.displayName);
      }
    });
  }

  private getUserInitials(fullName: string): string {
    return fullName.split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  async login() {
    try {
      await this.authService.loginWithGoogle();
    } catch (error) {
      console.error('Error en login:', error);
    }
  }

  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    }
  }
}