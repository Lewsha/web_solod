import { Component, OnInit } from '@angular/core';
import {RequestedPayment} from '../../../backend_requests';
import backend from '../../../backend_requests';

@Component({
  selector: 'app-requested-payment',
  templateUrl: './requested-payment.component.html',
  styleUrls: ['./requested-payment.component.css']
})
export class RequestedPaymentComponent implements OnInit {

  param_sort: string = "";
  param_sortField: string = "";
  param_filterField: string = "";
  param_filter: string = "";

  table: RequestedPayment[] = [];

  constructor() { }

  ngOnInit() {
    this._get_data();
  }

  onClick(){
    this._get_data();
  }

  _get_data(sort: string = undefined, sort_field: string = undefined,
            filter: string = undefined, filter_field: string = undefined){
    backend.get_requested_payment(sort, sort_field, filter, filter_field)
      .then((result) => {this.table = result ? result: []})
  }

  onClickRefresh(){
    this._get_data(this.param_sort, this.param_sortField, this.param_filter, this.param_filterField)
  }
}
