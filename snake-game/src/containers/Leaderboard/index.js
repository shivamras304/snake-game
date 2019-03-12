import React, { Component } from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import { lbLoad } from '../../store/actions'
import Spinner from '../../components/Spinner'

class Leaderboard extends Component {

  componentDidMount() {
    this.props.onLbLoad()
  }

  render() {
    return (
      <div className={styles.Leaderboard}>
        <div className={styles.Title}>Leaderboard</div>
        {this.props.data ? 
        (
          <table>
            <tbody>
              {
                this.props.data.map((doc, rank) => (
                  <tr key={rank} className={styles.Row}>
                    <td className={styles.Rank}>{rank + 1}</td>
                    <td className={styles.PhotoContainer}>
                      <img src={doc.photoURL} className={styles.Photo} alt={doc.displayName}/>
                    </td>
                    <td>{doc.displayName}</td>
                    <td className={styles.Highscore}>{doc.highScore}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : <div className={styles.Spinner}><Spinner /></div>}
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.lb.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLbLoad: () => dispatch(lbLoad())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)