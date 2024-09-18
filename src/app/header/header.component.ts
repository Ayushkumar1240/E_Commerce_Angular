import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router,
    private product: ProductService
  ) { }
  searchResult: undefined | product[];
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  cartItem=0;
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      console.warn(val.url);
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            console.log("SELLERSTORE: ",sellerStore);
            let sellerData = sellerStore && JSON.parse(sellerStore);
            this.sellerName = sellerData.name;
          }
        }
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          console.log("USERSTORE: ",userStore);
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product.getCartList(userData.id);
        }
        else {
          this.menuType = 'default'
        }
      }
    });
    let cartData=localStorage.getItem('localCart');
    console.log("CARTDATA: ",cartData);
    if(cartData){
      this.cartItem=JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItem=items.length;
    })
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLTextAreaElement;
      //console.warn(element.value);
      this.product.searchProducts(element.value).subscribe((result) => {
        //console.warn(result);
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val: string) {
    console.log(val);
    this.route.navigate([`search/${val}`])
  }
  redirecToDetails(id: any) {
    this.route.navigate(['/details/' + id])
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
}
