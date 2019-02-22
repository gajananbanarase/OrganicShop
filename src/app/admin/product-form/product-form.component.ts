import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { CategoryService } from '../../category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent {
  categories$;
  product = {};
  productId;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService) {

    this.categories$ = categoryService.getCategories();
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.product = this.productService.get(this.productId).subscribe(item => this.product = item);
    }
  }

  save(product) {
    if (this.productId) {
      this.productService.update(this.productId, product);
    }
    else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.productId);
    this.router.navigate(['/admin/products']);
  }

  //ngOnDestroy() {
  //  this.product.unsubscribe();
  //}
}
