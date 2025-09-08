import express from 'express'
import ResumeController from '../controller/resume/resumeController'
import ResumeService from '../services/resume/resumeService'
import CloudinaryService from '../services/cloudinary/cloudinaryService'
import authMiddleware from '../middleware/authMiddleware'
import upload from '../middleware/mutlerMiddleware'
import OpenApiService from '../services/openApi/openapiService'
const router=express.Router()
const cloudinaryService=new CloudinaryService()
const openApiService=new OpenApiService()
const resumeService=new ResumeService(cloudinaryService,openApiService)
const resumeController=new ResumeController(resumeService)
router.post('/generatePDF',authMiddleware('user'),resumeController.generatePDF.bind(resumeController))
router.post('/analyzeResume',authMiddleware('user'),upload.single('file'),resumeController.AnalyzePDF.bind(resumeController))
router.post('/createResume',authMiddleware('user'),resumeController.createResume.bind(resumeController))
router.get('/getResume/:resumeId',authMiddleware('user'),resumeController.getResume.bind(resumeController))
router.get('/getAllResumes',authMiddleware('user'),resumeController.getAllResumes.bind(resumeController))
export default router