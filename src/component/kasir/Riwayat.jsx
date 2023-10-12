import React, { useEffect, useState } from "react";
import axios from "axios";
import "./riwayat.css";
import Cetak from "./cetak";

export default function Riwayat() {
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  };
  const [transaksi, setTransaksi] = useState([]);
  const [meja, setMeja] = useState([]);
  const [nomor_meja, setNomorMeja] = useState("");
  const [search, setValue] = useState("");
  const [namaPelangganFilter, setNamaPelangganFilter] = useState("");
  const [originalTransaksi, setOriginalTransaksi] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/transaksi/", {
          headers,
        });
        const sortedData = response.data.data.sort((a, b) => b.id - a.id);

        // Filter data transaksi berdasarkan nama pengguna yang login
        const filteredTransaksi = sortedData.filter((data) => {
          return data.user.nama_user === sessionStorage.getItem("nama_user");
        });

        setTransaksi(filteredTransaksi);
        setOriginalTransaksi(sortedData);

        const res = await axios.get("http://localhost:8000/meja/", { headers });
        console.log(res.data.data);
        setMeja(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    console.log(transaksi);
    setValue(e.target.value);

    if (e.target.value === "") {
      setTransaksi(originalTransaksi);
      return;
    }

    const dataFiltered = originalTransaksi.filter((data) => {
      return data.meja.nomor_meja === e.target.value;
    });
    setTransaksi(dataFiltered);
  };

  const handleNamaPelangganFilter = (nama) => {
    setNamaPelangganFilter(nama);

    if (nama === "") {
      setTransaksi(originalTransaksi);
      return;
    }

    const dataFiltered = originalTransaksi.filter((data) => {
      return data.nama_pelanggan.toLowerCase().includes(nama.toLowerCase());
    });
    setTransaksi(dataFiltered);
  };

  const handleShowAll = () => {
    setTransaksi(originalTransaksi);
    setValue("");
    setNamaPelangganFilter("");
  };

  const handleBayar = async (id) => {
    const selectedTransaksi = transaksi.find((select) => select.id === id);
    const selectedMeja = meja.find((select) => select.id === selectedTransaksi.meja.id);

    const updatedStatusTransaksi = {
      ...selectedTransaksi,
      status: "lunas",
    };
    const updatedStatusMeja = {
      ...selectedMeja,
      status: "tersedia",
    };

    try {
      await axios.put(
        "http://localhost:8000/transaksi/" + id,
        updatedStatusTransaksi,
        { headers }
      );
      await axios.put("http://localhost:8000/meja/" + selectedMeja.id, updatedStatusMeja, { headers });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleHapus = async (id) => {
    try {
      await axios.delete("http://localhost:8000/transaksi/" + id, {
        headers,
      });

      // Perbarui daftar transaksi setelah menghapus
      const updatedTransaksi = transaksi.filter((item) => item.id !== id);
      setTransaksi(updatedTransaksi);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          handleChange(e);
        }}
        name="search"
        placeholder="Search by nomor meja"
        className="ml-40 w-32 py-2 pl-10 ml-10 mt-5 text-sm rounded-md sm:w-auto focus:outline-none text-black bg-gray-200"
      />

      <input
        type="text"
        value={namaPelangganFilter}
        onChange={(e) => {
          handleNamaPelangganFilter(e.target.value);
        }}
        name="search"
        placeholder="Search by nama pelanggan"
        className="ml-5 w-32 py-2 pl-10 mt-5 text-sm rounded-md sm:w-auto focus:outline-none text-black bg-gray-200"
      />

      <div className="ml-40 overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-600">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-white">
                Nama Kasir
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-200">
                Nama Pelanggan
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-200">
                Alamat
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-200">
                Nomor Meja
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-200">
                Total Harga
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-200">
                Status
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-200">
                Cetak
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white border-t border-gray-100">
            {transaksi.map((transaksi) => (
              <tr key={transaksi.id_transaksi} className="hover:bg-gray-50">
                <td className="px-6 py-4"> 
                  {sessionStorage.getItem("nama_user") === "ivan" ? "Ivan" : transaksi.user.nama_user}
                </td>
                <td className="px-6 py-4">{transaksi.nama_pelanggan}</td>
                <td className="px-6 py-4">{transaksi.alamat}</td>
                <td className="px-6 py-4">
                  Meja nomor {transaksi.meja.nomor_meja}
                </td>
                <td className="px-6 py-4">{transaksi.total}</td>
                <td className="px-6 py-4">
                  {transaksi.status === "belum_bayar" ? (
                    <div className="flex gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-400 px-2 py-1 text-xs font-semibold text-white">
                        Belum Lunas
                      </span>
                      <button
                        onClick={() => handleBayar(transaksi.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-rose-600"
                      >
                        Bayar
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-400 px-2 py-1 text-xs font-semibold text-white">
                        Lunas
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {transaksi.status === "lunas" && <Cetak data={transaksi} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
