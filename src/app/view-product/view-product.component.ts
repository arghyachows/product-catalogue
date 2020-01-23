import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, Category } from '../model/product';
import { ProductCatalogueService } from '../services/product-catalogue.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
/* view-product.component.ts */

export class ViewProductComponent implements OnInit {

  @Input() product: Product;
  @Output() updateProductSuccess: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() deleteProductSuccess: EventEmitter<Product> = new EventEmitter<Product>();

  showProductModal:boolean ;
  editEnabled: boolean;
  readonly category = Category;
  
  constructor(private productServ: ProductCatalogueService) { }

  ngOnInit() {
      this.showProductModal = false;
  	  this.editEnabled = false;
  }
  //To make the modal window visible
  public showProduct() {
  	this.showProductModal = true;
  }
  //Invoked when the edit button is clicked
  public onEdit() {
  	this.editEnabled=true;
  }
  //Invoked when the save button is clicked
  public onSave() {
 	this.productServ.updateProduct(this.product).then( () => {
  		this.editEnabled= false;
        this.updateProductSuccess.emit(this.product);
  	})
  }
 //Invoked when the close button is clicked
  public onClose() {
  	this.showProductModal = false;
  }
 
 //Invoked when the delete button is clicked
  public onDelete() {
	  this.productServ.deleteProduct(this.product).then( () => {
        this.deleteProductSuccess.emit(this.product);
 	    this.onClose();
 	  })
  }
  
}