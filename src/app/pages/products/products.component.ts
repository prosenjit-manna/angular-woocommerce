import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductOrder, ProductOrderBy, ProductQuery, WoocommerceProductsService } from '@wooApi/index';
import { combineLatest } from 'rxjs';
import { combineAll, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  page;
  perPage = 12;
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

    combineLatest([this.activatedRoute.params, this.activatedRoute.queryParams])
    .pipe(switchMap(([{page}, {orderby, order}]) => {
      page = page ? page : '1';

      this.page = +page;
      this.changeDetection.detectChanges();
      return this.woocommerceProductsService.retrieveProducts({
        page,
        per_page: this.perPage,
        order: order ? order : ProductOrder.desc,
        orderby: orderby ? orderby : ProductOrderBy.date
      });
    }))
    .subscribe(({products, headers}) => {
      this.collectionSize = headers['x-wp-total'];
      this.products = products;
      this.changeDetection.detectChanges();
    });
  }

  changePage(page: number): void {
    this.activatedRoute.queryParams
      .pipe(
        take(1)
      ).subscribe((params) => {
        this.router.navigate(['/products', page], {
          queryParams: params
        });
      });
  }

  sortProducts(key: string): void {
    const query: ProductQuery = {
      orderby: key
    };
    if (key === 'price') {
      query.order = ProductOrder.asc;
    }
    if (key === 'price-desc') {
      query.orderby = 'price';
      query.order = ProductOrder.desc;
    }
    this.router.navigate(['/products'], {
      queryParams: query
    });
  }

}
