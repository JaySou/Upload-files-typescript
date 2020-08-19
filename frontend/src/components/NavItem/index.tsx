import React from 'react';

interface NavItemProps {
  label: string;
  handleClick: () => any;
}


const NavItem: React.FC<NavItemProps> = props => {
  return (
    <li className="nav-item ml-3 mr-3">
      <button
        type="button"
        className="btn btn-link btn-outline-light"
        onClick={props.handleClick}
      >
        {props.label}
      </button>
    </li>
  );
}

export default NavItem