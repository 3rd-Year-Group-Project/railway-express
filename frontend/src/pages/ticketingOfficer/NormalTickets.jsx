import TicketingOfficerLayout from '../../layout/TicketingOfficerLayout';
import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from '../../components/Button';
import TextField from '../../components/TextField';

import DropDown from 'components/normaltikets';
import request from 'utils/request';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

export default function NormalTickets() {
  return (
    <TicketingOfficerLayout>
      <h1>Normal-Tickets</h1>
      <form
        //onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-4 items-center"
      >
        <div className="w-full grid gap-4 grid-cols-7">
          <p className="col-start-1 col-end-3 pl-14">Starting Station</p>
          <DropDown
            className="col-start-3 col-end-6 rounded-2xl"
            id="start"
            name="start"
            //{...formik.getFieldProps('role')}
          />

          <p className="col-start-1 col-end-3 pl-14">Destination</p>
          <DropDown
            className="col-start-3 col-end-6 rounded-2xl"
            id="end"
            name="end"
            //{...formik.getFieldProps('role')}
          />

          <p className="col-start-1 col-end-3 pl-14">Class</p>
          <div className="col-start-3 col-end-6 min-w-max">
            <FormControl>
              <RadioGroup row name="class" defaultValue="SecondClass">
                <FormControlLabel
                  value="SecondClass"
                  control={<Radio />}
                  label="Second Class"
                />
                <FormControlLabel
                  value="ThirdClass"
                  control={<Radio />}
                  label="Third Class"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <p className="col-start-1 col-end-3 pl-14">Number Of Tickets</p>
          <TextField
            className="col-start-3 col-end-6"
            fullWidth
            id="num0ftickets"
            name="numoftickets"
            //{...formik.getFieldProps('nic')}
            //error={Boolean(formik.touched.nic && formik.errors.nic)}
            //helperText={formik.errors.nic}
          />

          <p className="col-start-1 col-end-3 pl-14">Price Per Tickets</p>
          <TextField
            className="col-start-3 col-end-6"
            fullWidth
            id="price"
            name="price"
            //{...formik.getFieldProps('nic')}
            //error={Boolean(formik.touched.nic && formik.errors.nic)}
            //helperText={formik.errors.nic}
          />

          <p className="col-start-1 col-end-3 pl-14">Total Price</p>
          <TextField
            className="col-start-3 col-end-6"
            fullWidth
            id="totalprice"
            name="totalprice"
            //{...formik.getFieldProps('nic')}
            //error={Boolean(formik.touched.nic && formik.errors.nic)}
            //helperText={formik.errors.nic}
          />

          {/* <p className="col-start-1 col-end-2">First Name</p>
                    <TextField
                      className="col-start-3 col-end-7"
                      fullWidth
                      id="firstName"
                      name="firstName"
                     // {...formik.getFieldProps('firstName')}
                      error={Boolean(
                        //formik.touched.firstName && formik.errors.firstName
                      )}
                     // helperText={formik.errors.firstName}
                    />
                    <p className="col-start-1 col-end-2">Last Name</p>
                    <TextField
                      className="col-start-3 col-end-7"
                      fullWidth
                      id="lastName"
                      name="lastName"
                      //{...formik.getFieldProps('lastName')}
                      error={Boolean(
                       // formik.touched.lastName && formik.errors.lastName
                      )}
                     // helperText={formik.errors.lastName}
                    />
                    <p className="col-start-1 col-end-2">NIC number</p>
                    <TextField
                      className="col-start-3 col-end-7"
                      fullWidth
                      id="nic"
                      name="nic"
                      //{...formik.getFieldProps('nic')}
                      //error={Boolean(formik.touched.nic && formik.errors.nic)}
                      //helperText={formik.errors.nic}
                    />
                    <p className="col-start-1 col-end-3">Phone Number</p>
                    <TextField
                      className="col-start-3 col-end-7"
                      fullWidth
                      id="phoneNumber"
                      name="phoneNumber"
                     // {...formik.getFieldProps('phoneNumber')}
                      error={Boolean(
                       // formik.touched.phoneNumber && formik.errors.phoneNumber
                      )}
                     // helperText={formik.errors.phoneNumber}
                    />
                    <p className="col-start-1 col-end-2">Address</p>
                    <TextField
                      className="col-start-3 col-end-7"
                      fullWidth
                      id="address"
                      name="address"
                      //{...formik.getFieldProps('address')}
                      error={Boolean(
                       // formik.touched.address && formik.errors.address
                      )}
                      //helperText={formik.errors.address}
                    />
                    <p className="col-start-1 col-end-2">Role</p>
                    <DropDown
                      className="col-start-3 col-end-7 rounded-2xl"
                      id="role"
                      name="role"
                      //{...formik.getFieldProps('role')}
                    />
                    <p className="col-start-1 col-end-2">Station</p>
                    <TextField
                      className="col-start-3 col-end-7"
                      fullWidth
                      id="stationId"
                      name="stationId"
                      //{...formik.getFieldProps('stationId')}
                      error={Boolean(
                        //formik.touched.stationId && formik.errors.stationId
                      )}
                      //helperText={formik.errors.stationId}
                    />
                    <p className="col-start-1 col-end-2">Email</p>
                    {/* <TextField
                      className="col-start-3 col-end-7"
                      fullWidth
                      id="email"
                      name="email"
                      type="email"
                      {...formik.getFieldProps('email')}
                     // error={Boolean(
                      //  formik.touched.email && formik.errors.email
                      )}
                      //helperText={formik.errors.email}
                      passwordField={false}
                    /> */}
        </div>
        <div className="flex gap-20 mt-5">
          <Button
            type="reset"
            isLoading={''}
            className="col-start-3 col-end-4 align-middle"
            variant="outlined"
          >
            Reset
          </Button>

          <Button
            type="submit"
            isLoading={''}
            className="col-start-5 col-end-6 align-middle"
          >
            Print Ticket
          </Button>
        </div>
        {/* <Button type="submit" isLoading={formik.isSubmitting}>
                    Create Account
                  </Button> */}
      </form>
    </TicketingOfficerLayout>
  );
}
