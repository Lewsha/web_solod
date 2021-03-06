import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InformationComponent } from './information/information.component';
import { Pay_menuComponent } from './pay_menu/pay_menu.component';
import { Request_payComponent } from './request_pay/request_pay.component';
import {PayComponent} from "./pay/pay.component";
import {Any_bankComponent} from "./pay/any_bank/any_bank.component";
import {Internet_bankComponent} from "./pay/internet_bank/internet_bank.component";
import {Bank_menuComponent} from "./pay/bank_menu/bank_menu.component";
import {CompanyComponent} from "./company/company.component";
import {AdminComponent} from "./admin_panel/admin_panel.component";
import { PaymentComponent } from './admin_panel/payment/payment.component';
import { RequestedPaymentComponent } from './admin_panel/requested-payment/requested-payment.component';
import { AuthMenuComponent } from './admin_panel/auth-menu/auth-menu.component';
import { ViewComponent } from './view/view.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    InformationComponent,
    CompanyComponent,
    Pay_menuComponent,
    Request_payComponent,
    PayComponent,
    Bank_menuComponent,
    Any_bankComponent,
    Internet_bankComponent,
    AdminComponent,
    PaymentComponent,
    RequestedPaymentComponent,
    AuthMenuComponent,
    ViewComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([{
        path: 'admin',
        component: AdminComponent
      },
      {
        path: '',
        component: ViewComponent
      },
      {
        path: 'test',
        component: TestComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
