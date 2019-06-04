import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { reject } from 'q';
import { Observable } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  productsRef: AngularFireList<Product> = null;

  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list('/products');
  }

  getAll() {
    return this.db.list('/products').valueChanges();
  }

  getAllAdminProducts(): AngularFireList<Product> {
    return this.productsRef;
  }

  create(product) {
    return this.db.list('/products').push(product);
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}
