import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  loadedFeature = 'any_bank';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
