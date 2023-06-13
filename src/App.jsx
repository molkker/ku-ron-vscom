import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

const playerCardImgs = [
  {"src":"/img/1.png", number:1, isOpen: false, id: Math.random()},
  {"src":"/img/2.png", number:2, isOpen: false, id: Math.random()},
  {"src":"/img/3.png", number:3, isOpen: false, id: Math.random()},
  {"src":"/img/4.png", number:4, isOpen: false, id: Math.random()},
  {"src":"/img/5.png", number:5, isOpen: false, id: Math.random()},
  {"src":"/img/6.png", number:6, isOpen: false, id: Math.random()},
  {"src":"/img/7.png", number:7, isOpen: false, id: Math.random()},
  {"src":"/img/8.png", number:8, isOpen: false, id: Math.random()},
  {"src":"/img/9.png", number:9, isOpen: false, id: Math.random()}
]

function App() {

  const [playerCards, setPlayerCards] = useState(playerCardImgs)
  const [comCards, setComCards] = useState(playerCardImgs)
  const [playerChoice, setPlayerChoice] = useState(null)
  const [comChoice, setComChoice] = useState(null)

  const handleChoice = (card) => {
    // 選んだカードをPlayerChoiceにセット
    setPlayerChoice(card)
    console.log(playerChoice)
    // ランダムに選んだカードをcomChoiceにセット
    setComChoice(comCards[Math.floor(Math.random()*comCards.length)])

    // comが使ったカードをcomCardsから削除
    const NewComCards = comCards.filter(( choice ) => {
      return choice !== comChoice
    }) 
    setComCards(NewComCards)

    // プレイヤーが使ったカードをplayerCardsから削除
    const NewPlayerCards = playerCards.filter(( choice ) => {
      return choice !== playerChoice
    })
    setPlayerCards(NewPlayerCards)
  }

  // playerChoiceとcomChoiceのnumberを比較
  useEffect(() => {
    if (playerChoice && comChoice) {
      console.log(playerChoice)
      if(playerChoice.number > comChoice.number) {
        setTimeout(() => alert(`プレイヤーの勝ち!!`), 1000)
      } else if (playerChoice.number < comChoice.number) {
        setTimeout(() => alert(`コンピュータの勝ち!!`), 1000)
      } else {
        setTimeout(() => alert(`引き分け!!`), 1000)
      }
    }
  }, [playerChoice, comChoice])


  return (
    <>
    <div className='card-grid'>
      {playerCards.map((card) => (
        <div className="card" onClick={() => handleChoice(card)}  key={card.id}>
            <img src={card.src} alt="カードの表" />
        </div>
      ))}
      
    </div>
    </>
  )
}

export default App
