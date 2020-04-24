const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  let { title, url, techs } = request.body;
  repo = { id: uuid(), likes: 0, title, url, techs }

  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  let { title, url, techs } = request.body;

  let repoIdx = repositories.findIndex(r => r.id === id);

  if (repoIdx < 0)
    return response.status(400).json({ eror: 'repository not found :(' })

  if (title)
    repositories[repoIdx] = { ...repositories[repoIdx], title }

  if (techs)
    repositories[repoIdx] = { ...repositories[repoIdx], techs }

  if (url)
    repositories[repoIdx] = { ...repositories[repoIdx], url }

  return response.json(repositories[repoIdx]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  let repoIdx = repositories.findIndex(r => r.id === id);

  if (repoIdx < 0)
    return response.status(400).json({ eror: 'repository not found :(' });

  repositories.splice(repoIdx, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  let repoIdx = repositories.findIndex(r => r.id === id);

  if (repoIdx < 0)
    return response.status(400).json({ eror: 'repository not found :(' });

  let repo = repositories[repoIdx] = { ...repositories[repoIdx], likes: repositories[repoIdx].likes + 1 };

  return response.json(repo);
});

module.exports = app;
