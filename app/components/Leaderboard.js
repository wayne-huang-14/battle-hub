var React = require('react');
var PropTypes = require('prop-types');
import {Button, Grid} from 'semantic-ui-react'

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
    <div className='select-language-group-container'>
      <Grid>
        {languages.map(function (language) {
          return (
            <Grid.Column
              key={language}
              className='language-group-columns'
            >
              <Button
                active={props.selectedLanguage === language}
                onClick={props.handleOnClick.bind(null, language)}
              >
                {language === 'All' ? 'Repository King' : language}
              </Button>
            </Grid.Column>
          )
        })}
      </Grid>
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