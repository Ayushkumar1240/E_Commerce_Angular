import { Component, OnInit } from '@angular/core';
import { cart, login, product, SignUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  constructor(private user:UserService,
    private product:ProductService
  ) { }
  authError:string='';
  showlogin:boolean=true;
  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data: SignUp) {
    this.user.userSignup(data);
  }
  login(data:login){
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      if(result){
        this.authError='User not found';
      }
      else{
        this.authError='';
        this.localCartToRemoteCart();
      }
    })
  }
  openlogin(){
    this.showlogin=true;
  }
  opensignup(){
    this.showlogin=false;
  }
  localCartToRemoteCart(){
    let data=localStorage.getItem('localCart');
    let user=localStorage.getItem('user');
      let userId=user && JSON.parse(user).id;
    if(data){
      let cartDataList:product[]=JSON.parse(data);
      
      cartDataList.forEach((product:product,index) => {
        let cartData:cart={
          ...product,
          productId:product.id,
          userId
        };
        delete cartData.id;
        setTimeout(()=>{
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn("ITEM STORED IN DB");
            }
          })
          if(cartDataList.length===index+1){
            localStorage.removeItem('localCart')
          }
        },500)
      });
    }
    setTimeout(()=>{
      this.product.getCartList(userId);
    },2000)
  }
}

