import React from 'react';

import { LinkWrapper } from '../../components/Router'


interface NavItemProps {
  path: string;
}

const NavItem: React.FC<NavItemProps> = props => {
  return (
    <li className="nav-item" >
      <LinkWrapper 
        to={props.path}
        className="nav-link"
      >
        {props.children}
      </LinkWrapper>
    </li>
  );
}

export default NavItem;