import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Config

// TODO: Replace with your actual Google Sheet ID
const SPREADSHEET_ID = '1uuaLWnGNArqMXZyXnURAjMH9TTZzH9YsVirgRmIvMho';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Initialize Google Sheets API with Service Account
        const auth = new google.auth.GoogleAuth({
            keyFile: 'service-account.json', // Path to your JSON key file
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Prepare date
        const date = new Date().toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'medium',
            timeZone: 'Asia/Kolkata' // Optional: forcing user's timezone if preferred, or remove for server time
        });

        // Append to sheet
        // Assumes columns: Name, Email, Subject, Message, Date
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:E', // Adjust range/sheet name as needed
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [name, email, subject, message, date]
                ]
            }
        });

        return NextResponse.json({ success: true, data: response.data }, { status: 200 });

    } catch (error: any) {
        console.error('Google Sheets API Error:', error);

        // Detailed error handling
        let errorMessage = 'Failed to submit form';
        if (error.code === 403) {
            errorMessage = 'Permission denied. The API Key may not have write access to this sheet.';
        } else if (error.code === 404) {
            errorMessage = 'Spreadsheet not found.';
        }

        return NextResponse.json(
            { error: errorMessage, details: error.message },
            { status: 500 }
        );
    }
}
