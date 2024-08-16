import React,{useState, useEffect} from 'react';
import {Form, Input, message} from 'antd'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Layout/Spinner';

const Register = () => {
const navigate = useNavigate()
const [loading,setloading] = useState(false)


  //from submit
  const submitHandler = async (values) => {
    try {
      setloading(true)
      await axios.post('/users/register', values);
      message.success('Registration Successfull');
      setloading(false)
      navigate('/login');

    } catch (error) {
      setloading(false)
      message.error('something went wrong');

    }

  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
    <div className="register-page">
      {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Register</h1>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Eamil" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/login">Already Register ? Click Here to Login</Link>
            <button className="btn btn-primary">Register</button>
          </div>
        </Form>
    </div>
    </>
  )
}

export default Register;
