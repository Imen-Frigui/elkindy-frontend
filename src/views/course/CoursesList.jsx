import { useEffect, useState } from "react";
import {
  fetchCourses,
  archiveCourse,
  updateCourse,
} from "../../services/course/courseService";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/button/ButtonComponnent";
import AddCourse from "./components/AddCourse";
import ArchivedCourses from "./components/ArchivedCourses";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
// import Banner from "./components/Banner";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [newName, setNewName] = useState("");

  const [editCourseId, setEditCourseId] = useState(null);
  const [editCourseName, setEditCourseName] = useState("");

  // Start editing a course name
  const handleEditClick = (course) => {
    setEditCourseId(course._id);
    setEditCourseName(course.title);
  };

  const updateCourseName = async (courseId, newName) => {
    // Assuming you have a service function to update the course
    await updateCourse(courseId, { name: newName });
    // Refresh course list
    fetchCourses().then(setCourses);
  };

  const handleSaveClick = async (courseId, newName) => {
    await updateCourse(courseId, { title: newName });
    // Refresh course list
    fetchCourses().then(setCourses);

    // Reset editing state
    setEditCourseId(null);
    setEditCourseName("");
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
        const fetchedCourses = await fetchCourses();
        if (fetchedCourses) {
          setCourses(fetchedCourses);
          console.log(fetchedCourses);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
console.log("fetching")
    getCourses().then((r) => console.log(r));
  }, []);

  const handleCourseAdded = () => {
    fetchCourses().then(setCourses);
  };

  const handleArchiveCourse = async (courseId) => {
    try {
      // Directly call the archiveCourse function imported from courseService
      const response = await archiveCourse(courseId);
      if (response) {
        // Refresh the courses list or update the state to reflect the change
        fetchCourses().then(setCourses);
      } else {
        throw new Error("Failed to archive the course");
      }
    } catch (error) {
      console.error("Failed to archive course:", error);
    }
  };

  const handlePopoverOpen = (event, currentName) => {
    setNewName(currentName); // Set the current name of the course to edit
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {/* <Banner /> */}
      <div className="mt-6 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <AddCourse onCourseAdded={handleCourseAdded} />

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-9 mt-4 overflow-hidden shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
                      >
                        Actions
                      </th>
                      <th>d</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800">
                    {courses.map((course) => (
                      <tr key={course._id} role="row">
                        <td
                          role="cell"
                          className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white"
                        >
                          <p className="font-bold">{course.title}</p>
                          <IconButton
                            aria-describedby={id}
                            variant="contained"
                            onClick={(e) => handlePopoverOpen(e, course.name)}
                          >
                            <EditIcon />
                          </IconButton>
                          <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handlePopoverClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                          >
                            <Typography sx={{ p: 2 }}>
                              Change Course Name
                              <TextField
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                margin="normal"
                              />
                              <Button
                                onClick={() => {
                                  updateCourseName(course._id, newName);
                                  handlePopoverClose();
                                }}
                              >
                                Update
                              </Button>
                            </Typography>
                          </Popover>
                        </td>
                        <td
                          role="cell"
                          className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400"
                        >
                          <p>{course.category}</p>
                        </td>
                        <td
                          role="cell"
                          className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400"
                        >
                          <p>{course.description}</p>
                        </td>
                        <td className="whitespace-nowrap p-4">
                          <ButtonComponent
                            text="Details"
                            onClick={() =>
                              navigate(
                                `/admin/courses/assign-teachers/${course._id}`
                              )
                            }
                            color="#FB9D37"
                          />
                          <ButtonComponent
                            text="Archive"
                            onClick={() => handleArchiveCourse(course._id)}
                            color="red"
                          />
                        </td>
                        <td className="whitespace-nowrap p-4">
                          {editCourseId === course._id ? (
                            <TextField
                              fullWidth
                              variant="outlined"
                              defaultValue={course.title}
                              value={editCourseName}
                              onChange={(e) =>
                                setEditCourseName(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleSaveClick(
                                    course._id,
                                    e.target.value
                                  ).then((r) => console.log(r));
                                }
                              }}
                            />
                          ) : (
                            <span onDoubleClick={() => handleEditClick(course)}>
                              {course.title}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="col-span-3 mt-4">
                {" "}
                {/* Archived courses container */}
                <ArchivedCourses /> {/* Render ArchivedCourses component */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
            <div
                className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none w-full h-full px-6 pb-6 sm:overflow-x-auto">
                <div className="relative flex items-center justify-between pt-4">
                    <div className="text-xl font-bold text-navy-700 dark:text-white">Course Tables
                        <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
                            <table role="table" className="w-full">
                                <thead>
                                <tr role="row">
                                    <th role="columnheader"
                                        className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700">
                                        <p className="text-xs tracking-wide text-gray-600">Name</p>
                                    </th>
                                    <th role="columnheader"
                                        className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700">
                                        <p className="text-xs tracking-wide text-gray-600">Category</p>
                                    </th>
                                    <th role="columnheader"
                                        className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700">
                                        <p className="text-xs tracking-wide text-gray-600">description</p>
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {courses.map(course => (
                                    <tr key={course._id} role="row">
                                        <td role="cell" className="pt-[14px] pb-[18px] sm:text-[14px]">
                                            <p className="text-sm font-bold text-navy-700 dark:text-white">{course.title}</p>
                                        </td>
                                        <td role="cell" className="pt-[14px] pb-[18px] sm:text-[14px]">
                                            <p className="text-sm font-bold text-navy-700 dark:text-white">{course.category}</p>
                                        </td>
                                        <td role="cell" className="pt-[14px] pb-[18px] sm:text-[14px]">
                                            <p className="text-sm font-bold text-navy-700 dark:text-white">{course.description}</p>
                                        </td>
                                        <td>
                                            <ButtonComponent
                                                text="Assign Teachers"
                                                onClick={() => navigate(`/admin/courses/assign-teachers/${course._id}`)}
                                            />

                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            */}
    </>
  );
};

export default CoursesList;
