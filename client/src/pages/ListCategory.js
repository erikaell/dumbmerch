import { Table, Button, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';

import DeleteData from '../components/modal/DeleteData';

import imgEmpty from '../assets/empty.svg';
import { API } from '../config/api';

function ListCategory() {

    let navigate = useNavigate();

    const title = 'Category Admin';
    document.title = 'DumbMerch | ' + title;

    // Create variabel for id product and confirm delete data with useState here ...
    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    // Create init useState & function for handle show-hide modal confirm here ...
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let { data: categories, refetch } = useQuery('categoriesCache', async () => {
        const response = await API.get('/categories');
        return response.data.categories;
    });

    const handleEdit = (id) => {
        navigate(`/admin/edit-category/${id}`);
    };

    // Create function handle get id product & show modal confirm delete data here ...
    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };

    // Create function for handle delete product here ...
    // If confirm is true, execute delete data
    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/category/${id}`);
            refetch();
        } catch (error) {
            console.log(error);
        }
    });

    // Call function for handle close modal and execute delete data with useEffect here ...
    useEffect(() => {
        if (confirmDelete) {
            // Close modal confirm delete data
            handleClose();
            // execute delete data by id function
            deleteById.mutate(idDelete);
            setConfirmDelete(null);
        }
    }, [confirmDelete]);

    const addCategory = () => {
        navigate('/admin/add-category');
    };
    return (
        <div className='table-container'>
            <Row>
                <Col>
                    <div className="table-title mb-4">List Category</div>
                </Col>
                <Col className="text-end">
                    <Button
                        onClick={addCategory}
                        className="btn-danger"
                        style={{ width: '100px' }}
                    >
                        Add
                    </Button>
                </Col>
                <Col xs="12">
                    {categories?.length !== 0 ? (
                        <Table striped bordered hover variant="dark">
                            <thead className=''>
                                <tr>
                                    <th style={{ width: '35%' }}>No</th>
                                    <th style={{ width: '35%' }}>Category Name</th>
                                    <th style={{ width: '30%' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td><Button variant="success" onClick={() => { handleEdit(item.id); }} className="button-table">Edit</Button>
                                            <Button variant="danger" onClick={() => { handleDelete(item.id); }} className="ms-2 button-table">Delete</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div className="text-center pt-5">
                            <img
                                src={imgEmpty}
                                className="img-fluid"
                                style={{ width: '40%' }}
                                alt="empty"
                            />
                            <div className="mt-3 text-danger">No data category</div>
                        </div>
                    )}
                </Col>
            </Row>
            <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose}
            />
        </div>
    );
}

export default ListCategory;