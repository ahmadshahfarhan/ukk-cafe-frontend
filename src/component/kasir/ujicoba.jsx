<div class="bg">
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

    <div className="ml-40 overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-600">
            <tr>
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
                <td className="px-6 py-4">{transaksi.nama_pelanggan}</td>
                <td className="px-6 py-4">{transaksi.alamat}</td>
                <td className="px-6 py-4">
                  Meja nomor {transaksi.meja.nomor_meja}
                </td>
                <td className="px-6 py-4">{transaksi.total}</td>
                <td className="px-6 py-4">
                  {transaksi.status === "belum_bayar" ? (
                    <div className="flex gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
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
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
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