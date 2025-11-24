import React from "react";



const SidebarItem = ({ title, children, icon }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <li className={open ? "mm-active" : ""}>
      <a
        href="#"
        className="has-arrow ai-icon"
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        {icon}
        <span className="nav-text">{title}</span>
      </a>
      <ul className={`mm-collapse ${open ? "mm-show" : ""}`}>{children}</ul>
    </li>
  );
};


export default SidebarItem