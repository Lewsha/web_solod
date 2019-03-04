import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request_pay',
  templateUrl: './request_pay.component.html',
  styleUrls: ['./request_pay.component.css']
})
export class Request_payComponent implements OnInit {

  inn: string = "";
  bik: string = "";
  bill_num: string = "";
  purpose: string = "";
  sum: string = "";
  telephone: string = "";
  email: string = "";

  onClickVat18(){
    this.purpose = "НДС 18%"
  }
  onClickVat10(){
    this.purpose = "НДС 10%"
  }
  onClickNoVat(){
    this.purpose = "без НДС"
  }

  check_inn(){
    const match_res = this.inn.match("^\\d+$");
    return !(!match_res) && (10 <= this.inn.length && this.inn.length <= 12);
  }

  check_bik(){
    const match_res = this.bik.match("^\\d+$");
    return !(!match_res) && (this.bik.length === 9);
  }

  check_bill_num(){
    const match_res = this.bill_num.match("^\\d+$");
    return !(!match_res);
  }

  check_purpose(){
    return (this.purpose === "НДС 18%") || (this.purpose === "НДС 10%") ||(this.purpose === "без НДС");
  }

  check_sum(){
    const match_res = this.sum.match("^\\d+$");
    if (!match_res) return false;
    const sum = parseInt(this.sum);
    return (1000 <= sum ) && (sum <= 75000);
  }

  check_telephone(){
    const match_res = this.telephone.match("^\\+7\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}$");
    return !(!match_res);
  }

  check_email(){
    const match_res = this.email.match("^\\w+@\\w(?:\\w*|\\.\\w)*$");
    return !((((!match_res))));
  }

  constructor() { }

  ngOnInit() { }

  onSubmit(){
    let all_valid = true;
    if (!this.check_inn()) {
      this.inn = "";
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
    if (!this.check_purpose()) {
      console.log(`InternetBankComponents: Wrong field purpose: ${this.purpose}`);
      all_valid = false;
    }
    if (!this.check_sum()) {
      this.sum = "";
      all_valid = false;
    }
    if (!this.check_telephone()) {
      this.telephone = "";
      all_valid = false;
    }
    if (!this.check_email()){
      console.log("Bad email");
      this.email = "";
      all_valid = false;
    }
    if (all_valid) {
      console.log("All right")
    }
  }
}
