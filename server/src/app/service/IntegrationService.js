import slackAPI from '../../thirdparty/slackAPI';
import fluxUtils from '../dbutils/Flux';

const executeEvent = async (eventObj) => {
  const integApps = eventObj.integratedApps;
  const fluxes = await fluxUtils.getAllFluxForEvents(integApps);

  for (let flux of fluxes) {
    if (flux.isEnable === true) {
      const { eventInputs, actionInputs } = flux;
      const evtInputKeys = eventInputs.keys();
      const actInputKeys = actionInputs.keys();
      console.log(evtInputKeys);
      let isSatisfies = true;
      for (const key of evtInputKeys) {
        if (eventInputs.get(key)['value'] !== eventObj.event[key]) {
          isSatisfies = false;
          break;
        }
      }
      console.log(actInputKeys, flux,eventObj);
      if (isSatisfies) {
        console.log('Going to perform action');
        const actionData = {};
        actionData['action'] = flux.actionName;
        actionData['integId'] = flux.actionAppId;
        for (const key of actInputKeys) {
          if (actionInputs.get(key).user_provided === true) {
            actionData[key] = actionInputs.get(key).value;
          } else {
            actionData[key] = eventObj.event[key];
          }
        }

        console.log(actionData);
        slackAPI.performAction(actionData);
      }
    }

    
  }
};

const initialize = () => {
  slackAPI.registerEventCB(executeEvent);
};

export default { initialize };
