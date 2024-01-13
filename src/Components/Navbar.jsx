import Sidebar, { SidebarItem } from "./Sidebar";
import Mainpage from "../Pages/mainPage";

import {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react";

function Navbar() {
  return (
    <>
      <Sidebar>
        <SidebarItem icon={<LayoutDashboard side={20} />} text="Dashboard" />
        <SidebarItem icon={<BarChart3 side={20} />} text="Statistics" alent />
        <SidebarItem icon={<UserCircle side={20} />} text="Users" />
        <SidebarItem icon={<Boxes side={20} />} text="Inventory" />
        <SidebarItem icon={<Package side={20} />} text="Orders" alent />
        <SidebarItem icon={<Receipt side={20} />} text="Products" />
        <SidebarItem icon={<LifeBuoy side={20} />} text="Help" />
        <SidebarItem icon={<Settings side={20} />} text="Settings" />
      </Sidebar>
    </>
  );
}

export default Navbar;
