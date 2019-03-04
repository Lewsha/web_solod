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

  check_inn(){}

  check_bik(){}

  check_bill_num(){}

  check_purpose(){}

  check_sum(){}

  check_telephone(){}

  check_email(){}

  constructor() { }

  ngOnInit() { }

  onSubmit(){}
}
