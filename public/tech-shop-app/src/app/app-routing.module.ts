import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { HomeComponent } from './dashboard/home/home.component';
import { CategoryComponent } from './admin/category/category.component';
import { CategoryNewComponent } from './admin/category/category-new/category-new.component';
import { CategoryEditComponent } from './admin/category/category-edit/category-edit.component';
import { ProductComponent } from './admin/product/product.component';
import { ProductNewComponent } from './admin/product/product-new/product-new.component';
import { ProductEditComponent } from './admin/product/product-edit/product-edit.component';
import { UserComponent } from './admin/user/user.component';
import { UserNewComponent } from './admin/user/user-new/user-new.component';
import { UserEditComponent } from './admin/user/user-edit/user-edit.component';
import { SignupComponent } from './shared/components/signup/signup.component';
import { SigninComponent } from './shared/components/signin/signin.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { ProductCardDetailsComponent } from './dashboard/product-card-details/product-card-details.component';
import { OrderComponent } from './dashboard/order/order.component';
import { CheckOutComponent } from './dashboard/order/check-out/check-out.component';
import { ThankYouComponent } from './dashboard/order/thank-you/thank-you.component';
import { OrderListComponent } from './dashboard/order/order-list/order-list.component';
import { OrderListAllComponent } from './dashboard/order/order-list-all/order-list-all.component';
import { OrderDetailsComponent } from './dashboard/order/order-details/order-details.component';
import { NotPermissionsComponent } from './shared/components/not-permissions/not-permissions.component';
import { OnlyAdminGuard } from './shared/guards/only-admin.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, runGuardsAndResolvers: 'always' },  
  { path: '', pathMatch: 'full', redirectTo: 'home' },  

  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: '403', component: NotPermissionsComponent },

  { path: '', canActivate:[AdminGuard], children: [
    { path: '', canActivate:[OnlyAdminGuard], children: [
      { path: 'categories', component: CategoryComponent },
      { path: 'categories/new', component: CategoryNewComponent },
      { path: 'categories/edit/:id', component: CategoryEditComponent },
      { path: 'products', component: ProductComponent },
      { path: 'products/new', component: ProductNewComponent },
      { path: 'products/edit/:id', component: ProductEditComponent },
      { path: 'users', component: UserComponent },
      { path: 'users/new', component: UserNewComponent },
      { path: 'users/edit/:id', component: UserEditComponent },
      { path: 'orders', component: OrderListAllComponent },
    ]},
    { path: 'shopping-cart', component: OrderComponent },
    { path: 'check-out', component: CheckOutComponent },
    { path: 'thank-you', component: ThankYouComponent },
    { path: 'my-orders', component: OrderListComponent },
    { path: 'order/:id', component: OrderDetailsComponent },
  ]},  
  
  { path: 'product/:id', component: ProductCardDetailsComponent },  

  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ]
})

export class AppRoutingModule { }
