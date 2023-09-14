import {NextResponse} from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:  process.env.CLOUDINARY_API_SECRET
})

// export async function GET() {
//     return NextResponse.json(
//         { message: 'Hello from upload' }, 
//         {status: 200}
//     )
// }

export async function POST (request:Request) {
    const {path} = await request.json()

    if (!path) {
        return NextResponse.json(
            { message: 'image path is required' }, 
            {status: 400}
        )
    }

    try {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            transformation: [{ with: 1000, height: 752, crop: 'scale' }]
        }

        const result = await cloudinary.uploader.upload(path, options)

        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}