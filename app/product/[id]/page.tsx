/*import { fetchProduct } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/lib/interfaces";
import Image from "next/image";

//get the dynamic id from the page url and use that to fetch products
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //since params is a promise we have to await it first
  const { id } = await params;
  const data: Product = await fetchProduct(id);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex">
        <Image
          className="w-full max-w-[260px] px-4"
          src={data.image}
          height={100}
          width={100}
          alt=""
        />
        <div className="grid gap-2">
          <p>{data.description}</p>
          <p>{data.price}</p>
        </div>
      </CardContent>
    </Card>
  );
}*/
"use client"; // Gör sidan till en klientkomponent eftersom useRouter används

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/lib/interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function ProductPage() {
  const router = useRouter();
  const { id } = useParams(); // Hämta produkt-ID från URL
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) return <p>Laddar produkt...</p>;

  return (
    <div className="p-6">
      {/* Tillbaka-knapp */}
      <button onClick={() => router.back()} className="mb-4 p-2 bg-gray-300 rounded">
        ⬅ Tillbaka
      </button>

      <Card className="p-4 bg-blue-200">
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 flex">
          <Image
          className="w-full max-w-[260px] px-4"
          src={product.image}
          height={100}
          width={100}
          alt=""
          />
          <div className="grid gap-2 bg-blue-500 p-4 rounded">
          <p>{product.description}</p>
          <p className="mt-4">{product.price}</p>
        </div>
        </CardContent>
      </Card>
    </div>
  );
}
