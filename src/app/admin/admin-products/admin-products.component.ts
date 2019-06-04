import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent {
  products$;

  constructor(private productService: ProductService, private router: Router) {
    //this.products$ = this.productService.getAll();

    productService.getAllAdminProducts().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ productId: c.payload.key, ...c.payload.val() })))
    ).subscribe(products => {
      this.products$ = products;
    });

  }

  delete(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(productId);
    this.router.navigate(['/admin/products']);
  }
}
