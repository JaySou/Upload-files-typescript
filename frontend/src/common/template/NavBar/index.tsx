import React from 'react';


import NavItem from '../NavItem';


interface NavBarProps {
  handleSetTitle: (value: string) => void
}

const NavBar: React.FC<NavBarProps> = props => {
  return (

    <nav
      className='main-header navbar navbar-expand-md navbar-light navbar-white'
      style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
    >
      <div className="container">
        <div
          className="navbar-brand" >
          <span className="brand-text font-weight-light"> Upload Files </span>
        </div>


          <button
            className="navbar-toggler order-1"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse order-3" id="navbarCollapse">
            <ul className="navbar-nav">
                <NavItem path="/upload" title="Upload File" handleSetTitle={props.handleSetTitle}> Upload </NavItem>
                <NavItem path="/history" title="Upload History" handleSetTitle={props.handleSetTitle}> History </NavItem>
                <NavItem path="/file-data" title="Upload Data File" handleSetTitle={props.handleSetTitle}> File Data </NavItem>
            </ul>
          </div>
        </div>
    </nav>
  );
}

export default NavBar;
