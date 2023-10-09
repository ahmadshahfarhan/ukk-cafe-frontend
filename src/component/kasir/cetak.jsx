// import React, { useRef } from "react";
// // import "./cetak.css";
// // import logoImage from "./logocetak.png";

// export default function Cetak({ data }) {
//   const printWindow = useRef(null);

//   const handleCetak = () => {
//     // Buka jendela cetak
//     const printWindowRef = window.open("", "", 'fullscreen=yes');
//     printWindowRef.document.open();

//     // Kode HTML untuk mencetak
//     const htmlContent = `
//       <html>
//         <head>
//           <style>
//             table {
//               width: 100%;
//               border-collapse: collapse;
//             }

//             table, th, td {
//               border: 1px solid black;
//             }

//             th, td {
//               padding: 8px;
//               text-align: left;
//             }

//             .print-content {
//               display: flex;
//               flex-direction: column;
//               align-items: center;
//               text-align: center;
//             }

//             .logo {
//               display: none;
//               width: 200px;
//               height: 200px;
//             }

//             h4, p {
//               margin: 2px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="print-content">
//             <h1>notaku</h1>

//             <table>
//               <tr>
//                 <th>Nama Pelanggan</th>
//                 <th>Alamat</th>
//                 <th>Nomor Meja</th>
//                 <th>Total Harga</th>
//                 <th>Status</th>
//               </tr>
//               <tr>
//                 <td>${data.nama_pelanggan}</td>
//                 <td>${data.alamat}</td>
//                 <td>${data.meja.nomor_meja}</td>
//                 <td>${data.total}</td>
//                 <td>${data.status}</td>
//               </tr>
//             </table>
//             <br>
//             <table>
//             <tr>
//               <th>Nama Pelanggan</th>
//               <th>Alamat</th>
//               <th>Nomor Meja</th>
//               <th>Total Harga</th>
//               <th>Status</th>
//             </tr>
//             <tr>
//               <td>${data.nama_pelanggan}</td>
//               <td>${data.alamat}</td>
//               <td>${data.meja.nomor_meja}</td>
//               <td>${data.total}</td>
//               <td>${data.status}</td>
//             </tr>
//           </table>
//             <br>
//             <br>
//             <h4>TERIMAKASIH SELAMAT DATANG KEMBALI</h4>
//             <p>=======================================</p>
//           </div>
//         </body>
//       </html>        
//     `;

//     // Menulis konten HTML ke jendela cetak
//     printWindowRef.document.write(htmlContent);
//     printWindowRef.document.close();

//     // Menampilkan gambar saat mencetak
//     // printWindowRef.document.querySelector(".logo").style.display = "block";

//     // Melakukan pencetakan
//     printWindowRef.print();
//     printWindowRef.close();
//   };

//   return (
//     <button
//       onClick={handleCetak}
//       className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
//     >
//       Cetak
//     </button>
//   );
// }

import React, { useRef } from "react";
import logoImage from "./logocetak.png";

export default function Cetak({ data }) {
  const printWindow = useRef(null);

  const handleCetak = () => {
    // Buka jendela cetak
    const printWindowRef = window.open("", "", "fullscreen=yes");
    printWindowRef.document.open();

    // Kode HTML untuk mencetak
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Courier New', monospace;
              padding: 10px;
            }

            .receipt {
              max-width: 300px;
              margin: 0 auto;
              padding: 10px;
              text-align: center;
            }

            .logo {
              width: 100px;
              height: 100px;
              margin-bottom: 10px;
            }

            table {
              width: 100%;
              margin-top: 10px;
              border-collapse: collapse;
            }

            th, td {
              padding: 8px;
              text-align: left;
            }

            h1 {
              margin: 0;
            }

            .footer {
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="receipt">
          <img src="${logoImage}" alt="Logo" class="logo" />

            <h1>cafe</h1>
            <table>
            <p>-------------------------------------------</p>
            <tr>
            <th>Nama Kasir</th>
            <td>: ${data.user.nama_user}</td>
          </tr>
            </table>
            <p>-------------------------------------------</p>
            <table>
              <tr>
                <th>Nama Pelanggan</th>
                <td>: ${data.nama_pelanggan}</td>
              </tr>
              <tr>
                <th>Alamat</th>
                <td>: ${data.alamat}</td>
              </tr>
              <tr>
                <th>Nomor Meja</th>
                <td>: ${data.meja.nomor_meja}</td>
              </tr>
              <tr>
                <th>Total Harga</th>
                <td>: ${data.total}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>: ${data.status}</td>
              </tr>
            </table>
            <p>----------------------------------------</p>
            <h4>TERIMAKASIH SELAMAT DATANG KEMBALI</h4>
            <p>================================</p>
            <div class="footer">Powered by cafe</div>
          </div>
        </body>
      </html>        
    `;

    // Menulis konten HTML ke jendela cetak
    printWindowRef.document.write(htmlContent);
    printWindowRef.document.close();

    // Melakukan pencetakan
    printWindowRef.print();
    printWindowRef.close();
  };

  return (
    <button
      onClick={handleCetak}
      className="inline-flex items-center gap-1 rounded-full bg-orange-400 px-2 py-1 text-xs font-semibold text-white"
    >
      Print
    </button>
  );
}