import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private activeRoute:ActivatedRoute,
    private product:ProductService
  ){}
  searchresult:undefined|product[];
  ngOnInit(): void {
    let query=this.activeRoute.snapshot.paramMap.get('query');
    query && this.product.searchProducts(query).subscribe((result)=>{
      this.searchresult=result;
      console.log("Search Result: ",this.searchresult);
    })
  }
}
