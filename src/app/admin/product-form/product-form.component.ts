import { Product } from './../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product: any = {};
  id;

  constructor(
    private route: ActivatedRoute,
    categoryService: CategoryService,
    private productService: ProductService,
    private router: Router) { 
    this.categories$ = categoryService.getCategories();
    
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id) this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe(p => {
      this.product = p}); 
    }

  save(product){
    if (this.id) this.productService.update(this.id, product)
    else this.productService.create(product);
    
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Do you really want to delete this item?')) return;

    this.productService.delete(this.id)
    this.router.navigate(['/admin/products']);  
  }

}
