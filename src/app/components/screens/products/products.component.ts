import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../interfaces/product';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    AddProductComponent
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @ViewChild(AddProductComponent) addProductComponent!: AddProductComponent;

  constructor(private productsService: ProductsService,) {}

  //#region variáveis
  // Array
  products: Product[] = [];
  // Bool
  isLoading: boolean = false;
  isGridShowing: boolean = false;

   // Defina a variável para controlar a visibilidade do AddProductComponent
   isAddProductVisible: boolean = false;
  //#endregion

  ngOnInit(): void {
    this.loadProducts();
  }  

  abrirAddProduct(): void {
    // Aqui você chama o método showDialog do AddProductComponent usando o @ViewChild
    this.addProductComponent.showDialog();
  }

  // Método para carregar produtos
  loadProducts(): void {
    this.isLoading = true; // Ativa o estado de carregamento

    this.productsService.getAllProducts().subscribe({
      next: (response) => {
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

  deleteProduct(product: Product): void {
    this.isLoading = true; // Ativa o estado de carregamento

    this.productsService.deleteProduct(product.productId).subscribe({
      next: (response) => {
        if (response !== undefined && response.friendlyErrorMessage.length > 0) {
          this.handleFriendlyError(response.friendlyErrorMessage);

          this.isLoading = false;
          return;
        }

        this.loadProducts();
        this.isLoading = false; // Desativa o estado de carregamento
      },
      error: (err) => {
        this.isLoading = false; // Desativa o estado de carregamento
        this.handleError(err); // Manipula erros gerais
      },
    });
  }
}
