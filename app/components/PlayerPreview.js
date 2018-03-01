var React = require('react');
var Proptypes = require('prop-types');

/**
 * The player preview when the players are set and ready for battle.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.username
 * @param {string} props.score
 * @param {string} props.image
 * @param {*} props.children
 *
 * @returns {*}
 * @constructor
 */
function PlayerPreview({ title, username, score, image, children }) {
  return (
    <div
      className='player-wrapper'
      style={title === 'Won' ?
        {backgroundColor: '#D0F2FF', border: '1px solid #5CC9F3'} :
        {backgroundColor: '#F0F0F0', border: '1px solid #D8D8D8'}}
    >
      <div className='player-preview-title'>{title}</div>
      <h4>@{username}</h4>
      {Number.isInteger(score) && <p>Score: {score}</p>}
      <div className='player-preview-image-wrapper'>
        {title === 'Won'&& <div className='won-crown'></div>}
        <img
          src={image}
          alt={'Avatar for ' + username}
        />
      </div>
      {children}
    </div>
  )
}

PlayerPreview.prototypes = {
  title: Proptypes.string.isRequired,
  username: Proptypes.string.isRequired,
  image: Proptypes.string.isRequired,
};

module.exports = PlayerPreview;