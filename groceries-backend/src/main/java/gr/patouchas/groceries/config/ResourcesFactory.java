package gr.patouchas.groceries.config;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import gr.patouchas.groceries.domain.GroceriesRepository;

@ApplicationScoped
public class ResourcesFactory {

	@PersistenceContext(unitName = "groceries-pu")
	private EntityManager em;

	@Inject
	GroceriesRepository groceriesRepository;

	@Produces
	@Groceries
	public GroceriesRepository getGroceriesRepository() {
		return this.groceriesRepository;
	}

	@Produces
	@Groceries
	public EntityManager groceriesEntityManager() {
		return this.em;
	}
}
