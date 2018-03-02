import axios from 'axios';

const id = "87313cc0a9b63da78945";
const sec = "ee9ea98f2897d5d4bec6af3abd8e99a8114a2734";
const params = `?client_id=${id}&client_secret=${sec}`;

/**
 * Gets the user's profile information.
 *
 * @param username
 */
async function getProfile(username) {
  const profile =  await axios.get(`https://api.github.com/users/${username}${params}`);
  
  return profile.data;
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
async function getUserData(username) {
  const [ profile, repos ] = await Promise.all([
    getProfile(username),
    getRepos(username)
  ]);
  
  return {
    profile,
    score: calculateScore(profile, repos)
  }
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

export async function battle(players) {
  const results = await Promise.all(players.map(getUserData))
    .catch(handleError);
  
  return results === null
    ? results
    : sortPlayers(results)
}

export async function fetchPopularRepos(language) {
  const encodedURI = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );
  
  const repos = await axios.get(encodedURI);
  
  return repos.data.items;
}