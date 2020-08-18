import React from 'react';
import RepoItem from '../repos/RepoItem';

export const Repos = ({ repos }) => {
  return (
    <div>
      {repos.map((repo) => (
        <RepoItem repo={repo} key={repo.id}></RepoItem>
      ))}
    </div>
  );
};
