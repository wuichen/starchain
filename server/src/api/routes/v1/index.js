const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const ManagementClient = require('auth0').ManagementClient;

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.get('/idp', (req, res) => {
	const auth0 = new ManagementClient({
	  domain: 'starchain.auth0.com',
	  clientId: 'YlLR97rT7l3Zw0XvNMaLE0U20m5P3PXh',
	  clientSecret: 'XyEHBl7Dzubq26HtaYpLEC4WNZyPGywVMTuxds0oKeESbP4X-AMBF-iJAc8APYt3',
	  scope: 'read:users read:user_idp_tokens'
	});
	auth0.getUser({id:'instagram|1446451145'}, (err, user) => {
		if (err) {
			console.log(err)
		} else {
			console.log(user)
		}
		res.send(user)
	})
})

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

module.exports = router;
