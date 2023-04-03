import Table from "react-bootstrap/Table";
import ProductRow from "./ProductRow";

export default function ProductsTable({ products }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Subcategoría</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </tbody>
    </Table>
  );
}
