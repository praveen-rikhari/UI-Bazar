import { model, models, Schema } from "mongoose"

const userSchema = new Schema({
    clerk_user_id: String,
    first_name: String,
    last_name: String,
    email: String,
    imgUrl: String,
}, {
    timestamps: true,
});

const User = models.User || model("User", userSchema);

export default User;