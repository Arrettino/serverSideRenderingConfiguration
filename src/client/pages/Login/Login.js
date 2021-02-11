import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';

function Login({ login }) {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    login(data);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  };
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='username' value={data.username} onChange={handleChange} />
      <input type='password' name='password' value={data.password} onChange={handleChange} />
      <button type='submit'>Login</button>
    </form>
  );
}
const mapDispatchToProps = {
  login,
};

export default connect(null, mapDispatchToProps)(Login);
