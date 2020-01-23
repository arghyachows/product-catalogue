/*product-catalogue.service.ts */
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ProductCatalogueService {

// The project uses InMemoryWebApi to handle the Server API. 
// Here "api/productList" simulates a Server API url 
  private productListUrl = "api/productList";
  private headers  = new Headers({'Content-Type': "application/json"});
  constructor(private http: Http) { }

	// getProductList() performs http.get() and returns a promise
	public getProductList():Promise<any> {
		return this.http.get(this.productListUrl)
		   .toPromise()
	   	   .then(response => response.json())
		   .catch(this.handleError);
	}

    //addProduct() creates new products 
	public addProduct(product: Product): Promise<any> {
		return this.http.post(this.productListUrl, JSON.stringify(product), {headers: this.headers})
	   .toPromise()
		   .then(response =>response.json())
		   .catch(this.handleError);
	}
	//updateProduct() creates new products 
	public updateProduct(product: Product):Promise<any> {
		
		const url = `${this.productListUrl}/${product.id}`;
		return this.http.put(url, JSON.stringify(product), {headers: this.headers})
			.toPromise()
			.then(() => product)
			.catch(this.handleError);
	}
	//deleteProduct() creates new products 
	public deleteProduct(product: Product): Promise<void> {
		const url = `${this.productListUrl}/${product.id}`;
		return this.http.delete(url, {headers: this.headers})
			.toPromise()
			.then(() => null )
			.catch(this.handleError);
	}


  private handleError(error: any): Promise<any> {
 	 console.error('An error occurred', error); 
  	 return Promise.reject(error.message || error);
  }
}