import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { token } = reqBody;

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpires: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json({ error: 'Token is invalid or has expired' }, { status: 400 });
        }

        await User.findByIdAndUpdate(user._id, {
            isVerified: true,
            verifyToken: null,
            verifyTokenExpires: null
        })


        return NextResponse.json({
            message: 'Email verified successfully',
            success: true,
        }, { status: 200 });

    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}