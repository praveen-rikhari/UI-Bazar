import mongoose, { model, models, Schema } from 'mongoose';

const postSchema = new Schema({
    userId: {type: String, required: true},
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    htmlCode: { type: String, required: true },
    cssCode: { type: String, required: true },
    likesCount: { type: Number, default: 0 }
}, {
    timestamps: true,
});

const Post = models.Post || model("Post", postSchema);
export default Post;