import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import { API } from '../config/api';

function AddProductAdmin() {
  const title = 'Product Admin';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();

  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: '',
    name: '',
    desc: '',
    price: '',
    qty: '',
  }); //Store product data

  // Fetching category data
  const getCategories = async () => {
    try {
      const response = await API.get('/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
  };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set('image', form.image[0], form.image[0].name);
      formData.set('name', form.name);
      formData.set('desc', form.desc);
      formData.set('price', form.price);
      formData.set('qty', form.qty);
      formData.set('categoryId', categoryId);

      console.log(form);

      // Insert product data
      const response = await API.post('/product', formData, config);
      console.log(response);

      navigate('/admin/product');
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

    return (
            <div className="edit-container">
                <p className="table-title">Edit Product</p>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: '150px',
                      maxHeight: '150px',
                      objectFit: 'cover',
                    }}
                    alt={preview}
                  />
                </div>
              )}
              <input
                type="file"
                id="upload"
                name="image"
                hidden
                onChange={handleChange}
              />
              <label for="upload" className="label-file-add-product">
                Upload File
              </label>
                <Form.Group>
                    <Form.Control type="text" onChange={handleChange} name="name" placeholder="Product Name" className='mt-3'></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control as="textarea" onChange={handleChange} name="desc" rows={3} placeholder="Product Description" className='mt-3'></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="number" onChange={handleChange} name="price" placeholder="Product Price" className='mt-3'></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="number" onChange={handleChange} name="qty" placeholder="Product Stock" className='mt-3'></Form.Control>
                </Form.Group>
                <div className="card-form-input mt-4 px-2 py-1 pb-2">
                <div
                  className="text-secondary mb-1"
                  style={{ fontSize: '15px' }}
                >
                  Category
                </div>
                {categories.map((item, index) => (
                  <label className="checkbox-inline me-4 text-white" key={index}>
                    <input
                      type="checkbox"
                      value={item.id}
                      onClick={handleChangeCategoryId}
                    />{' '}
                    {item.name}
                  </label>
                ))}
              </div>
                <Button variant="success" type="submit" className="button-login-login">Save</Button>
                </Form>
            </div>
    );
}

export default AddProductAdmin;