import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Menu() {
    const headers = {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    };

    const [user, setUser] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [pickId, setPickId] = useState("")

    //mengambil data
    useEffect(() => {
        const fecthAllUser = async () => {
            try {
                const res = await axios.get("http://localhost:8000/user/", { headers })
                // console.log(res)
                setUser(res.data.data)
                console.log(res.data.data)
            } catch (err) {
                console.log(err)
            }
        }
        fecthAllUser()
    }, [])

    //mengambil id yang akan di delete
    const selectId = (id) => {
        setPickId(id)
        setShowModal(true)
    }

    //menghapus id
    const deleteId = async () => {
        try {
            await axios.delete("http://localhost:8000/user/" + pickId, { headers })
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (

        <div>
            <link
                href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
                rel="stylesheet"></link>
            <div className="ml-60 my-8 mx-16">
                <div>
                    <a href="add_user">
                        <button type="button" className="mt-20 mb-1 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-green-700 hover:bg-green-800 focus:ring-green-900">
                            Tambahkan User
                        </button>
                    </a>
                    {/* <a href="add_user">
                        <button type="button" className="mb-1 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-green-700 hover:bg-green-800 focus:ring-green-900">
                            Tambahkan User
                        </button>
                    </a> */}
                </div>
                <div className="flex flex-wrap gap-5 ">
                    <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-black-500">
                            <thead className="text-xs text-white uppercase bg-gray-600">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Nama User
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Username
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {user && user.map((user, index) => (
                                    <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 text-center">{user.nama_user}</td>
                                        <td className="px-6 py-4 text-center">{user.username}</td>
                                        <td className="px-6 py-4 text-center">{user.role}</td>
                                        <td className="pl-6 py-4 text-right inline-flex space-x-10">
                                            {/* <a href={`edit_user/${user.id}`} className="font-medium text-blue-600 hover:underline">
                                                Edit
                                            </a> */}
                                            {/* <a href={`edit_user/${user.id}`} class="text-gray-400 hover:text-green-400  mx-2">
                                                <i class="material-icons-outlined text-base">edit</i>
                                            </a> */}

                                            <a href={`edit_user/${user.id}`}>
                                                <svg className="h-8 w-8 text-green-500 hover:text-green-700" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                                            </a>

                                            {/* <button onClick={() => selectId(user.id)} className="mx-4 font-medium text-red-600 hover:underline">  Delete</button> */}
                                            {/* <a onClick={() => selectId(user.id)} class="text-gray-400 hover:text-red-400 mx-8">
                                                <i class="material-icons-round text-base">delete_outline</i>
                                            </a> */}
                                            <a onClick={() => selectId(user.id)}>
                                                <svg className=" h-8 w-8 text-red-500 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"  >
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* modal delete */}
            {showModal ? (
                <div>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="relative rounded-lg shadow bg-gray-700">
                                    <button onClick={() => setShowModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white" data-modal-hide="popup-modal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="p-6 text-center">
                                        <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-400">Apakah anda yakin ingin menghapus user ini?</h3>
                                        <button onClick={deleteId} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                            Delete
                                        </button>
                                        <button onClick={() => setShowModal(false)} data-modal-hide="popup-modal" type="button" className="focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}
        </div>

    )
}