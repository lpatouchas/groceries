package gr.patouchas.groceries.domain;

import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.mysema.query.jpa.impl.JPAQuery;

import gr.patouchas.groceries.config.Groceries;

public class GroceriesRepositoryImpl implements GroceriesRepository {

	@Inject
	@Groceries
	EntityManager em;

	@Override
	public List<Product> getProducts() {
		final QProduct product = QProduct.product;
		final JPAQuery query = new JPAQuery(this.em);
		query.distinct();
		query.from(product);
		return query.list(product);
	}

	@Override
	public Product saveProduct(final Product product) {
		return this.em.merge(product);

	}

	@Override
	public void deleteProduct(final Long id) {
		final QProduct product = QProduct.product;
		final JPAQuery query = new JPAQuery(this.em);
		query.distinct();
		query.from(product).where(QProduct.product.id.eq(id));
		final Product prd = query.singleResult(product);
		this.em.remove(prd);
	}

}
