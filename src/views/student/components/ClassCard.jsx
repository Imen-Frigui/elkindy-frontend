import React, { useState } from "react";
import { Link } from "react-router-dom";
import guitarIcon from "../../../../src/assets/svg/guitar.svg";

const ClassCard = ({classInfo, userData ,courseId}) => { // Change userData to userDataFromParent
    const { title, price, date, schedule } = classInfo;
    
    const userDataFromParent = userData; // Change userData to userDataFromParent
    const [isEnrolled, setIsEnrolled] = useState(true);
    const [error, setError] = useState(null);
    const courseIdEnroll = courseId;
    const enrollCourse = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/courses/${courseIdEnroll}/add-student`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: userDataFromParent.user._id }), // Update to userDataFromParent.user._id
            });
            const data = await response.json();
            if (response.ok) {
                setIsEnrolled(true);
                window.location.reload(); // Reload the page
            } else {
                setError(data.error || 'Failed to enroll student');
            }
        } catch (error) {
            console.error('Error enrolling student:', error);
            setError('Failed to enroll student');
        }
    };
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderRadius: "0.5rem",
                boxShadow:
                    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                padding: "1rem",
                marginBottom: "1rem",
                maxWidth: "64rem",
            }}
        >
            <img
                src={guitarIcon}
                alt={`${title} icon`}
                style={{ width: "3rem", height: "3rem" }}
            />
            <div style={{ marginLeft: "1rem", flex: "1" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>{title}</h3>
                <p style={{ color: "#4b5563" }}>Cost: {price}</p>
            </div>
            <div style={{ flex: "1" }}>
                <p style={{ fontSize: "1.125rem", fontWeight: "bold" }}>{date}</p>
                <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>{schedule}</p>
            </div>
           
            <button
                onClick={enrollCourse}
                style={{
                    backgroundColor: "#fb923c",
                    color: "white",
                    fontWeight: "bold",
                    padding: "0.5rem 1rem",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "background-color 300ms ease-in-out",
                }}
                onMouseOver={({ currentTarget }) => {
                    currentTarget.style.backgroundColor = "#f97316";
                }}
                onMouseOut={({ currentTarget }) => {
                    currentTarget.style.backgroundColor = "#fb923c";
                }}
            >
                Enroll
            </button>   
        </div>
    );
};

export default ClassCard;