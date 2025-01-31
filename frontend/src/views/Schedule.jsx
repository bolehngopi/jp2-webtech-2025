import { useState } from 'react';
import { Api } from '../libs/Api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    department_id: "",
    doctor_id: "",
    date: "",
    start_time: "",
    end_time: ""
  });
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) {
      navigate('/login')
    }
  }, [auth, navigate]);

  const handleFetch = async (id) => {
    setLoading(true);

    try {
      const { data } = await Api.get(id ? `/api/v1/schedule/${id}` : '/api/v1/schedule');
      if (!id) {
        setEdit(false);
        setSchedules(data.schedules.data);
        console.log(data.schedules.data);
      } else {
        setEdit(true);
        setFormData({
          id: data.id,
          department_id: data.department_id,
          doctor_id: data.doctor_id,
          date: data.date,
          start_time: data.schedule_start,
          end_time: data.schedule_endd
        });
        console.log(data);
      }
    } catch (error) {
      console.log('Fetch error: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!edit) {
        const { message } = await Api.post('/api/v1/schedule', formData);
        alert(message);
      } else {
        const { message } = await Api.put(`/api/v1/schedule/${formData.id}`, formData);
        alert(message);
      }
      handleFetch();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  const handleDelete = async (id) => {
    try {
      await Api.delete(`/api/v1/schedule/${id}`);
      handleFetch();
    } catch (error) {
      console.log("Delete error: ", error);
    }
  }

  useEffect(() => {
    document.title = 'e-Doc - Schedules Center'

    handleFetch();
  }, []);

  return (
    <div className='container my-4'>
      <div className='row'>
        <div className='col-md-6 col-sm-12 col-xs-12'>
          <div className='card card-info'>
            <div className='card-header'>Input Doctor&apos;s Schedules</div>
            <div className='card-body'>
              <div className='form-body'>
                <form onSubmit={handleSubmit}>
                  <div className='form-group row mb-4'>
                    <label className='col-md-4 col-sm-12 col-xs-12'>
                      Doctor ID
                    </label>
                    <div className='col-md-8 col-sm-12 col-xs-12'>
                      <input className='form-control' onChange={handleChange} value={formData.doctor_id} name='doctor_id' />
                    </div>
                  </div>
                  <div className='form-group row mb-4'>
                    <label className='col-md-4 col-sm-12 col-xs-12'>
                      Department ID
                    </label>
                    <div className='col-md-8 col-sm-12 col-xs-12'>
                      <input className='form-control' onChange={handleChange} value={formData.department_id} name='department_id' />
                    </div>
                  </div>
                  <div className='form-group row mb-4'>
                    <label className='col-md-4 col-sm-12 col-xs-12'>Date</label>
                    <div className='col-md-8 col-sm-12 col-xs-12'>
                      <input className='form-control' type='date' onChange={handleChange} value={formData.date} name='date' />
                    </div>
                  </div>
                  <div className='form-group row mb-4'>
                    <label className='col-md-4 col-sm-12 col-xs-12'>
                      Start
                    </label>
                    <div className='col-md-8 col-sm-12 col-xs-12'>
                      <input className='form-control' onChange={handleChange} value={formData.start} name='start_time' type='time' />
                    </div>
                  </div>
                  <div className='form-group row mb-4'>
                    <label className='col-md-4 col-sm-12 col-xs-12'>End</label>
                    <div className='col-md-8 col-sm-12 col-xs-12'>
                      <input className='form-control' onChange={handleChange} value={formData.end} name='end_time' type='time' />
                    </div>
                  </div>
                  <div className='form-group row mb-4'>
                    <div className='col-md-12'>
                      <input
                        type='submit'
                        value='Save'
                        className='btn btn-primary'
                      />
                      <input
                        type='reset'
                        value='Reset'
                        className='btn btn-danger'
                      />
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
                  <th>No</th>
                  <th>Department</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Act</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ? (
                    <td>Loading...</td>
                  ) : (
                    schedules.length > 0 ? (
                      schedules?.map((schedule, index) => (
                        <tr key={index}>
                          <td>{schedule.id}</td>
                          <td>{schedule.department.department_name}</td>
                          <td>{schedule.doctor.name}</td>
                          <td>{new Date(schedule.schedule_date).toLocaleDateString()}</td>
                          <td>{schedule.schedule_start}</td>
                          <td>{schedule.schedule_end}</td>
                          <td>
                            <button className='btn btn-danger' onClick={() => handleDelete(schedule.id)}>Delete</button>
                            <button className='btn btn-secondary' onClick={() => handleFetch(schedule.id)}>Edit</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>No schedules for now...</tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
