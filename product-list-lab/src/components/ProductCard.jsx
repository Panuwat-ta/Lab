import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({ product, onAddToCart, onViewDetails }) {
    return (
        <div className="product-card">
            <div className="product-image">
                <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/300x300/cccccc/666666?text=No+Image';
                    }}
                />
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-rating">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <span
                            key={index}
                            className={index < product.rating ? 'star filled' : 'star'}
                        >
                            ★
                        </span>
                    ))}
                    <span className="rating-text">({product.rating}/5)</span>
                </div>

                <div className="product-price">฿{product.price.toLocaleString()}</div>

                <div className="product-actions">
                    <button
                        className="btn btn-secondary"
                        onClick={() => onViewDetails(product)}
                    >
                        ดูรายละเอียด
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => onAddToCart(product)}
                        disabled={!product.inStock}
                    >
                        {product.inStock ? 'ใส่ตะกร้า' : 'หมดสินค้า'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ✅ ทำ TODO: เพิ่ม PropTypes validation ให้ละเอียดขึ้น
ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // รองรับทั้งตัวเลขและ string
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: (props, propName, componentName) => {
            const value = props[propName];
            if (typeof value !== 'number' || value < 0) {
                return new Error(
                    `${componentName}: prop '${propName}' ต้องเป็น number และมากกว่า 0`
                );
            }
        },
        image: PropTypes.string,
        rating: (props, propName, componentName) => {
            const value = props[propName];
            if (value < 0 || value > 5) {
                return new Error(
                    `${componentName}: prop '${propName}' ต้องมีค่าอยู่ระหว่าง 0 ถึง 5`
                );
            }
        },
        inStock: PropTypes.bool,
        category: PropTypes.oneOf(['Electronics', 'Fashion', 'Food', 'Books', 'Other'])
    }).isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired
};

export default ProductCard;
