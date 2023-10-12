import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import exampleImage from "./logokasir.png";
import classNames from "classnames";

const TABS_LINK = [
    {
        key: "pemesanan",
        label: "Pemesanan",
        path: "/",
    },
    //   {
    //     key: "riwayat",
    //     label: "Riwayat",
    //     path: "/riwayat",
    //   },
];

const linkClass = "inline-block px-4 py-4 rounded-lg hover:bg-green-600";

export default function TabsKasir() {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
        window.location.reload();
    };


    const namaUser = sessionStorage.getItem("nama_user");
    const role = sessionStorage.getItem("role");

    return (
        <div className="navbar">
            <div className="flex flex-wrap text-sm font-medium text-center">
                {TABS_LINK.map((item) => (
                    <TabsLink key={item.key} item={item} />
                ))}
                {/* <a href="#" className="logout" onClick={handleLogout}>
          Logout
        </a> */}
            </div>
            <div className="profile-info">
                <div className="inline-flex profile-info-inner">
                    {/* <img
                        src="https://randomuser.me/api/portraits/women/76.jpg"
                        className="rounded-full w-6 h-6 mt-2 mr-2 mx-auto transition duration-300 ease-in-out transform group-hover:border-2"
                        alt="Profile Image"
                    /> */}
                </div>
                <div className="mb-6 mr-4 relative group">
                    <img
                        src="https://img.freepik.com/free-vector/flat-illustration-customer-support_23-2148893327.jpg"
                        className="w-12 h-12 rounded-full cursor-pointer"
                        alt="Profile Image"
                    />
                    <div className="absolute hidden mt-2 py-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg group-hover:block right-0 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                        <div className="p-2">
                            <p className="text-gray-800 text-sm font-semibold">{namaUser}</p>
                            <p className="text-gray-600 text-xs">{role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TabsLink({ item }) {
    const { pathname } = useLocation();

    return (
        <Link
            to={item.path}
            className={classNames(
                pathname === item.path ? "inline-block mx-1 px-4 py-3 text-white bg-green-900 rounded-lg hover:bg-green-900" : "",
                linkClass
            )}
        >
            {item.label}
        </Link>
    );
}
