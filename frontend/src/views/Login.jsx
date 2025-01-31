import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login, auth } = useContext(AuthContext);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'e-Doc - Login'

    if (auth) {
      navigate('/')
    }
  }, [auth, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData);
      alert('Success!');
    } catch (error) {
      console.log('error', error);
      setErrors(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container my-4'>
      <div className='row justify-content-center'>
        <div className='col-6'>
          <div className='card'>
            <div
              className='card-header text-center'
              style={{ backgroundColor: '#e3f2fd' }}>
              <h1>
                <i className='fa-solid fa-notes-medical fa-lg'></i> e-Doc
              </h1>
            </div>
            <form className='card-body' onSubmit={handleSubmit}>
              <h5 className='card-title mb-4'>Login Form</h5>
              {errors && <div className='alert alert-danger'>{errors}</div>}
              <div className='form-group mb-4'>
                <label htmlFor='inputUsername' className='sr-only'>
                  Username
                </label>
                <input
                  type='username'
                  id='inputUsername'
                  className='form-control'
                  placeholder='username'
                  name='username'
                  required
                  autoFocus
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-4'>
                <label htmlFor='inputPassword' className='sr-only'>
                  Password
                </label>
                <input
                  type='password'
                  id='inputPassword'
                  className='form-control'
                  placeholder='Password'
                  name='password'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='checkbox mb-4'>
                <label htmlFor='inputRemeber' className='sr-only'>
                  Remember me
                </label>
                <input
                  type='checkbox'
                  id='inputRemeber'
                  value='remember-me'
                // className='form-control'
                />
              </div>
              <div className='d-grid gap-2'>
                <button className='btn btn-xs btn-primary' type='submit'>
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
            <div className='card-footer text-body-secondary text-center'>
              Copyright &copy; 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
