function Message({titre, message}){
  const msg = message.slice(0,50) + "[...]"
  return (
    <div className="message">
      <p>${titre}</p>
      <p>${msg}</p>
      <button>+</button
    </>

  );

}
