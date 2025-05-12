import "./Navbar.css";
const Navbar = ({ fetchNumbers }) => {
  return (
    <div>
      <nav className="navbar">
        <button onClick={() => fetchNumbers('p')}>Prime Numbers</button>
        <button onClick={() => fetchNumbers('f')}>Fibonacci Numbers</button>
        <button onClick={() => fetchNumbers('e')}>Even Numbers</button>
        <button onClick={() => fetchNumbers('r')}>Random Numbers</button>
    </nav>
    </div>
  );
};

export default Navbar;
