import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, subject, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Get Google Sheets credentials from environment variables
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL

    if (!GOOGLE_SHEETS_URL) {
      console.error("GOOGLE_SHEETS_URL not configured")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    // Submit to Google Sheets
    const timestamp = new Date().toISOString()
    
    // Create FormData object
    const formData = new FormData()
    formData.append("Timestamp", timestamp)
    formData.append("First Name", firstName)
    formData.append("Last Name", lastName)
    formData.append("Email", email)
    formData.append("Subject", subject)
    formData.append("Message", message)

    console.log("Submitting to Google Sheets:", GOOGLE_SHEETS_URL)

    const sheetsResponse = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      body: formData,
      redirect: "follow",
    })

    const responseText = await sheetsResponse.text()
    console.log("Google Sheets response status:", sheetsResponse.status)
    console.log("Google Sheets response:", responseText)

    // Check if submission was successful
    // Google Apps Script may return HTML or JSON
    if (!sheetsResponse.ok) {
      console.error("Google Sheets error:", responseText)
      throw new Error("Failed to submit to Google Sheets")
    }

    // Send confirmation email (optional - requires email service)
    // You can integrate with services like SendGrid, Resend, or Nodemailer
    // For now, we'll just log it
    console.log(`Confirmation email should be sent to: ${email}`)

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      { error: "Failed to process form submission" },
      { status: 500 }
    )
  }
}
