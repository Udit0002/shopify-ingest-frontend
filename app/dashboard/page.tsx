// // 'use client';

// // import React, { useMemo, useState } from 'react';
// // import { useQuery } from '@tanstack/react-query';
// // import { motion } from 'framer-motion';
// // import { format, parseISO } from 'date-fns';
// // import DatePicker from 'react-datepicker';
// // import 'react-datepicker/dist/react-datepicker.css';

// // import { Card, CardContent } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';

// // // Recharts (make sure to `npm i recharts` in your project)
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   CartesianGrid,
// //   ResponsiveContainer,
// //   BarChart,
// //   Bar,
// // } from 'recharts';

// // import { useTenant } from '../../context/TenantContext';
// // import { getSummary, getOrdersByDate, getTopCustomers } from '../../lib/api';

// // function MetricCard({ title, value, delta }: { title: string; value: string | number; delta?: number | null }) {
// //   return (
// //     <Card className="p-4">
// //       <CardContent>
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <div className="text-sm text-gray-500">{title}</div>
// //             <div className="text-2xl font-semibold mt-1">{value}</div>
// //           </div>
// //           <div className="text-right">
// //             {delta != null ? (
// //               <div className={`text-sm ${delta >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
// //                 {delta >= 0 ? `+${delta}%` : `${delta}%`}
// //               </div>
// //             ) : null}
// //             <div className="text-xs text-gray-400">vs prev period</div>
// //           </div>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// // export default function DashboardPage() {
// //   const { selected } = useTenant();
// //   const tenantId = selected?.tenantId || selected?.id || '';

// //   // Date range state for orders chart
// //   const [fromDate, setFromDate] = useState<Date>(() => {
// //     const d = new Date();
// //     d.setDate(d.getDate() - 30);
// //     return d;
// //   });
// //   const [toDate, setToDate] = useState<Date>(new Date());

// //   const fromISO = useMemo(() => format(fromDate, "yyyy-MM-dd"), [fromDate]);
// //   const toISO = useMemo(() => format(toDate, "yyyy-MM-dd"), [toDate]);

// //   const {
// //     data: summary,
// //     isLoading: loadingSummary,
// //     error: summaryError,
// //   } = useQuery({
// //     queryKey: ['summary', tenantId],
// //     queryFn: () => getSummary(tenantId),
// //     enabled: !!tenantId,
// //     staleTime: 1000 * 60 * 1,
// //   });

// //   const {
// //     data: ordersByDate,
// //     isLoading: loadingOrders,
// //     refetch: refetchOrders,
// //   } = useQuery({
// //     queryKey: ['ordersByDate', tenantId, fromISO, toISO],
// //     queryFn: () => getOrdersByDate(tenantId, fromISO, toISO),
// //     enabled: !!tenantId,
// //   });

// //   const { data: topCustomers, isLoading: loadingCustomers } = useQuery({
// //     queryKey: ['topCustomers', tenantId],
// //     queryFn: () => getTopCustomers(tenantId, 5),
// //     enabled: !!tenantId,
// //   });

// //   if (!selected) return <div>Please onboard a store in the Tenants page.</div>;
// //   if (loadingSummary) return <div>Loading summary...</div>;
// //   if (summaryError) return <div className="text-red-600">Error loading summary</div>;

// //   // Simple derived metrics
// //   const customers = summary?.totalCustomers ?? 0;
// //   const orders = summary?.totalOrders ?? 0;
// //   const revenue = Number(summary?.totalRevenue ?? 0);
// //   const revenueFormatted = revenue.toLocaleString(undefined, { style: 'currency', currency: 'USD' });

// //   return (
// //     <div className="p-6">
// //       <div className="flex items-center justify-between mb-6">
// //         <div>
// //           <h1 className="text-3xl font-bold text-slate-900">{selected.shopDomain} — Insights Dashboard</h1>
// //           <p className="text-sm text-gray-500 mt-1">Overview of customers, orders and revenue. Track trends and top customers.</p>
// //         </div>
// //         <div className="flex items-center gap-3">
// //           <div className="flex items-center gap-2">
// //             <label className="text-sm text-gray-600 mr-2">From</label>
// //             <DatePicker selected={fromDate} onChange={(d: Date) => setFromDate(d)} />
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <label className="text-sm text-gray-600 mr-2">To</label>
// //             <DatePicker selected={toDate} onChange={(d: Date) => setToDate(d)} />
// //           </div>
// //           <Button onClick={() => refetchOrders()}>Apply</Button>
// //         </div>
// //       </div>

