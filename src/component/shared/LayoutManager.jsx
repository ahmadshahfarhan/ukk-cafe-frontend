import React from "react";
import { Outlet } from "react-router-dom"
import Sidebar from "./SidebarManager";
import TabsKasir from "./TabsKasir";
import "./bgmanager.png";
import "./bgmanager.css";

export default function Layout() {
    return (
        <div class="manager">
            <TabsKasir />
            <div className="flex-1">
                <Sidebar />
                <Outlet />
            </div>
        </div>


    )
}