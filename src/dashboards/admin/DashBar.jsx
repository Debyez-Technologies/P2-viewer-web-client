import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUIStore } from "../store/ui-store";

import { IoChevronForwardOutline, IoChevronDownOutline } from "react-icons/io5";

const Dashbar = () => {
  const navigate = useNavigate();
  const { selectedDashbtn, setSelectedDashbtn } = useUIStore();

  // Sidebar items (parent can have children)
  const sidebarButtons = [
    { id: "dashboard", text: "Dashboard", path: "/dashboard/maindashboard" },
    { id: "project", 
      text: "Project Management",
      children: [
        {id: "projects", text: "Manage Projects", path: "/dashboard/appdashboard"},
        {id: "project-users", text: "Assign Projects", path: "/dashboard/projectass"}
      ]
    },
    {
      id: "user-manage",
      text: "User management",
      children: [
        { id: "roles", text: "Manage roles", path: "/dashboard/roles" },
        { id: "users", text: "Manage users", path: "/dashboard/users" },
      ],
    },

    { id: "settings", text: "Settings", path: "/dashboard/settings" },
    { id: "help", text: "Help", path: "/dashboard/help" },
  ];

  const [openDropdowns, setOpenDropdowns] = useState({});

  // Helper: check if parent contains active child
  const isParentActive = (parent) =>
    parent.children?.some((c) => c.id === selectedDashbtn);

  // Auto-open dropdown if child is selected
  useEffect(() => {
    sidebarButtons.forEach((button) => {
      if (button.children && isParentActive(button)) {
        setOpenDropdowns((prev) => ({ ...prev, [button.id]: true }));
      }
    });
  }, [selectedDashbtn]);

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleButtonClick = (button) => {
    if (button.path) {
      setSelectedDashbtn(button.id);
      navigate(button.path);
    } else if (button.children) {
      toggleDropdown(button.id);
    }
  };

  return (
    <div className="h-screen min-w-[300px] max-w-[320px] border-r-2 border-gray-200">
      <div className="p-4">
        <div className="space-y-2">
          {sidebarButtons.map((button) => {
            const parentActive =
              selectedDashbtn === button.id || isParentActive(button);

            return (
              <div key={button.id}>
                {/* Parent button */}
                <button
                  onClick={() => handleButtonClick(button)}
                  className={`w-full px-4 py-3 flex items-center justify-between rounded-lg transition-colors duration-200
                    ${parentActive
                      ? "text-blue-600 border border-blue-500 bg-blue-50"
                      : "hover:text-blue-600 hover:border-blue-500"
                    }`}
                >
                  <span>{button.text}</span>
                  {button.children &&
                    (openDropdowns[button.id] ? (
                      <IoChevronDownOutline />
                    ) : (
                      <IoChevronForwardOutline />
                    ))}
                </button>

                {/* Dropdown children */}
                {button.children && openDropdowns[button.id] && (
                  <div className="ml-4 mt-1 space-y-1">
                    {button.children.map((child) => {
                      const isSelected = selectedDashbtn === child.id;
                      return (
                        <button
                          key={child.id}
                          onClick={() => handleButtonClick(child)}
                          className={`w-full px-3 py-2 text-left text-sm rounded-md transition-colors duration-150
                            ${isSelected
                              ? "text-blue-600 font-medium border border-blue-700 bg-blue-50"
                              : "hover:bg-gray-100 hover:text-blue-600"
                            }`}
                        >
                          {child.text}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashbar;
