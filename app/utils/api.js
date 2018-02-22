var axios = require('axios');

/**
 * Gets the user's profile information.
 *
 * @param username
 */
function getProfile(username) {
  return axios.get('https://api.github.com/users/' + username)
    .then(function(user) {
      return user.data;
    })
}

/**
 * Gets the user's public repositories.
 *
 * @param username
 */
function getRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + '&per_page=100');
}

/**
 * For all the public repos count up all the stars
 *
 * @param repos
 */
function getStarCount(repos) {
  return repos.reduce(function(accumulator, repo) {
    return accumulator + repo.stargazers_count;
  }, 0);
}

/**
 * Calculates a score based on a user's profile and repos
 *
 * @param profile
 * @param repos
 *
 * @returns {*}
 */
function calculateScore(profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);
  
  return (followers * 3) + totalStars;
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
  return axios.all([
    getProfile(username),
    getRepos(username)
  ]).then(function(data) {
    var profile = data[0];
    var repos = data[1];
    
    return {
      profile: profile,
      score: calculateScore(repos)
    }
  })
}

/**
 * Sorts players based on score
 *
 * @param players
 *
 * @returns {void|*}
 */
function sortPlayers(players) {
  return players.sort(function(a, b) {
    return b.score - a.score;
  })
}

module.exports = {
  battle: function(players) {
    return axios.all(
      players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  fetchPopularRepos: function(language) {
    var encodedURI = window.encodeURI(
      'https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories'
    );
    
    return (
      axios.get(encodedURI)
        .then(function(response) {
          return response.data.items;
        })
    )
  }
};