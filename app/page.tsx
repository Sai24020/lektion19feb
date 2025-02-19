/*import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { fetchProductsByCategory } from "./actions";

//todo make interface for searchParams
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  //const data = await fetchProducts();
  //get category key/value from searchParams, if none, default to electronics
  const { category = "electronics" } = await searchParams;

  const data = await fetchProductsByCategory(category);
  console.log(data);
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 my-8 mx-4">
      {data.map((product) => (
        <li key={product.id}>
          <Link href={`/product/${product.id}`}>
            <Card className="grid gap-4 h-full">
              <CardHeader>
                <CardTitle>
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Image src={product.image} height={100} width={100} alt="" />
                <p>${product.price}</p>
              </CardContent>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}*/
import { Product } from "@/lib/interfaces";
import Link from "next/link";
import { fetchProducts } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default async function Home() {
  const products = await fetchProducts();
  //get category key/value from searchParams, if none, default to electronics

  console.log(products);

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 my-8 mx-4">
      {products.map((product: Product) => (
        <li key={product.id}>
          <Link href={`/product/${product.id}`}>
            <Card className="grid gap-4 h-full bg-blue-300">
              <CardHeader className="grid gap-4 m-3 p-2 rounded">
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                className="grid gap-4 m-3 p-4 rounded w-full max-w-[260px]"
                src={product.image}
                height={100} 
                width={100}
                alt={product.title}
                />
                <p className="grid gap-4 bg-yellow-300 m-3 p-2 rounded">${product.price}</p>
              </CardContent>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}