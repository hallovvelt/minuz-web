import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, branch, message } = body

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    // ─────────────────────────────────────────────────────────────
    // TO ENABLE EMAIL DELIVERY:
    // 1. npm install resend
    // 2. Add RESEND_API_KEY=re_xxx to .env.local
    // 3. Uncomment the block below
    // ─────────────────────────────────────────────────────────────
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'kontakt@minuz.studio',
    //   to: 'ibrahimmertminuz@gmail.com',
    //   subject: `Neue Anfrage von ${name}`,
    //   html: `
    //     <h2>Neue Kontaktanfrage</h2>
    //     <p><strong>Name/Firma:</strong> ${name}</p>
    //     <p><strong>E-Mail:</strong> ${email}</p>
    //     <p><strong>Telefon:</strong> ${phone || '—'}</p>
    //     <p><strong>Branche:</strong> ${branch || '—'}</p>
    //     <p><strong>Nachricht:</strong> ${message || '—'}</p>
    //   `,
    // })

    console.log('[MINUZ Contact]', { name, email, phone, branch, message })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
