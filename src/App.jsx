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
const ComCardImgs = [
  {"src":"/img/白.png", number:1, isOpen: false, id: Math.random()},
  {"src":"/img/黒.png", number:2, isOpen: false, id: Math.random()},
  {"src":"/img/白.png", number:3, isOpen: false, id: Math.random()},
  {"src":"/img/黒.png", number:4, isOpen: false, id: Math.random()},
  {"src":"/img/白.png", number:5, isOpen: false, id: Math.random()},
  {"src":"/img/黒.png", number:6, isOpen: false, id: Math.random()},
  {"src":"/img/白.png", number:7, isOpen: false, id: Math.random()},
  {"src":"/img/黒.png", number:8, isOpen: false, id: Math.random()},
  {"src":"/img/白.png", number:9, isOpen: false, id: Math.random()}
]


function App() {

  const [playerCards, setPlayerCards] = useState(playerCardImgs)
  const [comCards, setComCards] = useState(ComCardImgs.sort(() =>  Math.random() - 0.5))
  const [playerChoice, setPlayerChoice] = useState(null)
  const [comChoice, setComChoice] = useState(null)
  const [flag, setflag] = useState(true)
  const [turnPlayer, setTurnPlayer] = ("Player")

  const comHandle = () => {
    // ランダムに選んだカードをcomChoiceにセット
    if (!flag) {
      setComChoice(comCards[Math.floor(Math.random()*comCards.length)])
      setflag(true)
    } else {
      setTimeout(() => alert(`今はPlayerの手番です`), 1)
    }
  }
    // comが選んだカードが奇数か偶数かを出力
  useEffect(() => {
    if (comChoice) {
      if (comChoice.number % 2 === 0) {
        setTimeout(() => alert(`Computerは偶数を選びました`), 1)
      } else if (comChoice.number % 2 === 1) {
        setTimeout(() => alert(`Computerは奇数を選びました`), 1)
      }
    }
  },[comChoice])
  
  // 選んだカードをPlayerChoiceにセット
  const handleChoice = (card) => {
    if (flag) {
      setPlayerChoice(card)
      setflag(false)
    } else {
      setTimeout(() => alert(`今はComputerの手番です`), 1)
    }
  }

  const resetTurns = () => {
    setPlayerChoice(null)
    setComChoice(null)
  }

  useEffect(() => {
    // playerChoiceとcomChoiceのnumberを比較
    if (playerChoice && comChoice) {
      if(playerChoice.number > comChoice.number) {
        setTimeout(() => alert(`Playerの勝ち!!`), 1000)
        setflag(true)
      } else if (playerChoice.number < comChoice.number) {
        setTimeout(() => alert(`Computerの勝ち!!`), 1000)
        setflag(false)
      } else {
        setTimeout(() => alert(`引き分け!!`), 1000)
        setflag(!flag)
      }

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

      resetTurns()
    }
  }, [playerChoice, comChoice])


  return (
    <>
    <p>{turnPlayer}の番です</p>
    <div>
      <button onClick={() => comHandle()}>コンピュータが選ぶ</button>
    </div>
    <h1>相手</h1>
    <div className='card-grid'>
      {comCards.map((card) => (
        <div className="card" key={card.id}>
            <img src={card.src} alt="カードの裏" />
        </div>
      ))}
    </div>
    <div className='card-grid'>
      {playerCards.map((card) => (
        <div className="card" onClick={() => handleChoice(card)}  key={card.id}>
            <img src={card.src} alt="カードの表" />
        </div>
      ))}
    </div>
    <h1>自分</h1>
    </>
  )
}

export default App
