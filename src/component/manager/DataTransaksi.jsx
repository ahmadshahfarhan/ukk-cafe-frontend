import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function DataTransaksi() {
  const headers = {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  };
  const [transaksi, setTransaksi] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [searchEmployee, setSearchEmployee] = useState('');
  const [filteredTransaksi, setFilteredTransaksi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await axios.get("http://localhost:8000/transaksi/", { headers });
        const sortedData = response.data.data.sort((a, b) => b.id - a.id); //filter DATA paling ndukur
        setTransaksi(response.data.data);
        setFilteredTransaksi(response.data.data); // Inisialisasi filteredTransaksi dengan semua data
      } catch (err) {
        console.log(err);
      }
    };
    fetchDatas();
  }, []);

  const filterByDate = (date) => {
    setSelectedDate(date);

    const filteredData = transaksi.filter((t) => {
      const tgl_transaksi = new Date(t.tgl_transaksi);
      const isDateMatch = date ? tgl_transaksi.toDateString() === date.toDateString() : true;
      const isEmployeeMatch = searchEmployee ? t.user.nama_user.toLowerCase().includes(searchEmployee.toLowerCase()) : true;

      return isDateMatch && isEmployeeMatch;
    });

    setFilteredTransaksi(filteredData);
    setCurrentPage(1); // Kembalikan halaman aktif ke halaman pertama setelah filter
  };

  const filterByMonth = (date) => {
    setSelectedMonth(date);

    const filteredData = transaksi.filter((t) => {
      const tgl_transaksi = new Date(t.tgl_transaksi);
      const isMonthMatch = date ? tgl_transaksi.getMonth() === date.getMonth() && tgl_transaksi.getFullYear() === date.getFullYear() : true;

      return isMonthMatch;
    });

    setFilteredTransaksi(filteredData);
    setCurrentPage(1); // Kembalikan halaman aktif ke halaman pertama setelah filter
  };

  const filterByEmployee = (employeeName) => {
    setSearchEmployee(employeeName);

    const filteredData = transaksi.filter((t) => {
      const tgl_transaksi = new Date(t.tgl_transaksi);
      const isDateMatch = selectedDate ? tgl_transaksi.toDateString() === selectedDate.toDateString() : true;
      const isEmployeeMatch = employeeName ? t.user.nama_user.toLowerCase().includes(employeeName.toLowerCase()) : true;

      return isDateMatch && isEmployeeMatch;
    });

    setFilteredTransaksi(filteredData);
    setCurrentPage(1); // Kembalikan halaman aktif ke halaman pertama setelah filter
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransaksi.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    if (filteredTransaksi.length > itemsPerPage) {
      if (Math.ceil(filteredTransaksi.length / itemsPerPage) > 5) {
        return (
          <div className="inline-block">
            <div className="relative inline-flex">
              <button
                onClick={() => paginate(currentPage - 1)}
                className={`px-4 py-2 focus:outline-none ${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'text-gray-800 border-gray-300 hover:bg-gray-200'
                }`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={`px-4 py-2 focus:outline-none ${
                  currentPage === 1
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-800 border-gray-300 hover:bg-gray-200'
                }`}
                onClick={() => paginate(1)}
              >
                1
              </button>
              {currentPage > 3 && (
                <span className="px-4 py-2 text-gray-800">...</span>
              )}
              {Array.from({ length: Math.ceil(filteredTransaksi.length / itemsPerPage) }, (_, index) => (
                (index + 1 === 2 && currentPage <= 4) ||
                (index + 1 === currentPage) ||
                (index + 1 === Math.ceil(filteredTransaksi.length / itemsPerPage) && currentPage >= Math.ceil(filteredTransaksi.length / itemsPerPage) - 3) ||
                (index + 1 === Math.ceil(filteredTransaksi.length / itemsPerPage) - 1 && currentPage >= Math.ceil(filteredTransaksi.length / itemsPerPage) - 2) ||
                (index + 1 === Math.ceil(filteredTransaksi.length / itemsPerPage) - 2 && currentPage >= Math.ceil(filteredTransaksi.length / itemsPerPage) - 1) ||
                (index + 1 === 3 && currentPage <= 3)
                  ? (
                    <button
                      key={index}
                      className={`px-4 py-2 focus:outline-none ${
                        currentPage === index + 1
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-800 border-gray-300 hover:bg-gray-200'
                      }`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
                  : (
                    (index + 1 === 2 && currentPage > 4 && currentPage < Math.ceil(filteredTransaksi.length / itemsPerPage) - 3) ||
                    (index + 1 === Math.ceil(filteredTransaksi.length / itemsPerPage) - 1 && currentPage > 3 && currentPage < Math.ceil(filteredTransaksi.length / itemsPerPage) - 2) ||
                    (index + 1 === Math.ceil(filteredTransaksi.length / itemsPerPage) - 2 && currentPage > 3 && currentPage < Math.ceil(filteredTransaksi.length / itemsPerPage) - 1) ||
                    (index + 1 === 3 && currentPage > 3 && currentPage < Math.ceil(filteredTransaksi.length / itemsPerPage) - 3)
                      ? (
                        <button
                          key={index}
                          className={`px-4 py-2 focus:outline-none ${
                            currentPage === index + 1
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-800 border-gray-300 hover:bg-gray-200'
                          }`}
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </button>
                      )
                      : null
                  )
              ))}
              {currentPage < Math.ceil(filteredTransaksi.length / itemsPerPage) - 3 && (
                <span className="px-4 py-2 text-gray-800">...</span>
              )}
              {currentPage !== Math.ceil(filteredTransaksi.length / itemsPerPage) && (
                <button
                  className={`px-4 py-2 focus:outline-none ${
                    currentPage === Math.ceil(filteredTransaksi.length / itemsPerPage)
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-800 border-gray-300 hover:bg-gray-200'
                  }`}
                  onClick={() => paginate(Math.ceil(filteredTransaksi.length / itemsPerPage))}
                >
                  {Math.ceil(filteredTransaksi.length / itemsPerPage)}
                </button>
              )}
              <button
                onClick={() => paginate(currentPage + 1)}
                className={`px-4 py-2 focus:outline-none ${
                  currentPage === Math.ceil(filteredTransaksi.length / itemsPerPage)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'text-gray-800 border-gray-300 hover:bg-gray-200'
                }`}
                disabled={currentPage === Math.ceil(filteredTransaksi.length / itemsPerPage)}
              >
                Next
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="inline-block">
            <ul className="flex">
              {Array.from({ length: Math.ceil(filteredTransaksi.length / itemsPerPage) }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 focus:outline-none ${
                      currentPage === index + 1
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-800 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      }
    }
  };

  return (
    <div className="ml-40 mt-40">
      <div className="inline-flex">
        <div className="mt-5 mx-5 flex">
          <div className="flex p-2 bg-gray-100 rounded-md border shadow-sm">
            <span className="flex-none">Tgl. Transaksi :</span>
            <DatePicker
              className="pl-1 bg-gray-100"
              selected={selectedDate}
              onChange={(date) => filterByDate(date)}
            />
          </div>
        </div>

        <div className="mt-5 mx-5 flex">
          <div className="flex p-2 bg-gray-100 rounded-md border shadow-sm">
            <span className="flex-none">Cari Karyawan :</span>
            <input
              className="pl-1 bg-gray-100"
              type="text"
              value={searchEmployee}
              onChange={(e) => filterByEmployee(e.target.value)}
              placeholder="Nama Karyawan"
            />
          </div>
        </div>

        <div className="mt-5 mx-5 flex">
          <div className="flex p-2 bg-gray-100  rounded-md border shadow-sm">
            <span className="flex-none">Bulan Transaksi :</span>
            <DatePicker
              className="pl-1 bg-gray-100"
              selected={selectedMonth}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              onChange={(date) => filterByMonth(date)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-600">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-white">Nama Kasir</th>
              <th scope="col" className="px-6 py-4 font-medium text-white">Tanggal Transaksi</th>
              <th scope="col" className="px-6 py-4 font-medium text-white">Total Harga</th>
              <th scope="col" className="px-6 py-4 font-medium text-white">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100 bg-white">
            {currentItems.map((transaksi) => (
              <tr key={transaksi.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{transaksi.user.nama_user}</td>
                <td className="px-6 py-4">{new Date(transaksi.tgl_transaksi).toLocaleDateString()}</td>
                <td className="px-6 py-4">{transaksi.total}</td>
                <td className="px-6 py-4">
                  {transaksi.status === "belum_bayar" ? (
                    <div className="flex gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-400 px-2 py-1 text-xs font-semibold text-white">
                        Belum Lunas
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-400 px-2 py-1 text-xs font-semibold text-white">
                        Lunas
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderPagination()}
      </div>
    </div>
  );
}
