import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio';
import { ListadoProductosComponent } from './paginas/listado-productos/listado-productos';
import { ContactoComponent } from './paginas/contacto/contacto';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'productos', component: ListadoProductosComponent },
  {
    path: 'contacto',
    component: ContactoComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
