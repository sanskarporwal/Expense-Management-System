import React, {useState,useEffect} from "react";
import {Form, Input, Modal, Select, Table, message, DatePicker} from  'antd';
import {UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined} from  '@ant-design/icons';
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import moment from "moment";
import Spinner from "../components/Layout/Spinner";
import Analytics from "../components/Layout/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const initialDate = moment('2024-04-16T00:00:00.000+00:00');
  const finalDate = moment('2024-04-17T00:00:00.000+00:00');
  const [showModal,setShowModal] = useState(false);
  const [loading,setloading] = useState(false);
  const [allTransaction,setAllTransaction] = useState([])
  const [frequency,setFrequency] = useState('7')
  const [selectedDate,setSelectedDate] = useState([initialDate,finalDate])
  const [type,setType] = useState('all')
  const [viewData,setViewData] = useState('table')
  const [editable,setEditable] = useState(null)


  //table data
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render : (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditable(record)
            setShowModal(true)
          }}/>
          <DeleteOutlined 
          className="mx-2" 
          onClick={() => {
            handleDelete(record);
          }} />
        </div>
      )
    }
  ]


  //useEffect Hook
  useEffect(() => {
    console.log("ngngcgvhg");
    const getAllTransaction = async () => {
      console.log("Seleted Date",selectedDate);
      try {
          console.log("hfhghgdhgc");
          const user = JSON.parse(localStorage.getItem('user'));
          setloading(true);
          const res = await axios.post('/transactions/get-transaction', {userid: user._id, frequency, selectedDate, type});
          console.log("asjdksdskdcksjd");
          setloading(false);
          setAllTransaction(res.data)
          console.log(allTransaction);
          console.log(res.data)
      } catch (error) {
        console.log("sdkjskdjnsdc");
        console.log(error);
        message.error('Fetch Issue With Transaction')
      }
    };
    getAllTransaction()
  }, [frequency, selectedDate, type])

  // delete handler
  const handleDelete = async (record) => {
    try {
      setloading(true)
      await axios.post('/transactions/delete-transaction', {transactionId:record._id});
      setloading(false)
      message.success('Transaction Deleted')
    } catch (error) {
      setloading(false);
      console.log(error);
      message.error('unable to delete')
    }
  }

  //form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setloading(true)
      if(editable) {
        await axios.post('/transactions/edit-transaction',
         { payload: {
           ...values,
           userId:user._id
        },
        transactionId : editable._id,
      })
      setloading(false)
      message.success('Transactions Updated successfully')

      }else {
        await axios.post('/transactions/add-transaction', {...values, userid:user._id})
      setloading(false)
      message.success('Transactions added successfully')
      }
      setShowModal(false)
      setEditable(null)
    } catch (error) {
      setloading(false)
      message.error('Failed to add transacation')
    }
  }

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values) }>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 Year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency === 'custom' && (
            <RangePicker 
              value={selectedDate} 
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values) }>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
          {frequency === 'custom' && (
            <RangePicker 
              value={selectedDate} 
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div className="switch-icons">
            <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')}/>
            <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')}/>
        </div>
        <div>
          <button 
          className="btn btn-primary" 
          onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === 'table' ? (
        <Table columns={columns} dataSource={allTransaction} />
        ) 
        : <Analytics allTransaction={allTransaction} />
        }

      </div>
      <Modal 
      title={editable ? 'Edit Transaction' : 'Add Transaction'}
      open={showModal} 
      onCancel={() => setShowModal(false)} 
      footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="Income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fees">Fees</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />        
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />        
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />        
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="Submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
