import dotenv from 'dotenv'
dotenv.config()
const SUPABASEURL=process.env.SUPABASEURL
const SUPABASEANONKEY=process.env.SUPABASEANONKEY
console.log(process.env.NODE_ENV)
console.log(SUPABASEURL)
console.log(SUPABASEANONKEY)