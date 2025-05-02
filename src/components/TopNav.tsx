// components/TopNav.tsx
"use client";

import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { NavLink } from "react-router-dom";

export function TopNav() {
  return (
    <div className="border-b shadow sticky top-0 z-50 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">Pipeline Shop</h1>

        <Menubar className="bg-background">
          <MenubarMenu>
            <NavLink to="/" end>
              {({ isActive }) => (
                <MenubarTrigger
                  className={
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }
                >
                  Data
                </MenubarTrigger>
              )}
            </NavLink>
          </MenubarMenu>

          <MenubarMenu>
            <NavLink to="/charts">
              {({ isActive }) => (
                <MenubarTrigger
                  className={
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }
                >
                  Charts
                </MenubarTrigger>
              )}
            </NavLink>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}