// //       {/* KPI row */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// //         <motion.div whileHover={{ y: -4 }}>
// //           <MetricCard title="Customers" value={customers} delta={summary?.customersDelta ?? null} />
// //         </motion.div>
// //         <motion.div whileHover={{ y: -4 }}>
// //           <MetricCard title="Orders" value={orders} delta={summary?.ordersDelta ?? null} />
// //         </motion.div>
// //         <motion.div whileHover={{ y: -4 }}>
// //           <MetricCard title="Revenue" value={revenueFormatted} delta={summary?.revenueDelta ?? null} />
// //         </motion.div>
// //       </div>

// //       {/* Main grid */}
// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         {/* Orders trend (large) */}
// //         <div className="lg:col-span-2 bg-white p-4 rounded shadow">
// //           <div className="flex items-center justify-between mb-2">
// //             <h2 className="text-lg font-medium">Orders by date</h2>
// //             <div className="text-sm text-gray-500">{fromISO} → {toISO}</div>
// //           </div>

// //           <div style={{ height: 300 }}>
// //             {loadingOrders ? (
// //               <div>Loading chart...</div>
// //             ) : (
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <LineChart data={ordersByDate?.data ?? []}>
// //                   <CartesianGrid strokeDasharray="3 3" />
// //                   <XAxis dataKey="date" tickFormatter={(d) => format(parseISO(String(d)), 'MM/dd')} />
// //                   <YAxis />
// //                   <Tooltip labelFormatter={(v) => format(parseISO(String(v)), 'PPP')} />
// //                   <Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={2} dot={{ r: 2 }} />
// //                   <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} dot={false} />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             )}
// //           </div>
// //         </div>

// //         {/* Right column: Top customers + small metrics */}
// //         <div className="space-y-6">
// //           <Card>
// //             <CardContent>
// //               <div className="flex items-center justify-between mb-2">
// //                 <h3 className="font-medium">Top 5 customers by spend</h3>
// //                 <div className="text-xs text-gray-400">Updated live</div>
// //               </div>

// //               {loadingCustomers ? (
// //                 <div>Loading top customers...</div>
// //               ) : (
// //                 <div>
// //                   <ResponsiveContainer width="100%" height={220}>
// //                     <BarChart data={topCustomers?.data ?? []} layout="vertical">
// //                       <CartesianGrid strokeDasharray="3 3" />
// //                       <XAxis type="number" />
// //                       <YAxis type="category" dataKey="name" width={120} />
// //                       <Tooltip />
// //                       <Bar dataKey="totalSpend" barSize={14} />
// //                     </BarChart>
// //                   </ResponsiveContainer>

// //                   <div className="mt-4">
// //                     <ul className="space-y-2">
// //                       {(topCustomers?.data ?? []).map((c: any, i: number) => (
// //                         <li key={c.id} className="flex items-center justify-between">
// //                           <div className="flex items-center gap-3">
// //                             <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">{String(i + 1)}</div>
// //                             <div>
// //                               <div className="text-sm font-medium">{c.name}</div>
// //                               <div className="text-xs text-gray-500">{c.email ?? '—'}</div>
// //                             </div>
// //                           </div>
// //                           <div className="text-sm font-semibold">{Number(c.totalSpend).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</div>
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>

// //           {/* small cards / suggestions */}
// //           <Card>
// //             <CardContent>
// //               <h4 className="font-medium mb-2">Suggested actions</h4>
// //               <ul className="text-sm text-gray-600 space-y-2">
// //                 <li>• Send a re-engagement email to the top 20% inactive customers.</li>
// //                 <li>• Run a promotion for products with decreasing conversion rate.</li>
// //                 <li>• Investigate refunds or chargebacks during the last 7 days.</li>
// //               </ul>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>

// //       {/* Footer: small table of recent orders */}
// //       <div className="mt-6 bg-white rounded shadow p-4">
// //         <h3 className="text-lg font-medium mb-3">Recent orders</h3>
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm">
// //             <thead className="text-left text-gray-500">
// //               <tr>
// //                 <th className="pb-2">Order</th>
// //                 <th className="pb-2">Customer</th>
// //                 <th className="pb-2">Date</th>
// //                 <th className="pb-2">Total</th>
// //                 <th className="pb-2">Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {(summary?.recentOrders ?? []).map((o: any) => (
// //                 <tr key={o.id} className="border-t">
// //                   <td className="py-2">#{o.orderNumber}</td>
// //                   <td className="py-2">{o.customerName ?? '—'}</td>
// //                   <td className="py-2">{format(parseISO(o.createdAt), 'PP')}</td>
// //                   <td className="py-2">{Number(o.total).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</td>
// //                   <td className="py-2">{o.status}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import React, { useMemo, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { motion } from 'framer-motion';
// import { format, parseISO } from 'date-fns';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';

