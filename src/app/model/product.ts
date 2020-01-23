export class Product {

    id: number;
    title: string;
	  catgry: string;
	  product: string;

	constructor(values: Object = {}) {
        Object.assign(this, values);
  }

}

export type Query = {
  allProducts: Product[];
}
/*Export the Category array so that we don't have to maintain
separate catgry list in our components                     */
 export const Category = ["Cloth","Jewellery", "Toy", "Accessories", "Electronics"];