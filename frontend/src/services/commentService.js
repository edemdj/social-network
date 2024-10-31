// services/commentService.js
export const fetchComments = async (portfolioId) => {
  const response = await fetch(`/api/comments?portfolioId=${portfolioId}`);
  if (!response.ok) throw new Error("Erreur lors de la récupération des commentaires");
  return response.json();
};

export const addComment = async (comment) => {
  const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
  });
  if (!response.ok) throw new Error("Erreur lors de l'ajout du commentaire");
  return response.json();
};
