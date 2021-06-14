import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping: any = {};
  cart$: Observable<any>;
  cart: ShoppingCart;
  totalPrice: any;
  totalItemsCount: any;

  subscription: Subscription;
  userSubscription: Subscription;

  userId: string;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    ){}

  async ngOnInit(){
    this.cart$ = await this.shoppingCartService.getCart();
    this.subscription = this.cart$.subscribe(cart => this.cart = cart);
    
    // this.cart$ = await this.shoppingCartService.getCart();
    // this.cart = this.shoppingCartService.getCart().then(result => this.cart = result);
    // this.totalPrice = this.cart$.subscribe(data => this.totalPrice = data.totalPrice);
    // this.totalItemsCount = this.cart$
    // .subscribe(data => this.totalItemsCount = data.totalItemsCount);

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  placeOrder(){
    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i => {
        return{
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice,
        }
      })
    };
    console.log(order);

    this.orderService.storeOrder(order);
  }
}
