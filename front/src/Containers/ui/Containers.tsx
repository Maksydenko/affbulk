import { FC } from 'react';

import { containerData } from '../model';

import { Container } from './Container';

import s from './Containers.module.css';

export const Containers: FC = () => (
  <div className={s.containers}>
    <div className={s.section}>
      {containerData.map(({ heading, label }) => (
        <Container key={label} heading={heading} label={label} />
      ))}
    </div>
  </div>
);
