import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer,PDFDownloadLink } from '@react-pdf/renderer';
import { text } from '@fortawesome/fontawesome-svg-core';
import { saveAs } from 'file-saver';
import { GiCloudDownload } from 'react-icons/gi';

// Component to generate PDF timetable for exams
const ExamTimetablePDF = ({ exams }) => {
  // Function to group exams by startDate and class, and eliminate duplicate classes
  const groupExamsByDateAndClass = () => {
    const groupedExams = {};
    exams.forEach((exam) => {
      if (!groupedExams[exam.startDate]) {
        groupedExams[exam.startDate] = {};
      }
      if (!groupedExams[exam.startDate][exam.classe]) {
        groupedExams[exam.startDate][exam.classe] = [];
      }
      groupedExams[exam.startDate][exam.classe].push(exam.name);
    });
    return groupedExams;
  };

  // Function to render timetable rows
  // Function to render timetable rows
const renderTimetableRows = () => {
    const groupedExams = groupExamsByDateAndClass();
    return Object.keys(groupedExams).map((date) => {
      const formattedDate = new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/London',
      });
      return (
        <View key={date} style={styles.row}>
          <View style={[styles.cell, styles.dateCell]}><Text  style={[styles.dateCell,{ color: '#fff1cc',fontSize:'10px' }]}>{formattedDate}</Text></View>
          {Array.from(new Set(exams.map((exam) => exam.classe))).map((classRoom) => (
            <View key={classRoom} style={styles.cell}>
              {groupedExams[date][classRoom] ? (
                <Text>{groupedExams[date][classRoom].join(', ')}</Text>
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
  const savePDF = () => {
    const pdfBlob = new Blob([<Document>
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
    </Document>], { type: 'application/pdf' });

    // Create download link
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(pdfBlob);
    link.download = 'ExamTimetable.pdf';
    link.click();
  };

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
