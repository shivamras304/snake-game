import React from 'react'
import styles from './index.module.css'
import ScoreIcon from '../../assets/icons/star.svg'
import HighscoreIcon from '../../assets/icons/award.svg'
import LeaderboardIcon from '../../assets/icons/leaderboard.svg'
import LogoutIcon from '../../assets/icons/logout.svg'

const game = props => (
  <div className={styles.GameInfo}>
    
    <div>
      <div className={styles.UserInfo}>
        <img className={styles.UserPhoto} src={props.user.photoURL} alt="User"/>
        <div>{props.user.displayName.split(' ')[0]}</div>
      </div>
      <div className={styles.UserControls}>
        <div onClick={props.onLogout}><img src={LogoutIcon} alt="Logout"/></div>
        <div><img src={LeaderboardIcon} alt="Leaderboard"/></div>
      </div>
    </div>

    <div>
      <div className={styles.ScoreContainer}>
        <img src={ScoreIcon} alt="Score"/>
        <span>{props.score}</span>
      </div>
      <div className={styles.HighscoreContainer}>
        <img src={HighscoreIcon} alt="HighScore"/>
        <span>{props.highScore}</span>
      </div>
    </div>
  </div>
)

export default game