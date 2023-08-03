import React, { useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
const Products = (props) => {
  // console.log(props);
  let products = props.products;
  console.log(products);
  const [prices, setPrices] = useState({
    price: "",
    qty: "",
    discount: "",
  });
  const bill = (e) => {
    const { name, value } = e.target;
    setPrices({
      ...prices,
      [name]: value,
    });
  };
  return products.map((val, idx) => {
    let item = `item-${idx}`,
      qty = `qty-${idx}`,
      price = `price-${idx}`,
      discount = `discount-${idx}`,
      desc = `desc-${idx}`,
      unit = `unit-${idx}`,
      subtotal = `subtotal-${idx}`,
      total = `total-${idx}`;
    return (
      <div className="addNewItem" key={idx}>
        <div className="rows">
          <div className="firstRow">
            <div className="form-field-coloured">
              <label htmlFor="item" className="form-label-sm">
                Item
              </label>
              <input
                type="text"
                name="item"
                id={item}
                data-id={idx}
                defaultValue={val ? val.item : ""}
                className="form-inp-md"
              />
            </div>
            <div className="form-field-coloured">
              <label htmlFor="quantity" className="form-label-sm">
                Quantity
              </label>
              <input
                type="number"
                name="qty"
                id={qty}
                data-id={idx}
                className="form-inp-sm"
                defaultValue={val ? val.qty : ""}
                onChange={bill}
              />
            </div>
            <div className="form-field-coloured">
              <label htmlFor="price" className="form-label-sm">
                Price
              </label>
              <input
                type="number"
                name="price"
                id={price}
                data-id={idx}
                defaultValue={val ? val.price : ""}
                onChange={bill}
                className="form-inp-sm"
              />
            </div>
            <div className="form-field-coloured">
              <label htmlFor="discount" className="form-label-sm">
                Discount
              </label>
              <input
                type="number"
                name="discount"
                id={discount}
                data-id={idx}
                className="form-inp-sm"
                defaultValue={val ? val.discount : ""}
                onChange={bill}
              />
            </div>
          </div>
          <div className="secondRow">
            <div className="form-field-coloured">
              <label htmlFor="desc" className="form-label-sm">
                Description
              </label>
              <input
                type="text"
                name="desc"
                id={desc}
                data-id={idx}
                className="form-inp-md"
                defaultValue={val ? val.desc : ""}
              />
            </div>
            <div className="form-field-coloured">
              <label htmlFor="unit" className="form-label-sm">
                Unit
              </label>
              <input
                type="number"
                name="unit"
                id={unit}
                data-id={idx}
                className="form-inp-sm"
                defaultValue={val ? val.unit : ""}
              />
            </div>
          </div>
        </div>
        <div className="prices">
          <div className="totalElem">
            <label htmlFor="subtotal" className="totalLabel">
              Subtotal :
            </label>
            <input
              id={subtotal}
              data-id={idx}
              className="totalInp"
              name="subtotal"
              defaultValue={val ? val.subtotal : ""}
              readOnly
            />
          </div>
          <div className="totalElem">
            <label htmlFor="subtotal" className="totalLabel">
              Discount :
            </label>
            <input className="totalInp" defaultValue={val.discount} readOnly />
          </div>
          <div className="totalElem">
            <label htmlFor="subtotal" className="totalLabel">
              Total :
            </label>
            <input
              id={total}
              data-id={idx}
              className="totalInp"
              name="total"
              defaultValue={val ? val.total : ""}
              readOnly
            />
          </div>
          <div className="delete-btn" onClick={() => props.deleteProduct(val)}>
            <div className="icon">
              <DeleteOutlinedIcon fontSize="small" />
            </div>
            Delete
          </div>
        </div>
      </div>
    );
  });
};
export default Products;
