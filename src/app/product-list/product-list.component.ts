/*product-list.component.ts*/

import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductCatalogueService } from '../services/product-catalogue.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: string = "Product List";
  productList: Product[] = [];

  constructor(public productListServ: ProductCatalogueService) { }


 //loadProductList() is called on init
  ngOnInit() {
      this.loadProductList();
  }

  public loadProductList() {
     //invokes productList service's getProductList() method and stores the response in `productList` property
  	 this.productListServ.getProductList().then(productList => {
      console.log(productList);
      this.productList = productList;
      });
     
  }

  //This will be invoked when the child emits addProductSuccess event
 public onAddProduct(newProduct: Product) {
    this.productList = this.productList.concat(newProduct);
  }

  public onUpdateProduct(newProduct: Product) {
    this.productList.map((product)=> { 
       if(product.id==newProduct.id) {
         product = newProduct;
       } 
    })
  }

  public onDeleteProduct(p: Product) {
   this.productList= this.productList.filter(product => product !== p);
   
  }
}