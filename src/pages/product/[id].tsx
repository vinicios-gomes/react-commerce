import { GetServerSideProps } from "next";
import { MdAddShoppingCart } from "react-icons/md";
import { IProduct } from "..";
import { getProductById } from "../../services/api";
import { formatPrice } from "../../utils/formaters";
import style from "./product.module.scss";

interface IProductProps {
  products: IProduct[];
}

export default function Product({ products }: IProductProps) {
  return (
    <>
      <div className={style.container}>
        {products.map((product) => (
          <div className={style.product}>
            <img src={product.image} alt={product.name} />

            <div className={style.description}>
              <h1>{product.name}</h1>
              <span>Stock: {product.stock}</span>
              <span>
                Price: <strong>{formatPrice(product.price)}</strong>
              </span>
              <button>
                <div>
                  <MdAddShoppingCart size={16} color="#fff" />
                </div>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;
  const products: IProduct[] = await getProductById(id);

  return {
    props: {
      products,
    },
  };
};
