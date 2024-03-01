import Header from "./Header.jsx"
import Messages from"./SectionMessages.jsx"
import "./Input.css"

function Home (){

  return (
    <div className="globalDiv">
      <Header />
      <hr align="center" width="75%" />
      <div className="mainSection">
        <Messages />
      </div>
    </div>
  );
};
export default Home ;
