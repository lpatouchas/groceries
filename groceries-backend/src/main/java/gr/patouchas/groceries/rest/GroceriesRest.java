package gr.patouchas.groceries.rest;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import gr.patouchas.groceries.config.Groceries;
import gr.patouchas.groceries.domain.GroceriesRepository;
import gr.patouchas.groceries.domain.Product;

@Path("/groceries")
@ApplicationScoped
public class GroceriesRest {

	@Inject
	@Groceries
	GroceriesRepository groceries;

	@GET
	@Produces("application/json;charset=UTF-8")
	public Response loadGroceries() {
		try {
			return Response.status(Response.Status.OK).entity(this.groceries.getProducts()).build();
		} catch (final Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Transactional(value = TxType.REQUIRED)
	public Response saveProduct(final Product product) {

		try {
			final Product newProduct = this.groceries.saveProduct(product);
			return Response.status(Response.Status.OK).entity(newProduct).build();
		} catch (final Exception e) {
			System.out.println(e);
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}

	}

	@DELETE
	@Transactional(value = TxType.REQUIRED)
	public Response deleteProduct(@QueryParam("id") final Long id) {

		try {
			this.groceries.deleteProduct(id);
			return Response.status(Response.Status.OK).build();
		} catch (final Exception e) {
			System.out.println(e);
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}

	}

}
