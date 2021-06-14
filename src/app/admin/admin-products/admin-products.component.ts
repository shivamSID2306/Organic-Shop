import { ActivatedRoute } from '@angular/router';

import { Product } from './../../models/product';
import { ProductService } from 'src/app/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  id;


  
  constructor(private productService: ProductService, private route: ActivatedRoute) { 

    this.id = this.route.snapshot.paramMap.get('id');
  
    this.subscription = this.productService.getAll()
    .subscribe((products: Product[]) => this.filteredProducts = this.products = products);
  }
  
  filter(query: string){
    this.filteredProducts = (query) ? 
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
