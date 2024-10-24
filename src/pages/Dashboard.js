import React, { useEffect, useRef, useState } from 'react';
import { getNewPost, getPosts, postPost } from '../services/api';
import '../styles/Dashboard.scss';

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const result = await getPosts();
    const postsWithViews = result.posts.map((post) => ({
      ...post,
      views: Math.floor(Math.random() * 10345) + 1, // Visualizações randômicas entre 1 e 10345
      formattedDate: formatDate(post.date), // Formata a data de criação do post
      posted: post.posted,
    }));
    setPosts(postsWithViews.sort((a, b) => a.posted === b.posted ? 0 : a.posted ? 1 : -1));
  };

  // Função para formatar a data
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  };

  const handleSave = async (postId) => {
    const post = posts.find((post) => post._id === postId);
    const updatedPost = post;
    const updatedPosts = posts.map((post) => (post._id === postId ? updatedPost : post));
    setPosts(updatedPosts);
    await postPost({ postId, message: post.message, theme: post.theme });
  };

  const handleEditChange = (e, postId, field) => {
    const newValue = e.target.value;
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, [field]: newValue } : post
      )
    );
  };

  const adjustTextareaHeight = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto'; // Reseta a altura
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta a altura com base no conteúdo
    }
  };

  const handleNewPost = async (postId) => {
    const response = await getNewPost();
    const newMessage = response.message;
    const updatedPosts = posts.map((post) =>
      post._id === postId ? { ...post, message: newMessage } : post
    );
    setPosts(updatedPosts);
  }

  return (
    <div className="dashboard-container">
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          {post.posted ? (
            <>
              <h2>{post.theme}</h2>
              <p>{post.message}</p>
              <span className="date">Publicado em: {post.formattedDate}</span>
              <span className="views">👁 {post.views} Visualizações</span>
            </>
          ) : (
            <div className="edit-mode">
              <input
                type="text"
                className="input-editable"
                value={post.theme}
                onChange={(e) => handleEditChange(e, post._id, 'theme')}
                placeholder="Editar tema"
              />
              <textarea
                ref={(el) => adjustTextareaHeight(el)} // Ajusta a altura ao carregar
                className="textarea-editable"
                value={post.message}
                onChange={(e) => {
                  handleEditChange(e, post._id, 'message');
                  adjustTextareaHeight(e.target); // Ajusta a altura enquanto digita
                }}
                placeholder="Editar mensagem"
              />
              <span className="not-views">Não publicado</span>
              <button className="save-button" onClick={() => handleNewPost(post._id)}>Pedir a IA</button>
              <button className="save-button" onClick={() => handleSave(post._id)}>
                Publicar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
