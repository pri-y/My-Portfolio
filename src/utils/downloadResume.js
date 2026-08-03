/**
 * Helper to download the resume PDF and send notifications to both emails.
 */
export async function handleResumeDownload() {
  // 1. Trigger the PDF download immediately in browser
  const link = document.createElement('a');
  link.href = '/Priyanka_Gupta_Resume.pdf';
  link.download = 'Priyanka_Gupta_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  const payload = {
    _subject: '📄 Resume Downloaded on Portfolio!',
    message: `Someone just downloaded your resume from your portfolio website!`,
    downloadTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    userAgent: navigator.userAgent,
    referrer: document.referrer || window.location.href,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
  };

  // 2. Notify backend endpoint (MongoDB Atlas log + Nodemailer)
  try {
    const backendUrl = import.meta.env.VITE_API_URL || '';
    fetch(`${backendUrl}/api/notify-resume-download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});
  } catch (e) {}

  // 3. Direct Instant Email Notifications to BOTH emails:
  // Priyankagupta1697@gmail.com and priyankaguptajpk@gmail.com
  const targetEmails = ['Priyankagupta1697@gmail.com', 'priyankaguptajpk@gmail.com'];
  
  for (const email of targetEmails) {
    try {
      fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: '📄 Alert: Your Resume Was Downloaded!',
          message: `Someone downloaded your resume from your Portfolio website.\n\nTime: ${payload.downloadTime}\nDevice/Browser: ${payload.userAgent}\nPage: ${payload.referrer}`,
          _captcha: 'false',
          _template: 'table',
        }),
      }).catch(() => {});
    } catch (e) {}
  }
}
