import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header.jsx';
import MainDiv from './AfficheMessage.jsx'; // Assurez-vous que le nom commence par une majuscule

const MessageDetails = () => {

  // Récupérez les détails du message à partir de l'ID (par exemple, depuis votre API ou vos données)
  // const messageDetails = fetchMessageDetails(id);

  return (
    <div width="100%" >
      <Header />
      <div width="100%" >
        <MainDiv /> {/* Utilisez MainDiv avec une majuscule au début */}
      </div>
    </div>
  );
};

export default MessageDetails;
