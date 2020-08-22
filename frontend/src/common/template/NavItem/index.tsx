import React from 'react';

import { LinkWrapper } from '../../components/Router'


interface NavItemProps {
  path: string;
  title: string;
  handleSetTitle: (value: string) => void;
}

const NavItem: React.FC<NavItemProps> = props => {
  return (
    <li className="nav-item" >
      <LinkWrapper 
        to={props.path}
        className="nav-link"
        handleActiveLink={() => props.handleSetTitle(props.title)}
      >
        {props.children}
      </LinkWrapper>
    </li>
  );
}

export default NavItem;