const express = require('express')
const router = express.Router()
const { getAllSignals, getSignal } = require('../../controllers/signalsController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/').get(getAllSignals)
/* .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewSignal)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateSignal)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteSignal) */

router.route('/:id').get(getSignal)

module.exports = router
