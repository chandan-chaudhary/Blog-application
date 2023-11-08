

import React from 'react';
import Header from './Header';
import Posts from './Posts'
import Sidebar from './Sidebar';
import '../style/home.css';
export default function Home() {
  return (
    <>
      <Header />
      <div className='home'>
        <Posts />
        <Sidebar />
      </div>
    </>
  )
};