// // Recharts
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from 'recharts';

// import { useTenant } from '../../context/TenantContext';
// import { getSummary, getOrdersByDate, getTopCustomers, getRecentOrders } from '../../lib/api';

// function MetricCard({ title, value, delta }: { title: string; value: string | number; delta?: number | null }) {
//   return (
//     <Card className="p-4">
//       <CardContent>
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-sm text-gray-500">{title}</div>
//             <div className="text-2xl font-semibold mt-1">{value}</div>
//           </div>
//           <div className="text-right">
//             {delta != null ? (
//               <div className={`text-sm ${delta >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
//                 {delta >= 0 ? `+${delta}%` : `${delta}%`}
//               </div>
//             ) : null}
//             <div className="text-xs text-gray-400">vs prev period</div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// export default function DashboardPage() {
//   const { selected } = useTenant();
//   const tenantId = selected?.tenantId || selected?.id || '';

//   // Date range state for orders chart
//   const [fromDate, setFromDate] = useState<Date>(() => {
//     const d = new Date();
//     d.setDate(d.getDate() - 30);
//     return d;
//   });
//   const [toDate, setToDate] = useState<Date>(new Date());

//   const fromISO = useMemo(() => format(fromDate, 'yyyy-MM-dd'), [fromDate]);
//   const toISO = useMemo(() => format(toDate, 'yyyy-MM-dd'), [toDate]);

//   const {
//     data: summary,
//     isLoading: loadingSummary,
//     error: summaryError,
//   } = useQuery({
//     queryKey: ['summary', tenantId],
//     queryFn: () => getSummary(tenantId),
//     enabled: !!tenantId,
//     staleTime: 1000 * 60 * 1,
//   });

//   const {
//     data: ordersByDate,
//     isLoading: loadingOrders,
//     refetch: refetchOrders,
//   } = useQuery({
//     queryKey: ['ordersByDate', tenantId, fromISO, toISO],
//     queryFn: () => getOrdersByDate(tenantId, fromISO, toISO),
//     enabled: !!tenantId,
//   });

//   const { data: topCustomers, isLoading: loadingCustomers } = useQuery({
//     queryKey: ['topCustomers', tenantId],
//     queryFn: () => getTopCustomers(tenantId, 5),
//     enabled: !!tenantId,
//   });

//   const { data: recentOrdersResp, isLoading: loadingRecentOrders } = useQuery({
//     queryKey: ['recentOrders', tenantId],
//     queryFn: () => getRecentOrders(tenantId, 10),
//     enabled: !!tenantId,
//   });

//   const recentOrders = recentOrdersResp?.data ?? [];

//   if (!selected) return <div>Please onboard a store in the Tenants page.</div>;
//   if (loadingSummary) return <div>Loading summary...</div>;
//   if (summaryError) return <div className="text-red-600">Error loading summary</div>;

//   // Simple derived metrics
//   const customers = summary?.totalCustomers ?? 0;
//   const orders = summary?.totalOrders ?? 0;
//   const revenue = Number(summary?.totalRevenue ?? 0);
//   const revenueFormatted = revenue.toLocaleString(undefined, { style: 'currency', currency: 'USD' });

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">{selected.shopDomain} — Insights Dashboard</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Overview of customers, orders and revenue. Track trends and top customers.
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="flex items-center gap-2">
//             <label className="text-sm text-gray-600 mr-2">From</label>
//             <DatePicker selected={fromDate} onChange={(d: Date) => setFromDate(d)} />
//           </div>
//           <div className="flex items-center gap-2">
//             <label className="text-sm text-gray-600 mr-2">To</label>
//             <DatePicker selected={toDate} onChange={(d: Date) => setToDate(d)} />
//           </div>
//           <Button onClick={() => refetchOrders()}>Apply</Button>
//         </div>
//       </div>

//       {/* KPI row */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <motion.div whileHover={{ y: -4 }}>
//           <MetricCard title="Customers" value={customers} delta={summary?.customersDelta ?? null} />
//         </motion.div>
//         <motion.div whileHover={{ y: -4 }}>
//           <MetricCard title="Orders" value={orders} delta={summary?.ordersDelta ?? null} />
//         </motion.div>
//         <motion.div whileHover={{ y: -4 }}>
//           <MetricCard title="Revenue" value={revenueFormatted} delta={summary?.revenueDelta ?? null} />
//         </motion.div>
//       </div>

