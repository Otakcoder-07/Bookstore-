import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='container mx-auto p-6 bg-gray-900 text-yellow-500 min-h-screen'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-semibold'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-blue-500 text-4xl cursor-pointer' />
        </Link>
      </div>
      <div className='flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4'>
        <div className={`btn-box ${showType === 'table' ? 'btn-active' : ''}`}>
          <button
            className='btn text-yellow-500'
            onClick={() => setShowType('table')}
          >
            Table View
          </button>
        </div>
        <div className={`btn-box ${showType === 'card' ? 'btn-active' : ''}`}>
          <button
            className='btn text-yellow-500'
            onClick={() => setShowType('card')}
          >
            Card View
          </button>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
