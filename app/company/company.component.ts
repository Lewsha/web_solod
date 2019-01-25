import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent {
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
