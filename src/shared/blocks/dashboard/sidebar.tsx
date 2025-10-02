"use client";

import * as React from "react";

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter as SidebarFooterComponent,
} from "@/shared/components/ui/sidebar";
import { type Sidebar as SidebarType } from "@/shared/types/blocks/dashboard";
import { Nav } from "./nav";
import { SidebarUser } from "./sidebar-user";
import { SidebarHeader } from "./sidebar-header";
import { SidebarFooter } from "./sidebar-footer";

export function Sidebar({
  sidebar,
  ...props
}: React.ComponentProps<typeof SidebarComponent> & {
  sidebar: SidebarType;
}) {
  return (
    <SidebarComponent collapsible={sidebar.collapsible || "icon"} {...props}>
      {sidebar.header && <SidebarHeader header={sidebar.header} />}
      <SidebarContent>
        {sidebar.main_navs &&
          sidebar.main_navs.map((nav, idx) => <Nav key={idx} nav={nav} />)}
        {sidebar.bottom_nav && (
          <Nav nav={sidebar.bottom_nav} className="mt-auto" />
        )}
      </SidebarContent>
      <SidebarFooterComponent>
        {sidebar.user && <SidebarUser user={sidebar.user} />}
        {sidebar.footer && <SidebarFooter footer={sidebar.footer} />}
      </SidebarFooterComponent>
    </SidebarComponent>
  );
}
