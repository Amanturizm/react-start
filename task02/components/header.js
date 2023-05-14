class Header extends React.Component {
  render() {
    return (
      <header>
        <img className="header__logo" src="https://i.imgur.com/k20NCYk.png"/>
        <nav className="header__nav">
          <a href="#" className="header__nav__a">Home</a>
          <a href="#" className="header__nav__a">Services</a>
          <a href="#" className="header__nav__a">Portfolio</a>
          <a href="#" className="header__nav__a">Documentation</a>
        </nav>
      </header>
    );
  }
}