var React = require('react');
var Proptypes = require('prop-types');

/**
 * The player preview view when the username is entered.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
function PlayerPreview(props) {
  return (
    <div
      className='player-wrapper'
      style={props.title === 'Won' ?
        {backgroundColor: '#D0F2FF', border: '1px solid #5CC9F3'} :
        {backgroundColor: '#F0F0F0', border: '1px solid #D8D8D8'}}
    >
      <div className='player-preview-title'>{props.title}</div>
      <h4>@{props.username}</h4>
      {Number.isInteger(props.score) && <p>Score: {props.score}</p>}
      <div className='player-preview-image-wrapper'>
        {props.title === 'Won'&& <div className='won-crown'></div>}
        <img
          src={props.image}
          alt={'Avatar for ' + props.username}
        />
      </div>
      {props.children}
    </div>
  )
}

PlayerPreview.prototypes = {
  title: Proptypes.string.isRequired,
  username: Proptypes.string.isRequired,
  image: Proptypes.string.isRequired,
};

module.exports = PlayerPreview;