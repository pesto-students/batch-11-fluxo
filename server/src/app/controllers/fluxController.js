import fluxUtil from '../dbutils/Flux';


const getAllFlux = async (req, res) => {
  const fluxes = await fluxUtil.getAllFlux(req.userData.id);
  res.send(fluxes);
};

const addFlux = async (req, res) => {
  const flux = await fluxUtil.addFlux(req.userData.id, req.body);
  res.send(flux);
};

export default {
  getAllFlux,
  addFlux,
};
