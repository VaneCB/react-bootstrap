import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";

function Product() {
  const [product, setProducts] = useState(null);
  const { id: productID } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${productID}`)
      .then((response) => setProducts(response.data));
  }, [productID]);

  if (!product) {
    return <div>Cargando...</div>;
  }
  const {
    productDisplayName: name,
    price,
    masterCategory: category,
    subCategory,
  } = product;
  return (
    <>
      <h1>Producto</h1>
      <p>Aqui renderizamos el producto con id {productID}</p>
      <Card style={{ width: "25rem" }}>
        <Card.Img
          variant="top"
          src={`https://juanda.certweb.infenlaces.com/images/${productID}.jpg`}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{price}</Card.Text>
          {/*<LinkContainer to="/products" state={{ category }}>*/}
          <LinkContainer to={`/products/${category}`}>
            <Card.Link>{category}</Card.Link>
          </LinkContainer>
          <LinkContainer to={`/products/${category}/${subCategory}`}>
            <Card.Link>{subCategory}</Card.Link>
          </LinkContainer>
        </Card.Body>
        <Button variant="primary">Comprar</Button>
      </Card>
    </>
  );
}

export default Product;
