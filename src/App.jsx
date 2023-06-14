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

const maru = {"src": "/img/○.jpg", id: Math.random()}

const batsu = {"src": "/img/×.jpg", id: Math.random()}

const draw = {"src": "/img/横線.jpg"}


function App() {

  const [playerCards, setPlayerCards] = useState(playerCardImgs)
  const [comCards, setComCards] = useState(ComCardImgs.sort(() =>  Math.random() - 0.5))
  const [playerChoice, setPlayerChoice] = useState(null)
  const [comChoice, setComChoice] = useState(null)
  const [flag, setflag] = useState(true)
  const [turnPlayer, setTurnPlayer] = useState("Player")
  const [usedComCards, setUsedComCards] = useState([])
  const [usedplayerCards, setUsedPlayerCards] = useState([])
  const [playerResult, setPlayerResult] = useState([])
  const [comResult,setComresult] = useState([])
  const [whichComSelect, setWhichComSelect] = useState("")
  const [winner, setWinner] = useState("")

  const comHandle = () => {
    // ランダムに選んだカードをcomChoiceにセット
    if (!flag) {
      setComChoice(comCards[Math.floor(Math.random()*comCards.length)])
      setflag(true)
      setTurnPlayer("Player")
    } else {
      setTimeout(() => alert(`今はPlayerの手番です`), 1)
    }
  }

    // comが選んだカードが奇数か偶数かを出力
  useEffect(() => {
    if (comChoice) {
      if (comChoice.number % 2 === 0) {
          setWhichComSelect("Computerは偶数を選びました")
      } else if (comChoice.number % 2 === 1) {
          setWhichComSelect("Computerは奇数を選びました")
      }
    }
  },[comChoice])
  
  // 選んだカードをPlayerChoiceにセット
  const handleChoice = (card) => {
    if (flag) {
      setPlayerChoice(card)
      setflag(false)
      setTurnPlayer("Computer")
    } else {
      setTimeout(() => alert(`今はComputerの手番です`), 1)
    }
  }

  // プレイヤーが勝ったときに呼び出す関数
  const playerWin = () => {
    setWinner("Playerの勝ち!!")
    setflag(true)
    setTurnPlayer("Player")
    // 勝敗が見えるように表示
    const NewPlayerResult = [...playerResult, maru]
    const NewComResult = [...comResult, batsu]
    setPlayerResult(NewPlayerResult)
    setComresult(NewComResult)
  }

  // コンピュータが勝ったときに呼び出す関数
  const comWin = () => {
    setWinner("Computerの勝ち!!")
    setflag(false)
    setTurnPlayer("Computer")
    // 勝敗が見えるように表示
    const NewPlayerResult = [...playerResult, batsu]
    const NewComResult = [...comResult, maru]
    setPlayerResult(NewPlayerResult)
    setComresult(NewComResult)
  }
  // 引き分けのときに呼び出す関数
  const drawGame = () => {
    setWinner("引き分け!!")
    // 勝敗が見えるように表示
    const NewPlayerResult = [...playerResult, draw]
    const NewComResult = [...comResult, draw]
    setPlayerResult(NewPlayerResult)
    setComresult(NewComResult)
  }

  // playerChoiceとcomChoiceをリセット
  const resetTurns = () => {
    setPlayerChoice(null)
    setComChoice(null)
    setWhichComSelect("")
    setWinner("")
  }

  useEffect(() => {
    
    // playerChoiceとcomChoiceのnumberを比較
    if (playerChoice && comChoice) {
      // プレイヤーが１で勝ったとき
      if (playerChoice.number === 1 && comChoice.number === 9) {
        setTimeout(playerWin, 2000)
      // コンピュータが１で勝ったとき
      } else if (playerChoice.number === 9 && comChoice.number === 1) {
        setTimeout(comWin, 2000)
      // プレイヤーが勝ったとき
      } else if(playerChoice.number > comChoice.number) {
        setTimeout(playerWin, 2000)
      // コンピュータが勝ったとき
      } else if (playerChoice.number < comChoice.number) {
        setTimeout(comWin, 2000)
      // 引き分けのとき
      } else {
        setTimeout(drawGame, 2000)
      }

      // comが使ったカードをcomCardsから削除し、usedComCardsに追加
      const NewComCards = comCards.filter(( choice ) => {
        return choice !== comChoice
      }) 
      const NewUsedComCards = [...usedComCards, comChoice]
      setComCards(NewComCards)
      setUsedComCards(NewUsedComCards)

      // プレイヤーが使ったカードをplayerCardsから削除し、usedPlayerCardsに追加
      const NewPlayerCards = playerCards.filter(( choice ) => {
        return choice !== playerChoice
      })
      const NewUsedPlayerCards = [...usedplayerCards, playerChoice]
      setPlayerCards(NewPlayerCards)
      setUsedPlayerCards(NewUsedPlayerCards)

      setTimeout(resetTurns, 4000)
    }
  }, [playerChoice, comChoice])


  return (
    <>
    <p>{turnPlayer}の番です</p>
    <p>{whichComSelect}</p>
    <p>{winner}</p>
    <div>
      <button onClick={() => comHandle()}>コンピュータが選ぶ</button>
    </div>
    <h1>相手</h1>
    {/* コンピュータの手札を表示 */}
    <div className='card-grid'>
      {comCards.map((card) => (
        <div className="card" key={card.id}>
            <img src={card.src} alt="カードの裏" />
        </div>
      ))}
    </div>
    {/* コンピュータの出した手札の勝敗を表示 */}
    <div className='used-card-grid'>
      {comResult.map((card) => (
        <div className="card" key={card.id}>
            <img src={card.src} alt="結果" />
        </div>
      ))}
    </div>
    {/* コンピュータの出したカードを表示 */}
    <div className='used-card-grid'>
      {usedComCards.map((card) => (
        <div className="card" key={card.id}>
            <img src={card.src} alt="カードの裏" />
        </div>
      ))}
    </div>
    {/* プレイヤーの出したカードを表示 */}
    <div className='used-card-grid'>
      {usedplayerCards.map((card) => (
        <div className="card" key={card.id}>
            <img src={card.src} alt="カードの裏" />
        </div>
      ))}
    </div>
    {/* プレイヤーの出したカードの結果を表示 */}
    <div className='used-card-grid'>
      {playerResult.map((card) => (
        <div className="card" key={card.id}>
            <img src={card.src} alt="結果" />
        </div>
      ))}
    </div>
    {/* プレイヤーの手札を表示 */}
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