//       {/* Main grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Orders trend (large) */}
//         <div className="lg:col-span-2 bg-white p-4 rounded shadow">
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-lg font-medium">Orders by date</h2>
//             <div className="text-sm text-gray-500">
//               {fromISO} → {toISO}
//             </div>
//           </div>

//           <div style={{ height: 300 }}>
//             {loadingOrders ? (
//               <div>Loading chart...</div>
//             ) : (
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={ordersByDate?.data ?? []}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" tickFormatter={(d) => format(parseISO(String(d)), 'MM/dd')} />
//                   <YAxis />
//                   <Tooltip labelFormatter={(v) => format(parseISO(String(v)), 'PPP')} />
//                   <Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={2} dot={{ r: 2 }} />
//                   <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} dot={false} />
//                 </LineChart>
//               </ResponsiveContainer>
//             )}
//           </div>
//         </div>

//         {/* Right column: Top customers + small metrics */}
//         <div className="space-y-6">
//           <Card>
//             <CardContent>
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-medium">Top 5 customers by spend</h3>
//                 <div className="text-xs text-gray-400">Updated live</div>
//               </div>

//               {loadingCustomers ? (
//                 <div>Loading top customers...</div>
//               ) : (
//                 <div>
//                   <ResponsiveContainer width="100%" height={220}>
//                     <BarChart data={topCustomers?.data ?? []} layout="vertical">
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis type="number" />
//                       <YAxis type="category" dataKey="name" width={120} />
//                       <Tooltip />
//                       <Bar dataKey="totalSpend" barSize={14} />
//                     </BarChart>
//                   </ResponsiveContainer>

//                   <div className="mt-4">
//                     <ul className="space-y-2">
//                       {(topCustomers?.data ?? []).map((c: any, i: number) => (
//                         <li key={c.id} className="flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                             <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
//                               {String(i + 1)}
//                             </div>
//                             <div>
//                               <div className="text-sm font-medium">{c.name}</div>
//                               <div className="text-xs text-gray-500">{c.email ?? '—'}</div>
//                             </div>
//                           </div>
//                           <div className="text-sm font-semibold">
//                             {Number(c.totalSpend).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* small cards / suggestions */}
//           <Card>
//             <CardContent>
//               <h4 className="font-medium mb-2">Suggested actions</h4>
//               <ul className="text-sm text-gray-600 space-y-2">
//                 <li>• Send a re-engagement email to the top 20% inactive customers.</li>
//                 <li>• Run a promotion for products with decreasing conversion rate.</li>
//                 <li>• Investigate refunds or chargebacks during the last 7 days.</li>
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Footer: small table of recent orders */}
//       <div className="mt-6 bg-white rounded shadow p-4">
//         <h3 className="text-lg font-medium mb-3">Recent orders</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="text-left text-gray-500">
//               <tr>
//                 <th className="pb-2">Order</th>
//                 <th className="pb-2">Customer</th>
//                 <th className="pb-2">Date</th>
//                 <th className="pb-2">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loadingRecentOrders ? (
//                 <tr>
//                   <td colSpan={4} className="py-4 text-center">
//                     Loading recent orders...
//                   </td>
//                 </tr>
//               ) : (
//                 recentOrders.map((o: any) => (
//                   <tr key={o.id} className="border-t">
//                     <td className="py-2">#{o.orderId}</td>
//                     <td className="py-2">
//                       <div className="font-medium">{o.customerName ?? '—'}</div>
//                       <div className="text-xs text-gray-500">{o.email ?? ''}</div>
//                     </td>
//                     <td className="py-2">{format(parseISO(o.createdAt), 'PP')}</td>
//                     <td className="py-2">
//                       {Number(o.total).toLocaleString(undefined, {
//                         style: 'currency',
//                         currency: o.currency || 'USD',
//                       })}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

import { useTenant } from '../../context/TenantContext';
import { getSummary, getOrdersByDate, getTopCustomers, getRecentOrders } from '../../lib/api';

