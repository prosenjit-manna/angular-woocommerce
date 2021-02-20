import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductOrder, ProductOrderBy, WoocommerceProductsService } from '@wooApi/index';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  page;
  collectionSize = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDetection: ChangeDetectorRef,
    private woocommerceProductsService: WoocommerceProductsService,
  ) { }

  ngOnInit(): void {
   this.renderPage();
  }

  private renderPage(): void {
    this.activatedRoute.params
    .pipe(switchMap(({page}) => {
      page = page ? page : '1';

      if (+page === 1) {
        this.router.navigate(['/products']);
      }

      this.page = +page;
      this.changeDetection.detectChanges();
      return this.woocommerceProductsService.retrieveProducts({
        page,
        order: ProductOrder.desc,
        orderby: ProductOrderBy.date
      });
    }))
    .subscribe(({products, headers}) => {
      this.collectionSize = headers['x-wp-total'];
      this.products = products;
      this.changeDetection.detectChanges();
      console.log({headers, products});
    });
  }

  changePage(page: number): void {
    this.router.navigate(['/products', page]);
  }

}
