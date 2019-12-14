import React from 'react';
import SimpleSelect from '../../../../MaterialUI/Component/SimpleSelect/SimpleSelect';
import style from './Action.module.scss';

const ActionSection = () => {
  return (
    <div className={style.Container}>
      <h2>Then</h2>
      <div className={style.Action}>
        <SimpleSelect
          labelText='App'
          itemList={[
            { value: 'Slack', displayValue: 'Slack' },
            { value: 'Gmail', displayValue: 'Gmail' },
          ]}
        />
        <SimpleSelect
          labelText='Do'
          itemList={[
            { value: 'New Direct Message', displayValue: 'New Direct Message' },
            { value: 'New Gmail', displayValue: 'New Gmail' },
          ]}
        />
        <SimpleSelect
          labelText='With'
          itemList={[
            { value: 'from', displayValue: 'from' },
            { value: 'subject', displayValue: 'subject' },
          ]}
        />
        <SimpleSelect
          labelText='In'
          itemList={[
            { value: 'test1@gmail.com', displayValue: 'test1@gmail.com' },
            { value: 'test2@gmail.com', displayValue: 'test2@gmail.com' },
          ]}
        />
      </div>
    </div>
  );
};

export default ActionSection;
