import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';


const SUBSCRIPTION_KEY = 'sub-s';
const ORDER_KEY='ord-r'


@Injectable({
  providedIn: 'root'
})
export class SessionStorage {

  storage = environment.storage;

  constructor() { }

  public saveSubscription(subscription: string) {
    console.log(subscription)
    this.storage.removeItem(SUBSCRIPTION_KEY);
    this.storage.setItem(SUBSCRIPTION_KEY,  subscription);
    // window.localStorage.removeItem(SUBSCRIPTION_KEY);
    // window.localStorage.setItem(SUBSCRIPTION_KEY,Subscription);
  }

  public getSubscription(): string {
    
    console.log(this.storage.getItem(SUBSCRIPTION_KEY))
    return this.storage.getItem(SUBSCRIPTION_KEY);
  }
  public saveOrder(order: string) {
    this.storage.removeItem(ORDER_KEY);
    this.storage.setItem(ORDER_KEY,  order);
  }

  public getOrder(): string {
    return this.storage.getItem(ORDER_KEY);
  }

  removeSubscription(){
    this.storage.removeItem(SUBSCRIPTION_KEY);
  }

  removeOrder(){
    this.storage.removeItem(ORDER_KEY);
  }

  public getSubscription2(): string {
    return this.storage.getItem(SUBSCRIPTION_KEY);
  }
}