import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Pagetransition from "../components/pagetransition";

import Products from "../components/slide/Products";
import Loading from "../components/loading";

export default function Searchpage() {
  let query = new URLSearchParams(useLocation().search).get("query");
  let [loading, setloading] = React.useState(true);
  let [result, setResult] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
        );
        if (!res.ok) throw new Error(setError("Product Not Found"));
        const data = await res.json();
        setResult(data.products || []);
      } catch (err) {
        console.log(err.message);
      } finally {
        setloading(false);
      }
    };
    if (query) fetchData();
  }, [query]);

  return (
    <>
      {loading && <Loading />}

      {
        <h4
          style={{
            textAlign: "center",
            padding: "10px",
            border: "1px solid #f2f2f2f2",
            width: "fit-content",
            margin: "10px auto",
            borderRadius: "4px",
            textTransform: "capitalize",
          }}
        >
          {result.length > 0
            ? ` your search about [${query}]  and result is ${result.length} items  `
            : "no result found please try again"}
        </h4>
      }
      <Pagetransition key={query}>
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
            gap: "16px",
            padding: "24px 0",
          }}
        >
          {result.map((product) => (
            <Products key={product.id} product={product} />
          ))}
        </div>
      </Pagetransition>
    </>
  );
}
