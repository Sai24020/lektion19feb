"use server"
//so that we are sure nothing gets sent to the client
import { Product } from "@/lib/interfaces";


//arrow function 
export const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    //TODO: check if data is ok
    const data: Product[] = await res.json();
    return data
}

export const fetchProductsByCategory = async (category: string | string[]) => {
    //TODO handle array
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    //TODO: check if data is ok

    const data: Product[] = await res.json();
    return data
}


//"vanlig" function, spelar ingen roll för funktion men kan vara bra göra skillnad på
export async function fetchProduct(id: string) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    //TODO: check if data is ok
    const data: Product = await res.json();
    return data;
}