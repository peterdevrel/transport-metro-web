import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'





const CourseContext = createContext()


const CourseContextProvider = ({children}) => {

    const {userdata}  = useAuthContext()
        const access = localStorage.getItem('access')
    
        const [agreed,setAgreed] = useState('')
        const [course, setCourse] = useState('')
        const [courseData, setCourseData] = useState('')
        const [carryover,setCarryOver,] = useState('')
        const [courseRegData, setCourseRegData] = useState([])
        const [lessonData, setLessonData] = useState([])
        const [studentLessonData, setStudentLessonData] = useState([])
        const [studentAssigmentData, setStudentAssigmentData] = useState([])
        const [assignmentData, setAssignmentData] = useState([])
    
    
    
        const getCourseSetupData = () => {
            return fetch(`${import.meta.env.VITE_BASE_URL}user/api/course_setup/`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(resp => resp.json())
            .then(data => {
            // console.log(data)
                var count = Object.keys(data).length;
                let courseArray = []
                for (var i = 0; i < count; i++){
                    courseArray.push({
                    value: data[i]?.id,
                    label: data[i]?.name,
                })
                }
                setCourseData(courseArray)
            }).catch(error=> console.log(error)) 
        }


    
        const addCourseReg = (body) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}user/api/courses/`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${access}`
                    },
                    body: JSON.stringify(body)
                })
                
            } catch (error) {
                console.log(error)
            }
        }
    
    
        const addLessonReg = (body) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}user/api/lessons/`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${access}`
                    },
                    body: JSON.stringify(body)
                })
                
            } catch (error) {
                console.log(error)
            }
        }

    
        const addSemester = (body) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}user/api/semesters/`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${access}`
                    },
                    body: JSON.stringify(body)
                })
                
            } catch (error) {
                console.log(error)
            }
        }
    
        const updateCourse = (id, body) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}user/api/courses/${id}/`,{
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        // 'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${access}`
                    },
                    body: body
                })
            } catch (error) {
                console.log(error)
            }
        }
        
        const updateLesson = (id, body) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}user/api/lessons/${id}/`,{
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${access}`
                    },
                    body: JSON.stringify(body)
                })
            } catch (error) {
                console.log(error)
            }
        }

       const updateAssignment = (id, body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}assign/assignments/${id}/`, {
            method: "PATCH",
            credentials: "include",
            body: body,    // MUST pass FormData directly
            // ❌ Do NOT set Content-Type
            });
        } catch (error) {
            console.log(error);
        }
        };

    

    
       const getCourseRegData = () => {
        fetch(`${import.meta.env.VITE_BASE_URL}user/courses/registration/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .then(data => {
            // Map nested objects to strings for display
            const formattedData = data.map(item => ({
                ...item,
                userName: `${item.user.first_name} ${item.user.last_name}`,
                semesterName: item.semester.display_name ? item.semester.display_name : '', // or combine fields
                levelName: item.level ? item.level : '',
                courseName: item.course ? item.course : ''
            }));
            
            setCourseRegData(formattedData);
            })
            .catch(error => console.log(error));
        };


       const getLessonData = () => {
        fetch(`${import.meta.env.VITE_BASE_URL}user/lesson/view/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .then(data => {
            // Map nested objects to strings for display
            const formattedData = data.map(item => ({
                ...item,
                userName: `${item.lecturer.first_name} ${item.lecturer.last_name}`,
                email: `${item.lecturer.email}`,
                department: `${item.lecturer.department}`,
                faculty: `${item.lecturer.faculty}`,
                semesterName: item.semester?.display_name || '',
                levelName: item.level ? item.level : '',
                courseName: item.course ? item.course : '',
                title: item.title ? item.title : ''
            }));
            
            setLessonData(formattedData);
            })
            .catch(error => console.log(error));
        };

       const getStudentLessonData = (student_id) => {
        fetch(`${import.meta.env.VITE_BASE_URL}/user/student/view/lesson/${student_id}/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .then(data => {
            // console.log('data', data)
            // Map nested objects to strings for display
            const formattedData = data.map(item => ({
                ...item,
                userName: `${item.lecturer.first_name} ${item.lecturer.last_name}`,
                email: `${item.lecturer.email}`,
                department: `${item.lecturer.department}`,
                faculty: `${item.lecturer.faculty}`,
                semesterName: item.semester?.display_name || '',
                levelName: item.level ? item.level : '',
                courseName: item.course ? item.course : '',
                title: item.title ? item.title : ''
            }));
            
            setStudentLessonData(formattedData);
            })
            .catch(error => console.log(error));
        };


       const getStudentAssignmentData = (student_id) => {
        fetch(`${import.meta.env.VITE_BASE_URL}assign/student/view/assignment/${student_id}/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .then(data => {
            // console.log('data', data)
            // Map nested objects to strings for display
            const formattedData = data.map(item => ({
                ...item,
                userName: `${item.lecturer.first_name} ${item.lecturer.last_name}`,
                email: `${item.lecturer.email}`,
                department: `${item.lecturer.department}`,
                faculty: `${item.lecturer.faculty}`,
                semesterName: item.semester?.display_name || '',
                levelName: item.level ? item.level : '',
                courseName: item.course ? item.course : '',
                title: item.title ? item.title : ''
            }));
            
            setStudentAssigmentData(formattedData);
            })
            .catch(error => console.log(error));
        };


         const getAssignmentData = () => {
        fetch(`${import.meta.env.VITE_BASE_URL}assign/assignments/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .then(data => {
            // Map nested objects to strings for display
            const formattedData = data.map(item => ({
                ...item,
                userName: `${item.lecturer.first_name} ${item.lecturer.last_name}`,
                email: `${item.lecturer.email}`,
                department: `${item.lecturer.department}`,
                faculty: `${item.lecturer.faculty}`,
                semesterName: item.semester?.display_name || '',
                levelName: item.level ? item.level : '',
                courseName: item.course ? item.course : '',
                title: item.title ? item.title : ''
            }));
            
            setAssignmentData(formattedData);
            })
            .catch(error => console.log(error));
        };
        


        const addAssignment = (body) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}assign/assignments/`,{
                    method: 'POST',
                    credentials: 'include',
                    body: body
                })
                
            } catch (error) {
                console.log(error)
            }
        }

    
    
        const getTrainingById = (id) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/api/training/${id}/`,{
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${access}`
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    
    
        const deleteTraining = (id) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}v/api/training/${id}/`,{
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${access}`
                    }
                }).then(data => {
                    toast.success('Deletion successful')
                })
            } catch (error) {
                console.log(error)
            }
        }


  return (
    <CourseContext.Provider value={{
        addSemester,
        getCourseSetupData,
        courseData, setCourseData,
        course, setCourse,
        addCourseReg,
        agreed,setAgreed,
        getCourseRegData,
        courseRegData, setCourseRegData,
        updateCourse,
        carryover,setCarryOver,
        addLessonReg,
        getLessonData,
        lessonData, setLessonData,
        updateLesson,
        getStudentLessonData,
        studentLessonData, setStudentLessonData,
        addAssignment,
        studentAssigmentData, setStudentAssigmentData,
        getStudentAssignmentData,
        assignmentData, setAssignmentData,
        getAssignmentData,
        updateAssignment
    }}>
        {children}
    </CourseContext.Provider>
  )
}

export default CourseContextProvider


export const useCourse = () => useContext(CourseContext)