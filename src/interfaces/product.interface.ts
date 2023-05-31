interface Product {
  name: string;
  description: string;
  image: string | null;
  ean: string;
  market_id: number;
  price: number;
}

export default Product;