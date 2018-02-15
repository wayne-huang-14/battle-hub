var React = require('react');
import { Button } from 'semantic-ui-react'

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
    var languages = ['All', 'JavaScript', 'Python', 'Ruby', 'Java', 'CSS'];
  
    return (
      <div>
        {languages.map(function(language) {
          return (
            <Button
              style={this.state.selectedLanguage === language ? {color: 'blue'} : null}
              key={language}
              onClick={this.updateLanguage.bind(this, language)}
            >
              {language}
            </Button>
          )
        }.bind(this))}
      </div>
    )
  }
}

module.exports = Leaderboard;