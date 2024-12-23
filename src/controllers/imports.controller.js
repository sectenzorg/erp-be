const Imports = require("../models/imports.model");
const xlsx = require('xlsx');
const pdf = require('html-pdf-node');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const transporter = require('../emailTransport');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
// Initialize the AWS Secrets Manager client
const client = new SecretsManagerClient({
    region: 'us-east-1',  // Replace with your region
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Your AWS Access Key ID
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Your AWS Secret Access Key
    },
});
async function importData(request, reply) {
    try {
        const data = await request.file();
        const buffer = await data.toBuffer();
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = xlsx.utils.sheet_to_json(sheet);
        // Map Excel columns to DB fields
        const columnMapping = {
            no: 'no',
            nama: 'nama',
            email: 'email',
            alamat: 'alamat',
            noktp: 'noktp',
            'tanggal lahir': 'tanggallahir',
            'tanggal bergabung': 'tanggalbergabung',
            peran: 'peran',
            deskripsi: 'deskripsi',
        };
        // Parse Excel dates
        const parseExcelDate = (excelDate) => {
            if (typeof excelDate === 'number') {
                const date = xlsx.SSF.parse_date_code(excelDate);
                return new Date(Date.UTC(date.y, date.m - 1, date.d));
            }
            return excelDate;
        };
        // Check for duplicate emails in the Excel sheet
        const emailSet = new Set();
        const duplicatesInSheet = [];
        // Iterate through each row and check for duplicates
        excelData.forEach((row, index) => {
            const email = row['email address']; // Use the exact column name for emails in your Excel file
            if (email) {
                const normalizedEmail = email.toLowerCase(); // Normalize the email to lowercase for case-insensitive comparison
                if (emailSet.has(normalizedEmail)) {
                    duplicatesInSheet.push({ row: index + 1, email });
                } else {
                    emailSet.add(normalizedEmail);
                }
            }
        });
        // If duplicates are found, send a response with the duplicates
        if (duplicatesInSheet.length > 0) {
            return reply.status(400).send({
                status: '400',
                message: 'Duplicate emails found in the Excel sheet.',
                duplicates: duplicatesInSheet,
            });
        }
        // Transform data to match DB model
        const transformedData = excelData.map((row) => {
            const transformedRow = {};
            for (const [excelColumn, dbField] of Object.entries(columnMapping)) {
                if (excelColumn === 'tanggal lahir' || excelColumn === 'tanggal bergabung') {
                    transformedRow[dbField] = parseExcelDate(row[excelColumn]);
                } else {
                    transformedRow[dbField] = row[excelColumn];
                }
            }
            return transformedRow;
        });
        // Save data to MongoDB
        await Imports.insertMany(transformedData);
        return reply.send({ status: '200', message: 'Data imported successfully!' });
    } catch (err) {
        /*fastify.log.error(err);*/
        return reply.status(500).send({ status: '500', message: err });
    }
}
async function exportData(request, reply){
    try {
        // Fetch all users from MongoDB
        const imports = await Imports.find();
        // If no data found
        if (!imports || imports.length === 0) {
            return reply.status(404).send({ status: 'error', message: 'No data found to export.' });
        }
        // Prepare the data to export
        const data = imports.map(exceldata => ({
            Name: exceldata.nama,
            Email: exceldata.email,
            Address: exceldata.alamat,
            KTP: exceldata.noktp,
            tanggal_lahir: exceldata.tanggallahir,
            Tanggal_bergabung: exceldata.tanggalbergabung,
            Peran: exceldata.peran,
            Description: exceldata.deskripsi
        }));
        // Create a new workbook
        const wb = xlsx.utils.book_new();
        // Convert the data to a worksheet
        const ws = xlsx.utils.json_to_sheet(data);
        // Append the worksheet to the workbook
        xlsx.utils.book_append_sheet(wb, ws, 'imports');
        // Write the workbook to a buffer
        const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
        // Set headers for the Excel file download
        /*const timestamp = Date.now(); // Get the current time in milliseconds
        const filename = `imports_${timestamp}.xlsx`;
        reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        rreply.header('Content-Disposition', `attachment; filename=${filename}`);*/
        reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        reply.header('Content-Disposition', 'attachment; filename=imports.xlsx');
        // Send the buffer as the response
        return reply.send(buffer);
    } catch (err) {
        fastify.log.error(err);
        return reply.status(500).send({ status: 'error', message: 'An error occurred while exporting the data.' });
    }
}
async function generatePdf(request, reply) {
    // URL of the image
    /*const imageUrl = 'https://s3-ap-southeast-1.amazonaws.com/s3-studilmu-ap-southeast-1.amazonaws.com/image/STD-DES.jpg';*/
    const imageUrl = 'https://assets.studilmu.com/image/logo.png';
    // Fetch the image using Axios
    const response = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'arraybuffer', // important to get the binary data
    });
    // Convert the binary data to Base64
    const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
    // Create the data URI for the Base64 image
    const base64ImageString = `data:image/jpeg;base64,${imageBase64}`;
    // HTML content with embedded Base64 image
    const htmlContent = `
    <body style="margin: 0; padding: 0;">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;">
            <img src="data:image/jpeg;base64,${imageBase64}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <h1>Hello, PDF with Background Image!</h1>
    </body>`;
    if (!htmlContent) {
        return reply.status(400).send({ error: 'HTML content is required.' });
    }
    try {
        const options = {
            format: 'A4',
            printBackground: true,   // Ensure background images are rendered
            enableLocalFileAccess: true,  // Allow access to external resources
        };
        const file = { content: htmlContent };
        // Generate PDF from HTML
        const pdfBuffer = await pdf.generatePdf(file, options);
        // Send the PDF as a response
        reply.type('application/pdf').send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        reply.status(500).send({ error: 'Failed to generate PDF.' });
    }
}
async function sendEmail(request, reply) {
    try {
        // Extract email details from request body (for dynamic emails)
        const { to, cc, bcc, subject, text, html } = request.body;
        // Email details
        const mailOptions = {
            from: 'tanay.chatterjee7@gmail.com', // Sender address
            to, // Recipient(s)
            cc, // Carbon Copy recipients
            bcc, // Blind Carbon Copy recipients
            subject, // Subject line
            text, // Plain text body
            html, // HTML body
        };
        // Send email using Nodemailer
        const info = await transporter.sendMail(mailOptions);
        // Respond with success
        reply.send({
            success: true,
            message: 'Email sent successfully!',
            info,
        });
    } catch (error) {
        console.error('Error sending email:', error);
        reply.status(500).send({
            success: false,
            message: 'Failed to send email.',
            error: error.message,
        });
    }
}
async function getSecretValue(secretName) {
    const command = new GetSecretValueCommand({
        SecretId: secretName,
    });
    try {
        const data = await client.send(command);
        if (data.SecretString) {
            return JSON.parse(data.SecretString); // Parse the JSON secret string
        } else {
            const buff = Buffer.from(data.SecretBinary, 'base64');
            return buff.toString('ascii');
        }
    } catch (error) {
        console.error('Error retrieving secret:', error);
        throw new Error('Failed to retrieve secret');
    }
}
async function sendAwsEmail(request, reply) {
    try {
        const secretName = 'APPLICATION_CREDENTIAL';  // The name of your secret in Secrets Manager
        const secret = await getSecretValue(secretName);
        // Access SES credentials
        const sesUsername = secret.SES_USERNAME;
        const sesPassword = secret.SES_PASSWORD;

        // Configure nodemailer with SES SMTP settings
        const transporter = nodemailer.createTransport({
            host: 'email-smtp.us-east-1.amazonaws.com', // SES SMTP endpoint for your region
            port: 587, // Port for TLS
            secure: false, // Use TLS
            auth: {
                user: sesUsername, // Retrieved SES username
                pass: sesPassword, // Retrieved SES password
            },
        });
        // Email details (from request body or hardcoded for testing)
        const { to, subject, text, html } = request.body;
        const mailOptions = {
            from: 'no-reply@studilmu.com', // Replace with your verified sender email
            to, // Recipient(s)
            subject, // Subject line
            text, // Plain text body
            html, // HTML body
        };
        // Send email using nodemailer
        const info = await transporter.sendMail(mailOptions);
        reply.send({
            success: true,
            message: 'Email sent successfully!',
            info,
        });
    } catch (error) {
        console.error('Error sending email:', error);
        reply.status(500).send({
            success: false,
            message: 'Failed to send email.',
            error: error.message,
        });
    }
}
async function testaws(request, reply) {
    try {
        // Initialize the Secrets Manager client
        const secretsManager = new SecretsManagerClient({
            region: 'ap-southeast-1', // Replace with your secret's region
        });

        // Define the command to get the secret
        const command = new GetSecretValueCommand({
            SecretId: 's3AccessKey', // Replace with your secret's ID
        });

        // Execute the command
        const result = await secretsManager.send(command);

        // Decode the secret string
        const secret = JSON.parse(result.SecretString);

        // Respond with the secret
        reply.send({
            secretId: 'your-secret-id',
            secretValue: secret,
        });
    } catch (error) {
        console.error('Error retrieving secret:', error.message);
        reply.status(500).send({ error: error.message });
    }
}

module.exports = {
    importData,
    exportData,
    generatePdf,
    sendEmail,
    sendAwsEmail,
    testaws
}