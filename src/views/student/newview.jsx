import React from 'react';
import PaymentPage from './components/paymentComponenet'; // Make sure the path is correct
import CourseList from './components/Courselist';
  const Dashboard = () => {
      return (
          <div>
              {/* Card widget */}
              <h1>Hello, world!</h1>
              <PaymentPage />
              <CourseList />
          </div>
      );
  }

  export default Dashboard;
