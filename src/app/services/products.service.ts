import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://localhost:7160/api/Product'; // Base da API

  constructor(private http: HttpClient) {}

  // Método para buscar todos os produtos
  getAllProducts(): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/GetAllProducts`);
  }
}
