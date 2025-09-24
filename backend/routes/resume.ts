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

router.post('/pdf',authMiddleware('user'),resumeController.generatePDF.bind(resumeController))
router.post('/analysis',authMiddleware('user'),upload.single('file'),resumeController.AnalyzePDF.bind(resumeController))
router.post('/',authMiddleware('user'),resumeController.createResume.bind(resumeController))
router.get('/:resumeId',authMiddleware('user'),resumeController.getResume.bind(resumeController))
router.get('/',authMiddleware('user'),resumeController.getAllResumes.bind(resumeController))
router.post('/match',authMiddleware('user'),resumeController.generateResumeSection.bind(resumeController))
router.patch('/:resumeId',authMiddleware('user'),resumeController.SaveResume.bind(resumeController))
export default router