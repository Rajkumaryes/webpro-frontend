const Header = ({ onLogout }) => {
    return (
      <div style={{ background: '#003060', color: '#FFF', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Performance Dashboard</h1>
        <button
          onClick={onLogout}
          style={{
            background: '#EF6432',
            color: '#FFF',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    );
  };
  export default Header;