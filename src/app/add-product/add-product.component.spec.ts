import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ProductCatalogueService } from '../services/product-catalogue.service';
import {Product, Category } from '../model/product';
import { By } from '@angular/platform-browser';
import { AddProductComponent } from './add-product.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppTestingModule } from '../app-testing-module';

describe('AddProductComponent', () => {
 
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  let spy: jasmine.Spy;
  let productCatalogueService: ProductCatalogueService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    //initialization  
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.add-product'));
    element = de.nativeElement;
    //spy = spyOn(productCatalogueService, 'addProduct').and.callThrough();
    //ask fixture to detect changes
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the `Create Product` button', () => {
     //There should a create button in the template
      expect(element.innerText).toContain("Create Product");
  });

 it('should not display the modal unless the button is clicked', () => {
   
   //source-model is an id for the modal. It shouldn't show up unless create button is clicked
    expect(element.innerHTML).not.toContain("source-modal");
   
   //Component's showModal property should be false at the moment
    expect(component.showModal).toBeFalsy("Show modal should be initially false");
 })

 it('should display the modal when `Create Product` is clicked', () => {
   
    let createProductButton = fixture.debugElement.query(By.css("button"));
    //create a spy on the createProduct  method
    spyOn(component,"createProduct").and.callThrough();
    
    //triggerEventHandler simulates a click event on the button object
    createProductButton.triggerEventHandler('click',null);
    
    //spy checks whether the method was called
    expect(component.createProduct).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.showModal).toBeTruthy("showModal should now be true");
    expect(element.innerHTML).toContain("source-modal");
 })

   describe("AddProduct Modal", () => {
  
    let inputTitle: HTMLInputElement;
    let selectCategory: HTMLSelectElement;
    let textAreaProduct: HTMLTextAreaElement;
    let mockProduct: Product, responseProduct: Product;
    let spyOnAdd: jasmine.Spy;
    let productCatalogueService: ProductCatalogueService;

    beforeEach(() => {
      
      component.showModal = true;
      fixture.detectChanges();

      mockProduct = { id:1, title: "Hello world", catgry: Category[2], product: "console.log('Hello world');"};
       //Access the injected ProductCatalogue Service
       productCatalogueService = fixture.debugElement.injector.get(ProductCatalogueService);
       //Create a jasmine spy to spy on the addProduct method
      spyOnAdd = spyOn(productCatalogueService,"addProduct").and.returnValue(Promise.resolve(mockProduct));
      //Subsbcribe to the event emitter first
      component.addProductSuccess.subscribe((response: Product) => {responseProduct = response},)
      
    });

     it("should accept input values", () => {
      //Query the input selectors
      inputTitle = element.querySelector("input");
      selectCategory = element.querySelector("select");
      textAreaProduct = element.querySelector("textarea");

      //Set the input element's value to mockProduct
      inputTitle.value = mockProduct.title;
      selectCategory.value = mockProduct.catgry;
      textAreaProduct.value = mockProduct.product;



      //Dispatch an event to tell the component input value has changed
      inputTitle.dispatchEvent(new Event("input"));
      selectCategory.dispatchEvent(new Event("change"));
      textAreaProduct.dispatchEvent(new Event("input"));
      

      expect(mockProduct.title).toEqual(component.newProduct.title);
      expect(mockProduct.catgry).toEqual(component.newProduct.catgry);
      expect(mockProduct.product).toEqual(component.newProduct.product);

    });
 
    it("should submit the values", async() => {   
      component.newProduct = mockProduct;
      component.onSave();
       fixture.detectChanges();
       fixture.whenStable().then( () => {
          fixture.detectChanges();
          expect(spyOnAdd.calls.any()).toBeTruthy();
          expect(responseProduct.title).toEqual(mockProduct.title);
       });

    });
 
    it("should have a onClose method", () => {
      component.onClose();
      fixture.detectChanges();
      expect(component.showModal).toBeFalsy();
     })

  })
})