import { TestBed, inject } from '@angular/core/testing';
import { Product, Category } from '../model/product';
import { ProductCatalogueService } from '../services/product-catalogue.service';
import { AppTestingModule } from '../app-testing-module';
import { HttpModule } from '@angular/http';

let testService: ProductCatalogueService;
let mockProduct: Product, mockProduct2: Product;
let responsePropertyNames, expectedPropertyNames;

describe('ProductCatalogueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule],
    });
  
    testService= TestBed.get(ProductCatalogueService);
    mockProduct = { id:999, title: "Hello world", catgry: Category[2], product: "console.log('Hello world');"};
    mockProduct2 = { id:1, title: "A new title", catgry: Category[2], product: "console.log('Hello world');"};
  });

	it('#getProductList should return an array with ProductList objects',async() => {
	 
		testService.getProductList().then(value => {
			//Checking the property names of the returned object and the mockProduct object
			responsePropertyNames = Object.getOwnPropertyNames(value[0]);
			expectedPropertyNames = Object.getOwnPropertyNames(mockProduct);

			expect(responsePropertyNames).toEqual(expectedPropertyNames);

		});
	});

    it('#addProduct should return async product', async() => {
    	//
   		testService.addProduct(mockProduct).then(value => {
        	expect(value).toEqual(mockProduct);
   		});
    });

     it('#updateProduct should update', async() => {
	 	//Update existing product with id 1
		testService.updateProduct(mockProduct2).then(value => {
			expect(value).toEqual(mockProduct2);
		})
	})

	 it('#deleteProduct should return null', async() => {
		testService.deleteProduct(mockProduct).then(value => {
	 	   expect(value).toEqual(null);
		})
	})

	
});