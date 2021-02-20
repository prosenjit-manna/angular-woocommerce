import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '@wooApi/index';

@Component({
  selector: 'app-product-loop',
  templateUrl: './product-loop.component.html',
  styleUrls: ['./product-loop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductLoopComponent implements OnInit {
  @Input() product: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
