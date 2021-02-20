import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


import { NavModule } from '@components/nav/nav.module';
import { ProductLoopModule } from '@components/product-loop/product-loop.module';
import { ProductsComponent } from './products.component';

const routes: Routes = [{
  path: '',
  component: ProductsComponent
}];

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    NgbPaginationModule,
    RouterModule.forChild(routes),
    ProductLoopModule,
    NavModule,
  ]
})
export class ProductsModule { }
