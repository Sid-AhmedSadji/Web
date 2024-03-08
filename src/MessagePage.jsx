// MessageDetails.jsx
import { useState } from 'react';
import Header from './Header.jsx'

function MessageDetails ({setPage}) {
  const { id } = 10 ; // Récupère l'ID à partir de l'URL

  // Récupérez les détails du message à partir de l'ID (par exemple, depuis votre API ou vos données)
  // const messageDetails = fetchMessageDetails(id);

  return (
  <>
    <Header setPage={setPage}/>
     <hr width="75%"/>
    <div>
      <h2>Détails du message 10</h2>
      {/* Affichez les détails du message */}
    </div>
  </>
  );
};

export default MessageDetails;

