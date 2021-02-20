import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductLoopComponent } from './product-loop.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductLoopComponent],
  exports: [ProductLoopComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ProductLoopModule { }
