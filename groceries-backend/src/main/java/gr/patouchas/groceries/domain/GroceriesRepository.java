package gr.patouchas.groceries.domain;

import java.util.List;

public interface GroceriesRepository {

	List<Product> getProducts();

	Product saveProduct(Product product);

	void deleteProduct(Long id);
}
