import { useState } from 'react';
import { Api } from '../../libs/Api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const Doctor = () => {
    const [doctors, setDoctor] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        doctor_id: "",
        name: "",
        gender: "",
        phone_number: "",
        email: "",
        bio: ""
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
            const { data } = await Api.get(id ? `/api/v1/doctor/${id}` : '/api/v1/doctor');
            if (!id) {
                setEdit(false);
                setDoctor(data.doctors.data);
                console.log(data.doctors.data);
            } else {
                setEdit(true);
                setFormData({
                    id: data.id,
                    doctor_id: data.doctor_id,
                    name: data.name,
                    gender: data.gender,
                    phone_number: data.phone_number,
                    email: data.email,
                    bio: data.bio
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
                const { message } = await Api.post('/api/v1/doctor', formData);
                alert(message);
            } else {
                const { message } = await Api.put(`/api/v1/doctor/${formData.id}`, formData);
                alert(message);
            }
            handleFetch();
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            await Api.delete(`/api/v1/doctor/${id}`);
            handleFetch();
        } catch (error) {
            console.log("Delete error: ", error);
        }
    }

    useEffect(() => {
        document.title = 'e-Doc - Doctors Center'

        handleFetch()
    }, [])

    return (
        <div className='container my-4'>
            <div className='row'>
                <div className='col-md-6 col-sm-12 col-xs-12'>
                    <div className='card card-info'>
                        <div className='card-header'>Input Doctor</div>
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
                                        <label className='col-md-4 col-sm-12 col-xs-12'>Name</label>
                                        <div className='col-md-8 col-sm-12 col-xs-12'>
                                            <input className='form-control' onChange={handleChange} value={formData.name} name='name' />
                                        </div>
                                    </div>
                                    <div className='form-group row mb-4'>
                                        <label className='col-md-4 col-sm-12 col-xs-12'>
                                            Gender
                                        </label>
                                        <div className='col-md-8 col-sm-12 col-xs-12'>
                                            <select className='form-control' onChange={handleChange} value={formData.gender} name='gender'>
                                                <option hidden>--Option--</option>
                                                <option value={'M'}>Male</option>
                                                <option value={'F'}>Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='form-group row mb-4'>
                                        <label className='col-md-4 col-sm-12 col-xs-12'>
                                            Phone
                                        </label>
                                        <div className='col-md-8 col-sm-12 col-xs-12'>
                                            <input className='form-control' onChange={handleChange} value={formData.phone_number} name='phone_number' />
                                        </div>
                                    </div>
                                    <div className='form-group row mb-4'>
                                        <label className='col-md-4 col-sm-12 col-xs-12'>
                                            Address
                                        </label>
                                        <div className='col-md-8 col-sm-12 col-xs-12'>
                                            <input className='form-control' onChange={handleChange} value={formData.address} name='address' />
                                        </div>
                                    </div>
                                    <div className='form-group row mb-4'>
                                        <label className='col-md-4 col-sm-12 col-xs-12'>
                                            Email
                                        </label>
                                        <div className='col-md-8 col-sm-12 col-xs-12'>
                                            <input className='form-control' onChange={handleChange} value={formData.email} name='email' />
                                        </div>
                                    </div>
                                    <div className='form-group row mb-4'>
                                        <label className='col-md-4 col-sm-12 col-xs-12'>Bio</label>
                                        <div className='col-md-8 col-sm-12 col-xs-12'>
                                            <textarea className='form-control' onChange={handleChange} value={formData.bio} name='bio'></textarea>
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
                                    <th>Gender</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Email</th>
                                    <th>Bio</th>
                                    <th>Act</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? (
                                        <td>Loading...</td>
                                    ) : (
                                        doctors.length > 0 ? (
                                            doctors?.map((doctor, index) => (
                                                <tr key={index}>
                                                    <td>{doctor.doctor_id}</td>
                                                    <td>{doctor.name}</td>
                                                    <td>{doctor.gender === 'M' ? 'Male' : "Female"}</td>
                                                    <td>{doctor.phone_number}</td>
                                                    <td>{doctor.address}</td>
                                                    <td>{doctor.email}</td>
                                                    <td>{doctor.bio || '--'}</td>
                                                    <td>
                                                        <button className='btn btn-danger' onClick={() => handleDelete(doctor.id)}>Delete</button>
                                                        <button className='btn btn-secondary' onClick={() => handleFetch(doctor.id)}>Edit</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>No doctors for now...</tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Doctor;
