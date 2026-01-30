import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// USER: PLEASE REPLACE THIS WITH YOUR GOOGLE SHEET ID
// The ID is the long string in the URL: https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
const SPREADSHEET_ID = '1uuaLWnGNArqMXZyXnURAjMH9TTZzH9YsVirgRmIvMho';
const KEY_FILE = 'service-account.json';

async function testConnection() {
    console.log('Testing Google Sheets API connection with Service Account...');

    try {
        const keyPath = path.join(process.cwd(), KEY_FILE);
        if (!fs.existsSync(keyPath)) {
            throw new Error(`Service account file not found at: ${keyPath}`);
        }

        // Authenticate with Service Account
        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_FILE,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // 1. Try to read from the sheet to verify basic access
        console.log('Attempting to read sheet metadata...');
        const metadata = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });
        console.log('✅ Auth & Read successful!');
        console.log(`Sheet Title: ${metadata.data.properties?.title}`);

        // 2. Try to append a row (Write access)
        console.log('\nAttempting to append a test row...');

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:E', // Adjust 'Sheet1' if your sheet name is different
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [
                        'Test Name (Service Account)',
                        'test@serviceaccount.com',
                        'Test Subject',
                        'This message was written by the secure Service Account',
                        new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
                    ]
                ]
            }
        });

        console.log('✅ Write successful!');
        console.log(response.data);

    } catch (error: any) {
        console.error('\n❌ API Error:');
        if (error.code === 403 || error.code === 401) {
            console.error('Permission denied. Make sure you shared the sheet with the Service Account email.');
            console.error('Email: kiranserviceaccount@zeroloss-483318.iam.gserviceaccount.com');
        } else if (error.code === 404) {
            console.error('Spreadsheet not found or ID is incorrect.');
        }
        console.error(`Message: ${error.message}`);
    }
}

testConnection();
