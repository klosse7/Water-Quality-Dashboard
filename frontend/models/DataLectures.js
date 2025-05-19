import mongoose from "mongoose"
const DataLectureSchema = mongoose.Schema({
    ph: {
      type: Number,
      required: true
    },
    tds: {
      type: Number,
      required: true
    },
    temperatura: {
      type: Number,
      required: true
    },
    turbidez: {
      type: Number,
      required: true
    },
    ubicacion: {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true }
    },
    fecha: {
      type: Date,
      default: Date.now
    }
  }, { versionKey: false });

  const DataLectures = mongoose.model('DataLectures', DataLectureSchema)
  export default DataLectures