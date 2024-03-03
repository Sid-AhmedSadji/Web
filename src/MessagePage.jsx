// MessageDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header.jsx'

const MessageDetails = () => {
  const { id } = useParams(); // Récupère l'ID à partir de l'URL

  // Récupérez les détails du message à partir de l'ID (par exemple, depuis votre API ou vos données)
  // const messageDetails = fetchMessageDetails(id);

  return (
  <>
    <Header />
     <hr width="75%"/>
    <div>
      <h2>Détails du message {id}</h2>
      {/* Affichez les détails du message */}
    </div>
  </>
  );
};

export default MessageDetails;

