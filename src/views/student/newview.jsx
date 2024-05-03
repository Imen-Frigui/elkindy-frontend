import React from 'react';
import PaymentPage from './components/paymentComponenet'; // Make sure the path is correct
import CourseList from './components/Courselist';
  const Dashboard = () => {
      return (
          <div>
              {/* Card widget */}
           
              <CourseList />
          </div>
      );
  }

  export default Dashboard;
