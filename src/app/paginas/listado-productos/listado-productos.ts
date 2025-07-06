import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../servicios/productos.service';
import { Producto } from '../../modelos/producto.model';
import { FormsModule } from '@angular/forms';
import { ProductoCardComponent } from '../../componentes/shared/producto-card/producto-card';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [CommonModule, ProductoCardComponent,FormsModule],
  templateUrl: './listado-productos.html',
  styleUrls: ['./listado-productos.css']
})
export class ListadoProductosComponent {
  productos: Producto[] = [];

  categoriaSeleccionada: number | null = null;
  textoBusqueda: string = '';

  constructor(private productosService: ProductosService) {
    this.cargarTodos();
  }

  cargarTodos(): void {
    this.productosService.getTodos().subscribe({
      next: data => {
        console.log('Productos recibidos:', data);
        this.productos = data;
      },
      error: err => console.error('Error cargando productos', err)
    });
  }

  filtrarPorCategoria(id: number): void {
  this.categoriaSeleccionada = id;

  if (this.textoBusqueda.trim()) {
    this.buscar(this.textoBusqueda); // aplica búsqueda con categoría
  } else {
    this.productosService.getPorCategoria(id).subscribe({
      next: data => this.productos = data,
      error: err => console.error('Error al filtrar por categoría', err)
    });
  }
}



  buscar(nombre: string): void {
    this.textoBusqueda = nombre.trim();

    if (!this.textoBusqueda) {
      if (this.categoriaSeleccionada !== null) {
        this.filtrarPorCategoria(this.categoriaSeleccionada);
      } else {
        this.cargarTodos();
      }
      return;
    }

    if (this.categoriaSeleccionada !== null) {
      this.productosService.buscarPorNombreYCategoria(this.textoBusqueda, this.categoriaSeleccionada).subscribe({
        next: data => this.productos = data,
        error: err => console.error('Error en búsqueda con categoría', err)
      });
    } else {
      this.productosService.buscar(this.textoBusqueda).subscribe({
        next: data => this.productos = data,
        error: err => console.error('Error en búsqueda', err)
      });
    }
  }
}