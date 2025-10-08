import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList({ products, categories, onAddToCart, onViewDetails }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('default');

    // กรองสินค้าตามหมวดหมู่
    let filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(product => product.category === selectedCategory);

    // ค้นหาตามชื่อสินค้า
    if (searchTerm.trim()) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // จัดเรียงสินค้า
    if (sortOption === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating-desc') {
        filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return (
        <div className="product-list-container">
            {/* Header */}
            <div className="header">
                <h1>🛍️ ร้านค้าออนไลน์</h1>
                <p>Lab 3.2 - การสร้าง Components และ Props</p>
            </div>

            {/* Filters / Search / Sort */}
            <div className="filter-bar">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-button"
                >
                    <option value="all">ทั้งหมด</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="ค้นหาสินค้า..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="filter-button"
                />

                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="filter-button"
                >
                    <option value="default">เรียงตามมาตรฐาน</option>
                    <option value="price-asc">ราคาต่ำ → สูง</option>
                    <option value="price-desc">ราคาสูง → ต่ำ</option>
                    <option value="rating-desc">คะแนนสูง → ต่ำ</option>
                </select>
            </div>

            {/* Products Display */}
            {filteredProducts.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '30px' }}>😢 ไม่พบสินค้า</p>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={onAddToCart}
                            onViewDetails={onViewDetails}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// ✅ PropTypes validation แบบละเอียด
ProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
                if (value !== undefined && (value < 0 || value > 5)) {
                    return new Error(
                        `${componentName}: prop '${propName}' ต้องอยู่ระหว่าง 0 ถึง 5`
                    );
                }
            },
            inStock: PropTypes.bool,
            category: PropTypes.string
        })
    ).isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired
};

export default ProductList;
