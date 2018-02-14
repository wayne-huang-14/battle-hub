var React = require('react');

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
      <ul>
        {languages.map(function(language) {
          return (
            <li
              style={this.state.selectedLanguage === language ? {color: 'blue'} : null}
              key={language}
              onClick={this.updateLanguage.bind(this, language)}
            >
              {language}
            </li>
          )
        }.bind(this))}
      </ul>
    )
  }
}

module.exports = Leaderboard;