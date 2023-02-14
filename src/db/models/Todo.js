import mongoose from 'mongoose';
const { Schema } = mongoose;

const TodoSchema = new Schema({
    task: {
        type: String,
        trim: true
    },
    status: {
        type: Number
    },
    created_on: {
        type: Date
    },
    last_updated: {
        type: Date,
        default: Date.now
    },
    deleted_on: {
        type: Date
    }
})

const Todo = mongoose.model("todo", TodoSchema);

TodoSchema.set('toJSON', {
    virtuals: true
});

export default Todo;