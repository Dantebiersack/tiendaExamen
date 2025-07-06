import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../modelos/producto.model';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-card.html',
  styleUrls: ['./producto-card.css']
})
export class ProductoCardComponent {
  @Input() producto!: Producto;
}
