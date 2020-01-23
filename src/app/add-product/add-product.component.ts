import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, Category } from '../model/product';
import { ProductCatalogueService } from '../services/product-catalogue.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  @Output() addProductSuccess: EventEmitter<Product> = new EventEmitter<Product>();
  showModal: boolean = false;
  newProduct: Product = new Product();
  category: string[] = Category;

  constructor(private productServ: ProductCatalogueService) { }

  ngOnInit() {  }
  //createProduct() gets invoked from the template. This shows the Modal
  public createProduct():void {
    this.newProduct = new Product();
    this.showModal = true;
  }
  //onSave() pushes the newProduct property into the server
  public onSave():void {
    this.productServ.addProduct(this.newProduct).then( product => {
        this.addProductSuccess.emit(product);
        this.onClose();
    });
  }
  //Used to close the Modal
  public onClose():void {
    this.showModal=false;
  }
}
