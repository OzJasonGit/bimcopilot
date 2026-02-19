import { connectToDatabase } from '../../utils/mongodb';
import Email from '../../../Modules/Email/email';
import { addSubscriberToKit } from '../../utils/kit';

export async function POST(req) {
    try {
        const db = await connectToDatabase();
        const emailData = await req.json(); // Assuming req.body is a JSON body

        // Check if the email already exists
        const existingEmail = await db.collection('emails').findOne({ email: emailData.email });
        if (existingEmail) {
            return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 409 });
        }

        // Create a new email document
        const newEmail = new Email(emailData);

        // Save the email document in the 'emails' collection
        await db.collection('emails').insertOne(newEmail);

        // Add to Kit (newsletter list) – non-blocking
        try {
            await addSubscriberToKit({
                email: emailData.email,
                firstName: emailData.firstName || emailData.first_name,
            });
        } catch (kitError) {
            console.error('Kit newsletter sync failed:', kitError);
        }

        return new Response(JSON.stringify({ message: 'Email saved successfully' }), { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}




