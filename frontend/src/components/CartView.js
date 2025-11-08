// src/components/CartView.js
import React from 'react';

export default function CartView({ cart, onRemove, onUpdateQty }) {
  if (!cart || !cart.items || cart.items.length === 0) {
    return <div className="card">Your cart is empty.</div>;
  }

  return (
    <div className="card">
      <div className="cart-list">
        {cart.items.map(it => (
          <div key={it.cartId || it._id} className="cart-item">
            <div>
              <div style={{fontWeight:600}}>{it.name}</div>
              <div className="small">₹{it.price} × {it.qty} = ₹{(it.itemTotal || (it.price*it.qty)).toFixed(2)}</div>
            </div>
            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              <input className="input" type="number" min="1" style={{width:70}} value={it.qty} onChange={(e) => onUpdateQty(it.cartId || it._id, Math.max(1, parseInt(e.target.value||1)))} />
              <button className="button" style={{background:'#EB5757'}} onClick={() => onRemove(it.cartId || it._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{textAlign:'right', marginTop:12}}>
        <strong>Total: ₹{(cart.total || 0).toFixed(2)}</strong>
      </div>
    </div>
  );
}
