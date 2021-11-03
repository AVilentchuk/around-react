import logo from "../assets/icons/Logo_vector.svg";

const Header = () => {
  return (
    <div>
      <header className='header'>
        <img className='header__logo' src={logo} alt="site's logo" />
      </header>
    </div>
  );
};

export default Header;
