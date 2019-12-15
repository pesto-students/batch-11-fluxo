import express from 'express';

const router = express.Router();

router.get('/slack', (req, res) => {
  const { id: userId } = req.userData;
  res.redirect(`/tp/slack/integrate/${userId}`);
});

export default router;
