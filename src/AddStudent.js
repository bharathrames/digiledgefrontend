import React , { useState }from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

function AddStudent() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: '',
    age: '',
    Education: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    age: Yup.number().required('Age is required').positive('Age must be a positive number'),
    Education: Yup.string().required('Education is required').min(2, 'Education must be at least 2 characters'),
  });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const response = await fetch('https://digiledge.onrender.com/api/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log('New student added:', data);
      toast.success('Student successfully added!');

      history.push('/student-list');
    } catch (error) {
      console.error('Error adding student:', error);

      toast.error('Error adding student');
    }finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Add Student
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="age"
            label="Age"
            name="age"
            type="text"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="Education"
            label="Education"
            name="Education"
            value={formik.values.Education}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Education && Boolean(formik.errors.Education)}
            helperText={formik.touched.Education && formik.errors.Education}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }} disabled={isLoading}>
          {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Add Student'
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddStudent;
