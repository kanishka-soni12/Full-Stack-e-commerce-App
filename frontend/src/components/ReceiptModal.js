// src/components/ReceiptModal.js
import React from 'react';

export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;
  //const d = new Date(receipt.timestamp || Date.now());
  return (
    <div className="receipt-modal">
      <div className="receipt-card">
        <h2>Receipt</h2>
        <div><strong>Order ID:</strong> {receipt.id}</div>
        <div><strong>Name:</strong> {receipt.customerName} • {receipt.customerEmail}</div>
        <div style={{marginTop:12}}>
          {receipt.items.map((it, i) => (
            <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px dashed #eee'}}>
              <div>{it.name} × {it.qty}</div>
              <div>₹{(it.itemTotal || (it.price*it.qty)).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'right', marginTop:10}}><strong>Total: ₹{(receipt.total||0).toFixed(2)}</strong></div>
        <div style={{textAlign:'right', marginTop:12}}>
          <button className="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
