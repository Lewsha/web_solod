import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  serverAddr = 'http://5.172.14.244:8000';

  constructor(
    private http: HttpClient
  ) { }

  getPayments() {
    return this.http.get(this.serverAddr + '/card-payment');
  }

  postPayment(payment) {
    return this.http.post(this.serverAddr + '/card-payment', payment);
  }

  patchPayment(paymentId, flag){
    return this.http.patch(this.serverAddr + '/card-payment/' + paymentId, flag);
  }

  optionsPayment(){
    return this.http.options(this.serverAddr + '/card-payment');
  }

  getRequestedPayment(){
    return this.http.get(this.serverAddr + '/requested-payments');
  }

  postRequestedPayment(payment){
    this.http.post(this.serverAddr + '/requested-payments', payment);
  }

  optionsRequestedPayment(){
    return this.http.options(this.serverAddr + '/requested-payments');
  }

  postAnyBankQuery(query){
    this.http.post(this.serverAddr + '/any-bank-query', query);
  }

  optionsAnyBankQuery(){
    return this.http.options(this.serverAddr + '/any-bank-query');
  }
}
