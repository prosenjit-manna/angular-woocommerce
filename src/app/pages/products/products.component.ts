import { Component, OnInit } from '@angular/core';
import { Product, WoocommerceProductsService } from '@wooApi/index';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private woocommerceProductsService: WoocommerceProductsService
  ) { }

  ngOnInit(): void {
    this.woocommerceProductsService.retrieveProducts()
    .subscribe(({products}) => {
      this.products = products;
      console.log(products);
    }, err => {
      console.log(err);
    });
  }

}
