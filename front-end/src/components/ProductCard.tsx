import { Card, CardMedia, CardContent, Typography, CardActions, Button, Chip, Box } from "@mui/material";

interface product {
    title: string;
    image: string;
    price: number;
    stock?: number;
}

const ProductCard = ({ image, title, price, stock }: product) => {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
      }}
    >

      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        sx={{
          objectFit: "contain",
          backgroundColor: "#ffffff",
          p: 2,
        }}
      />

      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>

        <Typography variant="body1" sx={{ color: "#00bcd4", mt: 1 }}>
          {price.toLocaleString('en-US')} EGP
        </Typography>

        <Box sx={{mt: 1}}>
          <Chip label={`${stock} items avaiable`} color="success" size="small" />
        </Box>
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#00bcd4",
            "&:hover": {
              backgroundColor: "#0097a7",
            },
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;