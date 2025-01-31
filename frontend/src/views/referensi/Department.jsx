import { useState } from 'react';
import { Api } from '../../libs/Api';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';

const Department = () => {
  const [departments, setDepartments] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    department_id: "",
    department_name: "",
    department_description: "",
  });
  const [edit, setEdit] = useState(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/login')
    }
  }, [auth, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFetch = async (id) => {
    setLoading(true);

    try {
      const { data } = await Api.get(id ? `/api/v1/department/${id}` : '/api/v1/department');
      if (!id) {
        setEdit(false);
        setDepartments(data.departments.data);
        console.log(data.departments.data);
      } else {
        setEdit(true);
        setFormData(...data);
        console.log(data);
      }
    } catch (error) {
      console.log('Fetch error: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!edit) {
        const { message } = await Api.post('/api/v1/department', formData);
        alert(message);
      } else {
        const { message } = await Api.put(`/api/v1/department/${formData.id}`, formData);
        alert(message);
      }
      handleFetch();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  const handleDelete = async (id) => {
    try {
      await Api.delete(`/api/v1/department/${id}`);
      handleFetch();
    } catch (error) {
      console.log("Delete error: ", error);
    }
  }

  useEffect(() => {
    document.title = 'e-Doc - Departments Center'

    handleFetch()
  }, [])

  return (
    <>
      <div className='container my-4'>
        <div className='row'>
          <div className='col-md-6 col-sm-12 col-xs-12'>
            <div className='card card-info'>
              <div className='card-header'>Input Department</div>
              <div className='card-body'>
                <div className='form-body'>
                  <form onSubmit={handleSubmit}>
                    <div className='form-group row mb-4'>
                      <label className='col-md-4 col-sm-12 col-xs-12'>
                        Department ID
                      </label>
                      <div className='col-md-8 col-sm-12 col-xs-12'>
                        <input className='form-control' onChange={handleChange} value={formData.department_id} name='department_id' />
                      </div>
                    </div>
                    <div className='form-group row mb-4'>
                      <label className='col-md-4 col-sm-12 col-xs-12'>
                        Department Name
                      </label>
                      <div className='col-md-8 col-sm-12 col-xs-12'>
                        <input className='form-control' onChange={handleChange} value={formData.department_name} name='department_name' />
                      </div>
                    </div>
                    <div className='form-group row mb-4'>
                      <label className='col-md-4 col-sm-12 col-xs-12'>
                        Description
                      </label>
                      <div className='col-md-8 col-sm-12 col-xs-12'>
                        <textarea className='form-control' onChange={handleChange} value={formData.department_description} name='department_description'></textarea>
                      </div>
                    </div>
                    <div className='form-group row mb-4'>
                      <div className='col-md-12'>
                        <button
                          type='submit'
                          className='btn btn-primary'
                        >
                          {edit ? 'Save' : "Create"}
                        </button>
                        <button
                          type='reset'
                          className='btn btn-danger'
                          onClick={() => {
                            setFormData([]);
                            setEdit(false);
                          }}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='my-4'>
          <div className='card card-default'>
            <div className='card-header'>Data</div>
            <div className='card-body'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Act</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    loading ? (
                      <td>Loading...</td>
                    ) : (
                      departments?.length > 0 ? (
                        departments.map((department, index) => (
                          <tr key={index}>
                            <td>{department.department_id}</td>
                            <td>{department.department_name}</td>
                            <td>
                              <button className='btn btn-danger' onClick={() => handleDelete(department.id)}>Delete</button>
                              <button className='btn btn-secondary' onClick={() => handleFetch(department.id)}>Edit</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>No departments for now...</tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Department;
