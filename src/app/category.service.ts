import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories;

  constructor(private db: AngularFireDatabase) {}
  getCategories(){
  return this.db.list('/categories/', ref => ref.orderByChild('name')).snapshotChanges();
  }
}
