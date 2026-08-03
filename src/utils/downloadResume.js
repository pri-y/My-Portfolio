/**
 * Helper to download the resume PDF and send detailed visitor notifications ONLY to priyankaguptajpk@gmail.com
 */
export async function handleResumeDownload() {
  // 1. Trigger the PDF download immediately in browser
  const link = document.createElement('a');
  link.href = '/Priyanka_Gupta_Resume.pdf';
  link.download = 'Priyanka_Gupta_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 2. Gather detailed visitor tracking information (IP, Geolocation, Device)
  const downloadTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  let userIp = 'Detecting...';
  let locationStr = 'Unknown Location';
  let orgStr = 'Unknown Network';

  try {
    const geoRes = await fetch('https://ipapi.co/json/').then((r) => r.json());
    if (geoRes && geoRes.ip) {
      userIp = geoRes.ip;
      const parts = [geoRes.city, geoRes.region, geoRes.country_name].filter(Boolean);
      locationStr = parts.join(', ') || 'Unknown Location';
      orgStr = geoRes.org || geoRes.asn || 'Standard ISP';
    }
  } catch (e) {
    try {
      const geoRes2 = await fetch('https://ip-api.com/json/').then((r) => r.json());
      if (geoRes2 && geoRes2.query) {
        userIp = geoRes2.query;
        const parts = [geoRes2.city, geoRes2.regionName, geoRes2.country].filter(Boolean);
        locationStr = parts.join(', ') || 'Unknown Location';
        orgStr = geoRes2.isp || 'Standard ISP';
      }
    } catch (e2) {}
  }

  // Parse User Agent for easy reading
  const ua = navigator.userAgent;
  let deviceType = 'Desktop';
  if (/mobile/i.test(ua)) deviceType = 'Mobile Phone';
  if (/tablet|ipad/i.test(ua)) deviceType = 'Tablet';

  const payload = {
    downloadTime,
    userIp,
    location: locationStr,
    networkProvider: orgStr,
    deviceType,
    browserDevice: ua,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    pageUrl: document.referrer || window.location.href,
  };

  // 3. Notify Backend (MongoDB log + Server Nodemailer)
  try {
    const backendUrl = import.meta.env.VITE_API_URL || '';
    fetch(`${backendUrl}/api/notify-resume-download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});
  } catch (e) {}

  // 4. Send Instant Email Alert ONLY to priyankaguptajpk@gmail.com
  try {
    fetch('https://formsubmit.co/ajax/d75ab0626f92d156111ec9cbf398c58e', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        _subject: `🚨 Resume Downloaded by Visitor in ${locationStr}!`,
        '📅 Date & Time': downloadTime,
        '📍 Location (City/Country)': locationStr,
        '🌐 Visitor IP Address': userIp,
        '🏢 Internet Provider (ISP)': orgStr,
        '📱 Device Type': deviceType,
        '🖥️ Screen Resolution': payload.screenResolution,
        '🌐 Browser / OS': ua,
        '🔗 Download Source': payload.pageUrl,
        _captcha: 'false',
      }),
    }).catch(() => {});
  } catch (e) {}
}
