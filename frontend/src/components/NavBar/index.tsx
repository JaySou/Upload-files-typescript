import React from 'react';

interface NavBarProps {
  logo?: string;
}

const NavBar: React.FC<NavBarProps> = props => {
  return (
    <div className="container-flex fixed-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-4">
        <img src={props.logo} alt="" style={{ width: 50, height: 50 }} />
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            {
              props.children
            }
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;