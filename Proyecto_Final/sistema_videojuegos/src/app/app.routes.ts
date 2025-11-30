import { Routes } from '@angular/router';
import { Catalogo } from './componentes/catalogo/catalogo';
import { LoginComponent } from './componentes/usuarios/login/login';
import { Registro } from './componentes/usuarios/registro/registro';
import { Perfil } from './componentes/usuarios/perfil/perfil';


export const routes: Routes = [
  { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: Catalogo },
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: Registro },
  { path: 'perfil', component: Perfil },
  { path: '**', redirectTo: '/catalogo' }
];