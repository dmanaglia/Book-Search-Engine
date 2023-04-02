import React from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { removeBookId } from '../utils/localStorage';

import { useQuery } from '@apollo/client';
import { FIND_USER } from '../utils/queries';
import { useMutation } from '@apollo/client';
import { DELETE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  const { loading, data } = useQuery(FIND_USER, {});
  const [deleteBook, { error, newData }] = useMutation(DELETE_BOOK);

  const userData = data?.findUser || newData?.findUser || {};

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook({variables: {bookId}});
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  } 

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container fluid>
          <h1>Viewing {userData.username}'s saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book, index) => {
            return (
              <Col key={index} md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <a href={book.link} target='_blank' rel="noopener noreferrer"><Card.Title>{book.title}</Card.Title></a>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
