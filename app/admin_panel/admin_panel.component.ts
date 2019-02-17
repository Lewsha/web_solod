import {Component, OnInit} from '@angular/core';
import backend from './backend_requests';
import {Payment, RequestedPayment, AnyBankQuery} from './backend_requests';

@Component({
  selector: 'app-admin_panel',
  templateUrl: './admin_panel.component.html',
  styleUrls: ['./admin_panel.component.css']
})
export class AdminComponent implements OnInit {
  table_payment: Payment[] = [];
  table_requested_payment: RequestedPayment[] = [];

  onClickGetPayment() {
    backend.get_payment('desc', 'sum')
      .then((result) => {
        this.table_payment = result;
      });
  }

  onClickGetRequestedPayment() {
    backend.get_requested_payment('desc', 'sum')
      .then((result) => {
        this.table_requested_payment = result;
      });
  }

  ngOnInit() {
  }
}
