import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor() { }

  loadedFeature = 'pay';

  ngOnInit(): void {
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

}
