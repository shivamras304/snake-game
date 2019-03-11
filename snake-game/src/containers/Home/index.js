import React, { Component } from 'react'
import styles from './index.module.css'
import Game from '../Game'
import Auth from '../Auth'
import { connect } from 'react-redux'
import snakeSvg from '../../assets/icons/snake.svg'
import heartSvg from '../../assets/icons/heart.svg'

class Home extends Component {
  render() {
    return (
      <div className={styles.Home}>
        <header className={styles.Header}>
          <img className={styles.SnakeLogo} src={snakeSvg} alt='Snake Logo'/>
          <h1>SNAKE</h1>
        </header>
        <main className={styles.Main}>
          {this.props.isSignedIn ? <Game /> : <Auth />}
        </main>
        <footer className={styles.Footer}>
          <div>Created with&nbsp;
            <img className={styles.FooterHeart} src={heartSvg} alt='love'/>
            &nbsp;by&nbsp;
            <a 
              className={styles.FooterAuthor} 
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/shivamras304'>Shivam Rastogi</a>
          </div>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps)(Home)