import React from "react";
import { Outlet } from "react-router-dom"
import Sidebar from "./SidebarAdmin";
import "./admin.css";
import TabsKasir from "./TabsKasir"

export default function Layout() {
    return (
        <div className="adminbg">
            <TabsKasir/>
            <div className="flex-1 flex flex-col overvlow-hidden">
                <Sidebar/>
                <Outlet /> 
            </div>
        </div>


    )
}