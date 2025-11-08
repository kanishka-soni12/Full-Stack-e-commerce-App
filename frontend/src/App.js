// src/App.js
import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCart, addToCart, removeCartItem, updateCartItem, checkout } from './api';
import ProductGrid from './components/ProductGrid';
import CartView from './components/CartView';
import ReceiptModal from './components/ReceiptModal';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items:[], total:0 });
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState(null);
  const [form, setForm] = useState({ name:'', email:'' });
  const [error, setError] = useState('');

  useEffect(() => {
    async function init() {
      setLoading(true);
      try {
        const p = await fetchProducts();
        const c = await fetchCart();
        setProducts(p);
        setCart(c);
      } catch (err) {
        console.error(err);
        setError('Cannot reach backend. Is server running?');
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  async function handleAdd(productId) {
    setError('');
    const r = await addToCart(productId, 1);
    // server returns { cart } or cart object - normalize
    setCart(r.cart || r);
  }

  async function handleRemove(cartId) {
    setError('');
    const r = await removeCartItem(cartId);
    setCart(r);
  }

  async function handleUpdateQty(cartId, qty) {
    setError('');
    const r = await updateCartItem(cartId, qty);
    setCart(r);
  }

  async function handleCheckout(e) {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email) return setError('Name and email required');
    const r = await checkout(form.name, form.email);
    if (r.error) return setError(r.error);
    setReceipt(r);
    setCart({ items: [], total: 0 });
    setForm({ name:'', email:'' });
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Vibe Commerce — Mock Cart</h1>
        <div style={{textAlign:'right'}}>
          <div>Cart total: <strong>₹{(cart.total || 0).toFixed(2)}</strong></div>
          <div className="small">{cart.items?.length || 0} items</div>
        </div>
      </div>

      {error && <div style={{color:'red'}}>{error}</div>}
      {loading ? <div>Loading...</div> : (
        <>
          <section style={{marginBottom:20}}>
            <h2>Products</h2>
            <ProductGrid products={products} onAdd={handleAdd} />
          </section>

          <section style={{marginTop:20}}>
            <h2>Your Cart</h2>
            <CartView cart={cart} onRemove={handleRemove} onUpdateQty={handleUpdateQty} />
          </section>

          <section style={{marginTop:16}}>
            <h2>Checkout</h2>
            <form onSubmit={handleCheckout} style={{display:'flex', gap:8, alignItems:'center'}}>
              <input className="input" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input className="input" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              <button className="button" type="submit" disabled={!cart.items?.length}>Pay (Mock)</button>
            </form>
          </section>
        </>
      )}

      <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
    </div>
  );
}
