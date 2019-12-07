const slackAPI = () => {
  let eventCb = null;
  let actionCb = null;
  const registerEventCB = (fn) => {
    console.log('Event CB registered');
    eventCb = fn;
  };

  const registerActionCB = (fn) => {
    console.log('Action CB is registered');
    actionCb = fn;
  };

  const onEvent = (eventObj) => {
    if (eventCb instanceof Function) {
      eventCb(eventObj);
    }
  };

  const performAction = (actionData) => {
    console.log(actionCb);
    if (actionCb instanceof Function) {
      actionCb(actionData);
    }
  };

  return {
    registerEventCB,
    onEvent,
    performAction,
    registerActionCB,
  };
};

export default slackAPI();
