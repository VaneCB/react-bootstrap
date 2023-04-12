import { useState, useEffect } from "react";
import ProductsTable from "../components/ProductsTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import OptionGrid from "../components/OptionGrid";

let uniqueCategories;

function Products() {
  //let location = useLocation();
  const { category: defaultCategory, subCategory: defaultSubCategory } =
    useParams();
  const navigate = useNavigate();
  //console.log(location?.state?.category, "*************");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(defaultCategory);
  const [subCategory, setSubCategory] = useState(defaultSubCategory);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/`).then(({ data }) => {
      const categories = data.map((product) => product.masterCategory);
      uniqueCategories = [...new Set(categories)];
      setProducts(data);
    });
  }, []);
  /*fetch(`http://localhost:3005/products/`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);*/

  useEffect(() => {
    setCategory(defaultCategory);
    setSubCategory(defaultSubCategory);
  }, [defaultCategory, defaultSubCategory]);

  if (products.length === 0) {
    return <div>Cargando...</div>;
  }

  const selectCategory = (event) => {
    //setCategory(event.target.innerText);
    //setSubCategory("");
    navigate(`/products/${event.target.innerText}`);
  };
  const selectSubCategory = (event) => {
    //setSubCategory(event.target.innerText);
    navigate(`/products/${category}/${event.target.innerText}`);
  };
  const uniqueSubCategories = [
    ...new Set(
      products
        .filter((product) => product.masterCategory === category)
        .map((product) => product.subCategory)
    ),
  ];

  const filterProducts = products
    .filter((products) => products.masterCategory === category)
    .filter((products) => products.subCategory === subCategory);
  //console.log(products);
  return (
    <>
      <h1>Products</h1>
      <p>Selecciona alguna categoría para ver los productos</p>

      {!category && (
        <OptionGrid
          items={uniqueCategories}
          defaultItem={category}
          onClick={selectCategory}
        />
      )}
      {category && (
        <>
          <p>Selecciona alguna subcateria para ver nuestros productos:</p>
          <OptionGrid
            items={uniqueSubCategories}
            defaultItem={subCategory}
            onClick={selectSubCategory}
          />
        </>
      )}

      {category && subCategory && <ProductsTable products={filterProducts} />}
    </>
  );
}
export default Products;
