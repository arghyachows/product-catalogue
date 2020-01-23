import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ViewProductComponent } from './view-product.component';
import { AppTestingModule } from '../app-testing-module';
import { DebugElement, Component } from '@angular/core';
import { ProductCatalogueService } from '../services/product-catalogue.service';
import {Product, Category } from '../model/product';
import { By } from '@angular/platform-browser';


describe('ViewproductComponent', () => {
  let component: ViewProductComponent;
  let fixture: ComponentFixture<ViewProductComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppTestingModule], 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.view-product'));
    element = de.nativeElement;
   
    
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show a button with text View Product', ()=> {
    expect(element.textContent).toContain("View Product");
  });

  it('should not display the modal until the button is clicked', () => {
      expect(element.textContent).not.toContain("source-modal");
  });

  describe("ViewProductModal", () => {
    let spyOnDelete: jasmine.Spy;
    let spyOnUpdate: jasmine.Spy;
    let productCatalogueService: ProductCatalogueService;
    let mockProduct: Product;
    let response:any; 
    let inputTitle: HTMLInputElement;
    let selectCategory: HTMLSelectElement;
    let textAreaProduct: HTMLTextAreaElement;

      beforeEach(()=> {
        //Set showProductModal to true to ensure that the modal is visible in further tests
        component.showProductModal = true;
        mockProduct = {id:1, title:"New product", catgry:Category[2], product: "console.log()"};
        //Inject ProductCatalogueService
        productCatalogueService = fixture.debugElement.injector.get(ProductCatalogueService);
        //Create spies for deleteProduct and updateProduct methods
        spyOnDelete = spyOn(productCatalogueService,'deleteProduct').and.returnValue(Promise.resolve(true));
        spyOnUpdate = spyOn(productCatalogueService, 'updateProduct').and.returnValue(Promise.resolve(mockProduct));
        //component.product is an input property 
        component.product = mockProduct;
        fixture.detectChanges();
       
      })
    it('should display the modal when the view Product button is clicked',() => {
  
      fixture.detectChanges();
      expect(component.showProductModal).toBeTruthy("SHow should be true");
      expect(element.innerHTML).toContain("source-modal");
    });

    it('should have all the butons',() => {
      expect(element.innerHTML).toContain('Edit Product');
      expect(element.innerHTML).toContain('Delete');
      expect(element.innerHTML).toContain('Close');
    });

    it('and clicking it should make the product editable', () => {

      component.onEdit();
      fixture.detectChanges();
      expect(component.editEnabled).toBeTruthy();
      expect(element.innerHTML).toContain('Save');
        
    });

    it('should take input values', fakeAsync(() => {
      component.editEnabled= true;
      component.updateProductSuccess.subscribe((res:any) => {response = res},)
      fixture.detectChanges();

      inputTitle= element.querySelector("input");
      inputTitle.value = mockProduct.title;
      inputTitle.dispatchEvent(new Event("input"));
      
      expect(mockProduct.title).toEqual(component.product.title);
    
      component.onSave();

      //first round of detectChanges()
      fixture.detectChanges();

      //the tick() operation. Don't forget to import tick
      tick();

      //Second round of detectChanges()
      fixture.detectChanges();
     
      expect(spyOnUpdate.calls.any()).toBe(true, 'updateProduct() method should be called');
      
    }))

    it('should delete the product', fakeAsync(()=> {
      
      component.deleteProductSuccess.subscribe((res:any) => {response = res},)
      component.onDelete();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(response.title).toEqual(mockProduct.title);
      expect(spyOnDelete.calls.any()).toBe(true, "ProductList deleteProduct() method should be called");
      expect(response).toBeTruthy();
}))
    

  });
})
