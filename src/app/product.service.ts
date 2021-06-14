import { Product } from './models/product';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  itemRef: any;
  dataSource: AngularFireList<Product>
  items: Product[] = [];

  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  // getAll(){
  //   return this.db.list('/products').valueChanges();
  // }

  getAll() { 
    this.itemRef =  this.db.list('/products').snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Product[] }));
    }));
    return this.itemRef;
  }

  get(productId){
    return this.db.object('/products/' + productId);
  }

  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
