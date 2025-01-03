import { useState, useEffect } from 'react'
import './style.css'


function Quotes() {
  const url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
  const [randomQuote, setRandomQuote] = useState({quote:"", author:""})
  const [newQuote, setNewQuote] = useState(true)
  const colors = ["#8D6A9D", "#6C8D9A", "#8A9A6F", "#8B8B86", "#7F8F9A", "#7A8F74", "#7F7F82", "#6F7A85", "#8F7A8A", "#7F6F8F"];
  const [availableColors, setAvailableColors] = useState(colors);
  const [fadeInClass, setFadeInClass] = useState('fade-in');
  const [fadeInContainer, setFadeInContainer] = useState('fade-in-container');
  const [fadeInButton, setFadeInButton] = useState('fade-in');
  const [color, setColor] = useState(true)

  //on each new quote update a random quote is fetched and the animations and colors are triggered
  useEffect(()=>{   
    if(newQuote) {
      setFadeInContainer('fade-in-container');
      setFadeInButton('fade-in')
      getRandomColor()
      fetch(url)
        .then(response => response.json())
        .then((data => {
          const quotes = data.quotes  
          const quoteNumb = Math.floor(Math.random()*quotes.length)
          const selectedQuote = quotes[quoteNumb]
          setRandomQuote({quote: selectedQuote.quote, author: selectedQuote.author})
          setNewQuote(false)
          }))
      setFadeInClass('fade-in');
      setTimeout(() => {
        setFadeInClass('fade-in-active');
        setFadeInButton('fade-in-button')
      }, 900);
      setTimeout(() => {
        setFadeInContainer('fade-in-container-active')
      }, 50);
    }
  },[newQuote])

  //function to get the color and avoid repetition
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const newColor = availableColors[randomIndex];
    setColor(newColor);
    setAvailableColors((prevAvailableColors) =>
      prevAvailableColors.filter((color) => color !== newColor)
    );
    if(availableColors.length === 1){
      setAvailableColors([...colors])
    }
  };


  return (
    <div className='main-container'
    style={{backgroundColor:color , transition: 'background-color 1s ease-in-out'}}>
      <div className={`quote-container  ${fadeInContainer}`}>
        <div className='quote' style={{color:color, transition: 'color 1s ease-in-out'}}>
          <p className={`quote-quote ${fadeInClass}`}>"{randomQuote.quote}"</p>
          <p className={`quote-author ${fadeInClass}`}>{randomQuote.author}</p>
        </div>
        <div className={`buttons-container ${fadeInButton}`} >
          <button 
            className="button-quote"
            style={{backgroundColor:color, transition: 'background-color 1s ease-in-out'}}
            onClick={() => {
              window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(randomQuote.quote+"\n---"+randomQuote.author), "_blank")}
            }>Post Quote</button>        
          <button 
            className="button-quote"
            style={{backgroundColor:color, transition: 'background-color 1s ease-in-out'}}
            onClick={()=>{setNewQuote(true)}}>New Quote</button>
           <button 
            className="button-quote"
            style={{backgroundColor:color , transition: 'background-color 1s ease-in-out'}}
            onClick={()=>navigator.clipboard.writeText(randomQuote.quote+"\n---"+randomQuote.author)}>Copy Quote</button>
        </div>
      </div>
    </div>
  )
}

export default Quotes
