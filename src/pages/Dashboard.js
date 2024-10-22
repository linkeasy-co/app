import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import '../styles/Dashboard.scss';

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const result = await getPosts();
    const postsWithViews = result.posts.map(post => ({
      ...post,
      views: Math.floor(Math.random() * 10345) + 1, // Visualizações randômicas entre 1 e 10345
      formattedDate: formatDate(post.date) // Formata a data de criação do post
    }));
    setPosts(postsWithViews);
  }

  // Função para formatar a data
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  }

  return (
    <div className="dashboard-container">
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <h2>{post.theme}</h2>
          <p>{post.message}</p>
          <span className="date">Publicado em: {post.formattedDate}</span> {/* Exibe a data formatada */}
          <span className="views">Visualizações: {post.views}</span>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
