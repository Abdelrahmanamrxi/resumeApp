import express from 'express'
import ATSController from '../controller/ATS/atsController'
import ATS_Service from '../services/ATS/atsService'
import authMiddleware from '../middleware/authMiddleware'
const router=express.Router()
const atsController=new ATSController(new ATS_Service())
router.get('/results/latest',authMiddleware('user'),atsController.getLatestATSResults.bind(atsController))
router.get('/results/:id',authMiddleware('user'),atsController.getATSResults.bind(atsController))
router.get('/',authMiddleware('user'),atsController.getAllATS.bind(atsController))
export default router

