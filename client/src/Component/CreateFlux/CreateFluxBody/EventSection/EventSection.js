import React from 'react';
import SimpleSelect from '../../../../MaterialUI/Component/SimpleSelect/SimpleSelect';
import style from './Event.module.scss';

const EventSection = () => {
  return (
    <div className={style.Container}>
      <h2>When</h2>
      <div className={style.Event}>
        <SimpleSelect
          labelText='App'
          itemList={[
            { value: 'Slack', displayValue: 'Slack' },
            { value: 'Gmail', displayValue: 'Gmail' },
          ]}
        />
        <SimpleSelect
          labelText='Triggers'
          itemList={[
            { value: 'New Message', displayValue: 'New Message' },
            { value: 'New Gmail', displayValue: 'New Gmail' },
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

export default EventSection;
