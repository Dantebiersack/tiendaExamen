import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'https://localhost:7222/api/productos'; // cambia el PORT si es necesario

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  buscar(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/buscar?nombre=${nombre}`);
  }

  getPorCategoria(categoriaId: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`https://localhost:7222/api/categorias/${categoriaId}/productos`);
  }
}
