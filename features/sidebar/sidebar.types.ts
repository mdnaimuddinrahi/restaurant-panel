import { Dispatch, ReactNode, SetStateAction } from "react";

export type NavChild = { key: string; label: string; route: string };

export type NavItem = {
  key: string;
  label: string;
  route: string;
  icon: ReactNode;
  badge?: string | number;
  children?: NavChild[];
};
export type NavSection = { key: string; label: string; items: NavItem[] };

export type SidebarProps = {
  item: NavItem;
  collapsed: boolean;
  active: boolean;
  open: boolean;
  hoverOpen: boolean;
  accentColor: string;
  onHeaderClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onChildClick: (route: string) => void;
  isRouteActive: (route: string) => boolean;
}

export type SubmenuLinkProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  flyout?: boolean;
  accentColor?: string;
}


export interface SidebarNavProps {
    sections: NavSection[];
    collapsed: boolean;
    openKey: string | null;
    flyoutKey: string | null;
    accentColor: string;

    isItemActive: (item: NavItem) => boolean;
    isRouteActive: (route: string) => boolean;
    onNavigate: (route: string) => void;
    // setOpenKey: (key: string) => void;
    setOpenKey: Dispatch<SetStateAction<string | null>>;
    setFlyoutKey: Dispatch<SetStateAction<string | null>>;
}