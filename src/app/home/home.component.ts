import { Component,OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private product:ProductService){}
  popularProducts:undefined|product[];
  trendyProducts:undefined|product[];
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  ngOnInit(): void {
    this.product.popularProducts().subscribe((result)=>{
      this.popularProducts=result;
      console.log(result);
    })
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
      console.log("TRENDY PRODUCTS:",this.trendyProducts);
    })
  }

}
