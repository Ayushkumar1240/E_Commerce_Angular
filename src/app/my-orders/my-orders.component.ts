import { Component,OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{
[x: string]: any;
  orderData:order[]|undefined;
  constructor(private product:ProductService){}

  ngOnInit(): void {
    // this.product.orderList().subscribe((result)=>{
    //   if(result){
    //     this.orderData=result
    //   }
    // })
    this.getOrderList();
  }
  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      this.getOrderList();
    })
  }
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      if(result){
        this.orderData=result
      }
    })
  }
}
