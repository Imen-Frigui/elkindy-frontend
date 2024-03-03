import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function CourseDetailsModal({ course, isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Course Details
                </Typography>
                <p><strong>Title:</strong> {course.title}</p>
                <p><strong>Description:</strong> {course.description}</p>
                <p><strong>Category:</strong> {course.category}</p>
                <p><strong>Price:</strong> ${course.price}</p>
                <p><strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(course.endDate).toLocaleDateString()}</p>
                <p><strong>Maximum Students:</strong> {course.maxStudents}</p>
                <p><strong>Teacher:</strong> {course.teacher.map(teacher => teacher.name).join(', ')}</p>
                <Button onClick={onClose}>Close</Button>
            </Box>
        </Modal>
    );
}

export default CourseDetailsModal;