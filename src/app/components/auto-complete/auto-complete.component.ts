import { Component } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Use o CommonModule aqui

@Component({
  selector: 'app-auto-complete',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule, CommonModule], // Inclua o CommonModule
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
})
export class AutoCompleteComponent {
  selectedCountry: any;
  filteredCountries: any[] = [];

  filterCountry(event: any) {
    this.filteredCountries = [
      { name: 'Brazil' },
      { name: 'USA' },
      { name: 'Canada' },
      { name: 'Germany' },
    ].filter(country => country.name.toLowerCase().includes(event.query.toLowerCase()));
  }
}
