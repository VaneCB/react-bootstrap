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
  const { category, subCategory } = useParams();
  const navigate = useNavigate();
  //console.log(location?.state?.category, "*************");
  const [products, setProducts] = useState([]);
  //const [category, setCategory] = useState(defaultCategory);
  //const [subCategory, setSubCategory] = useState(defaultSubCategory);

  useEffect(() => {
    axios.get(`http://localhost:3005/products/`).then(({ data }) => {
      //const categories = data.map((product) => product.masterCategory);
      //uniqueCategories = [...new Set(categories)];

      //uniqueCategories = [{name:'caregory1', id:'ruta.img'}, {name:'caregory2', id:'pp'}]

      uniqueCategories = data.reduce((acc, product) => {
        const { masterCategory: category, id } = product;
        const categoryExists = acc.find((item) => item.name === category);
        if (!categoryExists) {
          acc.push({ name: category, id });
        }
        return acc;
      }, []);

      setProducts(data);
    });
  }, []);
  /*fetch(`http://localhost:3005/products/`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);*/

  /*useEffect(() => {
    setCategory(defaultCategory);
    setSubCategory(defaultSubCategory);
  }, [defaultCategory, defaultSubCategory]);*/

  if (products.length === 0) {
    return <div>Cargando...</div>;
  }

  const selectCategory = (event) =>
    navigate(`/products/${event.target.innerText || event.target.alt}`);

  const loadProducts = (event) => navigate(`/product/${event.target.id}`);
  //setCategory(event.target.innerText);
  //setSubCategory("");

  const selectSubCategory = (event) =>
    event.target.innerText === "Volver"
      ? navigate(`/products`)
      : navigate(
          `/products/${category}/${event.target.innerText || event.target.alt}`
        );

  //setSubCategory(event.target.innerText);

  const uniqueSubCategories = products
    .filter((product) => product.masterCategory === category)
    .reduce((acc, product) => {
      const { subCategory, id } = product;
      const subCategoryExists = acc.find((item) => item.name === subCategory);
      if (!subCategoryExists) {
        acc.push({ name: subCategory, id });
      }
      return acc;
    }, []);

  const filterProducts = products
    .filter((products) => products.masterCategory === category)
    .filter((products) => products.subCategory === subCategory)
    .map(({ productDisplayName: name, id, price }) => ({ name, id, price }));
  //console.log(products);

  return (
    <>
      <h1>Products</h1>
      <p>Selecciona alguna categoría para ver los productos</p>
      {!category && (
        <OptionGrid
          items={uniqueCategories}
          onClick={selectCategory}
          goUp={false}
        />
      )}
      {category && (
        <>
          <p>Selecciona alguna subcateria para ver nuestros productos:</p>
          <OptionGrid
            items={uniqueSubCategories}
            defaultItem={subCategory}
            onClick={selectSubCategory}
            goUp={true}
          />
        </>
      )}
      {category && subCategory && (
        <OptionGrid
          items={filterProducts}
          onClick={loadProducts}
          goUp={false}
        />
      )}
    </>
  );
}
export default Products;
