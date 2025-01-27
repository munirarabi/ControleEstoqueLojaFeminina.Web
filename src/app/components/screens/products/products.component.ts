import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = false;
  isGridShowing: boolean = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Método para carregar produtos
  loadProducts(): void {
    this.isLoading = true; // Ativa o estado de carregamento
  
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        console.log(response)
        if (response !== undefined && response !== null) {
          // Verifica se existe uma mensagem de erro amigável
          if (response.friendlyErrorMessage) {
            // Manipula mensagens amigáveis (se necessário)
            this.handleFriendlyError(response.friendlyErrorMessage);
  
            this.isLoading = false;
          } else {
            // Preenche a lista de produtos com o array `data`
            this.products = response.data as Array<Product>;
  
            this.isLoading = false;
            this.isGridShowing = true; // Exibe a grade de produtos
          }
        }
      },
      error: (err) => {
        this.isLoading = false; // Desativa o estado de carregamento
        this.handleError(err); // Manipula erros gerais
      },
    });
  }
  
  // Método para tratar mensagens amigáveis de erro
  handleFriendlyError(message: string): void {
    console.warn('Erro amigável:', message);
    // Implemente aqui a lógica para exibir mensagens no UI, como abrir um modal.
  }
  
  // Método para tratar erros gerais
  handleError(error: any): void {
    console.error('Erro ao carregar produtos:', error);
    // Implemente lógica para exibir mensagens de erro no UI, se necessário
  }
  
}
