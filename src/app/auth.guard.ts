import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs'; // Use 'of' to create an observable from a value
import { SellerService } from './services/seller.service';

// @Injectable({
//   providedIn: 'root'
// })
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const sellerService = inject(SellerService);
  const isSellerStored = localStorage.getItem('seller');

  if (isSellerStored) {
    return true;
  }

  return sellerService.isSellerLoggedIn;
};
