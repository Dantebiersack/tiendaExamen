import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../servicios/productos.service';
import { Producto } from '../../modelos/producto.model';
import { ProductoCardComponent } from '../../componentes/shared/producto-card/producto-card';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [CommonModule, ProductoCardComponent],
  templateUrl: './listado-productos.html',
  styleUrls: ['./listado-productos.css']
})
export class ListadoProductosComponent {
  productos: Producto[] = [];

  categoriaSeleccionada: number | null = null;

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


  buscar(nombre: string): void {
    if (!nombre?.trim()) {
      this.cargarTodos();
      return;
    }
    
    this.productosService.buscar(nombre.trim()).subscribe({
      next: data => this.productos = data,
      error: err => console.error('Error en búsqueda', err)
    });
  }

  filtrarPorCategoria(id: number): void {
    this.productosService.getPorCategoria(id).subscribe({
      next: data => this.productos = data,
      error: err => console.error('Error al filtrar por categoría', err)
    });
  }
}