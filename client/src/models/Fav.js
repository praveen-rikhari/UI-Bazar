import mongoose, { model, models, Schema } from 'mongoose'

const favSchema = new Schema({
    userId: String,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true,
})

const Fav = models.Fav || model("Fav", favSchema);

export default Fav;
