import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { BackendService } from '../backend.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  payments;
  paymentForm;

  constructor(
    private backend: BackendService,
    private formBuilder: FormBuilder,
  ) {
    this.paymentForm = this.formBuilder.group({
      card_number: '',
      cvc: '',
      date: '',
      sum: 0,
      comment: '',
      email: ''
    });
  }

  ngOnInit(): void {
    this.payments = this.backend.getPayments();
  }

  onSubmit(payment) {
    // Process checkout data here

    console.warn('Your order has been submitted');
    this.backend.postPayment(payment)
      .subscribe(data => {
        this.payments = this.backend.getPayments();
      });
  }
}
