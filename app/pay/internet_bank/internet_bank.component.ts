import { Component, OnInit } from '@angular/core';
import backend from '../../../backend_requests';
import { AnyBankQuery } from '../../../backend_requests';


@Component({
  selector: 'app-internet_bank',
  templateUrl: './internet_bank.component.html',
  styleUrls: ['./internet_bank.component.css']
})
export class Internet_bankComponent implements OnInit {

  'from': string = "";
  'bik': string = "";
  'bill_num': string = "";
  'sum': string = "";
  'purpose': string = "НДС 18%";

  onClickVat18(){
    this.purpose = "НДС 18%"
  }
  onClickVat10(){
    this.purpose = "НДС 10%"
  }
  onClickNoVat(){
    this.purpose = "без НДС"
  }

  constructor() { }

  ngOnInit() { }

  check_from(){
    const match_res = this.from.match("^\\d+$");
    return !(!match_res) && (10 <= this.from.length && this.from.length <= 12);
  }

  check_bik(){
    const match_res = this.bik.match("^\\d+$");
    return !(!match_res) && (this.bik.length === 9);
  }

  check_bill_num(){
    const match_res = this.bill_num.match("^\\d+$");
    return !(!match_res);
  }

  check_sum(){
    const match_res = this.sum.match("^\\d+$");
    if (!match_res) return false;
    const sum = parseInt(this.sum);
    return (1000 <= sum ) && (sum <= 75000);
  }

  check_purpose(){
    return (this.purpose === "НДС 18%") || (this.purpose === "НДС 10%") ||(this.purpose === "без НДС");
  }

  onSubmit(){
    let all_valid = true;
    if (!this.check_from()) {
      this.from = "";
      all_valid = false;
    }
    if (!this.check_bik()) {
      this.bik = "";
      all_valid = false;
    }
    if (!this.check_bill_num()) {
      this.bill_num = "";
      all_valid = false;
    }
    if (!this.check_sum()) {
      this.sum = "";
      all_valid = false;
    }
    if (!this.check_purpose()) {
      console.log(`InternetBankComponents: Wrong field purpose: ${this.purpose}`);
      all_valid = false;
    }
    if (all_valid) {
      console.log("All right")
    }
  }
}
