/*product-list.component.ts*/

import { Component, OnInit } from '@angular/core';
import { Product, Query, Prod } from '../model/product';
import { ProductCatalogueService } from '../services/product-catalogue.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: string = "Product List";
  productList: Prod[];

  constructor(
    public productListServ: ProductCatalogueService,
    private apollo: Apollo
  ) { }


 //loadProductList() is called on init
  ngOnInit() {
      this.loadProductList();
  }

  public loadProductList() {
     //invokes productList service's getProductList() method and stores the response in `productList` property
  	 //this.productListServ.getProductList().then(productList => this.productList = productList);
     
     //Apollo GraphQL Call
     this.apollo.watchQuery<any>({
       query: gql`
        query {
          product {
            id
            catgry
            title
            product
          }
        }      
       `,
     })
     .valueChanges
     .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
     );

  }

  //This will be invoked when the child emits addProductSuccess event
//  public onAddProduct(newProduct: Product) {
//     this.productList = this.productList.concat(newProduct);
//   }

//   public onUpdateProduct(newProduct: Product) {
//     this.productList.map((product)=> { 
//        if(product.id==newProduct.id) {
//          product = newProduct;
//        } 
//     })
//   }

//   public onDeleteProduct(p: Product) {
//    this.productList= this.productList.filter(product => product !== p);
   
//   }
}