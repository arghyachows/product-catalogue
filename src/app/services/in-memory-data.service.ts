import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from '../model/product';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    //create an array of mockProducts.
    const productList:Product[] = [
      { id: 0,  title: "Mens Tshirt", catgry: "Cloth", product: 'Green Tshirt all sizes' },
      { id: 1, title: "Pendent", catgry: "Jewellery ", product: 'small Pendents'},
      { id: 2, title: "Marvel Toy", catgry: "Toy", product: 'Iron Man Slide Blast Armour '},
      { id: 3, title: "Headphone", catgry: "Accessories", product: 'Boss Headphones'}
      
    ];
    return {productList};
  }
}