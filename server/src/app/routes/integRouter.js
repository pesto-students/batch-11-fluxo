import express from 'express';
import gitconfig from '../../thirdparty/githubAPI/config';

const router = express.Router();

router.get('/slack', (req, res) => {
  const { id: userId } = req.userData;
  res.redirect(`/tp/slack/integrate/${userId}`);
});

router.get('/github', (req, res) => {
  const { id: userId } = req.userData;
  res.redirect(`${gitconfig.install_url}${userId}`);
});

export default router;
