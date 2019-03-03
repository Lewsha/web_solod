import {Component, OnInit} from '@angular/core';
import backend from '../../backend_requests';

@Component({
  selector: 'app-admin_panel',
  templateUrl: './admin_panel.component.html',
  styleUrls: ['./admin_panel.component.css']
})
export class AdminComponent implements OnInit {

  authorized() {
    return backend.is_authorized();
  }

  ngOnInit() {
  }
}
