import React, { useEffect } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { calcLength } from 'framer-motion';

const Cart = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get('qty')) || 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const checkoutHandler = () => navigate('/login?redirect=shipping');

  useEffect(() => {
    if (params.productId) dispatch(addToCart(params.productId, qty));
  }, [params.productId, dispatch]);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  return (
    <Row className='mt-5 mb-4'>
      <Col md={8}>
        <h1>Shopping Cart:</h1>
        {/* @todo have a gif in the cart empty */}
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty
            {/* !BUTTON DOESNT WORK */}
            <Button variant='link' onClick={() => navigate('/')}>
              Go back to the homepage
            </Button>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product} className='my-2'>
                <Row className='g-3'>
                  <Col sm={3}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col sm={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col sm={2}>R {item.price}</Col>
                  <Col sm={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((count) => (
                        <option key={count + 1} value={count + 1}>
                          {count + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col sm={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((total, item) => {
                  return (total += Number(item.qty));
                }, 0)}
                ) items
              </h2>
              R{' '}
              {cartItems.reduce((total, item) => {
                return (total += Number(item.qty * item.price));
              }, 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
