import express from 'express'
import { isEmpty as empty } from 'lodash';
import { searchByName } from './github_helpers';

const app = express()

app.get('/search/repos', (req, res) => {
  let { query: { repo: repoQuery } } = req
  if (empty(repoQuery)) return res.status(400).json({ error: 'Missing query' })

  searchByName({ name: repoQuery })
    .then(results => res.status(200).json({ results }))
    .catch(err => res.status(500).json({ error: err.toString() }))
})

export default app;

