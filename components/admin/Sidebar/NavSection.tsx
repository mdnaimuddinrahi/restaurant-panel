
import { SectionLabel } from './SectionLabel';
import { NavRow } from './NavRow';
import { SidebarNavProps } from './SidebarInterface';

export default function NavSection({
    sections,
    collapsed,
    openKey,
    flyoutKey,
    accentColor,
    isItemActive,
    isRouteActive,
    onNavigate,
    setOpenKey,
    setFlyoutKey,
}: SidebarNavProps)  {
    return (
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-1.5 space-y-0.5">
            {sections.map((section) => (
                <div key={section.key} className="mb-1">
                    <SectionLabel 
                        collapsed={collapsed}>
                        {section.label}
                    </SectionLabel>
                    {section.items.map((item) => (
                        <NavRow
                            key={item.key}
                            item={item}
                            collapsed={collapsed}
                            active={isItemActive(item)}
                            open={openKey === item.key}
                            hoverOpen={flyoutKey === item.key}
                            accentColor={accentColor}
                            onHeaderClick={() => {
                                if (item.children) {
                                    if (collapsed) return; // collapsed: handled by hover flyout
                                    setOpenKey((k) => (k === item.key ? null : item.key));
                                } else {
                                    onNavigate(item.route);
                                }
                            }}
                            onMouseEnter={() => collapsed && setFlyoutKey(item.key)}
                            onMouseLeave={() => collapsed && setFlyoutKey(null)}
                            onChildClick={(route) => onNavigate(route)}
                            isRouteActive={isRouteActive}
                        />
                    ))}
                </div>
            ))}
        </nav>
    )
}
