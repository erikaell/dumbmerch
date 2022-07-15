import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useQuery, useMutation } from 'react-query';
import { useParams, useNavigate } from 'react-router';

import { API } from '../config/api';

function EditCategory() {
  const title = 'Category Admin';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({ name: '' });

  useQuery('categoryCache', async () => {
    const response = await API.get('/category/' + id);
    setCategory({ name: response.data.category.name });
  });

  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify(category);

      const response = await API.patch('/category/' + id, body, config);

      navigate('/admin');
    } catch (error) {
      console.log(error);
    }
  });

    return (
            <div className="edit-container">
                <p className="table-title">Edit Category</p>
                <Form  onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group>
                    <Form.Control onChange={handleChange} value={category.name} name="category" type="text" placeholder="Category" className='mt-5'></Form.Control>
                </Form.Group>
                <Button variant="success" type='submit' className="button-login-login">Save</Button>
                </Form>
            </div>
    );
}

export default EditCategory;