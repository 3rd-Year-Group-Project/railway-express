import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layout/AdminLayout';

import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { Close } from '@mui/icons-material';
import {
  Collapse,
  Alert,
  IconButton,
  MenuItem,
  Select,
  Autocomplete,
} from '@mui/material';
import request from 'utils/request';

export default function AddAccounts() {
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);
  const [role, setRole] = useState('');
  const [stations, setStations] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const res = await request('get', '/public/stations');
        const stationList = res.data;
        setStations(stationList);
      } catch (e) {
        if (e?.response?.status === 500) {
          console.error('Fetching Error: ', e);
        } else {
          console.log(e?.response?.data);
          setStations(e?.response?.data?.errors[0]);
        }
      }
    })();
  }, []);

  const [selectedStation, setSelectedStation] = useState();
  const handleChange = (event, stationName) => {
    setSelectedStation(stationName);
  };

  const phoneRegExp = /\+[0-9]{1,4}-[0-9]{9}/;
  const regValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, ({ min }) => `First name must be at least ${min} characters`)
      .required('First name is required'),
    lastName: Yup.string()
      .min(3, ({ min }) => `Last name must be at least ${min} characters`)
      .required('Last name is required'),
    nic: Yup.string()
      .min(10, ({ min }) => `NIC number must be at least ${min} characters`)
      .required('NIC number is required'),
    address: Yup.string().min(
      10,
      ({ min }) => `Address must be at least ${min} characters`
    ),
    role: Yup.string().required('Role is required'),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Phone number format: +{country code}-{number}')
      .required('Phone number is required'),
    email: Yup.string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
  });

  async function handleSubmit(values, { setSubmitting, resetForm }) {
    // @ts-ignore
    const submitValues = {
      ...values,
      role: undefined,
      // @ts-ignore
      stationId: selectedStation?.stationId,
    };
    setRegError('');
    setRegSuccess(false);
    try {
      await request('post', `/admin/user/${values.role}`, submitValues);
      setRegSuccess(true);
      resetForm();
    } catch (e) {
      if (e?.response?.status === 500) {
        setRegError('Error creating user');
        console.error('Creation Error: ', e);
      } else {
        console.log(e?.response?.data);
        setRegError(e?.response?.data?.errors[0]);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminLayout>
      <h1 className="">Add users</h1>
      {/* <div className="min-h-screen w-full bg-slate-700 flex justify-center items-center"> */}
      <div className="bg-slate-100 rounded-3xl p-8">
        <div>
          <div className="mb-4">
            <Collapse in={Boolean(regError)}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setRegError(null);
                    }}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
              >
                {regError}
              </Alert>
            </Collapse>

            <Collapse in={Boolean(regSuccess)}>
              <Alert
                severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setRegSuccess(null);
                    }}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
              >
                Accout created successfully.
              </Alert>
            </Collapse>
          </div>
          <Formik
            validationSchema={regValidationSchema}
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              nic: '',
              phoneNumber: '',
              address: '',
              stationId: '',
              role: '',
            }}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <>
                <form
                  onSubmit={formik.handleSubmit}
                  className="w-full flex flex-col gap-4 items-center"
                >
                  <div className="w-full grid gap-4 grid-cols-7">
                    <p className="col-start-1 col-end-2">First Name</p>
                    <TextField
                      className="col-start-3 col-end-7"
                      fullWidth
                      id="firstName"
                      name="firstName"
                      {...formik.getFieldProps('firstName')}
                      error={Boolean(
                        formik.touched.firstName && formik.errors.firstName
                      )}
                      helperText={formik.errors.firstName}
                    />
                    <p className="col-start-1 col-end-2">Last Name</p>
                    <TextField
                      className="col-start-3 col-end-7"
                      fullWidth
                      id="lastName"
                      name="lastName"
                      {...formik.getFieldProps('lastName')}
                      error={Boolean(
                        formik.touched.lastName && formik.errors.lastName
                      )}
                      helperText={formik.errors.lastName}
                    />
                    <p className="col-start-1 col-end-2">NIC number</p>
                    <TextField
                      className="col-start-3 col-end-7"
                      fullWidth
                      id="nic"
                      name="nic"
                      {...formik.getFieldProps('nic')}
                      error={Boolean(formik.touched.nic && formik.errors.nic)}
                      helperText={formik.errors.nic}
                    />
                    <p className="col-start-1 col-end-3">Phone Number</p>
                    <TextField
                      className="col-start-3 col-end-7"
                      fullWidth
                      id="phoneNumber"
                      name="phoneNumber"
                      {...formik.getFieldProps('phoneNumber')}
                      error={Boolean(
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                      )}
                      helperText={formik.errors.phoneNumber}
                    />
                    <p className="col-start-1 col-end-2">Email</p>
                    <TextField
                      className="col-start-3 col-end-7"
                      fullWidth
                      id="email"
                      name="email"
                      type="email"
                      {...formik.getFieldProps('email')}
                      error={Boolean(
                        formik.touched.email && formik.errors.email
                      )}
                      helperText={formik.errors.email}
                      passwordField={false}
                    />
                    <p className="col-start-1 col-end-2">Address</p>
                    <TextField
                      className="col-start-3 col-end-7"
                      fullWidth
                      id="address"
                      name="address"
                      {...formik.getFieldProps('address')}
                      error={Boolean(
                        formik.touched.address && formik.errors.address
                      )}
                      helperText={formik.errors.address}
                    />
                    <p className="col-start-1 col-end-2">Role</p>
                    <Select
                      labelId="select"
                      className="col-start-3 col-end-7 rounded-2xl"
                      id="role"
                      name="role"
                      value={role}
                      onChange={(event) => setRole(event.target.value)}
                      {...formik.getFieldProps('role')}
                    >
                      <MenuItem value="CONTROL_OFFICER">
                        Control Officer
                      </MenuItem>
                      <MenuItem value="TICKETING_OFFICER">
                        Ticketing Officer
                      </MenuItem>
                      <MenuItem value="TICKET_CHECKER">Ticket Checker</MenuItem>
                    </Select>
                    <p className="col-start-1 col-end-2">Station</p>
                    <Autocomplete
                      disablePortal
                      id="station"
                      getOptionLabel={(stations) => `${stations.name}`}
                      options={stations}
                      value={selectedStation}
                      isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                      }
                      noOptionsText={'No Available Stations'}
                      onChange={handleChange}
                      classes={{
                        root: 'col-start-3 col-end-7',
                        inputRoot: 'rounded-2xl',
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select a station" />
                      )}
                    />
                  </div>
                  <Button type="submit" isLoading={formik.isSubmitting}>
                    Create Account
                  </Button>
                </form>
              </>
            )}
          </Formik>
        </div>
      </div>
      {/* </div> */}
    </AdminLayout>
  );
}
