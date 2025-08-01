import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend
} from 'recharts';

type Account = {
  id: string;
  name: string;
  balance: number;
};

type Transaction = {
  id: string;
  accountId: string;
  description: string;
  amount: number;
  category: string;
  date: string;
};

function aggregateByCategory(transactions: Transaction[]) {
  const map: Record<string, number> = {};
  transactions.forEach(t => {
    if (t.category === 'Income') return;
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [accRes, txRes] = await Promise.all([
          axios.get('/api/accounts'),
          axios.get('/api/transactions'),
        ]);
        setAccounts(accRes.data);
        setTransactions(txRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  const byCategory = aggregateByCategory(transactions);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Finance Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {accounts.map(a => (
            <div key={a.id} className="bg-white rounded-2xl shadow p-4">
              <div className="text-sm text-gray-500">{a.name}</div>
              <div className="text-2xl font-semibold">£{a.balance.toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-medium mb-2">Spending by Category</h2>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={byCategory}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  >
                    {byCategory.map((entry, index) => (
                      <Cell key={index} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-medium mb-2">Recent Transactions</h2>
            <div className="space-y-2">
              {transactions.slice(0, 5).map(t => (
                <div key={t.id} className="flex justify-between border-b pb-2">
                  <div>
                    <div className="font-semibold">{t.description}</div>
                    <div className="text-xs text-gray-500">{t.date}</div>
                  </div>
                  <div className="text-right">
                    <div>£{t.amount.toFixed(2)}</div>
                    <div className="text-xs">{t.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-600">
          <div>Data is mock; backend is a simple Spring Boot REST API returning hardcoded accounts and transactions. Next improvements: authentication (JWT), persistent DB, budgeting controls, import CSV, deployment.</div>
        </div>
      </div>
    </div>
  );
}

export default App;
