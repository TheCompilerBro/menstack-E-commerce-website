import { useStore } from '../context/StoreContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <article className="card">
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <p className="category">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="card-row">
          <strong>${product.price}</strong>
          <button type="button" onClick={() => addToCart(product)}>
            Add
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
