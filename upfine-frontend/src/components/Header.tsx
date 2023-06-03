import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="logo">Logo</h1>
      <nav className="nav">
        <ul className="list">
          <li className="link">Página Inicial</li>
          <li className="link">Investimentos</li>
          <li className="link">Sobre</li>
          <li className="link">Contato</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
