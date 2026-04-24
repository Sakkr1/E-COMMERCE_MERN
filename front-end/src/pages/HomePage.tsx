import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import BASE_URL from "../constants/BASE_URL";

function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProcess = async() => {
            const res = await fetch(`${BASE_URL}/product`);
            const data = await res.json()
            console.log(data);
            setProducts(data);
        }
        fetchProcess();
    }, [])

    return (
    <Container sx={{ mt: 3 }}>
        <Grid container spacing={2}>
            {products.map((p) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }}> 
                    <ProductCard {...p}/>
                </Grid>
            ))}
        </Grid>
    </Container>
    )
}

export default HomePage;