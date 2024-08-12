import React, {useEffect, useState} from 'react';
import './studentAdmin.css'
import EditModal from "./EditModal.jsx";
import AddModal from "./AddModal.jsx";

const StudentAdmin = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:5000/students');
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching Students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setEditModalOpen(true);
    }

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/delete-student/${id}`, {
                method: 'DELETE',
            });
            setStudents(students.filter(student => student.id !== id));
        } catch (error) {
            console.error('Error deleting student', error)
        }
    };

    const handleAdd = (newStudent) => {
        setStudents([...students, newStudent]);
    };

    const handleSave = (updatedStudent) => {
        setStudents(students.map(student => (student.id === updatedStudent.id ? updatedStudent : student)));
    }



    const renderRows = students.map((student) => (
        <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.fname}</td>
            <td>{student.lname}</td>
            <td>{student.grade !== null && student.section !== null ? `${student.grade} - ${student.section}` : ''}</td>
            <td>{student.email}</td>
            <td>****</td>
            <td>{student.b_date.slice(0, 10)}</td>
            <td>
                <button className="edit-student-button" onClick={() => handleEdit(student)}>Edit</button>
                <button className="delete-student-button" onClick={() => handleDelete(student.id)}>Delete</button>
            </td>
        </tr>
    ));

    return (
        <div className="admin-student-container">
            <table className="admin-student-table">
                <thead>
                <tr>
                    <th>Student No.</th>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Class</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>BirthDate</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {renderRows}
                </tbody>
            </table>
            <button className="add-student-button" onClick={() => setAddModalOpen(true)}>Add Student</button>
            {selectedStudent && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    student={selectedStudent}
                    onSave={handleSave}
                />
            )}
            <AddModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onAdd={handleAdd}
            />
        </div>
    );
};

export default StudentAdmin;
