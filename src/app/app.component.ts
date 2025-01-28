import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenubarModule } from 'primeng/menubar'; // Navbar
import { SidebarModule } from 'primeng/sidebar'; // Menu lateral
import { ButtonModule } from 'primeng/button'; // Botões

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule, SidebarModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/login',
    },
    {
      label: 'Sobre',
      icon: 'pi pi-info-circle',
      routerLink: '/products',
    },
    {
      label: 'Contato',
      icon: 'pi pi-envelope',
      routerLink: '/',
    },
  ];
  sidebarVisible: any;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  title = 'ControleEstoqueLojaFeminina_Web';
}
