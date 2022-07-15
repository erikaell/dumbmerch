import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';

import { API } from '../config/api';

function AddCategoryAdmin() {

    let navigate = useNavigate();
    const [category, setCategory] = useState('');
  
    const title = 'Category admin';
    document.title = 'DumbMerch | ' + title;
  
    const handleChange = (e) => {
      setCategory(e.target.value);
    };
  
    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();
  
        // Configuration
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
  
        // Data body
        const body = JSON.stringify({ name: category });
  
        // Insert category data
        const response = await API.post('/category', body, config);
  
        navigate('/admin');
      } catch (error) {
        console.log(error);
      }
    });

    return (
            <div className="edit-container">
                <p className="table-title">Add Category</p>
                <Form  onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group>
                    <Form.Control onChange={handleChange} value={category} name="categoryName" type="text" placeholder="Category Name" className='mt-5'></Form.Control>
                </Form.Group>
                <Button variant="success" type='submit' className="button-login-login">Save</Button>
                </Form>
            </div>
    );
}

export default AddCategoryAdmin;