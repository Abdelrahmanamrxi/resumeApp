import express from 'express'
import ATSController from '../controller/ATS/atsController'
import ATS_Service from '../services/ATS/atsService'
import authMiddleware from '../middleware/authMiddleware'
import OpenApiService from '../services/openApi/openapiService'
import CloudinaryService from '../services/cloudinary/cloudinaryService'
import ParseService from '../services/parseText/parseService'
import upload from '../middleware/mutlerMiddleware'
const router=express.Router()

const atsService=new ATS_Service(new CloudinaryService(),new ParseService(),new OpenApiService())
const atsController=new ATSController(atsService)

router.get('/results/latest',authMiddleware('user'),atsController.getLatestATSResults.bind(atsController))
router.get('/results/:id',authMiddleware('user'),atsController.getATSResults.bind(atsController))
router.get('/',authMiddleware('user'),atsController.getAllATS.bind(atsController))
router.post('/analysis',authMiddleware('user'),upload.single('file'),atsController.AnalyzePDF.bind(atsController))
export default router