function MetricCard({ title, value, delta }: { title: string; value: string | number; delta?: number | null }) {
  return (
    <Card className="p-5 hover:shadow-lg transition-shadow">
      <CardContent className="space-y-2">
        <div className="text-sm font-medium text-gray-500">{title}</div>
        <div className="text-3xl font-bold text-slate-900">{value}</div>
        {delta != null && (
          <div className={`text-sm ${delta >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {delta >= 0 ? `▲ ${delta}%` : `▼ ${Math.abs(delta)}%`}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { selected } = useTenant();
  const tenantId = selected?.tenantId || selected?.id || '';

  // Date range state
  const [fromDate, setFromDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d;
  });
  const [toDate, setToDate] = useState<Date>(new Date());

  const fromISO = useMemo(() => format(fromDate, 'yyyy-MM-dd'), [fromDate]);
  const toISO = useMemo(() => format(toDate, 'yyyy-MM-dd'), [toDate]);

  // Queries
  const { data: summary, isLoading: loadingSummary } = useQuery({
    queryKey: ['summary', tenantId],
    queryFn: () => getSummary(tenantId),
    enabled: !!tenantId,
  });

  const { data: ordersByDate, isLoading: loadingOrders, refetch: refetchOrders } = useQuery({
    queryKey: ['ordersByDate', tenantId, fromISO, toISO],
    queryFn: () => getOrdersByDate(tenantId, fromISO, toISO),
    enabled: !!tenantId,
  });

  const { data: topCustomers, isLoading: loadingCustomers } = useQuery({
    queryKey: ['topCustomers', tenantId],
    queryFn: () => getTopCustomers(tenantId, 5),
    enabled: !!tenantId,
  });

  const { data: recentOrdersResp, isLoading: loadingRecentOrders } = useQuery({
    queryKey: ['recentOrders', tenantId],
    queryFn: () => getRecentOrders(tenantId, 10),
    enabled: !!tenantId,
  });

  const recentOrders = recentOrdersResp?.data ?? [];

  if (!selected) return <div className="text-center text-gray-500 p-10">Please onboard a store in the Tenants page.</div>;
  if (loadingSummary) return <div className="text-center text-gray-500 p-10">Loading summary...</div>;

  const customers = summary?.totalCustomers ?? 0;
  const orders = summary?.totalOrders ?? 0;
  const revenue = Number(summary?.totalRevenue ?? 0);
  const revenueFormatted = revenue.toLocaleString(undefined, { style: 'currency', currency: 'USD' });

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{selected.shopDomain} — Insights Dashboard</h1>
          <p className="text-gray-500 mt-1">Track customers, orders, revenue, and more.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">From</label>
            <DatePicker selected={fromDate} onChange={(d: Date) => setFromDate(d)} />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">To</label>
            <DatePicker selected={toDate} onChange={(d: Date) => setToDate(d)} />
          </div>
          <Button onClick={() => refetchOrders()}>Apply</Button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Customers" value={customers} delta={summary?.customersDelta ?? null} />
        <MetricCard title="Orders" value={orders} delta={summary?.ordersDelta ?? null} />
        <MetricCard title="Revenue" value={revenueFormatted} delta={summary?.revenueDelta ?? null} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders trend */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Orders & Revenue Trend</h2>
            <div style={{ height: 320 }}>
              {loadingOrders ? (
                <div className="flex justify-center items-center h-full text-gray-500">Loading chart...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ordersByDate?.data ?? []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" tickFormatter={(d) => format(parseISO(String(d)), 'MM/dd')} />
                    <YAxis />
                    <Tooltip labelFormatter={(v) => format(parseISO(String(v)), 'PPP')} />
                    <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top customers */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Top Customers</h2>
            {loadingCustomers ? (
              <div className="text-gray-500">Loading...</div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={topCustomers?.data ?? []} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={120} />
                    <Tooltip />
                    <Bar dataKey="totalSpend" fill="#6366f1" barSize={14} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <ul className="mt-4 space-y-3">
                  {(topCustomers?.data ?? []).map((c: any, i: number) => (
                    <li key={c.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-medium">
                          {i + 1}
                        </span>
                        <div>
                          <div className="font-medium text-slate-800">{c.name}</div>
                          <div className="text-xs text-gray-500">{c.email ?? '—'}</div>
                        </div>
                      </div>
                      <div className="font-semibold">
                        {Number(c.totalSpend).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent orders */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Order</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {loadingRecentOrders ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-500">
                      Loading recent orders...
                    </td>
                  </tr>
                ) : recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-500">
                      No recent orders found.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((o: any, idx: number) => (
                    <tr
                      key={o.id}
                      className={`border-t ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition`}
                    >
                      <td className="px-4 py-2 font-medium text-slate-800">#{o.orderId}</td>
                      <td className="px-4 py-2">
                        <div className="font-medium">{o.customerName ?? '—'}</div>
                        <div className="text-xs text-gray-500">{o.email ?? ''}</div>
                      </td>
                      <td className="px-4 py-2">{format(parseISO(o.createdAt), 'PP')}</td>
                      <td className="px-4 py-2">
                        {Number(o.total).toLocaleString(undefined, {
                          style: 'currency',
                          currency: o.currency || 'USD',
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
