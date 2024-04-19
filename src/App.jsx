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
import ProtectedRoute from './utilities/ProtectedRoute'; 
import PendingBookings from './pages/bookings/PendingBookings';
import UnpaidBookings from './pages/bookings/UnpaidBookings';
import TopServicesReport from './pages/reports/TopServicesReport';
import TopSalonsReport from './pages/reports/TopSalonsReport';
import ClientStatusReport from './pages/reports/ClientStatusReport';

function App() {
  return (
    <>
      <ToastContainer />
      <ChakraProvider> 
        <Router>
          <Routes>
            <Route exact path="/sign-in" element={<Login />} />
            <Route exact path="/" element={<ProtectedRoute Component={Home} />} />
            <Route exact path="/admin-earnings" element={<ProtectedRoute Component={AdminEarnings} />} />
            <Route exact path="/all-bookings" element={<ProtectedRoute Component={AllBookings} />} />
            <Route exact path="/noshow-bookings" element={<ProtectedRoute Component={UpcomingBookings} />} />
            <Route exact path="/completed-bookings" element={<ProtectedRoute Component={CompletedBookings} />} />
            <Route exact path="/cancelled-bookings" element={<ProtectedRoute Component={CancelledBookings} />} />
            <Route exact path="/upcoming-bookings" element={<ProtectedRoute Component={PendingBookings} />} />
            <Route exact path="/unpaid-bookings" element={<ProtectedRoute Component={UnpaidBookings} />} />
            <Route exact path="/booking-details" element={<ProtectedRoute Component={BookingDetails} />} />
            <Route exact path="/barbershops" element={<ProtectedRoute Component={Salons} />} />
            <Route exact path="/barbershop-details" element={<ProtectedRoute Component={SalonDetails} />} />
            <Route exact path="/barbershop-details/saloon-employee-details" element={<ProtectedRoute Component={SalonEmployeeDetails} />} />
            <Route exact path="/customers" element={<ProtectedRoute Component={Customers} />} />
            <Route exact path="/customer-details" element={<ProtectedRoute Component={CustomerDetails} />} />
            <Route exact path="/services" element={<ProtectedRoute Component={Services} />} />
            <Route exact path="/employees" element={<ProtectedRoute Component={EmployeeManagement} />} />
            <Route exact path="/earnings" element={<ProtectedRoute Component={EarningManagement} />} />
            <Route exact path="/roles" element={<ProtectedRoute Component={RoleManagement} />} />
            <Route exact path="/coupons" element={<ProtectedRoute Component={Coupons} />} />
            <Route exact path="/coupon-details" element={<ProtectedRoute Component={CouponDetails} />} />
            <Route exact path="/subscription" element={<ProtectedRoute Component={Subscription} />} />
            <Route exact path="/subscription-plans" element={<ProtectedRoute Component={SubscriptionPlans} />} />
            <Route exact path="/notifications" element={<ProtectedRoute Component={Notifications} />} />
            <Route exact path="/send-notifications" element={<ProtectedRoute Component={SendNotifications} />} />
            <Route exact path="/customer-support" element={<ProtectedRoute Component={HelpAndSupport} />} />
            <Route exact path="/reports" element={<ProtectedRoute Component={Reports} />} />
            <Route exact path="/reports/off-peak-time-report" element={<ProtectedRoute Component={OffPeakTimeReport} />} />
            <Route exact path="/reports/client-file-report" element={<ProtectedRoute Component={ClientFileReport} />} />
            <Route exact path="/reports/subscription-report" element={<ProtectedRoute Component={SubscriptionReport} />} />
            <Route exact path="/reports/financial-performance-report" element={<ProtectedRoute Component={FinancialPeroformanceReport} />} />
            <Route exact path="/reports/appointment-conversion-report" element={<ProtectedRoute Component={AppointmentReport} />} />
            
            <Route exact path="/reports/top-performing-services-report" element={<ProtectedRoute Component={TopServicesReport} />} />
            <Route exact path="/reports/top-performing-salons-report" element={<ProtectedRoute Component={TopSalonsReport} />} />
            <Route exact path="/reports/client-status-distribution-report" element={<ProtectedRoute Component={ClientStatusReport} />} />

          </Routes>
        </Router>
      </ChakraProvider >
    </>
  );
}

export default App;

