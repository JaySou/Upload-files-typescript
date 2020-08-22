import React from 'react';

export default function Footer() {
  return (
    <footer className="main-footer" style={{ fontSize: '0.8rem'}}>
      <div className="container">
        Copyright © {new Date().getFullYear()} | Upload Files.
      </div>
    </footer>
  );
}