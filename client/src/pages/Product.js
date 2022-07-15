import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import imgEmpty from '../assets/empty.svg';
import { API } from '../config/api';
import convertRp from 'rupiah-format'

function Product() {
    const title = 'Shop';
    document.title = 'DumbMerch | ' + title;
  
    let { data: products } = useQuery('productsCache', async () => {
      const response = await API.get('/products');
      return response.data.data;
    });
  
    console.log(products);


    return (
        <div className='user-container'>
            <p className='user-text'>Product</p>
            <Container className='ms-0'>
            {products?.length !== 0 ? (
                <Row>
                    {products?.map((item, index) => (
                        <Col sm="2" key={index}>
                            <Card className="product-card mb-2">
                                <Card.Img variant="top" src={item.image} className='product-image' />
                                <Card.Body>
                                    <Link style={{ textDecoration: 'none' }} to={`/user/product/detail/${item.id}`}>
                                        <Card.Title style={{ color: '#F74D4D', fontSize: '18px', fontWeight: '700' }}>{item.name}</Card.Title>
                                    </Link>
                                    <p className='product-card-text'>{convertRp.convert(item.price)}</p>
                                    <p className='product-card-text'>Stock: {item.qty}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    
                </Row>
                          ) : (
                            <Col>
                              <div className="text-center pt-5">
                                <img
                                  src={imgEmpty}
                                  className="img-fluid"
                                  style={{ width: '40%' }}
                                  alt="empty"
                                />
                                <div className="mt-3 text-danger">No data product</div>
                              </div>
                            </Col>
                          )}
            </Container>
        </div>
        // </>
    );
}

export default Product;