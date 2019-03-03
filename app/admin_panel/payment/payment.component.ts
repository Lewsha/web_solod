import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../backend_requests';
import backend from '../../../backend_requests';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  table: Payment[] = [];

  param_sort: string;
  param_sortField: string;
  param_filter: string;
  param_filterField: string;

  constructor() { }

  ngOnInit() {
    this._get_data();
  }

  onClickRefresh(){
    const sort =        this.param_sort        === "" ? undefined : this.param_sort;
    const sortField =   this.param_sortField   === "" ? undefined : this.param_sortField;
    const filter =      this.param_filter      === "" ? undefined : this.param_filter;
    const filterField = this.param_filterField === "" ? undefined : this.param_filterField;
    this._get_data(sort, sortField, filter, filterField);
  }

  _get_data(sort: string = undefined, sort_field: string = undefined,
            filter: string = undefined, filter_field: string = undefined){
    this.table = [];
    backend.get_payment(sort, sort_field, filter, filter_field)
      .then((result) => {this.table = result ? result : []})
  }

  onClickPatch(idx: number){
    const payment = this.table[idx]
    payment.safe = !payment.safe
    backend.patch_payment(payment).then(
      () => this.onClickRefresh()
    )
  }
}
