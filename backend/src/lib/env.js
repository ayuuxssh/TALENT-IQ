import "dotenv/config"

const clientUrl = process.env.CLIENT_URL?.trim().replace(/\/+$/, "");

export const ENV ={
    PORT : process.env.PORT,
    NODE_ENV:process.env.NODE_ENV,
    DB_URI:process.env.DB_URI,
        INNGEST_EVENT_KEY:process.env.INNGEST_EVENT_KEY,
INNGEST_SIGNING_KEY:process.env.INNGEST_SIGNING_KEY,
STREAM_API_KEY:process.env.STREAM_API_KEY,
STREAM_API_SECRET:process.env.STREAM_API_SECRET,
CLERK_PUBLISHABLE_KEY:process.env.CLERK_PUBLISHABLE_KEY,
CLERK_SECRET_KEY:process.env.CLERK_SECRET_KEY,
CLIENT_URL: clientUrl,
JOODLE_CLIENT_ID:process.env.JOODLE_CLIENT_ID,
JOODLE_CLIENT_SECRET:process.env.JOODLE_CLIENT_SECRET,

}