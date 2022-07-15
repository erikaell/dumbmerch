import { Table, Button, Modal, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import convertRp from 'rupiah-format'

import DeleteData from '../components/modal/DeleteData';

import imgEmpty from '../assets/empty.svg';

import { API } from '../config/api';

function ListProduct() {
  let navigate = useNavigate();

  const title = 'Product Admin';
  document.title = 'DumbMerch | ' + title;

  // Create variabel for id product and confirm delete data with useState here ...
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Create init useState & function for handle show-hide modal confirm here ...
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { data: products, refetch } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data;
  });

  const addProduct = () => {
    navigate('/admin/add-product');
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
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
      await API.delete(`/product/${id}`);
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


  return (
    <div className='table-container'>
      <Row>
        <Col>
          <div className="table-title mb-4">List Product</div>
        </Col>
        <Col className="text-end">
          <Button
            onClick={addProduct}
            className="btn-danger"
            style={{ width: '100px' }}
          >
            Add
          </Button>
        </Col>
        <Col xs="12">
          {products?.length !== 0 ? (
            <Table striped bordered hover variant="dark">
              <thead className=''>
                <tr>
                  <th>No</th>
                  <th>Photo</th>
                  <th>Product Name</th>
                  <th style={{ width: '15%' }}>Product Desc</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th style={{ width: '30%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td><img src={item.image} style={{ width: '80px', height: '80px', objectFit: 'cover' }} alt={item.name} /></td>
                    <td>{item.name}</td>
                    <td className='text-truncate'>{item.desc}</td>
                    <td>{convertRp.convert(item.price)}</td>
                    <td>{item.qty}</td>
                    <td><Button variant="success" onClick={() => { handleEdit(item.id); }}  className="button-table">Edit</Button>
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
              <div className="mt-3 text-danger">No data product</div>
            </div>
          )}
        </Col>
      </Row>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
}

export default ListProduct;