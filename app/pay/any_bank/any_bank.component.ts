import { Component, OnInit } from '@angular/core';
import backend from '../../../backend_requests';
import {Payment} from '../../../backend_requests';

@Component({
  selector: 'app-any_bank',
  templateUrl: './any_bank.component.html',
  styleUrls: ['./any_bank.component.css']
})

export class Any_bankComponent implements OnInit {

  card: string = "";
  date: string = "";
  cvc: string = "";
  sum: string = "";
  comment: string = "";
  email: string = "";

  check_card(){
    return (this.card.length === 16 && this.card.match("^\\d+$"));
  }

  check_date(){
    const match_res = this.date.match("^(\\d\\d)/(\\d\\d)$");
    if (!match_res) return false;
    const month: number = parseInt(match_res[1]);
    const year: number = parseInt(match_res[2]);
    return (1 <= month && month <= 12) && (17 <= year && year <= 35);
  }

  check_cvc(){
    return this.cvc.length === 3;
  }

  check_sum(){
    const match_res = this.sum.match("^\\d+$");
    if (!match_res) return false;
    const sum = parseInt(this.sum);
    return (1000 <= sum) && (sum <= 75000);
  }

  check_comment(){
    return (0 < this.comment.length) && (this.comment.length <= 150);
  }

  check_email(){
    const match_res = this.email.match("^\\w+@\\w(?:\\w*|\\.\\w)*$");
    return !((((!match_res))));
  }

  check_xss(){
    if (this.comment.indexOf('<script>') != -1){
      this.comment = this.comment.replace('<script>', "<sssscript>");
    }
    return this.comment;
  }

  constructor() { }

  ngOnInit() { }

  onSubmit(){
    let all_are_valid = true;
    if (!this.check_card()) {
      console.log("Bad card");
      this.card = "";
      all_are_valid = false;
    }
    if (!this.check_date()){
      console.log("Bad date");
      this.date = "";
      all_are_valid = false;
    }
    if (!this.check_cvc()){
      console.log("Bad cvc");
      this.cvc = "";
      all_are_valid = false;
    }
    if (!this.check_sum()){
      console.log("Bad sum");
      this.sum = "";
      all_are_valid = false;
    }
    if (!this.check_email()){
      console.log("Bad email");
      this.email = "";
      all_are_valid = false;
    }
    if (!this.check_comment()){
      console.log("Bad comment");
      this.comment = "";
      all_are_valid = false;
    }

    this.check_xss();
    console.log(this.comment);

    if (all_are_valid) {
      // TODO send GET
      console.log("ALRIGHT");
      const payment = new Payment(
        this.card, this.date, this.cvc, parseInt(this.sum), this.comment, this.email
      );
      delete payment.id;
      backend.post_payment(payment);
    }
  }
}
