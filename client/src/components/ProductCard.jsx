import { useStore } from '../context/StoreContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <article className="card">
      <img src={product.image} alt={product.name} onError={(e) => { e.currentTarget.src = "https://placehold.co/900x600/e8e8e8/111111?text=Product"; }} />
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
