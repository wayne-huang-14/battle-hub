const axios = require('axios');

const id = "87313cc0a9b63da78945";
const sec = "ee9ea98f2897d5d4bec6af3abd8e99a8114a2734";
const params = `?client_id=${id}&client_secret=${sec}`;

/**
 * Gets the user's profile information.
 *
 * @param username
 */
function getProfile(username) {
  return axios.get(`https://api.github.com/users/${username}${params}`)
    .then(({ data }) => data);
}

/**
 * Gets the user's public repositories.
 *
 * @param username
 */
function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
}

/**
 * For all the public repos count up all the stars
 *
 * @param repos
 */
function getStarCount(repos) {
  return repos.data.reduce((count, { stargazers_count }) => count + stargazers_count, 0);
}

/**
 * Calculates a score based on a user's profile and repos
 *
 * @param profile
 * @param repos
 *
 * @returns {*}
 */
function calculateScore({ followers }, repos) {
  return (followers * 3) + getStarCount(repos);
}

/**
 * Error handling
 *
 * @param error
 *
 * @returns {null}
 */
function handleError(error) {
  console.warn(error);
  
  return null;
}

/**
 * Gets both the user's profile and repositories to return an object with the profile and score.
 *
 * @param username
 *
 * @returns {PromiseLike<T> | Promise<T> | *}
 */
function getUserData(username) {
  return Promise.all([
    getProfile(username),
    getRepos(username)
  ]).then(([ profile, repos ]) => ({
    profile,
    score: calculateScore(profile, repos)
  }));
}

/**
 * Sorts players based on score
 *
 * @param players
 *
 * @returns {void|*}
 */
function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score)
}

module.exports = {
  battle: function(players) {
    return Promise.all(
      players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  fetchPopularRepos: function(language) {
    const encodedURI = window.encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );
    
    return (
      axios.get(encodedURI)
        .then((response) => response.data.items)
    )
  }
};