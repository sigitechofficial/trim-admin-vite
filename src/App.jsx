import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react';
import Login from './pages/auth/Login';
import UpcomingBookings from './pages/bookings/UpcomingBookings';
import BookingDetails from './pages/bookings/BookingDetails';
import Customers from './pages/customer/Customers';
import CustomerDetails from './pages/customer/CustomerDetails';
import Salons from './pages/salons/Salons';
import SalonDetails from './pages/salons/SalonDetails';
import Services from './pages/services/Services';
import EmployeeManagement from './pages/employee/EmployeeManagement';
import EarningManagement from './pages/earnings/EarningManagement';
import RoleManagement from './pages/roles/RoleManagement';
import Coupons from './pages/coupons/Coupons';
import Subscription from './pages/subscription/Subscription';
import Notifications from './pages/notifications/Notifications';
import SendNotifications from './pages/notifications/SendNotifications';
import SubscriptionPlans from './pages/subscription/SubscriptionPlans';
import HelpAndSupport from './pages/help/HelpAndSupport';
import Reports from './pages/reports/Reports';
import CouponDetails from './pages/coupons/CouponDetails';
import Home from './pages/home/Home';
import AdminEarnings from './pages/admin/AdminEarnings';
import CompletedBookings from './pages/bookings/CompletedBookings';
import CancelledBookings from './pages/bookings/CancelledBookings';
import SalonEmployeeDetails from './pages/salons/SalonEmployeeDetails';
import { ToastContainer } from 'react-toastify';
import OffPeakTimeReport from './pages/reports/OffPeakTimeReport';
import ClientFileReport from './pages/reports/ClientFileReport';
import SubscriptionReport from './pages/reports/SubscriptionReport';
import FinancialPeroformanceReport from './pages/reports/FinancialPeroformanceReport';
import AppointmentReport from './pages/reports/AppointmentReport';
import AllBookings from './pages/bookings/AllBookings';

function App() {
  return (
    <>
      <ToastContainer />
      <ChakraProvider>
        <Router>
          <Routes>
            <Route exact path="/sign-in" element={<Login />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/admin-earnings" element={<AdminEarnings />} />
            <Route exact path="/all-bookings" element={<AllBookings />} />
            <Route exact path="/noshow-bookings" element={<UpcomingBookings />} />
            <Route exact path="/completed-bookings" element={<CompletedBookings />} />
            <Route exact path="/cancelled-bookings" element={<CancelledBookings />} />
            <Route exact path="/booking-details" element={<BookingDetails />} />
            <Route exact path="/barbershops" element={<Salons />} />
            <Route exact path="/barbershop-details" element={<SalonDetails />} />
            <Route exact path="/barbershop-details/saloon-employee-details" element={<SalonEmployeeDetails />} />
            <Route exact path="/customers" element={<Customers />} />
            <Route exact path="/customer-details" element={<CustomerDetails />} />
            <Route exact path="/services" element={<Services />} />
            <Route exact path="/employees" element={<EmployeeManagement />} />
            <Route exact path="/earnings" element={<EarningManagement />} />
            <Route exact path="/roles" element={<RoleManagement />} />
            <Route exact path="/coupons" element={<Coupons />} />
            <Route exact path="/coupon-details" element={<CouponDetails />} />
            <Route exact path="/subscription" element={<Subscription />} />
            <Route exact path="/subscription-plans" element={<SubscriptionPlans />} />
            <Route exact path="/notifications" element={<Notifications />} />
            <Route exact path="/send-notifications" element={<SendNotifications />} />
            <Route exact path="/customer-support" element={<HelpAndSupport />} />
            <Route exact path="/reports" element={<Reports />} />
            <Route exact path="/reports/off-peak-time-report" element={<OffPeakTimeReport />} />
            <Route exact path="/reports/client-file-report" element={<ClientFileReport />} />
            <Route exact path="/reports/subscription-report" element={<SubscriptionReport />} />
            <Route exact path="/reports/financial-performance-report" element={<FinancialPeroformanceReport />} />
            <Route exact path="/reports/appointment-conversion-report" element={<AppointmentReport />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;

