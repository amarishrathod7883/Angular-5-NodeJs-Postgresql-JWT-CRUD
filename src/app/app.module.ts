import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './component/products/products.component';
import { AddProductsComponent } from './component/products/add-products.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';

import { ProductsService } from './services/products.service';
import { AuthService } from './services/auth.service';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { AuthGuard } from './guard/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    AddProductsComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    authInterceptorProviders,
    ProductsService,
    AuthService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }



