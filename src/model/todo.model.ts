import mongoose from 'mongoose';

//  An interface that describe the properties
//  that are require to create a new todo
// Input from FrontEnd
interface TodoAttrs {
    title: string;
    userId: string;
    completed?: boolean;
}

// An interface that describes the properties
// that todo Document has
// ALl the properties a Acutal Doc of a todo can have in Mongodb like some extra may be
interface TodoDoc extends mongoose.Document {
    title: number;
    userId: string;
    completed: boolean;
}

// An interface that describes the properties
// that a todo Model has
// we creating a build method which internally call create new todo to create a todo we defining what it will take as input and what it will output
interface TodoModel extends mongoose.Model<TodoDoc> {
    build(attrs: TodoAttrs): TodoDoc;
}

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
);

todoSchema.statics.build = (attrs: TodoAttrs) => {
    return new Todo(attrs);
};

const Todo = mongoose.model<TodoDoc, TodoModel>('Todo', todoSchema);

export { Todo };
