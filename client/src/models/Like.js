import mongoose, { model, models, Schema } from 'mongoose';

const likeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
});

const Like = models.Like || model("Like", likeSchema);

export default Like;