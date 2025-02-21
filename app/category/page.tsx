"use client";

import { fetchProductsByCategory } from "@/app/actions";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Använd detta för att läsa kategori från URL
import { Product } from "@/lib/interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "electronics"; // Hämta kategori från URL
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const products = await fetchProductsByCategory(category);
        setProducts(products);
        setFilteredProducts(products);
      } catch (err) {
        setError("Kunde inte ladda produktdata. Försök igen senare.");
        console.error("Fetch error:", err);
      }
    }
    loadProducts();
  }, [category]); // Ladda om produkter när kategorin ändras

  // Sortera produkter
  const handleSort = (option: string) => {
    setSortOption(option);
    let sortedProducts = [...filteredProducts];

    if (option === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
  };

  return (
    <div>
      <main>
        <h1 className="text-red-700 ">Search Products</h1>

        {/* Kategorival */}
        <select value={category} onChange={(e) => window.location.search = `?category=${e.target.value}`}>
          <option className="text-green-700 " value="electronics">Electronics</option>
          <option className="text-yellow-700 "value="jewelery">Jewelry</option>
          <option className="text-blue-700 "value="men's clothing">Men's Clothing</option>
          <option className="text-pink-700 "value="women's clothing">Women's Clothing</option>
        </select>

        {/* Sortering */}
        <select value={sortOption} onChange={(e) => handleSort(e.target.value)}>
          <option className="text-red-700 "value="price-asc">Pris: Lågt till Högt</option>
          <option className="text-blue-700 " value="price-desc">Pris: Högt till Lågt</option>
        </select>

        {/* Produkter */}
        {error ? <p className="text-red-500">{error}</p> : null}
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 my-8 mx-4">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <Card className="grid gap-4 h-full bg-blue-500 p-4 rounded">
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                  className="w-full max-w-[260px] px-4"
                  src={product.image}
                  alt={product.title}
                  height={100} 
                  width={100} 
                  />

                  <p className="grid gap-4 bg-yellow-300 m-3 p-2 rounded">${product.price}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}


