import {metrics} from '../data/waterQualityMetrics.js'
import DataLectures from '../models/DataLectures.js'

const receiveDataFromLoraRx = async (req, res) => {
    const { ph, tds, temperatura, turbidez, ubicacion } = req.body

    const lastEntry = await DataLectures.findOne().sort({ fecha: -1})
    if (lastEntry && (new Date() - lastEntry.fecha) < 10000) {
        return res.status(409).json({
            msg: 'Datos ya registrados recientemente.'
        })
    }
    try {
        const newData = new DataLectures({ ph, tds, temperatura, turbidez, ubicacion })
        await newData.save()
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor'
        })
    }
}



const createDataLecture = async (req, res) => {
    if(Object.values(req.body).includes('')) {
        return res.status(400).json({
            msg: 'Todos los campos son obligatorios'
        })
    }
    try {
        const dataLecture = new DataLectures(req.body)
        await dataLecture.save()

        res.status(201).json({
            msg: 'La lectura de datos se creo correctamente'
        })
    } catch (error) {
        console.log('Error al guardar la lectura:', error)
        res.status(500).json({
            msg: 'Error en el servidor'
        })
    }
}

const getDataLectures = async (req, res) => {
    try {
        const dataLectures = await DataLectures.find().sort({ fecha: -1 })
        res.json(dataLectures)
    } catch (error) {
        console.log('Error al obtener las lecturas:', error)
        res.status(500).json({
            msg: 'Error en el servidor'
        })
    }
}

const getLastDataLecture = async (req, res) => {
    try {
        const lastLecture = await DataLectures.findOne().sort({ fecha: -1 });
        if (!lastLecture) {
            return res.status(404).json({ msg: 'No hay lecturas registradas' });
        }
        res.json(lastLecture);
    } catch (error) {
        console.error("Error al obtener la última lectura:", error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const getLast7DaysData = async (req, res) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const data = await DataLectures.find({ fecha: { $gte: sevenDaysAgo } }).sort({ fecha: -1 });
        res.json(data);
    } catch (error) {
        console.error("Error al obtener lecturas de los últimos 7 días:", error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const getLastMonthData = async (req, res) => {
    try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

        const data = await DataLectures.find({ fecha: { $gte: oneMonthAgo } }).sort({ fecha: -1 });
        res.json(data);
    } catch (error) {
        console.error("Error al obtener lecturas del último mes:", error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const getLast3MonthsData = async (req, res) => {
    try {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setDate(threeMonthsAgo.getDate() - 90);

        const data = await DataLectures.find({ fecha: { $gte: threeMonthsAgo } }).sort({ fecha: -1 });
        res.json(data);
    } catch (error) {
        console.error("Error al obtener lecturas de los últimos 3 meses:", error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

export {
    receiveDataFromLoraRx,
    createDataLecture,
    getDataLectures,
    getLastDataLecture,
    getLast7DaysData,
    getLastMonthData,
    getLast3MonthsData
}
