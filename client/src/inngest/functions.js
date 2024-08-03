import dbConnect from "@/dbConnect";
import { inngest } from "./client";
import User from "@/models/User";


export const syncUser = inngest.createFunction(
    { id: 'sync-user-from-clerk' },  // ←The 'id' is an arbitrary string used to identify the function in the dashboard
    { event: 'clerk/user.created' }, // ← This is the function's triggering event
    async ({ event }) => {
        const user = event.data; // The event payload's data will be the Clerk User json object
        const { id, first_name, last_name, image_url } = user;
        const email = user.email_addresses.find(e =>
            e.id === user.primary_email_address_id
        ).email
        //   await database.users.insert({ id, email, first_name, last_name })
        try {
            dbConnect();
            const newUser = await new User({
                clerk_user_id: id,
                first_name,
                last_name,
                email,
                imgUrl: image_url,
            });
            await newUser.save();
        } catch (error) {
            console.log(error);
        }
    }
)