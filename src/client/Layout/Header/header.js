import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './header.css';
import { logout } from '../../actions';

function Header({ user, logout }) {
  const handleOnClick = () => {
    logout();
  };
  return (
    <div className='header-container'>
      <Link to='/' className='header-text'>Home</Link>
      {!user ?
        (
          <Link to='/login' className='header-text'>Login</Link>

        ) :
        (
          <>
            <p className='header-text'>{user.username}</p>
            <p className='header-text' style={{ color: 'white', cursor: 'pointer' }} onClick={handleOnClick}>Logout</p>
          </>
        )}
    </div>
  );
}

function mapStateToProps(state) {
  return ({
    user: state.user,
  });
}

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
