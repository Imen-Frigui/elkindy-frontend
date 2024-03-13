import {useDrag} from "react-dnd";
import React from "react";

const DraggableTeacher = ({ teacher, handleAssignTeacher }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'teacher',
        item: { id: teacher._id },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} key={teacher._id} onClick={() => handleAssignTeacher(teacher._id)}
             style={{ opacity: isDragging ? 0.5 : 1 }}>
            {teacher.username}
        </div>
    );
};
export default DraggableTeacher;