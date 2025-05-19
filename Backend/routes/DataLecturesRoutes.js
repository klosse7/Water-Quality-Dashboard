import express from 'express'
import { 
    createDataLecture,
    getDataLectures,
    getLastDataLecture, 
    getLast7DaysData, 
    getLastMonthData, 
    getLast3MonthsData } from '../controllers/DataLecturesController.js'

const router = express.Router()

router.post('/', createDataLecture)
router.get('/', getDataLectures)
router.get('/last', getLastDataLecture);
router.get('/last-7-days', getLast7DaysData);
router.get('/last-month', getLastMonthData);
router.get('/last-3-months', getLast3MonthsData);

export default router