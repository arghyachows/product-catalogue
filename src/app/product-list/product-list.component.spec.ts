
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { By }              from '@angular/platform-browser';
import { Product, Category } from '../model/product';
import { ProductCatalogueService } from '../services/product-catalogue.service';

//Modules used for testing
import { HttpModule }    from '@angular/http';
import { AppTestingModule } from '../app-testing-module';

describe('ProductListComponent', () => {

//Typescript declarations.
  let comp: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  let mockProduct: Product[];
  let productCatalogueService: ProductCatalogueService;
  let spy: jasmine.Spy;

  // beforeEach is called once before every `it` block in a test.
  // Use this to configure to the component, inject services etc.
  
  beforeEach(async(() => { //async before is used for compiling external templates which is any async activity
  TestBed.configureTestingModule({
     imports: [AppTestingModule],
  })
  .compileComponents();  
    // compile template and css
}));

  beforeEach(()=> { 
    //And here is the synchronous async function
   
    fixture = TestBed.createComponent(ProductListComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.product'));
    element  = de.nativeElement;

    //get the injected service from component's fixture.debugElement
    //if the service doesn't have a dependency, you can try Testbed.get()
    productCatalogueService = fixture.debugElement.injector.get(ProductCatalogueService);
    
    mockProduct = [
      { id:1, title: "Hello world", catgry: "Cloth", product: "puts 'Hello'" }];
   
    spy = spyOn(productCatalogueService, 'getProductList')
        .and.returnValue(Promise.resolve(mockProduct));
  });

    it('should have a Component',()=> {
    expect(comp).toBeTruthy();
  });

  it('should have a title', () => {
    comp.title = 'Product List';
    fixture.detectChanges();
    expect(element.textContent).toContain(comp.title);
  })
  
 it('should have a table to display the products', () => {
    expect(element.innerHTML).toContain("thead");
    expect(element.innerHTML).toContain("tbody");
  })

  /*it('should not show the productList before OnInit', () => {

    this.tbody = element.querySelector("tbody");
    //If you are curious about the replace() method, try the test without it
    expect(this.tbody.innerText.replace(/\s\s+/g, '')).toBe("", "tbody should be empty");
    expect(spy.calls.any()).toBe(false, "Spy shouldn't be yet called");
  });

  it('should still not show productList after component initialized', () => {
    fixture.detectChanges();
   // getProductList service is async => still has not returned with the product
    expect(this.tbody.innerText.replace(/\s\s+/g, '')).toBe("", 'tbody should still be empty');
    expect(spy.calls.any()).toBe(true, 'getProductList should be called');
  });*/

  it('should show the list after getProductList promise resolves', async() => {
    fixture.detectChanges();
    fixture.whenStable().then( () => {
        fixture.detectChanges();
        expect(comp.productList).toEqual(jasmine.objectContaining(mockProduct));
        expect(element.innerText.replace(/\s\s+/g, ' ')).toContain(mockProduct[0].title);
    });
  })


})