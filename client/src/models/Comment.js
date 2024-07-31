import mongoose, { model, models, Schema, } from "mongoose"

const commentSchema = new Schema({
    userId: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    comment: String,
}, {
    timestamps: true
})

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;