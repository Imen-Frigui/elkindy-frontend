const API_BASE_URL = 'http://localhost:3000/api';

export const fetchEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/events`);
        if (response.ok) {
            const events = await response.json();
            return events.filter(event => !event.isArchived); 
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};
export const fetchEventById = async (eventId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to fetch event:", error);
    }
};
export const updateEvent = async (eventId, eventData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/updateEvent/${eventId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to update event:", error);
    }
};


// export const addEvent = async (eventData) => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/events/createEvent`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(eventData),
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok.');
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Failed to add event:", error);
//     }
// };
export const addEvent = async (formData) => { 
    try {
      const response = await fetch(`${API_BASE_URL}/events/createEvent`, {
        method: 'POST',
        body: formData, 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Failed to add event:", error);
      throw error;
    }
  };
  


export const deleteEvent = async (eventId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/deleteEvent/${eventId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to delete event:", error);
    }
};


export const archiveEvent = async (eventId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/archiveEvent/${eventId}`, {
            method: 'PATCH' 
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to archive event:", error);
    }
};


export const fetchArchivedEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/archived`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};


export const restoreEvent = async (eventId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/restoreEvent/${eventId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error("Failed to restore event:", error);
    }
  };


  export const fetchMonthlyEventCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/monthlyEventCount`);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error("Failed to fetch monthly event count:", error);
    }
  };

  export const searchLocation = async (address) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/searchLocation?address=${encodeURIComponent(address)}`);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error("Failed to search location:", error);
    }
};
