import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CategoriesService } from '../../../../services/categories.service';
import { Category } from '../../../../interfaces/category';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from 'primeng/inputnumber';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ToastModule,
    RippleModule,
    InputNumberModule
  ],
  providers: [MessageService],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService
  ) {}

  lstCategories: Category[] | undefined;
  selectedCategory: Category | undefined;
  visible: boolean = false;
  isLoading: boolean = true;
  value1:number = 0;

  ngOnInit(): void {
    this.listCategories();
  }

  showDialog() {
    this.visible = true;
    console.log(this.selectedCategory);
  }

  listCategories(): void {
    this.isLoading = true; // Ativa o estado de carregamento

    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        if (response !== undefined && response !== null) {
          // Verifica se existe uma mensagem de erro amigável
          if (response.friendlyErrorMessage) {
            // Manipula mensagens amigáveis (se necessário)
            this.showError("Erro interno.", response.friendlyErrorMessage);

            this.isLoading = false;
          } else {
            // Preenche a lista de produtos com o array `data`
            this.lstCategories = response.data as Array<Category>;
            this.isLoading = false;
          }
        }
      },
      error: (err) => {
        console.log(err)
        this.isLoading = false; // Desativa o estado de carregamento
        this.showError("Erro interno.", err.error.friendlyErrorMessage);
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

  showError(message: string, detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: message,
      detail: detail,
    });
  }
}
