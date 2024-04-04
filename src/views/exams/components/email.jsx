import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Document, Page, Text, View, StyleSheet, PDFViewer,PDFDownloadLink } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
      flexDirection: 'column',
      // Center horizontally
      padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: '25%',
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    padding: 8,
  },
  dateCell: {
     fontSize :"8px",
     
    },
    dateCell: {
      backgroundColor: '#144b68',
    },
   
});







const EmailSender = ({ exams }) => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);
  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   setIsSendingEmail(true);

  //   emailjs
  //     .sendForm('service_5n4j9ac', 'template_00r3jiw', e.target, 'HxW5LusvxcFcWUp3q')
  //     .then((res) => {
  //       console.log('Email sent successfully!', res);
  //       setIsSendingEmail(false);
  //       alert('Email sent successfully!');
  //     })
  //     .catch((err) => {
  //       console.error('Error sending email:', err);
  //       setIsSendingEmail(false);
  //       alert('An error occurred while sending the email. Please try again.');
  //     });
  // };


  const sendEmail2 = async (e) => {
    e.preventDefault();
    setIsSendingEmail(true);

    try {
      if (!pdfBlob) {
        await generatePdf();
        return;
      }

      const formData = new FormData(e.target);
      formData.append('attachment', pdfBlob, 'ExamsTimetable.pdf');

      await emailjs.sendForm('service_5n4j9ac', 'template_00r3jiw', e.target, 'HxW5LusvxcFcWUp3q');
      setIsSendingEmail(false);
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      setIsSendingEmail(false);
      alert('An error occurred while sending the email. Please try again.');
    }
  };


  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSendingEmail(true);

    try {
      if (!pdfBlob) {
        await generatePdf();
        return;
      }

      const formData = new FormData(e.target);
      formData.append('attachment', pdfBlob, 'ExamsTimetable.pdf');

      await emailjs.sendForm('service_5n4j9ac', 'template_00r3jiw', e.target, 'HxW5LusvxcFcWUp3q');
      setIsSendingEmail(false);
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      setIsSendingEmail(false);
      alert('An error occurred while sending the email. Please try again.');
    }
  };
  const generatePdf = async () => {
    try {
      const doc = (
        <Document>
          <Page size="A4" style={styles.page}>
          <PDFDownloadLink style={{ backgroundColor: "#006BBE", borderRadius: '20px 0px',
    padding: '10px 20px', // Adjust padding to make the button bigger
    margin: '10px'}} document={<Document>
      
        <Page size="A4" style={styles.page}>
        <Text  style={[styles.dateCell,{ color: '#fff1cc',fontSize:'25px' ,textAlign: 'center', }]} >Exams TimeTable</Text>
          <View style={styles.row}>
            <View style={[styles.cell, styles.dateCell]}><Text style={[styles.dateCell,{ color: '#fff1cc' }]}>Date</Text></View>
            {Array.from(new Set(exams.map((exam) => exam.classe))).map((classRoom) => (
              <View key={classRoom} style={[styles.cell, styles.dateCell]}>
                <Text  style={[styles.dateCell,{ color: '#fff1cc' }]} >{classRoom}</Text>
              </View>
            ))}
          </View>
          {renderTimetableRows()}
        </Page>
      </Document>
   } fileName="ExamsTimetable.pdf">

   {({ blob, url, loading, error }) =>
     
   
      ' Exams Timetable'
  
   }
 </PDFDownloadLink>
          </Page>
        </Document>
      );

      const blob = new Blob([doc], { type: 'application/pdf' });
      setPdfBlob(blob);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  



  // Function to render timetable rows
// Function to render timetable rows
const renderTimetableRows = () => {
  const groupedExams = groupExamsByDateAndClass();
  return Object.keys(groupedExams).map((dateTime) => {
    const [date, startHour] = dateTime.split(' '); // Séparez la date et l'heure
    return (
      <View key={dateTime} style={styles.row}>
        <View style={[styles.cell, styles.dateCell]}>
          <Text style={[styles.dateCell, { color: '#fff1cc', fontSize: '10px' }]}>
            {new Date(date).toLocaleString('en-US', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
            {', '}
            {startHour} {/* Utilisez startHour ici */}
          </Text>
        </View>
        {Array.from(new Set(exams.map((exam) => exam.classe))).map((classRoom) => (
          <View key={classRoom} style={styles.cell}>
            {groupedExams[dateTime][classRoom] ? (
              <Text>{groupedExams[dateTime][classRoom].join(', ')}</Text>
            ) : (
              <Text></Text> // Empty rectangle
            )}
          </View>
        ))}
      </View>
    );
  });
};
const groupExamsByDateAndClass = () => {
  const groupedExams = {};
  exams.forEach((exam) => {
    const examDateTime = `${exam.startDate} ${exam.startHour}`; // Combine date and startHour
    if (!groupedExams[examDateTime]) {
      groupedExams[examDateTime] = {};
    }
    if (!groupedExams[examDateTime][exam.classe]) {
      groupedExams[examDateTime][exam.classe] = [];
    }
    groupedExams[examDateTime][exam.classe].push(exam.name);
  });
  return groupedExams;
};



// PDF styles


return (
  <div>
    <h1>Contact Form</h1>
    <form onSubmit={sendEmail2}>
      <label>Name</label>
      <input type="text" name="name" />
      <label>Email</label>
      <input type="email" name="user_email" required />
      <label>Message</label>
      <textarea name="message" rows="4" />

      <button type="submit" disabled={isSendingEmail}>
        {isSendingEmail ? 'Sending email...' : 'Send Email'}
      </button>
    </form>
  </div>
);

};

// Définissez votre style pour le PDF ici


export default EmailSender;

