import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  TextField,
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  age: Yup.number().required('Age is required').positive('Age must be a positive number'),
  Education: Yup.string().required('Education is required').min(2, 'Education must be at least 2 characters'),
});

function StudentList() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      Education: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (editMode) {
        await handleUpdateClick(values);
      }
    },
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://digiledge.onrender.com/api/getStudents');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setEditMode(true);
    formik.setValues({
      name: student.name,
      age: student.age,
      Education: student.Education,
    });
  };

  const handleUpdateClick = async (values) => {
    try {
      const response = await fetch(`https://digiledge.onrender.com/api/updateStudent/${selectedStudent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        fetchStudents();
        setSelectedStudent(null);
        setEditMode(false);
        formik.resetForm();
        toast.success('Student updated successfully');
      } else {
        console.error('Error updating student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleCancelClick = () => {
    setSelectedStudent(null);
    setEditMode(false);
    formik.resetForm();
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`https://digiledge.onrender.com/api/deleteStudent/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchStudents();
        toast.success('Student deleted successfully');
      } else {
        console.error('Error deleting student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <Typography variant="h2" className="studentlist">
        Student List
      </Typography>

      {loading ? (
        <Loading />
      ) : (
        <Grid container spacing={3}>
          {students.map((student) => (
            <Grid item key={student._id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{student.name}</Typography>
                  <Typography variant="body2">Age: {student.age}</Typography>
                  <Typography variant="body2">Education: {student.Education}</Typography>
                </CardContent>
                <CardActions>
                  <Button color="primary" onClick={() => handleEditClick(student)}>
                    Edit
                  </Button>
                  <Button color="secondary" onClick={() => handleDeleteClick(student._id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {editMode && selectedStudent && (
        <div className="mt-3">
          <Typography variant="h3" className="studentlist">
            Edit Student
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              variant="outlined"
              {...formik.getFieldProps('name')}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              label="Age"
              fullWidth
              margin="normal"
              variant="outlined"
              {...formik.getFieldProps('age')}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
            <TextField
              label="Education"
              fullWidth
              margin="normal"
              variant="outlined"
              {...formik.getFieldProps('Education')}
              error={formik.touched.Education && Boolean(formik.errors.Education)}
              helperText={formik.touched.Education && formik.errors.Education}
            />
            <Button type="submit" color="primary" variant="contained">
              Update
            </Button>
            <Button color="secondary" variant="contained" onClick={handleCancelClick}>
              Cancel
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default StudentList;
