import { LinkContainer } from "react-router-bootstrap";
export default function ProductRow({ product }) {
  return (
    <tr>
      <td>{product.id}</td>
      <td style={{ textDecoration: "none", cursor: "pointer" }}>
        <LinkContainer to={`/product/${product.id}`}>
          <span>{product.productDisplayName}</span>
        </LinkContainer>
      </td>
      <td>{product.masterCategory}</td>
      <td>{product.subCategory}</td>
      <td>{product.price}</td>
    </tr>
  );
}
