import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import { Button, Grid, Table } from 'semantic-ui-react'
import crownIcon from '../images/crown.png';
import starsIcon from '../images/stars.png';
import Summoning from './Summoning';
import Footer from './Footer';

/**
 * Shows the Leaderboard repositories based on language selected.
 *
 * @param {Object} props
 * @returns {*}
 * @constructor
 */
function RepoTable({ repos }) {
  const crownIconStyles = {
    width: '3.8rem',
    paddingTop: '0.4rem',
    background: `no-repeat url("${crownIcon}") top right`
  };
  
  /**
   * Returns the row class name based on the repository rank.
   *
   * @param {number} rank
   *
   * @returns {string} || null
   */
  const getRowClassName = (rank) => {
    switch (rank) {
      case 1:
        return 'leaderboard-first-repo';
      case 2:
        return 'leaderboard-second-repo';
      case 3:
        return 'leaderboard-third-repo';
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
   * @param {number} rank
   *
   * @returns {string}
   */
  const showRankName = (rank) => {
    let rankName;
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
        rankName = `${rank}th`;
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
          {repos.map(({ name, stargazers_count, owner, html_url, language, watchers_count, forks_count, open_issues_count }, index) => (
            <Table.Row
              key={name}
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
                      src={owner.avatar_url}
                      className='avatar'
                      alt={`Avatar for @${owner.login}`}
                    />
                  </div>
                  <span className='leaderboard-username'>{`@${owner.login}`}</span>
                </div>
              </Table.Cell>
              <Table.Cell>{stargazers_count}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{language}</Table.Cell>
              <Table.Cell>{watchers_count}</Table.Cell>
              <Table.Cell>{forks_count}</Table.Cell>
              <Table.Cell>{open_issues_count}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

RepoTable.prototypes = {
  repos: PropTypes.array.isRequired
};

/**
 * Select Language group that displays the language buttons.
 *
 * @param {Object} props
 *
 * @returns {*}
 */
function SelectLanguageGroup({ selectedLanguage, handleOnClick }) {
  const languages = [ 'All', 'JavaScript', 'Python', 'Ruby', 'Java', 'CSS' ];
  
  return (
    <div className='select-language-group-container'>
      <Grid columns={6}>
        {languages.map((language) => (
          <Grid.Column
            key={language}
            className='language-group-columns'
          >
            <Button
              active={selectedLanguage === language}
              onClick={() => handleOnClick(language)}
            >
              {language === 'All' ? 'Repository King' : language}
            </Button>
          </Grid.Column>
        ))}
      </Grid>
    </div>
  )
}

SelectLanguageGroup.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired
};

class Leaderboard extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: null
  };
  
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  
  /**
   * When a new language is selected, update the repos state.
   *
   * @param {string} lang
   */
  updateLanguage = async (lang) => {
    // Set repos to null since a new language was selected.
    this.setState(() => ({
      selectedLanguage: lang,
      repos: null
    }));
    
    const repos = await fetchPopularRepos(lang);
    this.setState(() => ({ repos }));
  };
  
  render() {
    const { selectedLanguage, repos } = this.state;
    
    /**
     * Scrolls the document body to the top.
     */
    const scrollToTop = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };
  
    return (
      <div id="leaderboard">
        <h3>See Which One's At The Top</h3>
        <p className='subheading'>Choose a category and see which repository has more stars and entered the top 30
          listing.</p>
        <SelectLanguageGroup
          selectedLanguage={selectedLanguage}
          handleOnClick={this.updateLanguage}
        />
      
        {!repos
          ? <Summoning />
          : <RepoTable repos={repos} />
        }
        
        {repos &&
          <section className='leaderboard-footnotes'>
            <p>All information is taken from GitHub.com</p>
            <div>
              <Button
                onClick={scrollToTop}
              >
                BACK TO TOP
              </Button>
            </div>
          </section>
        }
        {repos && <Footer />}
      </div>
    );
  }
}

export default Leaderboard;