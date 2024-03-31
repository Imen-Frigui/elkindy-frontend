import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer,PDFDownloadLink } from '@react-pdf/renderer';


// Component to generate PDF timetable for exams
const ExamTimetablePDF = ({ exams }) => {
  
  // Function to group exams by startDate and class, and eliminate duplicate classes
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
  
  

  // PDF styles
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
  

  return (
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
    
  );
};

export default ExamTimetablePDF;
