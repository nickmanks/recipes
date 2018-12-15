import fetch from 'node-fetch';

const owner = 'nickmanks';
const repo = 'recipes';

// eslint-disable-next-line no-undef
const log = (msg)=> process.stderr.write(`${msg}\n`);


const reposQuery = `query {
  repository(owner: "${owner}", name: "${repo}") {
    pullRequests(states: OPEN, first: 100) {
      nodes {
        number,
        title,
        commits(last: 1) {
          nodes {
            resourcePath
          }
        },
        labels(first: 100) {
          nodes {
            name
          }
        }
      }
    }
  }
}`;


const availableEnvs = ['recipes01', 'recipes02', 'recipes03'];


const simplify = ({data})=> (
  data.repository.pullRequests.nodes.map(
    (pr)=> ({
      number: pr.number,
      lastCommit: pr.commits.nodes[0].resourcePath.split('/').pop(),
      labels: pr.labels.nodes.map(({name})=> name)
    })
  )
);


const getPrEnv = (commit, pr)=> {
  log(`checking if PR ${pr.number} has an assigned deployment env`);

  const envs = new Set(availableEnvs);

  if (pr.lastCommit === commit) {
    for (const label of pr.labels) {
      if (envs.has(label)) {
        return label;
      }
    }
  }
};


const getPR = (commit, prs)=> {
  log(`finding PR for ${commit}`);
  const commitPR = prs.find((pr)=> pr.lastCommit === commit);

  log(`PR for ${commit} is ${commitPR.number}`);
  return commitPR;
};


const getFreeEnv = (commit, prs)=> {
  log(`finding free deployment env for ${commit}`);

  const freeEnvs = new Set(availableEnvs);

  for (const pr of prs) {
    for (const label of pr.labels) {
      freeEnvs.delete(label);
    }
  }

  const [env] = freeEnvs;
  return env;
};


const queryGithub = async (query, token)=> {
  const resp = await fetch(
    'https://api.github.com/graphql',
    {
      method: 'POST',
      headers: {Authorization: `bearer ${token}`},
      body: JSON.stringify({query})
    }
  );

  return await resp.json();
};


const labelPr = async (pr, label, token)=> {
  log(`reserving ${label} for PR #${pr.number}`);

  await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues/${pr.number}/labels`,
    {
      method: 'POST',
      headers: {Authorization: `bearer ${token}`},
      body: JSON.stringify([label])
    }
  );
};


const getPullRequests = async (token)=> {
  log(`getting all open PRs`);
  const reposData = await queryGithub(reposQuery, token);
  return simplify(reposData);
};


export const reserve = async (commit, token)=> {
  log(`reserving auto deployment env for commit ${commit}`);

  const prs = await getPullRequests(token);
  const pr = getPR(commit, prs);
  const prEnv = getPrEnv(commit, pr);
  const env = prEnv || getFreeEnv(commit, prs);

  if (env && env !== prEnv) {
    await labelPr(pr, env, token);
    return env;
  }

  log(`deployment env '${env}' already reserved for PR #${pr.number}`);
  return env;
};
