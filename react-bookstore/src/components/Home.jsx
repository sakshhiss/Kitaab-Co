import React, { useState, useEffect } from 'react';
import Newsletter from './Newsletter';
import Hiro from './Hiro';
import BookCard from './BookCard';
import Footer from './Footer';
import Loading from './Loading';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay of 2 seconds before setting loading to false
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clear the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Hiro />
      <BookCard />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
