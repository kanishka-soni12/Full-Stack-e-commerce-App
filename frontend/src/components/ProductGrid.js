// src/components/ProductGrid.js
import React from 'react';

export default function ProductGrid({ products = [], onAdd }) {
  return (
    <div className="grid">
      {products.map(p => (
        <div key={p._id || p.id} className="card">
          <div className="product-img">{p.image ? <img src={p.image} alt={p.name} style={{maxHeight:110}} /> : 'Image'}</div>
          <h3>{p.name}</h3>
          <p className="small">{p.description}</p>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8}}>
            <strong>₹{p.price}</strong>
            <button className="button" onClick={() => onAdd(p._id || p.id)}>Add</button>
          </div>
        </div>
      ))}
    </div>
  );
}
