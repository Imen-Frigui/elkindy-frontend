import { useEffect, useState } from 'react';
import { fetchCourses } from '../../services/course/courseService';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const CoursesList = () => {
    const [courses, setCourses] = useState([]);

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

        getCourses().then(r => console.log(r));
    }, []);


    return (
        <Box>
            <VStack spacing={4}>
                {courses.map((course) => (
                    <Box key={course._id} p={5} shadow="md" borderWidth="1px">
                        <Heading fontSize="xl">{course.title}</Heading>
                        <Text mt={4}>{course.description}</Text>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default CoursesList;
