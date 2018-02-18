var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
import {Button, Grid, Table} from 'semantic-ui-react'
import crownIcon from '../images/crown.png';
import starsIcon from '../images/stars.png';

/**
 * Shows the Leaderboard repositories based on language selected.
 *
 * @param {Object} props
 * @returns {*}
 * @constructor
 */
function RepoTable(props) {
  var repos = props.repos;
  var crownIconStyles = {
    width: '3.2rem',
    paddingTop: '0.4rem',
    background: 'no-repeat url("' + crownIcon + '") top right'
  };
  
  /**
   * Returns the row class name based on the repository rank.
   *
   * @param {int} rank
   * @returns {String}
   */
  var getRowClassName = function(rank) {
    switch(rank) {
      case 1:
      case 2:
      case 3:
        return 'leaderboard-top-repos';
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        return 'leaderboard-mid-repos';
      default:
        return null;
    }
  };
  
  /**
   * Based on the ranking number a presentational name will be returned.
   *
   * @param {int} rank
   * @returns {String}
   */
  var showRankName = function(rank) {
    var rankName;
    switch (rank) {
      case 1:
        rankName = '1st';
        break;
      case 2:
        rankName = '2nd';
        break;
      case 3:
        rankName = '3rd';
        break;
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        rankName = rank + 'th';
        break;
      default:
        rankName = rank;
    }
    
    return rankName;
  };
  
  return (
    <div className='table-wrapper'>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rank</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell><img src={starsIcon} /></Table.HeaderCell>
            <Table.HeaderCell>Repository</Table.HeaderCell>
            <Table.HeaderCell>Language</Table.HeaderCell>
            <Table.HeaderCell>Watchers</Table.HeaderCell>
            <Table.HeaderCell>Forks</Table.HeaderCell>
            <Table.HeaderCell>Issues</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        
        <Table.Body>
          {repos.map(function (repo, index) {
            return (
              <Table.Row
                key={repo.name}
                className={getRowClassName(index + 1)}
              >
                <Table.Cell className='leaderboard-rank'>
                  {showRankName(index + 1)}
                </Table.Cell>
                <Table.Cell>
                  <div className='leaderboard-username-container'>
                    <div
                      className='leaderboard-avatar-container'
                      style={index === 0 ? crownIconStyles : null}
                    >
                      <img
                        src={repo.owner.avatar_url}
                        className='avatar'
                        alt={'Avatar for @' + repo.owner.login}
                      />
                    </div>
                    <span className='leaderboard-username'>{'@' + repo.owner.login}</span>
                  </div>
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