import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Product,
  WoocommerceProductsService,
} from '@wooApi/api';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl:
    './product.component.html',
  styleUrls: [
    './product.component.scss',
  ],
  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class ProductComponent
  implements OnInit {
  product: Product;
  relatedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private changeDetection: ChangeDetectorRef,
    private productService: WoocommerceProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      ({ id }) => {
        this.render(id);
      }
    );
  }

  render(id: string): void {
    this.productService
      .retrieveProduct(+id)
      .subscribe((product) => {
        console.log(product);
        this.product = product;
        this.getRelativeProducts(product.related_ids.slice(0, 3));
        this.changeDetection.detectChanges();
      });
  }

  getRelativeProducts(ids: Array<string>): void {
    const stream$ = ids.map(id => this.productService.retrieveProduct(+id));
    forkJoin(stream$).subscribe((products) => {
      console.log(products);
      this.relatedProducts = products;
      this.changeDetection.detectChanges();
    });
  }
}
