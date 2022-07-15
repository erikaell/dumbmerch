import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';

function EditProfile() {
    const title = 'Profile User';
    document.title = 'DumbMerch | ' + title;

    let navigate = useNavigate();

    const [preview, setPreview] = useState(null); //For image preview
    const [profile, setProfile] = useState({}); //Store profile data
    const [form, setForm] = useState({
        image: '',
        phone: '',
        gender: '',
        address: '',
    }); //Store profile data


    // Fetching detail profile data by id from database
    let { data: profiles, refetch } = useQuery('profileCache', async () => {
        const response = await API.get('/profile');
        return response.data.data;
      });
    
      useEffect(() => {
        if (profiles) {
          setPreview(profiles.image);
          setForm({
            ...form,
            name: profiles.users.name,
            phone: profiles.phone,
            gender: profiles.gender,
            address: profiles.address,
          });
          setProfile(profiles);
        }
      }, [profiles]);

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
            if (form.image) {
                formData.set('image', form?.image[0], form?.image[0]?.name);
            }
            formData.set('name', form.name);
            formData.set('phone', form.phone);
            formData.set('gender', form.gender);
            formData.set('address', form.address);

            // Insert profile data
            const response = await API.patch('/profile', formData, config);

            console.log(response.data);

            navigate('/user/profile');
        } catch (error) {
            console.log(error);
        }
    });




    return (
        <div>
            <div className="edit-container">
                <p className="table-title">Edit Profile</p>
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
                                alt="preview"
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
                        <Form.Control type="text" onChange={handleChange} value={form?.name} name="name" placeholder="Name" className='mt-3'></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" onChange={handleChange} value={form?.phone} name="phone" placeholder="Phone" className='mt-3'></Form.Control>
                    </Form.Group>
                    <Form.Select aria-label="Default select example" onChange={handleChange} value={form?.gender} name="gender" className="mt-3">
                        <option>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Form.Select>
                    <Form.Group>
                        <Form.Control as="textarea" rows={3} onChange={handleChange} value={form?.address} name="address" placeholder="Address" className='mt-3'></Form.Control>
                    </Form.Group>
                    <Button variant="success" type="submit" className="button-login-login">Save</Button>
                </Form>
            </div>
        </div>
    );
}

export default EditProfile;