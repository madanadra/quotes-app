import { useEffect, useState } from "react";

function App() {
  const [quote, setQuote] = useState([])
  const [button, setButton] = useState(true)
  const [copy, setCopy] = useState(true)

  useEffect(() => {
    refresh();
  }, []);

  const textToSpeech = () => {
    window.speechSynthesis.cancel();
    const tts = new SpeechSynthesisUtterance();
    tts.text = quote?.content;
    tts.lang = 'en-US';
    window.speechSynthesis.speak(tts);
  }

  const refresh = () => {
    setButton(false);
    fetch('https://api.quotable.io/random')
    .then(res => res.json())
    .then(
      (result) => {
        setQuote(result);
        setButton(true);
        setCopy(true);
        console.log(result);
      },
      (error) => {
        setButton(true);
        setCopy(true);
        console.log(error);
      }
    )
  }

  return (<>
    <div className='quote'>
      <h2 className={button ? 'text animation' : 'text'}>"{quote.content}"</h2>
      <h1 className={button ? 'author animation' : 'author'}>&#126; {quote.author}</h1>
      <div className="btn">
        <button onClick={() => textToSpeech()} disabled={!button}>Audio</button>
        <button onClick={() => {navigator.clipboard.writeText(quote.content); setCopy(false)}} 
        className={copy ? '' : 'copied'} disabled={!button || !copy}>{copy ? 'Copy' : 'Copied'}</button>
        <button onClick={() => refresh()} disabled={!button}>Refresh</button>
      </div>
    </div>
  </>);
}

export default App;
