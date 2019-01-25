import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pay_menu',
  templateUrl: './pay_menu.component.html',
  styleUrls: ['./pay_menu.component.css']
})
export class Pay_menuComponent {
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
