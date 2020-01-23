import { Product } from './product';

describe('Product', () => {
    it('should create an instance of Product',() => {
        expect(new Product()).toBeTruthy();
	});

	it('should accept values', () => {
	let product = new Product();
	product = {
		id: 111,
		title: "Hello world",
		catgry: "Cloth",
		product: 'print "Hello"',
	}
	expect(product.id).toEqual(111);
	expect(product.catgry).toEqual("Cloth");
	expect(product.product).toEqual('print "Hello"');
});
	
})