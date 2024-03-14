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
        <div
            className="px-2 py-4 bg-white flex items-center justify-between shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer"
            ref={drag} key={teacher._id}
            onClick={() => handleAssignTeacher(teacher._id)}
            style={{opacity: isDragging ? 0.5 : 1}}>
            <h1 className="text-gray-800 text-xl"> {teacher.username}</h1>
            <button className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl">
                Drag Handle
            </button>
        </div>
    );
};
export default DraggableTeacher;