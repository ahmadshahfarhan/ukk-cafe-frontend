import React from "react";
import { Outlet } from "react-router-dom"
import SidebarKasir from "./SidebarKasir"
import TabsKasir from "./TabsKasir";

export default function Layout() {
    return (
        <div className="flex h-screen">
            <TabsKasir />
            <div className="flex-1 flex flex-col overvlow-hidden">
                {/* <SidebarKasir /> */}
                <SidebarKasir />
                <Outlet />
            </div>
        </div>
    )
}