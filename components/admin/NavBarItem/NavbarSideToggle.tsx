"use client";

import AppCustomButton from "@/components/ui/button/AppCustomButton";
import { useSidebarCollapsed, toggleSidebarCollapsed } from "@/hooks/useSidebarCollapsed";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";

export default function NavbarSideToggle() {
  const sidebarCollapsed = useSidebarCollapsed();

  const handleClick = () => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      document.getElementById("sidebar")?.classList.toggle("mobile-open");
      return;
    }

    toggleSidebarCollapsed();
  };

  return (
    <AppCustomButton
      variant="ghost"
      onClick={handleClick}
      className="p-1.5! transition-transform duration-200 hover:scale-110"
    >
      <span className="transition-all duration-300 group-hover:scale-110">
        {sidebarCollapsed ? (
          <TbLayoutSidebarLeftExpand size={21} />
        ) : (
          <TbLayoutSidebarLeftCollapse size={21} />
        )}
      </span>
    </AppCustomButton>
  );
}
// "use client";

// import AppCustomButton from "@/components/ui/button/AppCustomButton";
// import { useState } from "react";
// import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
// import {
//   TbLayoutSidebarLeftCollapse,
//   TbLayoutSidebarLeftExpand,
// } from "react-icons/tb";

// export default function NavbarSideToggle() {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   const handleClick = () => {
//     const sidebar = document.getElementById("sidebar");
//     const main = document.getElementById("main-content");

//     const isMobile = window.innerWidth < 768;

//     if (isMobile) {
//       sidebar?.classList.toggle("mobile-open");
//       return;
//     }

//     setSidebarCollapsed((prev) => {
//       const next = !prev;

//       sidebar?.classList.toggle("collapsed", next);
//       main?.classList.toggle("expanded", next);

//       return next;
//     });
//   };

//   return (
//     <AppCustomButton
//         variant="ghost"
//         onClick={handleClick}
//         className="p-1.5! transition-transform duration-200 hover:scale-110"
//     >
//       <span className="transition-all duration-300 group-hover:scale-110">
//         {sidebarCollapsed ? (
//             <TbLayoutSidebarLeftExpand size={21} />
//         ) : (
//             <TbLayoutSidebarLeftCollapse size={21} />
//         )}
//       </span>
//     </AppCustomButton>
//   );
// }