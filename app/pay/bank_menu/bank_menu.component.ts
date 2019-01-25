import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bank_menu',
  templateUrl: './bank_menu.component.html',
  styleUrls: ['./bank_menu.component.css']
})
export class Bank_menuComponent {
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
