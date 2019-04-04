import * as React from 'react';
import styles from './Total.module.scss';

export interface ITotalProps {
  total: number;
}

export class Total extends React.Component<ITotalProps, {}> {
  public render(): React.ReactElement<ITotalProps> {
    return (
      <div className={styles.total}>
        ${this.props.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </div>
    );
  }
}
