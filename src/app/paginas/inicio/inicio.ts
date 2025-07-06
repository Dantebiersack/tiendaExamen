import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { Producto } from '../../modelos/producto.model';
import { ProductoCardComponent } from '../../componentes/shared/producto-card/producto-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, ProductoCardComponent],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent implements OnInit {
  productosDestacados: Producto[] = [];
  currentIndex = 0;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarDestacados();
  }

  cargarDestacados(): void {
    this.productosService.getTodos().subscribe({
      next: data => {
        const aleatorios = data.sort(() => 0.5 - Math.random()).slice(0, 5); // Por ejemplo, 5
        this.productosDestacados = aleatorios;
        this.currentIndex = Math.floor(aleatorios.length / 2); // centramos uno al inicio
      },
      error: err => console.error('Error al cargar destacados', err)
    });
  }

  prev(): void {
    if (this.currentIndex > 0) this.currentIndex--;
  }

  next(): void {
    if (this.currentIndex < this.productosDestacados.length - 1) this.currentIndex++;
  }
}

