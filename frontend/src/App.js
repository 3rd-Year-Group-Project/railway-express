import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import { theme } from './material.theme';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './contexts/authContext';
import { Route, Routes } from 'react-router-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import RequireAuth from './utils/RequireAuth';
import ManageDepartmentUsers from 'pages/admin/manageUsers/ManageDepartmentUsers';
import ManageCrewMembers from 'pages/admin/manageUsers/ManageCrewMembers';
import ManagePassengers from 'pages/admin/manageUsers/ManagePassengers';
import Statistics from 'pages/admin/Statistics';
import TrainLocation from 'pages/controlOfficer/TrainLocation';
import AddTurn from 'pages/controlOfficer/AddTurn';
import NormalTickets from 'pages/ticketingOfficer/NormalTickets';
import SeasonTickets from 'pages/ticketingOfficer/SeasonTickets';
import AddAccounts from 'pages/admin/AddAccounts';
import Tickets from 'pages/admin/Tickets';
import AddCrewMember from 'pages/admin/AddCrewMemers';
import ReserveSeatsSearchTurns from 'pages/ticketingOfficer/reserveSeats/ReserveSeatsSearchTurns';
import UserProfile from 'pages/UserProfile';
import AllocateCrewMembers from 'pages/controlOfficer/AllocateCrewMembers';
import SearchTurns from 'pages/controlOfficer/searchTurn/SearchTurns';
import TurnDetails from 'pages/controlOfficer/searchTurn/TurnDetails';
import ComplaintOrSuggestion from 'pages/controlOfficer/complaintsSuggestions/ComplaintOrSuggestionDetails';
import ProfileUser from 'pages/admin/manageUsers/ProfileUser';
import ProfileCrewMember from 'pages/admin/manageUsers/ProfileCrewMember';
import ComplaintsSuggestions from 'pages/controlOfficer/complaintsSuggestions/ComplaintsSuggestions';
import ReservableTurnDetails from 'pages/ticketingOfficer/reserveSeats/ReserveSeatsTurnDetails';
import ReserveSeats from 'pages/ticketingOfficer/reserveSeats/ReserveSeats';
import ReserveTicket from 'pages/ticketingOfficer/reserveSeats/ReservationTicket';
import Ticket from 'pages/ticketingOfficer/Ticket';
import PrintNormalTicket from 'pages/ticketingOfficer/PrintNormalTicket';
import SeasonTicket from 'pages/ticketingOfficer/SeasonTicket';
import PrintSeasonTicket from 'pages/ticketingOfficer/PrintSeasonTicket';

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <CssBaseline />
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route
                  path="/admin"
                  element={<RequireAuth authorizedUserRole="ADMIN" />}
                >
                  <Route path="stats" element={<Statistics />} />
                  <Route path="tickets" element={<Tickets />} />
                  <Route path="add-account" element={<AddAccounts />} />
                  <Route path="add-crew-members" element={<AddCrewMember />} />
                  <Route path="manage">
                    <Route
                      path="department-users"
                      element={<ManageDepartmentUsers />}
                    />
                    <Route path="department-users">
                      <Route path="profile/:id" element={<ProfileUser />} />
                    </Route>
                    <Route path="passengers" element={<ManagePassengers />} />
                    <Route path="passengers">
                      <Route path="profile/:id" element={<ProfileUser />} />
                    </Route>
                    <Route
                      path="crew-members"
                      element={<ManageCrewMembers />}
                    />
                    <Route path="crew-members">
                      <Route
                        path="profile/:id"
                        element={<ProfileCrewMember />}
                      />
                    </Route>
                  </Route>
                </Route>
                <Route
                  path="/control"
                  element={<RequireAuth authorizedUserRole="CONTROL_OFFICER" />}
                >
                  <Route path="train-location" element={<TrainLocation />} />
                  <Route path="add-turn" element={<AddTurn />} />
                  <Route
                    path="allocate-crew"
                    element={<AllocateCrewMembers />}
                  />
                  <Route path="search-turn" element={<SearchTurns />} />
                  <Route path="search-turn">
                    <Route
                      path="turn-details/:turnNumber"
                      element={<TurnDetails />}
                    />
                  </Route>
                  <Route
                    path="complaints-suggestions"
                    element={<ComplaintsSuggestions />}
                  />
                  <Route path="complaints-suggestions">
                    <Route
                      path="description/:id"
                      element={<ComplaintOrSuggestion />}
                    />
                  </Route>
                </Route>
                <Route
                  path="/ticketing"
                  element={
                    <RequireAuth authorizedUserRole="TICKETING_OFFICER" />
                  }
                >
                  <Route path="normal" element={<NormalTickets />} />
                  <Route path="season" element={<SeasonTickets />} />
                  <Route path="reserve" element={<ReserveSeatsSearchTurns />} />
                  <Route path="reserve">
                    <Route
                      path="schedule"
                      element={<ReservableTurnDetails />}
                    />
                    <Route path="schedule">
                      <Route
                        path="reservation/:turnNumber"
                        element={<ReserveSeats />}
                      />
                      <Route path="reservation/:turnNumber">
                        <Route path="ticket" element={<ReserveTicket />} />
                      </Route>
                    </Route>
                  </Route>

                  <Route
                    path="normal-ticket"
                    element={
                      <Ticket
                        startStation={undefined}
                        destinationStation={undefined}
                        ticketId={undefined}
                        createdAt={undefined}
                        price={undefined}
                        ticketClass={undefined}
                        returnStatus={undefined}
                      />
                    }
                  />
                  <Route path="print-ticket" element={<PrintNormalTicket />} />
                  <Route
                    path="season-ticket"
                    element={
                      <SeasonTicket
                        startStation={undefined}
                        destinationStation={undefined}
                        ticketId={undefined}
                        createdAt={undefined}
                        price={undefined}
                        ticketClass={undefined}
                        name={undefined}
                        validPeriod={undefined}
                      />
                    }
                  />
                  <Route
                    path="print-season-ticket"
                    element={<PrintSeasonTicket />}
                  />
                </Route>
              </Routes>
            </AuthProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
