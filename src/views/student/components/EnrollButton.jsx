import React, { useState } from 'react';

const EnrollButton = ({ courseId, studentId }) => {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [error, setError] = useState(null);

    const handleEnroll = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/courses/${courseId}/add-students`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ studentId }),
            });
            const data = await response.json();
            if (response.ok) {
                setIsEnrolled(true);
            } else {
                setError(data.error || 'Failed to enroll student');
            }
        } catch (error) {
            console.error('Error enrolling student:', error);
            setError('Failed to enroll student');
        }
    };

    return (
        <div>
            {isEnrolled ? (
                <p>Enrolled successfully!</p>
            ) : (
                <>
                    <button onClick={handleEnroll}>Enroll</button>
                    {error && <p>{error}</p>}
                </>
            )}
        </div>
    );
};

export default EnrollButton;