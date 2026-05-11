import React, { useContext, useMemo, useState } from 'react';
import { OrderContext } from '../context/CartContext';

const Dashboard = () => {
  const { orders, updateOrderStatus } = useContext(OrderContext);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const currentUserEmail = localStorage.getItem('currentUserEmail') || '';
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();
    return orders
      .filter((order) => {
        if (!isAdmin && currentUserEmail) {
          return order.customer.email.toLowerCase() === currentUserEmail.toLowerCase();
        }
        if (!isAdmin && !currentUserEmail) {
          return false;
        }
        return true;
      })
      .filter((order) => {
        if (statusFilter === 'All') return true;
        return order.status === statusFilter;
      })
      .filter((order) => {
        if (!normalizedSearch) return true;
        return (
          order.id.toString().includes(normalizedSearch) ||
          order.customer.name.toLowerCase().includes(normalizedSearch) ||
          order.customer.email.toLowerCase().includes(normalizedSearch) ||
          (order.customer.phone || '').toLowerCase().includes(normalizedSearch)
        );
      });
  }, [orders, search, statusFilter, currentUserEmail, isAdmin]);

  const statusOptions = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-black mb-4">Order Dashboard</h1>
            <p className="text-sm text-slate-400">
              {isAdmin
                ? 'Admin dashboard: filter orders by ID, customer, phone, or status. Use /admin to login as admin.'
                : currentUserEmail
                ? 'Your orders and current status are shown below.'
                : 'Place an order first to see your personal order status.'}
            </p>
            {isAdmin && (
              <button
                onClick={() => {
                  localStorage.removeItem('isAdmin');
                  window.location.href = '/admin';
                }}
                className="mt-4 inline-flex rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
              >
                Logout Admin
              </button>
            )}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID, name, or email"
              className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-white focus:outline-none sm:w-80"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-white focus:outline-none sm:w-56"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="text-gray-400">No matching orders found.</p>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white/5 p-6 rounded-lg border border-white/10">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Order #{order.id}</h3>
                    <p className="text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
                    <p className="text-sm text-slate-400">Status: <span className="font-semibold text-white">{order.status}</span></p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white">${order.total}</span>
                    {isAdmin ? (
                      <div className="flex flex-col gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-white focus:outline-none"
                        >
                          {statusOptions.slice(1).map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Delivered')}
                          className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-500"
                        >
                          Mark Delivered
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Customer</h4>
                    <p>{order.customer.name}</p>
                    <p>{order.customer.email}</p>
                    <p>{order.customer.phone}</p>
                    <p>{order.customer.address}</p>
                    <p className="text-sm text-slate-500">Source: {order.source}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.title} x {item.quantity}</span>
                          <span>${item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;