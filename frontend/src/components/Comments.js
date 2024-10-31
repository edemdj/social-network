// Comments.js
import React, { useState, useEffect } from 'react';
import { fetchComments, addComment } from '../services/commentService'; // Assurez-vous que ces fonctions existent

const Comments = ({ portfolioId, userId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');

    // Charger les commentaires existants au chargement du composant
    useEffect(() => {
        const loadComments = async () => {
            try {
                const data = await fetchComments(portfolioId); // Appelle la fonction depuis le service
                setComments(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Erreur de chargement des commentaires:', error);
            }
        };
        loadComments();
    }, [portfolioId]);
    
    // Ajouter un commentaire
    const handleAddComment = async () => {
        if (!newComment) {
            setError("Veuillez entrer un commentaire.");
            return;
        }
        try {
            const addedComment = await addComment({
                text: newComment,
                userId,
                portfolioId
            });
            setComments([...comments, addedComment]);
            setNewComment('');
            setError('');
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire:", error);
            setError("Une erreur est survenue lors de l'ajout du commentaire.");
        }
    };
    

    return (
        <div className="comments-section">
            <h3>Commentaires</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <p>{comment.text}</p>
                        <small>Posté par l'utilisateur {comment.userId}</small>
                    </li>
                ))}
            </ul>

            <div className="comment-form">
                <textarea
                    placeholder="Ajouter un commentaire..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment}>Ajouter</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default Comments;
