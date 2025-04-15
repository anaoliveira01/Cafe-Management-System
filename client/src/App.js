import React, { useState } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Select, SelectItem } from "./components/ui/select";

export default function CafeApp() {
  const [report, setReport] = useState([]);

  const fetchReport = async () => {
    const res = await fetch('http://localhost:5001/orders/report');
    const data = await res.json();
    setReport(data);
  };


  const [newUser, setNewUser] = useState({ name: '', role: '' });
  const [userMsg, setUserMsg] = useState('');

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.role) return alert('Fill in all fields');

    const res = await fetch('http://localhost:5001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });

    const data = await res.json();
    setUserMsg(data.message || 'Add failed');
    setNewUser({ name: '', role: '' });
  };


  // ORDER FORM STATES
  const [order, setOrder] = useState({ name: '', email: '', product: '', quantity: 1 });
  const [receipt, setReceipt] = useState('');
  const [loading, setLoading] = useState(false);

  // ORDER STATUS UPDATE STATES
  const [orderId, setOrderId] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const products = [
    { name: 'Matcha Latte', price: 5.95 },
    { name: 'Sausage Muffin', price: 4.50 },
    { name: 'Egg & Cheese Muffin', price: 4.75 }
  ];

  const totalPrice = order.product ? products.find(p => p.name === order.product)?.price * order.quantity : 0;

  const handleSubmitOrder = async () => {
    if (!order.name || !order.email || !order.product) {
      alert('Please complete all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      const data = await res.json();
      if (res.ok) {
        setReceipt(`Order placed: ${order.product}, $${totalPrice.toFixed(2)} (ID: ${data.orderId})`);
        setOrder({ name: '', email: '', product: '', quantity: 1 });
      } else {
        alert(data.message || 'Failed to place order');
      }
    } catch (err) {
      alert('Server error, please try again later');
    }
    setLoading(false);
  };

  const handleUpdateStatus = async () => {
    if (!orderId || !newStatus) return alert('Fill in all fields');

    const res = await fetch(`http://localhost:5001/orders/${orderId}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });

    const data = await res.json();
    setStatusMsg(data.message || 'Update failed');
  };

  return (
    <div className="p-4 grid gap-4 max-w-lg mx-auto">
      {/* Order Form */}
      <Card>
        <CardContent className="grid gap-2">
          <h2 className="text-xl font-bold">Customer Order</h2>
          <Input placeholder="Name" value={order.name} onChange={e => setOrder({ ...order, name: e.target.value })} />
          <Input placeholder="Email" value={order.email} onChange={e => setOrder({ ...order, email: e.target.value })} />
          <Select value={order.product} onValueChange={value => setOrder({ ...order, product: value })}>
            {products.map((item, idx) => <SelectItem key={idx} value={item.name}>{item.name}</SelectItem>)}
          </Select>
          <Input type="number" value={order.quantity} min={1} max={99} onChange={e => setOrder({ ...order, quantity: Number(e.target.value) })} />
          <p className="text-sm">Total: ${totalPrice.toFixed(2)}</p>
          <Button onClick={handleSubmitOrder} disabled={loading}>{loading ? 'Placing...' : 'Submit Order'}</Button>
          {receipt && <p className="text-green-600 font-medium mt-2">{receipt}</p>}
        </CardContent>
      </Card>

      {/* Update Status Form */}
      <Card>
        <CardContent className="grid gap-2">
          <h2 className="text-xl font-bold">Update Order Status</h2>
          <Input placeholder="Order ID" value={orderId} onChange={e => setOrderId(e.target.value)} />
          <Select value={newStatus} onValueChange={value => setNewStatus(value)}>
            <SelectItem value="Preparing">Preparing</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </Select>
          <Button onClick={handleUpdateStatus}>Update Status</Button>
          {statusMsg && <p className="text-green-600 mt-1">{statusMsg}</p>}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="grid gap-2">
          <h2 className="text-xl font-bold">Add New User (Admin)</h2>
          <Input placeholder="Name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
          <Select value={newUser.role} onValueChange={value => setNewUser({ ...newUser, role: value })}>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Staff">Staff</SelectItem>
          </Select>
          <Button onClick={handleAddUser}>Add User</Button>
          {userMsg && <p className="text-green-600 mt-1">{userMsg}</p>}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="grid gap-2">
          <h2 className="text-xl font-bold">Sales Report</h2>
          <Button onClick={fetchReport}>Load Report</Button>
          {report.length > 0 && (
            <div className="text-sm border-t pt-2 space-y-1 max-h-48 overflow-auto">
              {report.map((o, idx) => (
                <div key={idx}>
                  #{o.id} — {o.name} ordered {o.quantity} x {o.product} [{o.status}] at {new Date(o.order_time).toLocaleString()}
                </div>
              ))}
              <p className="font-medium pt-2">Total Orders: {report.length}</p>
            </div>
          )}
        </CardContent>
      </Card>


    </div>
  );
}
