import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import Header from './Header';
import Posts from './Posts'
import Sidebar from './Sidebar';
import '../style/home.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const api = "http://127.0.0.1:5500/api/v1/posts";
    const fetchPosts = async (url) => {
      const res = await axios.get(api);
      setPosts(res.data.data.posts);
      console.log(res)
    }

    fetchPosts()
  }, [])
  return (
    <>
      <Header />
      <div className='home'>
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  )
};
