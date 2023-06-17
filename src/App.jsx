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
  const [comCards, setComCards] = useState(ComCardImgs)
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
  const [round, setRound] = useState(1)
  const [pWinCount, setPWinCount] = useState(0)
  const [cWinCount, setCWinCount] = useState(0)
  const [drawCount, setDrawCount] = useState(0)
  const [disabled, setDisabled] = useState(false)

  // 手札をシャッフル
  useEffect(() => {
    setPlayerCards(playerCards.sort(() =>  Math.random() - 0.5))
    setComCards(comCards.sort(() =>  Math.random() - 0.5))
  }, [])

  // flagがfalseならランダムに選んだカードをcomChoiceにセット
  const comHandle = () => {
    if (!disabled) {
      if (!flag) {
        setComChoice(comCards[Math.floor(Math.random()*comCards.length)])
        setflag(true)
        setTurnPlayer("Player")
      } else {
        alert(`今はPlayerの手番です`)
      }
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
  
  // flagがtrueなら選んだカードをPlayerChoiceにセット
  const handleChoice = (card) => {
    if (!disabled) {
      if (flag) {
        setPlayerChoice(card)
        setflag(false)
        setTurnPlayer("Computer")
      } else {
        alert(`今はComputerの手番です`)
      }
    }
  }

  // プレイヤーが勝ったときに呼び出す関数
  const playerWin = () => {
    setWinner("Playerの勝ち!!")
    setflag(true)
    setTurnPlayer("Player")
    setPWinCount(pWinCount + 1)
    // 勝敗が見えるように表示
    const NewPlayerResult = [...playerResult, maru]
    const NewComResult = [...comResult, batsu]
    setPlayerResult(NewPlayerResult)
    setComresult(NewComResult)
    // ゲーム終了の条件・各種リセット
    setTimeout(resetPlayerWonTurns, 2000)
  }

  // コンピュータが勝ったときに呼び出す関数
  const comWin = () => {
    setWinner("Computerの勝ち!!")
    setflag(false)
    setTurnPlayer("Computer")
    setCWinCount(cWinCount + 1)
    // 勝敗が見えるように表示
    const NewPlayerResult = [...playerResult, batsu]
    const NewComResult = [...comResult, maru]
    setPlayerResult(NewPlayerResult)
    setComresult(NewComResult)
    // ゲーム終了の条件・各種リセット
    setTimeout(resetComWonTurns, 2000)
  }

  // 引き分けのときに呼び出す関数
  const drawGame = () => {
    setWinner("引き分け!!")
    setDrawCount(drawCount + 1)
    // 勝敗が見えるように表示
    const NewPlayerResult = [...playerResult, draw]
    const NewComResult = [...comResult, draw]
    setPlayerResult(NewPlayerResult)
    setComresult(NewComResult)
    // ゲーム終了の条件・各種リセット
    setTimeout(resetDrawTurns, 2000)
  }

  // プレイヤーが勝った時の各種リセットの関数
  const resetPlayerWonTurns = () => {
    if ((9 - drawCount) / 2 < pWinCount + 1) {
      alert("ゲーム終了！ Playerの勝利!!")
    } else if (round === 9) {
      alert("ゲーム終了！ 引き分け!!")
    } else {
      setPlayerChoice(null)
      setComChoice(null)
      setWhichComSelect("")
      setWinner("")
      setRound(round + 1)
      setDisabled(false)
    }
  }
  // コンピュータが勝ったときのリセットの関数
  const resetComWonTurns = () => {
    if ((9 - drawCount) / 2 < cWinCount + 1) {
      alert("ゲーム終了！ Playerの勝利!!")
    } else if (round === 9) {
      alert("ゲーム終了！ 引き分け!!")
    } else {
      setPlayerChoice(null)
      setComChoice(null)
      setWhichComSelect("")
      setWinner("")
      setRound(round + 1)
      setDisabled(false)
    }
  }
  // 引き分けだった時のリセットの関数
  const resetDrawTurns = () => {
    if ((9 - (drawCount + 1)) / 2 < pWinCount) {
      alert("ゲーム終了！ Playerの勝利!!")
    } else if ((9 - (drawCount + 1)) / 2 < cWinCount) {
      alert("ゲーム終了！ Computerの勝利!!")
    } else if (round === 9) {
      alert("ゲーム終了！ 引き分け!!")
    } else {
      setPlayerChoice(null)
      setComChoice(null)
      setWhichComSelect("")
      setWinner("")
      setRound(round + 1)
      setDisabled(false)
    }
  }

  useEffect(() => {
    // playerChoiceとcomChoiceのnumberを比較
    if (playerChoice && comChoice) {
      setDisabled(true)
      // プレイヤーが１で勝ったとき
      if (playerChoice.number === 1 && comChoice.number === 9) {
        setTimeout(playerWin, 2000)
      // コンピュータが１で勝ったとき
      } else if (playerChoice.number === 9 && comChoice.number === 1) {
        setTimeout(comWin, 2000)
      // プレイヤーが勝ったとき
      } else if (playerChoice.number > comChoice.number) {
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
      setComCards(NewComCards)

      const NewUsedComCards = [...usedComCards, comChoice]
      setUsedComCards(NewUsedComCards)

      // プレイヤーが使ったカードをplayerCardsから削除し、usedPlayerCardsに追加
      const NewPlayerCards = playerCards.filter(( choice ) => {
        return choice !== playerChoice
      })
      setPlayerCards(NewPlayerCards)

      const NewUsedPlayerCards = [...usedplayerCards, playerChoice]
      setUsedPlayerCards(NewUsedPlayerCards)
    }
  }, [playerChoice, comChoice])


  return (
    <>
    <h1>Round{round}</h1>
    <h2>{turnPlayer}はカードを選んでください</h2>
    <h3>{whichComSelect}</h3>
    <h3>{winner}</h3>
    <div>
      <button onClick={() => comHandle()}>Computerがカードを選ぶ</button>
    </div>
    <h2>相手</h2>
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
    <h2>自分</h2>
    
    </>
  )
}

export default App
