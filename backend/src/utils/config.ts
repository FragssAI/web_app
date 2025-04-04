
interface ConfigProps {
    PORT: string;
    ENVIRONMENT: string;
    STRIPE_PUBLIC: string;
    STRIPE_SECRET: string;
    CLERK_PUBLIC: string;
    CLERK_SECRET: string;
    S3_ACCESS: string;
    S3_SECRET: string;
    S3_BUCKET: string;
    S3_REGION: string;
    NGROK_DOMAIN?: string;
    NGROK_AUTHTOKEN?: string;
    CLERK_SIGNING_SECRET: string;
    STRIPE_SIGNING_SECRET: string;
}


const PORT = process.env.PORT || '3000'
const ENVIRONMENT = process.env.NODE_ENV || 'development'
const STRIPE_PUBLIC = process.env.STRIPE_PUBLISHABLE_KEY || ''
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || ''
const CLERK_PUBLIC = process.env.CLERK_PUBLISHABLE_KEY || ''
const CLERK_SECRET = process.env.CLERK_SECRET_KEY || ''
const S3_ACCESS = process.env.S3_ACCESS_KEY || ''
const S3_SECRET = process.env.S3_SECRET_ACCESS_KEY || ''
const S3_BUCKET = process.env.S3_BUCKET_NAME || ''
const S3_REGION = process.env.S3_BUCKET_REGION || ''
const NGROK_DOMAIN = process.env.NGROK_DOMAIN || ''
const NGROK_AUTHTOKEN = process.env.NGROK_AUTHTOKEN || ''
const CLERK_SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET || ''
const STRIPE_SIGNING_SECRET = process.env.STRIPE_SIGNING_SECRET || ''


const config: ConfigProps = {
    PORT,
    STRIPE_PUBLIC,
    STRIPE_SECRET,
    CLERK_PUBLIC,
    CLERK_SECRET,
    S3_BUCKET,
    S3_REGION,
    S3_ACCESS,
    S3_SECRET,
    ENVIRONMENT,
    NGROK_DOMAIN,
    NGROK_AUTHTOKEN,
    CLERK_SIGNING_SECRET,
    STRIPE_SIGNING_SECRET
}

export default config
