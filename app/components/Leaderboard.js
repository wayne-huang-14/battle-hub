var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
import {Button, Grid, Table} from 'semantic-ui-react'

/**
 * Shows the Leaderboard repositories based on language selected.
 *
 * @param {Object} props
 * @returns {*}
 * @constructor
 */
function RepoTable(props) {
  var repos = props.repos;
  
  return (
    <div className='table-wrapper'>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rank</Table.HeaderCell>
            <Table.HeaderCell>UserName</Table.HeaderCell>
            <Table.HeaderCell>Stars</Table.HeaderCell>
            <Table.HeaderCell>Repository</Table.HeaderCell>
            <Table.HeaderCell>Language</Table.HeaderCell>
            <Table.HeaderCell>Watchers</Table.HeaderCell>
            <Table.HeaderCell>Forks</Table.HeaderCell>
            <Table.HeaderCell>Issues</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        
        <Table.Body>
          {repos.map(function(repo, index) {
            return (
              <Table.Row key={repo.name}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <img
                    src={repo.owner.avatar_url}
                    className='avatar'
                    alt={'Avatar for ' + repo.owner.login}
                  />
                  {repo.owner.login}
                  </Table.Cell>
                <Table.Cell>{repo.stargazers_count}</Table.Cell>
                <Table.Cell>{repo.name}</Table.Cell>
                <Table.Cell>{repo.language}</Table.Cell>
                <Table.Cell>{repo.watchers_count}</Table.Cell>
                <Table.Cell>{repo.forks_count}</Table.Cell>
                <Table.Cell>{repo.open_issues_count}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

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
      selectedLanguage: 'All',
      repos: null
    };
    
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  
  updateLanguage(lang) {
    // Set repos to null since a new language was selected.
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });
    
    // Fetch repos based on the language selected and set the repos state.
    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos: repos
          }
        })
      }.bind(this));
  }
  
  render() {
    return (
      <div id="leaderboard">
        <h3>See Which One's At The Top</h3>
        <h5>Choose a category and see which repository has more stars and entered the top 30 listing.</h5>
        <SelectLanguageGroup
          selectedLanguage={this.state.selectedLanguage}
          handleOnClick={this.updateLanguage.bind(this)}
        />
        {!this.state.repos
          ? <p>Loading...</p>
          : <RepoTable
            repos={this.state.repos}
          />
        }
       
      </div>
    )
  }
}

module.exports = Leaderboard;