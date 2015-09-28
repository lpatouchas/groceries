package gr.patouchas.groceries.domain;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table
public class Product implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 7515206612021875634L;

	@Id
	@SequenceGenerator(name = "prd", sequenceName = "prd_seq", allocationSize = 1)
	@GeneratedValue(generator = "prd", strategy = GenerationType.SEQUENCE)
	@Column
	private Long id;

	@Column
	private String name;

	@Column
	private BigDecimal price;

	@Column
	private Boolean checked;

	public Product(final Long id, final String name, final BigDecimal price, final Boolean checked) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.checked = checked;
	}

	public String getName() {
		return this.name;
	}

	public void check() {
		this.checked = Boolean.TRUE;
	}

	public void uncheck() {
		this.checked = Boolean.FALSE;
	}

	/**
	 * For JPA
	 */
	public Product() {

	}

	public Long getId() {
		return this.id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public void setName(final String name) {
		this.name = name;
	}

	public BigDecimal getPrice() {
		return this.price;
	}

	public void setPrice(final BigDecimal price) {
		this.price = price;
	}

	public Boolean getChecked() {
		return this.checked;
	}

	public void setChecked(final Boolean checked) {
		this.checked = checked;
	}

}
