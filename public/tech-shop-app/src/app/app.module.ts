import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { TitleComponent } from './shared/components/title/title.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AlertComponent } from './shared/components/alert/alert.component';

import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { CategoryService } from './admin/category/category.service';
import { CategoryComponent } from './admin/category/category.component';
import { CategoryNewComponent } from './admin/category/category-new/category-new.component';
import { CategoryEditComponent } from './admin/category/category-edit/category-edit.component';
import { ProductComponent } from './admin/product/product.component';
import { ProductListComponent } from './admin/product/product-list/product-list.component';
import { ProductNewComponent } from './admin/product/product-new/product-new.component';
import { ProductEditComponent } from './admin/product/product-edit/product-edit.component';
import { ProductService } from './admin/product/product.service';
import { UrlImagePipe } from './shared/pipes/url-image/url-image.pipe';
import { SearchComponent } from './shared/components/search/search.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { CapitalizePipe } from './shared/pipes/capitalize/capitalize.pipe';
import { UserComponent } from './admin/user/user.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { UserService } from './admin/user/user.service';
import { UserNewComponent } from './admin/user/user-new/user-new.component';
import { UserEditComponent } from './admin/user/user-edit/user-edit.component';
import { SignupComponent } from './shared/components/signup/signup.component';
import { SigninComponent } from './shared/components/signin/signin.component';
import { AuthService } from './shared/services/auth.service';
import { AdminGuard } from './shared/guards/admin.guard';
import { SideComponent } from './dashboard/side/side.component';
import { ProductCardComponent } from './dashboard/product-card/product-card.component';
import { DatePipe } from '@angular/common';
import { ProductCardDetailsComponent } from './dashboard/product-card-details/product-card-details.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { OrderService } from './dashboard/order/order.service';
import { OrderComponent } from './dashboard/order/order.component';
import { OrderListComponent } from './dashboard/order/order-list/order-list.component';
import { OrderDetailsComponent } from './dashboard/order/order-details/order-details.component';
import { ShoppingCartComponent } from './dashboard/order/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './dashboard/order/check-out/check-out.component';
import { ThankYouComponent } from './dashboard/order/thank-you/thank-you.component';
import { OrderListAllComponent } from './dashboard/order/order-list-all/order-list-all.component';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { FilterPipe } from './shared/pipes/filter/filter.pipe';
import { NotPermissionsComponent } from './shared/components/not-permissions/not-permissions.component';
import { OnlyAdminGuard } from './shared/guards/only-admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TitleComponent,
    NotFoundComponent,
    AlertComponent,
    CategoryListComponent,
    CategoryComponent,
    CategoryNewComponent,
    CategoryEditComponent,    
    ProductComponent, 
    ProductListComponent,
    ProductNewComponent,
    ProductEditComponent,
    UrlImagePipe,
    SearchComponent,
    PaginationComponent,
    CapitalizePipe,
    UserComponent,
    UserListComponent,
    UserNewComponent,
    UserEditComponent,
    SignupComponent,
    SigninComponent,
    SideComponent,
    ProductCardComponent,
    ProductCardDetailsComponent,
    OrderComponent,
    OrderListComponent,
    OrderDetailsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    ThankYouComponent,
    OrderListAllComponent,
    FilterPipe,
    NotPermissionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SlimLoadingBarModule.forRoot()
  ],
  providers: [
    CategoryService, 
    ProductService, 
    UserService, 
    AuthService, 
    AdminGuard,
    OnlyAdminGuard,
    DatePipe,
    OrderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
