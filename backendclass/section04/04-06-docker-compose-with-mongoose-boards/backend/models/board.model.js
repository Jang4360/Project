import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema({
    writer: String,
    title: String,
    contents: String
})
export const Board=mongoose.model('Board',boardSchema) //Board라는 이름의 writer, title, contents로 구성된 collection을 만듦