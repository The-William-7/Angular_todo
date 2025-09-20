import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  // Login con Google
  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      
      if (result.user) {
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.error('Error en login con Google:', error);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  }

  // Obtener usuario actual
  getCurrentUser() {
    return this.afAuth.authState;
  }
}