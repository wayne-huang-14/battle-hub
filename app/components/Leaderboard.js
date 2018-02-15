var React = require('react');
var PropTypes = require('prop-types');
import { Button } from 'semantic-ui-react'

/**
 * Select Language group that displays the language buttons.
 *
 * @param {Object} props
 * @returns {*}
 * @constructor
 */
function SelectLanguageGroup(props) {
  var languages = ['All', 'JavaScript', 'Python', 'Ruby', 'Java', 'CSS'];
  
  return (
    <div>
    {languages.map(function(language) {
      return (
        <Button
        style={props.selectedLanguage === language ? {color: 'blue'} : null}
        key={language}
        onClick={props.handleOnClick.bind(null, language)}
        >
          {language}
        </Button>
      )
    })}
    </div>
  )
}

SelectLanguageGroup.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired
};

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedLanguage: 'All'
    };
    
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  
  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang
      }
    })
  }
  
  render() {
    return (
      <div>
        <SelectLanguageGroup
          selectedLanguage={this.state.selectedLanguage}
          handleOnClick={this.updateLanguage.bind(this)}
        />
      </div>
    )
  }
}

module.exports = Leaderboard;