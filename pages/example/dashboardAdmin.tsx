// import React, { useState, useEffect } from 'react'
// import { Line, Bar } from 'react-chartjs-2'

// import InfoCard from 'example/components/Cards/InfoCard'
// import PageTitle from 'example/components/Typography/PageTitle'
// import RoundIcon from 'example/components/RoundIcon'
// import Layout from 'example/containers/Layout'
// import { MoneyIcon, CartIcon, PeopleIcon, ChatIcon } from 'icons'

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js'

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// )

// function Dashboard() {
//   const lineData = {
//     labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
//     datasets: [
//       {
//         label: 'Total Keuangan',
//         data: [300000000, 350000000, 380000000, 400000000, 470000000, 468000000],
//         borderColor: '#6C63FF',
//         backgroundColor: 'rgba(108,99,255,0.1)',
//         fill: true,
//         tension: 0.4,
//       },
//     ],
//   }

//   const barData = {
//     labels: ['1', '2', '3', '4'],
//     datasets: [
//       {
//         label: 'Pengeluaran',
//         data: [4000000, 5000000, 3000000, 4500000],
//         backgroundColor: '#FF3B30',
//       },
//       {
//         label: 'Pemasukan',
//         data: [8000000, 9000000, 7000000, 10000000],
//         backgroundColor: '#3A36DB',
//       },
//     ],
//   }

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           color: '#000',
//         },
//       },
//     },
//   }

//   return (
//     <Layout>
//       <PageTitle>Main Dashboard</PageTitle>

//       <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
//         <InfoCard title="Pemasukan" value="Rp. 12.000.000,00">
//           {/* @ts-ignore */}
//           <RoundIcon icon={MoneyIcon} iconColorClass="text-green-500 dark:text-green-100" bgColorClass="bg-green-100 dark:bg-green-500" className="mr-4" />
//         </InfoCard>
//         <InfoCard title="Pengeluaran" value="Rp. 5.000.000,00">
//           {/* @ts-ignore */}
//           <RoundIcon icon={CartIcon} iconColorClass="text-red-500 dark:text-red-100" bgColorClass="bg-red-100 dark:bg-red-500" className="mr-4" />
//         </InfoCard>
//         <InfoCard title="Saldo" value="Rp. 7.000.000,00">
//           {/* @ts-ignore */}
//           <RoundIcon icon={MoneyIcon} iconColorClass="text-blue-500 dark:text-blue-100" bgColorClass="bg-blue-100 dark:bg-blue-500" className="mr-4" />
//         </InfoCard>
//       </div>

//       <div className="grid gap-6 mb-8 md:grid-cols-2">
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//           <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Tren Keuangan Tahunan</h4>
//           <p className="text-2xl font-bold text-blue-600 mb-2">Rp. 468.000.000,00</p>
//           <Line data={lineData} options={options} />
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//           <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Tren Keuangan</h4>
//           <Bar data={barData} options={options} />
//         </div>
//       </div>

//       <div className="bg-[#f4f7ff] rounded-lg shadow-md">
//   <h4 className="text-lg font-semibold text-white bg-[#2e3a8c] px-6 py-4 rounded-t-lg">
//     Transaksi Terbaru
//   </h4>
//   <div className="p-6 bg-white rounded-b-lg">
//     <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
//       <thead className="text-xs text-gray-800 uppercase bg-[#e0e7ff]">
//         <tr>
//           <th className="px-6 py-3">No</th>
//           <th className="px-6 py-3">Tipe</th>
//           <th className="px-6 py-3">Jumlah</th>
//           <th className="px-6 py-3">Tanggal</th>
//         </tr>
//       </thead>
//       <tbody>
//         {[
//           { tipe: 'Pemasukan', jumlah: '100.000', tanggal: '12-12-2024' },
//           { tipe: 'Pengeluaran', jumlah: '150.000', tanggal: '12-12-2024' },
//           { tipe: 'Pemasukan', jumlah: '150.000', tanggal: '12-12-2024' },
//           { tipe: 'Pemasukan', jumlah: '50.000', tanggal: '12-12-2024' },
//           { tipe: 'Pemasukan', jumlah: '200.000', tanggal: '12-12-2024' },
//         ].map((item, index) => (
//           <tr
//             key={index}
//             className="border-b hover:bg-gray-50 transition-colors"
//           >
//             <td className="px-6 py-4">{index + 1}</td>
//             <td className="px-6 py-4">{item.tipe}</td>
//             <td className="px-6 py-4">{item.jumlah}</td>
//             <td className="px-6 py-4">{item.tanggal}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>

//     </Layout>
//   )
// }

// export default Dashboard
