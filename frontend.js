// =========================================================================
// FRONTEND / UI UTILS: Escape, Thai Dates, Icons, Photos, Modal, Toast, Spotlight
// =========================================================================
// 1. UTILITIES (ESCAPE, THAI DATE, CLIPBOARD, FALLBACK IMAGE)
    // =========================================================================
    function escapeHtml(str) {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    const THAI_MONTHS = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

    function formatThaiDate(dateObj = new Date(), withTime = false) {
      const d = dateObj.getDate();
      const m = THAI_MONTHS[dateObj.getMonth()];
      const y = dateObj.getFullYear() + 543;
      if (!withTime) return `${d} ${m} ${y}`;
      const hh = String(dateObj.getHours()).padStart(2, '0');
      const mm = String(dateObj.getMinutes()).padStart(2, '0');
      return `${d} ${m} ${y} ${hh}:${mm}`;
    }

    function getLocalDateKey(dateObj = new Date()) {
      const y = dateObj.getFullYear();
      const m = String(dateObj.getMonth() + 1).padStart(2, '0');
      const d = String(dateObj.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }

    function formatPostedElapsed(createdAtMs) {
      if (!createdAtMs) return 'โพสต์วันนี้';
      const diffMs = Math.max(0, Date.now() - Number(createdAtMs));
      const mins = Math.floor(diffMs / 60000);
      if (mins < 1) return 'เพิ่งโพสต์';
      if (mins < 60) return `${mins} นาทีที่แล้ว`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `${hours} ชม. ที่แล้ว`;
      const days = Math.floor(hours / 24);
      return `โพสต์มาแล้ว ${days} วัน`;
    }

    function isSoldExpiredAfterMidnight(prod) {
      if (!prod || prod.tradeStatus !== 'sold') return false;
      if (!prod.soldDateStr) return false;
      return prod.soldDateStr !== getLocalDateKey();
    }

    const FALLBACK_SVG_URI = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
        <rect width="600" height="450" fill="#f1f5f9"/>
        <rect x="235" y="160" width="130" height="96" rx="14" fill="#cbd5e1"/>
        <circle cx="272" cy="195" r="12" fill="#94a3b8"/>
        <path d="M250 242l32-34 22 22 18-18 28 30H250z" fill="#94a3b8"/>
        <text x="300" y="292" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#64748b">UBVC Marketplace</text>
      </svg>`
    );

    function handleImgError(img) {
      if (!img) return;
      img.onerror = null;
      img.src = FALLBACK_SVG_URI;
    }

    function copyText(text, label = 'ข้อมูล') {
      const done = () => showToast(`คัดลอก${label} "${text}" แล้ว`, 'success');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
      } else {
        fallbackCopy(text, done);
      }
    }

    function fallbackCopy(text, onSuccess) {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        onSuccess();
      } catch (e) {
        showToast(`คัดลอกไม่สำเร็จ: ${text}`, 'warning');
      }
    }

    // =========================================================================

// 2. PHOTOGRAPHY & CREST / ICONS
    // =========================================================================
    const REAL_PHOTOS = {
      campus_hero: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80',
      news_1: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      news_2: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      news_3: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      news_4: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80',
      laptop_1: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
      laptop_2: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      headphones_1: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80',
      headphones_2: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      backpack_1: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      backpack_2: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=800&q=80',
      thermos_1: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
      thermos_2: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80',
      uniform_1: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      uniform_2: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
      books_1: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
      books_2: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
      ipad_1: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
      ipad_2: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=800&q=80',
      lamp_1: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      lamp_2: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      sports_1: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=800&q=80',
      sports_2: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
      mouse_1: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
      shop_it: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80',
      shop_student: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80',
      avatar_student: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
      avatar_teacher: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
      avatar_pending: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
      avatar_admin: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80'
    };

    function renderPhoto(photoKey, alt, className = 'w-full h-full object-cover') {
      const src = REAL_PHOTOS[photoKey] || REAL_PHOTOS.laptop_1;
      return `<img src="${src}" alt="${escapeHtml(alt)}" loading="lazy" onerror="handleImgError(this)" class="${className}" />`;
    }

    function renderProductMedia(prod, className = 'w-full h-full object-cover') {
      if (prod.customImageUrl) {
        return `<img src="${prod.customImageUrl}" alt="${escapeHtml(prod.title)}" onerror="handleImgError(this)" class="${className}" />`;
      }
      return renderPhoto(prod.photoKey || 'laptop_1', prod.title, className);
    }

    function renderUserAvatar(user, sizeClass = 'w-8 h-8') {
      const key = (user && user.avatarKey) ? user.avatarKey : 'avatar_student';
      return `<img src="${REAL_PHOTOS[key] || REAL_PHOTOS.avatar_student}" alt="${escapeHtml(user ? user.name : 'สมาชิก')}" onerror="handleImgError(this)" class="${sizeClass} rounded-full object-cover shrink-0 border border-slate-200 bg-slate-100" />`;
    }

    function renderBrandLogo(sizeClass = 'w-10 h-10') {
      const logo = STATE.siteConfig.logo || {};
      if (logo.customLogoUrl && logo.customLogoUrl.trim() !== '') {
        return `<img src="${escapeHtml(logo.customLogoUrl)}" alt="โลโก้เว็บไซต์" onerror="handleImgError(this)" class="${sizeClass} object-contain rounded-xl shrink-0" />`;
      }
      if (logo.preset === 'modern') {
        return `
          <svg class="${sizeClass} shrink-0" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="UBVC Marketplace">
            <rect x="6" y="6" width="108" height="108" rx="26" fill="${STATE.siteConfig.primaryColor}" />
            <path d="M34 42h8l6 32h38l6-24H46" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="52" cy="86" r="5" fill="#fbbf24"/>
            <circle cx="80" cy="86" r="5" fill="#fbbf24"/>
          </svg>
        `;
      }
      return `
        <svg class="${sizeClass} shrink-0" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ตราวิทยาลัยอาชีวศึกษาอุบลราชธานี">
          <defs>
            <linearGradient id="uvcGold" x1="0" y1="0" x2="140" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#fde047"/>
              <stop offset="55%" stop-color="#f59e0b"/>
              <stop offset="100%" stop-color="#b45309"/>
            </linearGradient>
            <radialGradient id="uvcRed" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stop-color="#ef4444"/>
              <stop offset="70%" stop-color="#dc2626"/>
              <stop offset="100%" stop-color="#991b1b"/>
            </radialGradient>
          </defs>
          <circle cx="70" cy="70" r="66" fill="url(#uvcGold)"/>
          <circle cx="70" cy="70" r="60" fill="#ffffff"/>
          <circle cx="70" cy="70" r="55" fill="url(#uvcRed)" stroke="#f59e0b" stroke-width="2"/>
          <circle cx="70" cy="70" r="39" fill="none" stroke="#fde047" stroke-width="1.8" stroke-dasharray="3 2"/>
          <circle cx="70" cy="72" r="18" stroke="#fde047" stroke-width="3.5" stroke-dasharray="5 4"/>
          <circle cx="70" cy="72" r="9.5" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5"/>
          <path d="M70 28L76 44H64L70 28Z" fill="#fde047"/>
          <rect x="33" y="98" width="74" height="18" rx="9" fill="url(#uvcGold)" stroke="#991b1b" stroke-width="1.2"/>
          <text x="70" y="110.5" text-anchor="middle" font-family="Prompt, sans-serif" font-size="10.5" font-weight="700" fill="#0f295c">UVC • วอศ.อบ.</text>
        </svg>
      `;
    }

    function renderIcon(name, cls = 'w-4 h-4') {
      const paths = {
        search: '<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"/>',
        heart: '<path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>',
        plus: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>',
        pin: '<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>',
        bell: '<path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>',
        shield: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>',
        menu: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>',
        close: '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>',
        laptop: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
        shirt: '<path stroke-linecap="round" stroke-linejoin="round" d="M6.5 3L2 6.5l2.5 3L7 8v11h10V8l2.5 1.5 2.5-3L17.5 3 14 5a2.5 2.5 0 01-4 0L6.5 3z"/>',
        book: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>',
        mobile: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>',
        home: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>',
        sports: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m-9 9h18"/>',
        bag: '<path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>',
        eye: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
        flag: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"/>',
        chart: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>',
        users: '<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>',
        user: '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>',
        box: '<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>',
        megaphone: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"/>',
        settings: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
        tag: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z"/>',
        cloud: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"/>',
        download: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>',
        sun: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>',
        moon: '<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>',
        chat: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>',
        clock: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>',
        share: '<path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"/>'
      };
      return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">${paths[name] || paths.bag}</svg>`;
    }

    // =========================================================================

// 4. GLOBAL MODAL, TOAST, DROPDOWN & SPOTLIGHT
    // =========================================================================
    function openModal(html, maxWidth = 'max-w-2xl') {
      const overlay = document.getElementById('modalOverlay');
      const box = document.getElementById('modalBox');
      if (!overlay || !box) return;
      box.className = `bg-white rounded-2xl border border-slate-200 shadow-2xl w-full ${maxWidth} overflow-hidden animate-pop my-auto`;
      box.innerHTML = html;
      overlay.classList.remove('hidden');
    }

    function closeModal() {
      CURRENT_OPEN_CHAT_ID = null;
      const overlay = document.getElementById('modalOverlay');
      if (overlay) overlay.classList.add('hidden');
    }

    function showToast(message, type = 'info') {
      const container = document.getElementById('toastContainer');
      if (!container) return;
      const styles = {
        success: 'bg-emerald-600 text-white',
        warning: 'bg-amber-500 text-white',
        danger: 'bg-rose-600 text-white',
        info: 'bg-slate-900 text-white'
      };
      const el = document.createElement('div');
      el.className = `pointer-events-auto px-4 py-2.5 rounded-xl shadow-lg text-[13px] font-medium flex items-center gap-2 animate-pop ${styles[type] || styles.info}`;
      el.textContent = message;
      container.appendChild(el);
      setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(6px)';
        el.style.transition = 'all 0.2s ease';
        setTimeout(() => el.remove(), 220);
      }, 2800);
    }

    function closeAllDropdowns() {
      document.querySelectorAll('[data-dropdown-menu]').forEach(el => el.classList.add('hidden'));
    }

    function toggleDropdown(menuId, event) {
      if (event) event.stopPropagation();
      const el = document.getElementById(menuId);
      if (!el) return;
      const hidden = el.classList.contains('hidden');
      closeAllDropdowns();
      if (hidden) el.classList.remove('hidden');
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-dropdown-wrap]')) closeAllDropdowns();
      if (e.target === document.getElementById('modalOverlay')) closeModal();
      if (e.target === document.getElementById('spotlightOverlay')) closeSpotlightSearch();
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSpotlightSearch();
      } else if (e.key === 'Escape') {
        closeModal();
        closeSpotlightSearch();
        closeAllDropdowns();
      }
    });

    function openSpotlightSearch() {
      const overlay = document.getElementById('spotlightOverlay');
      const box = document.getElementById('spotlightBox');
      if (!overlay || !box) return;
      overlay.classList.remove('hidden');
      box.innerHTML = `
        <div class="p-4 border-b border-slate-100 flex items-center gap-3">
          <span class="text-slate-400">${renderIcon('search', 'w-5 h-5')}</span>
          <input id="spotlightInput" type="text" oninput="renderSpotlightResults(this.value)" placeholder="ค้นหาสินค้า ร้านค้า หรือประกาศ..." class="w-full text-[15px] text-slate-900 placeholder-slate-400 focus:outline-none" />
          <button onclick="closeSpotlightSearch()" class="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-[11px] font-medium hover:bg-slate-200">ESC</button>
        </div>
        <div id="spotlightBody" class="p-3 max-h-[60vh] overflow-y-auto space-y-3"></div>
      `;
      renderSpotlightResults('');
      setTimeout(() => {
        const inp = document.getElementById('spotlightInput');
        if (inp) inp.focus();
      }, 30);
    }

    function closeSpotlightSearch() {
      const overlay = document.getElementById('spotlightOverlay');
      if (overlay) overlay.classList.add('hidden');
    }

    function renderSpotlightResults(query) {
      const body = document.getElementById('spotlightBody');
      if (!body) return;
      const q = (query || '').trim().toLowerCase();
      const prods = STATE.products
        .filter(p => p.status === 'approved' && !p.deleted_at && !isSoldExpiredAfterMidnight(p))
        .filter(p => !q || p.title.toLowerCase().includes(q) || p.shop.toLowerCase().includes(q))
        .slice(0, 6);
      const news = STATE.announcements
        .filter(a => a.active && (!q || a.title.toLowerCase().includes(q)))
        .slice(0, 3);

      body.innerHTML = `
        <div>
          <div class="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">สินค้า (${prods.length})</div>
          ${prods.length ? prods.map(p => `
            <button onclick="closeSpotlightSearch(); openProductDetailModal('${p.id}');" class="w-full p-2 rounded-xl hover:bg-slate-50 flex items-center justify-between gap-3 text-left transition">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-11 h-11 rounded-lg overflow-hidden bg-slate-100 shrink-0">${renderProductMedia(p)}</div>
                <div class="min-w-0">
                  <div class="text-[13.5px] font-semibold text-slate-900 truncate">${escapeHtml(p.title)}</div>
                  <div class="text-[12px] text-slate-500 truncate">${escapeHtml(p.shop)} • ${escapeHtml(p.pickup)}</div>
                </div>
              </div>
              <span class="text-[14px] font-bold text-blue-700 shrink-0">฿${p.price.toLocaleString()}</span>
            </button>
          `).join('') : `<div class="px-2 py-4 text-[13px] text-slate-400 text-center">ไม่พบสินค้าที่ตรงกับคำค้นหา</div>`}
        </div>
        ${news.length ? `
          <div class="pt-2 border-t border-slate-100">
            <div class="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">ประกาศวิทยาลัย</div>
            ${news.map(n => `
              <button onclick="closeSpotlightSearch(); openAnnouncementModal('${n.id}');" class="w-full p-2 rounded-xl hover:bg-slate-50 flex items-center justify-between gap-3 text-left transition">
                <span class="text-[13px] font-medium text-slate-800 truncate">${escapeHtml(n.title)}</span>
                <span class="text-[11px] text-slate-400 shrink-0">${escapeHtml(n.date)}</span>
              </button>
            `).join('')}
          </div>
        ` : ''}
      `;
    }

    // =========================================================================

// 9. MASTER RENDERER
    // =========================================================================
    function toggleDarkMode() {
      STATE.darkMode = !STATE.darkMode;
      saveState(false);
      renderApp();
      showToast(STATE.darkMode ? 'เปิดโหมดมืด (Dark Mode)' : 'เปิดโหมดสว่าง (Light Mode)', 'info');
    }


    let SOUND_MUTED = false;
    function toggleChatSound() {
      SOUND_MUTED = !SOUND_MUTED;
      showToast(SOUND_MUTED ? 'ปิดเสียงแจ้งเตือนแชทแล้ว' : 'เปิดเสียงแจ้งเตือนแชทแล้ว', 'info');
      if (CURRENT_OPEN_CHAT_ID) openChatRoomModal(CURRENT_OPEN_CHAT_ID);
    }

    function playChatChime() {
      if (SOUND_MUTED) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        const notes = [659.25, 880]; // Clean E5 -> A5 soft chime
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
          gain.gain.setValueAtTime(0.001, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.09 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.24);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.25);
        });
      } catch (e) {}
    }

    function shareProduct(prodId) {
      const prod = STATE.products.find(p => p.id === prodId);
      if (!prod) return;
      const baseUrl = window.location.href.split('?')[0].split('#')[0];
      const shareUrl = `${baseUrl}?item=${encodeURIComponent(prod.id)}`;
      if (navigator.share) {
        navigator.share({
          title: prod.title,
          text: `${prod.title} — ฿${prod.price.toLocaleString()} (UBVC Marketplace)`,
          url: shareUrl
        }).catch(() => copyText(shareUrl, 'ลิงก์สินค้า'));
      } else {
        copyText(shareUrl, 'ลิงก์สินค้า');
      }
    }

    function fireConfetti() {
      try {
        if (typeof confetti === 'function') {
          confetti({ particleCount: 70, spread: 65, origin: { y: 0.65 } });
        }
      } catch (e) {}
    }

    let kpiAnimatedOnce = false;
    function runKpiCounterAnimation() {
      if (kpiAnimatedOnce) return;
      const els = document.querySelectorAll('.kpi-num');
      if (!els.length) return;
      kpiAnimatedOnce = true;
      els.forEach(el => {
        const target = Number(el.dataset.target || 0);
        const start = performance.now();
        const duration = 650;
        function tick(now) {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(tick);
      });
    }

    window.addEventListener('scroll', () => {
      const btn = document.getElementById('scrollTopBtn');
      if (btn) {
        if (window.scrollY > 320) btn.classList.remove('hidden');
        else btn.classList.add('hidden');
      }
      const bar = document.getElementById('scrollProgressBar');
      if (bar) {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docH > 0 ? Math.min(100, Math.max(0, (window.scrollY / docH) * 100)) : 0;
        bar.style.width = pct.toFixed(1) + '%';
      }
    });

    function renderApp() {
      const root = document.getElementById('appRoot');
      if (!root) return;
      document.body.classList.toggle('dark-mode', !!STATE.darkMode);
      root.innerHTML = STATE.portalMode === 'admin' ? renderAdminPortal() : renderStorefront();
      if (STATE.portalMode === 'storefront') runKpiCounterAnimation();
    }


// =========================================================================
// FRONTEND / AUTH UI: @gmail.com Register, Login, Profile, PWA Install & Nav
// =========================================================================
// 5. MEMBER AUTH (REGISTER, LOGIN, LOGOUT, EDIT OWN PROFILE) & NAVIGATION
    // =========================================================================
    function openAuthModal(tab = 'login') {
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">${tab === 'register' ? 'สมัครสมาชิกด้วย @gmail.com' : 'เข้าสู่ระบบสมาชิก'}</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>

        <div class="px-6 pt-4">
          <div class="grid grid-cols-2 p-1 rounded-xl bg-slate-100 text-[13px] font-medium">
            <button onclick="openAuthModal('login')" class="py-2 rounded-lg transition ${tab === 'login' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500'}">เข้าสู่ระบบ</button>
            <button onclick="openAuthModal('register')" class="py-2 rounded-lg transition ${tab === 'register' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500'}">สมัครสมาชิกใหม่</button>
          </div>
        </div>

        ${tab === 'login' ? `
          <form onsubmit="submitLoginForm(event)" class="p-6 space-y-4">
            <div>
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">อีเมล (@gmail.com) หรือรหัสประจำตัว</label>
              <input id="loginEmail" required type="text" placeholder="example@gmail.com" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[13.5px] focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">รหัสผ่าน</label>
              <input id="loginPassword" required type="password" placeholder="กรอกรหัสผ่าน" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[13.5px] focus:outline-none focus:border-blue-500" />
            </div>
            <button type="submit" style="background-color: ${STATE.siteConfig.primaryColor}" class="w-full py-2.5 rounded-xl text-white font-semibold text-[14px] hover:opacity-95 transition">เข้าสู่ระบบ</button>

            <div class="pt-2 text-center text-[12px] text-slate-500">
              ยังไม่มีบัญชี? <button type="button" onclick="openAuthModal('register')" class="text-blue-700 font-semibold hover:underline">สมัครสมาชิกด้วย @gmail.com</button>
            </div>
          </form>
        ` : `
          <form onsubmit="submitRegisterForm(event)" class="p-6 space-y-3.5 max-h-[75vh] overflow-y-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="sm:col-span-2">
                <label class="block text-[12.5px] font-medium text-slate-700 mb-1">อีเมล Google (@gmail.com) *</label>
                <input id="regEmail" required type="email" placeholder="example@gmail.com" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px] focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label class="block text-[12.5px] font-medium text-slate-700 mb-1">รหัสผ่าน *</label>
                <input id="regPass" required type="password" minlength="4" placeholder="ตั้งรหัสผ่าน (อย่างน้อย 4 ตัว)" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
              </div>
              <div>
                <label class="block text-[12.5px] font-medium text-slate-700 mb-1">ชื่อ - นามสกุล *</label>
                <input id="regName" required type="text" placeholder="เช่น นายธนพล รักเรียน" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
              </div>
              <div>
                <label class="block text-[12.5px] font-medium text-slate-700 mb-1">รหัสนักศึกษา / บุคลากร *</label>
                <input id="regCode" required type="text" placeholder="เช่น 67302040099" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
              </div>
              <div>
                <label class="block text-[12.5px] font-medium text-slate-700 mb-1">บทบาท</label>
                <select id="regRole" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px] bg-white">
                  <option value="student">นักศึกษา</option>
                  <option value="teacher">ครู / บุคลากร</option>
                </select>
              </div>
              <div>
                <label class="block text-[12.5px] font-medium text-slate-700 mb-1">แผนกวิชา *</label>
                <input id="regDept" required type="text" placeholder="เช่น ปวส.2 ไอที" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
              </div>
              <div>
                <label class="block text-[12.5px] font-medium text-slate-700 mb-1">เบอร์โทร / Line ID *</label>
                <input id="regPhone" required type="text" placeholder="08x-xxx-xxxx" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-[12.5px] font-medium text-slate-700 mb-1">ชื่อร้านค้า (สำหรับลงขายสินค้า)</label>
                <input id="regShop" type="text" placeholder="เช่น ร้าน Thanapon Shop" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
              </div>
            </div>
            <button type="submit" style="background-color: ${STATE.siteConfig.primaryColor}" class="w-full py-2.5 rounded-xl text-white font-semibold text-[14px] hover:opacity-95 transition">สมัครสมาชิกด้วย Gmail และบันทึกข้อมูล</button>
          </form>
        `}
      `, 'max-w-md');
    }

    async function submitLoginForm(e) {
      e.preventDefault();
      const loginKey = document.getElementById('loginEmail').value.trim().toLowerCase();
      const pass = document.getElementById('loginPassword').value.trim();
      if (FIREBASE_CFG.projectId && FIREBASE_CFG.apiKey) {
        await pullMembersFromFirebase();
      }
      const found = STATE.users.find(u =>
        ((u.email || '').toLowerCase() === loginKey || (u.studentCode || '').toLowerCase() === loginKey) &&
        ((u.password || '1234') === pass)
      );
      if (!found) {
        showToast('อีเมลหรือรหัสผ่านไม่ถูกต้อง', 'danger');
        return;
      }
      if (found.status === 'rejected') {
        showToast('บัญชีนี้ถูกระงับการใช้งานชั่วคราว กรุณาติดต่อผู้ดูแลระบบ', 'warning');
        return;
      }
      STATE.currentUserId = found.id;
      saveState(false);
      closeModal();
      renderApp();
      showToast(`ยินดีต้อนรับ ${found.name} (${found.email})`, 'success');
    }

    async function submitRegisterForm(e) {
      e.preventDefault();
      const email = document.getElementById('regEmail').value.trim().toLowerCase();
      const pass = document.getElementById('regPass').value.trim();
      const name = document.getElementById('regName').value.trim();
      const code = document.getElementById('regCode').value.trim();
      const selectedRole = document.getElementById('regRole').value;
      const dept = document.getElementById('regDept').value.trim();
      const shop = document.getElementById('regShop').value.trim() || ('ร้าน ' + name.split(' ')[0]);
      const phone = document.getElementById('regPhone').value.trim();

      if (!email.endsWith('@gmail.com')) {
        showToast('กรุณาสมัครด้วยอีเมล @gmail.com เท่านั้น', 'warning');
        return;
      }

      if (FIREBASE_CFG.projectId && FIREBASE_CFG.apiKey) {
        await pullMembersFromFirebase();
      }

      const isDesignatedAdmin = email === ADMIN_EMAIL.toLowerCase();
      const existingIdx = STATE.users.findIndex(u => (u.email || '').toLowerCase() === email);
      if (existingIdx > -1) {
        if (isDesignatedAdmin) {
          STATE.users[existingIdx].password = pass;
          STATE.users[existingIdx].name = name;
          STATE.users[existingIdx].role = 'admin';
          STATE.users[existingIdx].roleLabel = 'ผู้ดูแลระบบ';
          STATE.users[existingIdx].status = 'approved';
          STATE.currentUserId = STATE.users[existingIdx].id;
          await saveMemberToFirebase(STATE.users[existingIdx], true);
          saveState(false);
          closeModal();
          renderApp();
          showToast('อัปเดตบัญชีแอดมิน rust2tf2@gmail.com และเข้าสู่ระบบแล้ว!', 'success');
          return;
        }
        showToast('อีเมล Gmail นี้ถูกสมัครใช้งานแล้ว กรุณาเข้าสู่ระบบ', 'warning');
        return;
      }

      const finalRole = isDesignatedAdmin ? 'admin' : selectedRole;
      const newUser = {
        id: isDesignatedAdmin ? 'u_admin' : ('u_' + Date.now()),
        role: finalRole,
        roleLabel: finalRole === 'admin' ? 'ผู้ดูแลระบบ' : finalRole === 'teacher' ? 'ครูที่ปรึกษา' : 'นักศึกษา',
        status: 'approved',
        avatarKey: finalRole === 'admin' ? 'avatar_admin' : finalRole === 'teacher' ? 'avatar_teacher' : 'avatar_student',
        name,
        email,
        password: pass,
        studentCode: code,
        department: dept,
        shopName: shop,
        lineId: email.split('@')[0],
        phone,
        createdAt: formatThaiDate()
      };
      STATE.users.push(newUser);
      STATE.currentUserId = newUser.id;
      await saveMemberToFirebase(newUser, true);
      saveState(false);
      closeModal();
      renderApp();
      fireConfetti();
      showToast(isDesignatedAdmin ? 'สมัครและตั้งสิทธิ์ Admin (rust2tf2@gmail.com) เรียบร้อย!' : `สมัครสมาชิก ${email} และบันทึกข้อมูลเรียบร้อย!`, 'success');
    }

    function logoutUser() {
      STATE.currentUserId = null;
      saveState(false);
      closeAllDropdowns();
      renderApp();
      showToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
    }

    function openEditOwnProfileModal() {
      const user = getCurrentUser();
      if (!user) { openAuthModal('login'); return; }
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">แก้ไขโปรไฟล์ของฉัน</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>
        <form onsubmit="submitEditOwnProfile(event)" class="p-6 space-y-3.5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="sm:col-span-2">
              <label class="block text-[12px] font-medium text-slate-700 mb-1">ชื่อ - นามสกุล</label>
              <input id="profName" required type="text" value="${escapeHtml(user.name)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
            </div>
            <div>
              <label class="block text-[12px] font-medium text-slate-700 mb-1">แผนกวิชา</label>
              <input id="profDept" required type="text" value="${escapeHtml(user.department)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
            </div>
            <div>
              <label class="block text-[12px] font-medium text-slate-700 mb-1">ชื่อร้านค้า</label>
              <input id="profShop" required type="text" value="${escapeHtml(user.shopName)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
            </div>
            <div>
              <label class="block text-[12px] font-medium text-slate-700 mb-1">Line ID</label>
              <input id="profLine" required type="text" value="${escapeHtml(user.lineId)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
            </div>
            <div>
              <label class="block text-[12px] font-medium text-slate-700 mb-1">เบอร์โทรศัพท์</label>
              <input id="profPhone" required type="text" value="${escapeHtml(user.phone)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
            </div>
          </div>
          <div class="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onclick="closeModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-[13px]">ยกเลิก</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 text-white text-[13px] font-semibold">บันทึกโปรไฟล์</button>
          </div>
        </form>
      `, 'max-w-md');
    }

    function submitEditOwnProfile(e) {
      e.preventDefault();
      const user = getCurrentUser();
      if (!user) return;
      user.name = document.getElementById('profName').value.trim();
      user.department = document.getElementById('profDept').value.trim();
      user.shopName = document.getElementById('profShop').value.trim();
      user.lineId = document.getElementById('profLine').value.trim();
      user.phone = document.getElementById('profPhone').value.trim();
      saveMemberToFirebase(user);
      saveState(false);
      closeModal();
      renderApp();
      showToast('อัปเดตโปรไฟล์เรียบร้อยแล้ว', 'success');
    }

    function openPwaInstallGuideModal() {
      if (DEFERRED_PWA_PROMPT) {
        DEFERRED_PWA_PROMPT.prompt();
        DEFERRED_PWA_PROMPT.userChoice.then(() => { DEFERRED_PWA_PROMPT = null; });
        return;
      }
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">ติดตั้งเป็นแอปมือถือ (Mobile App / PWA)</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>
        <div class="p-6 space-y-4 text-[13.5px] text-slate-600">
          <div class="p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-900">
            เมื่ออัปขึ้น <strong>GitHub Pages</strong> แล้ว เว็บนี้จะทำงานเหมือนแอปมือถือเต็มจอได้ทันทีทั้ง Android และ iOS โดยไม่ต้องเสียค่าลง Store
          </div>
          <div class="space-y-2.5">
            <div class="p-3.5 rounded-xl border border-slate-200">
              <div class="font-semibold text-slate-900">Android (Google Chrome)</div>
              <p class="text-[12.5px] mt-0.5">เปิดลิงก์เว็บ → แตะเมนูจุด 3 จุดมุมขวาบน → เลือก <strong>"ติดตั้งแอป" (Install App)</strong> หรือ <strong>"เพิ่มลงหน้าจอหลัก"</strong></p>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200">
              <div class="font-semibold text-slate-900">iPhone / iPad (Safari)</div>
              <p class="text-[12.5px] mt-0.5">เปิดลิงก์เว็บใน Safari → แตะปุ่ม <strong>แชร์ (Share)</strong> ด้านล่าง → เลือก <strong>"เพิ่มไปยังหน้าจอโฮม" (Add to Home Screen)</strong></p>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200">
              <div class="font-semibold text-slate-900">ต้องการไฟล์ .APK ส่งอาจารย์?</div>
              <p class="text-[12.5px] mt-0.5">นำลิงก์ GitHub Pages ไปวางที่ <strong>pwabuilder.com</strong> แล้วกดสร้างแพ็กเกจ Android APK ได้ฟรีในไม่กี่คลิก</p>
            </div>
          </div>
        </div>
      `, 'max-w-lg');
    }

    function switchRole(userId) {
      STATE.currentUserId = userId;
      saveState(false);
      closeAllDropdowns();
      renderApp();
      const u = getCurrentUser();
      if (u) showToast(`สลับบัญชีเป็น ${u.name} (${u.roleLabel})`, 'info');
    }

    function openAdminPortal() {
      STATE.portalMode = 'admin';
      STATE.mobileMenuOpen = false;
      saveState(false);
      closeAllDropdowns();
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openStorefront() {
      STATE.portalMode = 'storefront';
      STATE.mobileMenuOpen = false;
      saveState(false);
      closeAllDropdowns();
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function resetDemoData() {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      STATE = createDefaultState();
      saveState();
      closeAllDropdowns();
      renderApp();
      showToast('รีเซ็ตข้อมูลตัวอย่างเรียบร้อยแล้ว', 'info');
    }

    function filterAndScroll(category = 'all', shopFilter = 'all') {
      STATE.selectedCategory = category;
      STATE.selectedShopFilter = shopFilter;
      STATE.mobileMenuOpen = false;
      closeAllDropdowns();
      renderApp();
      const el = document.getElementById('marketplaceSection');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // =========================================================================



// =========================================================================
// FRONTEND / STOREFRONT & CHAT UI: Catalog, Filters, Detail, Listings & Chat
// =========================================================================
// 6. STOREFRONT RENDERER (CLEAN MINIMAL + MOBILE APP BOTTOM BAR)
    // =========================================================================
    function getFilteredProducts() {
      const q = STATE.searchQuery.trim().toLowerCase();
      let list = STATE.products.filter(p => p.status === 'approved' && !p.deleted_at && !isSoldExpiredAfterMidnight(p)).filter(p => {
        const matchCat = STATE.selectedCategory === 'all' || p.category === STATE.selectedCategory;
        const matchCond = STATE.selectedCondition === 'all' || p.condition === STATE.selectedCondition;
        const matchShop = STATE.selectedShopFilter === 'all' || p.shop === STATE.selectedShopFilter;
        const matchQ = !q || p.title.toLowerCase().includes(q) || p.shop.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
        const matchMin = STATE.minPrice === '' || p.price >= Number(STATE.minPrice);
        const matchMax = STATE.maxPrice === '' || p.price <= Number(STATE.maxPrice);
        return matchCat && matchCond && matchShop && matchQ && matchMin && matchMax;
      });

      if (STATE.sortOrder === 'price_asc') list = [...list].sort((a, b) => a.price - b.price);
      else if (STATE.sortOrder === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
      else if (STATE.sortOrder === 'views') list = [...list].sort((a, b) => (b.views || 0) - (a.views || 0));
      return list;
    }

    function renderProductCard(prod) {
      const isFav = STATE.wishlist.includes(prod.id);
      return `
        <article onclick="openProductDetailModal('${prod.id}')" class="card-lift group cursor-pointer bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-lg overflow-hidden flex flex-col">
          <div class="relative aspect-[4/3] bg-slate-100 overflow-hidden">
            ${renderProductMedia(prod, 'w-full h-full object-cover group-hover:scale-105 transition duration-300')}
            <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span class="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-slate-700 text-[11px] font-medium shadow-sm">
                ${escapeHtml(prod.condition)}
              </span>
              ${prod.tradeStatus === 'trading' ? `<span class="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-semibold shadow-sm">กำลังทำการซื้อขาย</span>` : ''}
              ${prod.tradeStatus === 'sold' ? `<span class="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-semibold shadow-sm">ขายแล้ว</span>` : ''}
            </div>
            <button id="favBtn_${prod.id}" onclick="toggleWishlist(event, '${prod.id}')" aria-label="บันทึกรายการโปรด" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm shadow-sm flex items-center justify-center transition hover:scale-105">
              <svg class="w-4 h-4 ${isFav ? 'text-rose-500 fill-rose-500' : 'text-slate-400 hover:text-rose-500'}" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>

          <div class="p-4 flex-1 flex flex-col justify-between gap-3">
            <div>
              <h3 class="text-[14px] font-semibold text-slate-900 group-hover:text-blue-700 line-clamp-2 leading-snug transition">
                ${escapeHtml(prod.title)}
              </h3>
              <div class="mt-1.5 text-[17px] font-bold text-slate-900">
                ฿${prod.price.toLocaleString()}
              </div>
            </div>

            <div class="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11.5px] text-slate-500 gap-2">
              <span class="truncate font-medium text-slate-600 inline-flex items-center gap-1">
                ${renderIcon('clock', 'w-3.5 h-3.5 text-slate-400 shrink-0')}
                <span>${formatPostedElapsed(prod.createdAtMs)}</span>
              </span>
              <span class="inline-flex items-center gap-1 shrink-0 text-slate-400">
                ${renderIcon('eye', 'w-3.5 h-3.5')}
                <span>${prod.views || 0}</span>
              </span>
            </div>
          </div>
        </article>
      `;
    }

    function updateProductGridOnly() {
      const gridWrap = document.getElementById('productGridContainer');
      const countEl = document.getElementById('productCountText');
      if (!gridWrap) return;
      const list = getFilteredProducts();
      if (countEl) {
        countEl.innerHTML = `พบสินค้า <strong class="text-slate-900">${list.length}</strong> รายการ${STATE.selectedShopFilter !== 'all' ? ` • ร้าน ${escapeHtml(STATE.selectedShopFilter)}` : ''}`;
      }
      if (list.length === 0) {
        gridWrap.innerHTML = `
          <div class="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <div class="text-slate-400 text-[14px]">ไม่พบสินค้าที่ตรงกับเงื่อนไขการค้นหา</div>
            <button onclick="clearAllFilters()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-medium transition">ล้างตัวกรองทั้งหมด</button>
          </div>
        `;
      } else {
        gridWrap.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">${list.map(renderProductCard).join('')}</div>`;
      }
    }

    function clearAllFilters() {
      STATE.selectedCategory = 'all';
      STATE.selectedCondition = 'all';
      STATE.selectedShopFilter = 'all';
      STATE.searchQuery = '';
      STATE.minPrice = '';
      STATE.maxPrice = '';
      STATE.sortOrder = 'latest';
      renderApp();
    }

    function renderCloudBadge() {
      if (CLOUD_STATUS === 'online') {
        return `<button onclick="pullStateFromFirebase(true)" title="แตะเพื่อซิงก์ข้อมูลล่าสุด" class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10.5px] font-medium shrink-0"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span class="hidden sm:inline">ออนไลน์</span></button>`;
      }
      if (CLOUD_STATUS === 'error') {
        return `<button onclick="showToast(LAST_FIREBASE_ERROR ? 'Firebase Error: ' + LAST_FIREBASE_ERROR : 'กรุณาตั้ง Firestore Rules เป็น allow read, write: if true;', 'danger')" class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10.5px] font-medium shrink-0">ออฟไลน์</button>`;
      }
      return '';
    }

    function renderStorefront() {
      const user = getCurrentUser();
      const cfg = STATE.siteConfig;
      const primary = cfg.primaryColor || '#1d4ed8';
      const activeCats = STATE.categories.filter(c => c.active).sort((a, b) => a.sort_order - b.sort_order);
      const activeAnnouncements = STATE.announcements.filter(a => a.active);
      const pinnedAnn = activeAnnouncements.find(a => a.pinned) || activeAnnouncements[0];
      const approvedProducts = STATE.products.filter(p => p.status === 'approved' && !p.deleted_at && !isSoldExpiredAfterMidnight(p));
      const filteredProducts = getFilteredProducts();
      const unreadCount = STATE.notifications.filter(n => n.unread).length;

      return `
        <!-- CLEAN STICKY HEADER -->
        <header class="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
            <!-- Brand -->
            <div class="flex items-center gap-3 min-w-0">
              <button onclick="openStorefront()" class="flex items-center gap-2.5 text-left shrink-0">
                ${renderBrandLogo('w-9 h-9')}
                <div class="leading-tight">
                  <div class="font-bold text-[15px] text-slate-900 tracking-tight">${escapeHtml(cfg.brandName)}</div>
                  <div class="text-[11px] text-slate-500 hidden sm:block">${escapeHtml(cfg.collegeName)}</div>
                </div>
              </button>
              ${renderCloudBadge()}
            </div>

            <!-- Desktop Nav -->
            <nav class="hidden md:flex items-center gap-1 text-[13.5px] font-medium text-slate-600">
              <button onclick="filterAndScroll('all', 'all')" class="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition">ตลาดสินค้า</button>
              <button onclick="openShopsModal()" class="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition">ร้านค้า</button>
              <button onclick="openPickupGuideModal()" class="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition">จุดนัดรับ</button>
              <button onclick="openPwaInstallGuideModal()" class="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition inline-flex items-center gap-1">
                ${renderIcon('download', 'w-3.5 h-3.5')}<span>แอปมือถือ</span>
              </button>
            </nav>

            <!-- Right Actions -->
            <div class="flex items-center gap-2 shrink-0">
              <button onclick="toggleDarkMode()" title="สลับโหมดสว่าง / มืด" class="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition">
                ${renderIcon(STATE.darkMode ? 'sun' : 'moon', 'w-4 h-4')}
              </button>

              <button onclick="openSpotlightSearch()" title="ค้นหาด่วน (Ctrl+K)" class="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-500 text-[12.5px] flex items-center gap-2 transition">
                ${renderIcon('search', 'w-4 h-4')}
                <span class="hidden lg:inline">ค้นหา...</span>
                <kbd class="hidden lg:inline px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-400">Ctrl+K</kbd>
              </button>

              <button onclick="openChatInboxModal()" title="แชทซื้อขาย" class="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition hidden sm:flex">
                ${renderIcon('chat', 'w-5 h-5')}
                ${getUnreadChatCount() > 0 ? `<span class="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">${getUnreadChatCount()}</span>` : ''}
              </button>

              <button onclick="openWishlistModal()" title="รายการโปรด" class="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition hidden sm:flex">
                ${renderIcon('heart', 'w-5 h-5')}
                ${STATE.wishlist.length > 0 ? `<span class="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">${STATE.wishlist.length}</span>` : ''}
              </button>

              <button onclick="openNotificationsModal()" title="การแจ้งเตือน" class="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition hidden sm:flex">
                ${renderIcon('bell', 'w-5 h-5')}
                ${unreadCount > 0 ? `<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600"></span>` : ''}
              </button>

              <button onclick="handleSellClick()" style="background-color: ${primary}" class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white text-[13px] font-semibold hover:opacity-95 transition shadow-sm">
                ${renderIcon('plus', 'w-4 h-4')}
                <span>ลงขาย</span>
              </button>

              ${user && user.role === 'admin' ? `
                <button onclick="openAdminPortal()" class="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[12.5px] font-semibold transition">
                  ${renderIcon('shield', 'w-4 h-4 text-blue-700')}
                  <span>Admin</span>
                </button>
              ` : ''}

              <!-- Account / Login -->
              ${user ? `
                <div class="relative" data-dropdown-wrap>
                  <button onclick="toggleDropdown('userMenu', event)" class="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-slate-200 hover:bg-slate-50 transition">
                    ${renderUserAvatar(user, 'w-7 h-7')}
                    <span class="text-[12.5px] font-medium text-slate-700 max-w-[90px] truncate hidden sm:inline">${escapeHtml(user.name)}</span>
                  </button>

                  <div id="userMenu" data-dropdown-menu class="hidden absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 animate-pop">
                    <div class="p-3.5 border-b border-slate-100 flex items-center gap-3">
                      ${renderUserAvatar(user, 'w-10 h-10')}
                      <div class="min-w-0">
                        <div class="text-[13.5px] font-semibold text-slate-900 truncate">${escapeHtml(user.name)}</div>
                        <div class="text-[11.5px] text-blue-700 truncate">${escapeHtml(user.email || '')}</div><div class="text-[11px] text-slate-500 truncate">${escapeHtml(user.department)}</div>
                      </div>
                    </div>
                    <div class="p-1.5 text-[13px] space-y-0.5">
                      <button onclick="closeAllDropdowns(); openEditOwnProfileModal();" class="w-full px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 text-left flex items-center gap-2">
                        ${renderIcon('user', 'w-4 h-4')}<span>แก้ไขโปรไฟล์ของฉัน</span>
                      </button>
                      <button onclick="closeAllDropdowns(); handleSellClick();" class="w-full px-3 py-2 rounded-xl hover:bg-blue-50 text-blue-700 font-medium text-left flex items-center gap-2">
                        ${renderIcon('plus', 'w-4 h-4')}<span>ลงขายสินค้าใหม่</span>
                      </button>
                      <button onclick="closeAllDropdowns(); openSellerDashboardModal();" class="w-full px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 text-left flex items-center gap-2">
                        ${renderIcon('box', 'w-4 h-4')}<span>สินค้าของฉัน</span>
                      </button>
                      ${user.role === 'admin' ? `
                        <button onclick="openAdminPortal()" class="w-full px-3 py-2 rounded-xl hover:bg-blue-50 text-blue-700 font-semibold text-left flex items-center gap-2">
                          ${renderIcon('shield', 'w-4 h-4')}<span>ระบบจัดการหลังบ้าน (Admin)</span>
                        </button>
                      ` : ''}
                      <button onclick="logoutUser()" class="w-full px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 text-left flex items-center gap-2">
                        ${renderIcon('close', 'w-4 h-4')}<span>ออกจากระบบ</span>
                      </button>
                    </div>
                  </div>
                </div>
              ` : `
                <div class="flex items-center gap-1.5">
                  <button onclick="openAuthModal('login')" class="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-[13px] font-semibold transition">
                    เข้าสู่ระบบ
                  </button>
                  <button onclick="openAuthModal('register')" style="background-color: ${primary}" class="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-white text-[13px] font-semibold hover:opacity-95 transition">
                    สมัครสมาชิก
                  </button>
                </div>
              `}

              <!-- Mobile Hamburger -->
              <button onclick="STATE.mobileMenuOpen = !STATE.mobileMenuOpen; renderApp();" class="md:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-700" aria-label="เมนู">
                ${renderIcon(STATE.mobileMenuOpen ? 'close' : 'menu', 'w-5 h-5')}
              </button>
            </div>
          </div>

          <!-- Mobile Drawer -->
          ${STATE.mobileMenuOpen ? `
            <div class="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1.5 text-[14px]">
              <button onclick="filterAndScroll('all', 'all')" class="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-medium text-slate-800">ตลาดสินค้า</button>
              <button onclick="STATE.mobileMenuOpen=false; openShopsModal();" class="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-medium text-slate-800">ร้านค้าสมาชิก</button>
              <button onclick="STATE.mobileMenuOpen=false; openPickupGuideModal();" class="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-medium text-slate-800">จุดนัดรับในวิทยาลัย</button>
              <button onclick="STATE.mobileMenuOpen=false; openPwaInstallGuideModal();" class="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-medium text-blue-700">ติดตั้งเป็นแอปมือถือ (PWA)</button>
              <div class="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button onclick="STATE.mobileMenuOpen=false; openAuthModal('register');" class="py-2 rounded-xl border border-slate-200 text-slate-800 font-semibold text-center text-[13px]">สมัครสมาชิก</button>
                <button onclick="openAdminPortal()" style="background-color: ${primary}" class="py-2 rounded-xl text-white font-semibold text-center text-[13px]">ระบบหลังบ้าน Admin</button>
              </div>
            </div>
          ` : ''}
        </header>

        <!-- SLIM ANNOUNCEMENT BAR -->
        ${pinnedAnn ? `
          <div class="bg-blue-50/70 border-b border-blue-100">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3 text-[12.5px]">
              <button onclick="openAnnouncementModal('${pinnedAnn.id}')" class="flex items-center gap-2 text-blue-900 hover:text-blue-700 truncate text-left">
                <span class="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10.5px] font-semibold shrink-0">ประกาศ</span>
                <span class="font-medium truncate">${escapeHtml(pinnedAnn.title)}</span>
              </button>
              <button onclick="openAnnouncementsArchiveModal()" class="text-blue-700 hover:underline font-medium shrink-0 text-[12px]">ดูทั้งหมด</button>
            </div>
          </div>
        ` : ''}

        <!-- CLEAN HERO SECTION -->
        <section class="max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-2">
          <div class="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-sm">
            <img src="${REAL_PHOTOS.campus_hero}" alt="${escapeHtml(cfg.collegeName)}" onerror="this.style.display='none'" class="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-blue-950/70"></div>

            <div class="relative z-10 px-6 py-9 sm:px-10 sm:py-11 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div class="lg:col-span-8 space-y-4">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[12px] text-blue-100 font-medium">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>${escapeHtml(cfg.collegeName)}</span>
                </div>

                <h1 class="text-[24px] sm:text-[35px] font-bold leading-tight tracking-tight">
                  ${escapeHtml(cfg.heroHeadline)}
                </h1>
                <p class="text-[13.5px] sm:text-[15px] text-slate-300 max-w-2xl leading-relaxed">
                  ${escapeHtml(cfg.heroSub)}
                </p>

                <div class="pt-2 flex flex-wrap items-center gap-2.5">
                  <button onclick="filterAndScroll('all', 'all')" class="px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-blue-50 font-semibold text-[13.5px] transition shadow-sm">
                    สำรวจสินค้าทั้งหมด
                  </button>
                  <button onclick="handleSellClick()" style="background-color: ${primary}" class="px-5 py-2.5 rounded-xl text-white hover:opacity-95 font-semibold text-[13.5px] transition shadow-sm">
                    + ลงขายสินค้า
                  </button>
                  <button onclick="openAuthModal('register')" class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-[13px] transition">
                    สมัครสมาชิก
                  </button>
                </div>
              </div>

              <!-- Clean KPI Summary Card -->
              <div class="lg:col-span-4 grid grid-cols-2 gap-3">
                <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div class="text-[24px] font-bold text-white kpi-num" data-target="${approvedProducts.length}">${approvedProducts.length}</div>
                  <div class="text-[12px] text-slate-300 mt-0.5">สินค้าพร้อมขาย</div>
                </div>
                <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div class="text-[24px] font-bold text-white kpi-num" data-target="${STATE.users.length}">${STATE.users.length}</div>
                  <div class="text-[12px] text-slate-300 mt-0.5">สมาชิกในระบบ</div>
                </div>
                <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div class="text-[24px] font-bold text-white kpi-num" data-target="${(cfg.pickupPoints || []).length}">${(cfg.pickupPoints || []).length}</div>
                  <div class="text-[12px] text-slate-300 mt-0.5">จุดนัดรับในวิทยาลัย</div>
                </div>
                <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div class="text-[24px] font-bold text-white kpi-num" data-target="${STATE.visitorCount}">${STATE.visitorCount.toLocaleString()}</div>
                  <div class="text-[12px] text-slate-300 mt-0.5">ยอดเข้าชมระบบ</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- MARKETPLACE SECTION -->
        <main id="marketplaceSection" class="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-1 space-y-6">
          <!-- Category Pills -->
          <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button onclick="STATE.selectedCategory='all'; renderApp();" style="${STATE.selectedCategory === 'all' ? `background-color: ${primary}` : ''}" class="px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition ${STATE.selectedCategory === 'all' ? 'text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'}">
              ทั้งหมด
            </button>
            ${activeCats.map(cat => `
              <button onclick="STATE.selectedCategory='${cat.id}'; renderApp();" style="${STATE.selectedCategory === cat.id ? `background-color: ${primary}` : ''}" class="px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap flex items-center gap-1.5 transition ${STATE.selectedCategory === cat.id ? 'text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'}">
                ${renderIcon(cat.icon, 'w-3.5 h-3.5')}
                <span>${escapeHtml(cat.name)}</span>
              </button>
            `).join('')}
          </div>

          <!-- Clean Filter Toolbar -->
          <div class="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
              <div class="lg:col-span-4 relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">${renderIcon('search', 'w-4 h-4')}</span>
                <input id="storeSearchInput" type="text" value="${escapeHtml(STATE.searchQuery)}" oninput="STATE.searchQuery=this.value; updateProductGridOnly();" placeholder="ค้นหาชื่อสินค้า หรือร้านค้า..." class="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px] focus:outline-none focus:border-blue-500 transition" />
              </div>

              <div class="lg:col-span-2">
                <select onchange="STATE.selectedCondition=this.value; updateProductGridOnly();" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-[13px] bg-white text-slate-700 focus:outline-none focus:border-blue-500">
                  <option value="all" ${STATE.selectedCondition === 'all' ? 'selected' : ''}>สภาพ: ทั้งหมด</option>
                  ${['ใหม่', 'เหมือนใหม่', 'ดี', 'พอใช้'].map(c => `<option value="${c}" ${STATE.selectedCondition === c ? 'selected' : ''}>สภาพ: ${c}</option>`).join('')}
                </select>
              </div>

              <div class="lg:col-span-3 flex items-center gap-2">
                <input type="number" min="0" value="${escapeHtml(STATE.minPrice)}" oninput="STATE.minPrice=this.value; updateProductGridOnly();" placeholder="ราคาต่ำสุด" class="w-1/2 px-3 py-2 rounded-xl border border-slate-200 text-[13px] focus:outline-none focus:border-blue-500" />
                <span class="text-slate-300">-</span>
                <input type="number" min="0" value="${escapeHtml(STATE.maxPrice)}" oninput="STATE.maxPrice=this.value; updateProductGridOnly();" placeholder="ราคาสูงสุด" class="w-1/2 px-3 py-2 rounded-xl border border-slate-200 text-[13px] focus:outline-none focus:border-blue-500" />
              </div>

              <div class="lg:col-span-3">
                <select onchange="STATE.sortOrder=this.value; updateProductGridOnly();" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-[13px] bg-white text-slate-700 focus:outline-none focus:border-blue-500">
                  <option value="latest" ${STATE.sortOrder === 'latest' ? 'selected' : ''}>เรียง: มาใหม่ล่าสุด</option>
                  <option value="views" ${STATE.sortOrder === 'views' ? 'selected' : ''}>เรียง: ยอดเข้าชมสูงสุด</option>
                  <option value="price_asc" ${STATE.sortOrder === 'price_asc' ? 'selected' : ''}>เรียง: ราคา ต่ำ → สูง</option>
                  <option value="price_desc" ${STATE.sortOrder === 'price_desc' ? 'selected' : ''}>เรียง: ราคา สูง → ต่ำ</option>
                </select>
              </div>
            </div>

            <div class="flex items-center justify-between text-[12.5px] text-slate-500 pt-1">
              <span id="productCountText">พบสินค้า <strong class="text-slate-900">${filteredProducts.length}</strong> รายการ${STATE.selectedShopFilter !== 'all' ? ` • ร้าน ${escapeHtml(STATE.selectedShopFilter)}` : ''}</span>
              <button onclick="clearAllFilters()" class="text-blue-700 hover:underline font-medium">ล้างตัวกรอง</button>
            </div>
          </div>

          <!-- PRODUCT GRID -->
          <div id="productGridContainer">
            ${filteredProducts.length > 0 ? `
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                ${filteredProducts.map(renderProductCard).join('')}
              </div>
            ` : `
              <div class="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <div class="text-slate-400 text-[14px]">ไม่พบสินค้าที่ตรงกับเงื่อนไขการค้นหา</div>
                <button onclick="clearAllFilters()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-medium transition">ล้างตัวกรองทั้งหมด</button>
              </div>
            `}
          </div>

          <!-- CLEAN 2-COLUMN COMMUNITY SECTION -->
          <section class="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4">
              <div class="flex items-center justify-between">
                <h2 class="text-[16px] font-bold text-slate-900">ประกาศล่าสุดจากวิทยาลัย</h2>
                <button onclick="openAnnouncementsArchiveModal()" class="text-[12.5px] text-blue-700 font-medium hover:underline">ดูทั้งหมด →</button>
              </div>
              <div class="divide-y divide-slate-100">
                ${activeAnnouncements.slice(0, 3).map(ann => `
                  <div onclick="openAnnouncementModal('${ann.id}')" class="py-3 first:pt-0 last:pb-0 cursor-pointer flex items-center gap-3.5 group">
                    <div class="w-16 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      ${renderPhoto(ann.photoKey || 'news_1', ann.title)}
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="text-[13.5px] font-semibold text-slate-800 group-hover:text-blue-700 line-clamp-1 transition">${escapeHtml(ann.title)}</div>
                      <div class="text-[12px] text-slate-400 mt-0.5">${escapeHtml(ann.date)}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4">
              <div class="flex items-center justify-between">
                <h2 class="text-[16px] font-bold text-slate-900">ร้านค้าสมาชิกแนะนำ</h2>
                <button onclick="openShopsModal()" class="text-[12.5px] text-blue-700 font-medium hover:underline">ดูทั้งหมด →</button>
              </div>
              <div class="space-y-3">
                ${STATE.shops.map(shop => {
                  const following = STATE.followedShops.includes(shop.id);
                  return `
                    <div class="p-3 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3">
                      <div onclick="filterAndScroll('all', '${escapeHtml(shop.name)}')" class="cursor-pointer flex items-center gap-3 min-w-0">
                        <div class="w-11 h-11 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                          ${renderPhoto(shop.photoKey || 'shop_it', shop.name)}
                        </div>
                        <div class="min-w-0">
                          <div class="text-[13.5px] font-semibold text-slate-900 truncate">${escapeHtml(shop.name)}</div>
                          <div class="text-[11.5px] text-slate-500 truncate">${escapeHtml(shop.tagline)}</div>
                        </div>
                      </div>
                      <button onclick="toggleFollowShop('${shop.id}')" class="px-3 py-1.5 rounded-xl text-[12px] font-medium shrink-0 transition ${following ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}">
                        ${following ? 'ติดตามแล้ว' : '+ ติดตาม'}
                      </button>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </section>
        </main>

        <!-- CLEAN MINIMAL FOOTER -->
        <footer class="bg-white border-t border-slate-200 mt-10">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="flex items-center gap-3.5">
              ${renderBrandLogo('w-11 h-11')}
              <div>
                <div class="font-bold text-[15px] text-slate-900">${escapeHtml(cfg.brandName)} • ${escapeHtml(cfg.collegeName)}</div>
                <div class="text-[12.5px] text-slate-500 mt-0.5">${escapeHtml(cfg.footerAddress)}</div>
                <div class="text-[11.5px] text-slate-400 mt-0.5">${escapeHtml(cfg.footerCopyright)}</div>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-2 text-[12.5px]">
              <button onclick="openPwaInstallGuideModal()" class="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium">ติดตั้งแอปมือถือ</button>
              <button onclick="openSupportModal()" class="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium">แจ้งปัญหา</button>
              ${user && user.role === 'admin' ? `<button onclick="openAdminPortal()" style="background-color: ${primary}" class="px-3.5 py-2 rounded-xl text-white font-semibold hover:opacity-95">ระบบหลังบ้าน Admin</button>` : `<button onclick="openAuthModal('login')" class="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium">เข้าสู่ระบบสมาชิก</button>`}
            </div>
          </div>
        </footer>

        <!-- MOBILE APP BOTTOM NAVIGATION BAR -->
        <nav class="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 grid grid-cols-5 items-center text-[10.5px] font-medium text-slate-500">
          <button onclick="filterAndScroll('all', 'all')" class="flex flex-col items-center gap-0.5 py-1 text-blue-700">
            ${renderIcon('home', 'w-5 h-5')}<span>หน้าหลัก</span>
          </button>
          <button onclick="openChatInboxModal()" class="relative flex flex-col items-center gap-0.5 py-1 hover:text-slate-900">
            ${renderIcon('chat', 'w-5 h-5')}<span>แชท</span>
            ${getUnreadChatCount() > 0 ? `<span class="absolute top-0 right-3 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">${getUnreadChatCount()}</span>` : ''}
          </button>
          <button onclick="handleSellClick()" class="flex flex-col items-center gap-0.5 py-1">
            <span style="background-color: ${primary}" class="w-9 h-9 -mt-4 rounded-full text-white shadow-md flex items-center justify-center">${renderIcon('plus', 'w-5 h-5')}</span>
            <span class="text-slate-700 font-semibold">ลงขาย</span>
          </button>
          <button onclick="openWishlistModal()" class="relative flex flex-col items-center gap-0.5 py-1 hover:text-slate-900">
            ${renderIcon('heart', 'w-5 h-5')}<span>ถูกใจ</span>
            ${STATE.wishlist.length > 0 ? `<span class="absolute top-0 right-3 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">${STATE.wishlist.length}</span>` : ''}
          </button>
          <button onclick="${user ? 'openEditOwnProfileModal()' : "openAuthModal('login')"}" class="flex flex-col items-center gap-0.5 py-1 hover:text-slate-900">
            ${renderIcon('user', 'w-5 h-5')}<span>${user ? 'โปรไฟล์' : 'เข้าสู่ระบบ'}</span>
          </button>
        </nav>
      `;
    }

    // =========================================================================

// 7. STOREFRONT INTERACTIONS & MODALS
    // =========================================================================
    function handleSellClick() {
      if (!getCurrentUser()) {
        showToast('กรุณาเข้าสู่ระบบหรือสมัครสมาชิกก่อนลงขายสินค้า', 'warning');
        openAuthModal('register');
        return;
      }
      openCreateOrEditListingModal(null);
    }

    function toggleWishlist(e, prodId) {
      if (e) e.stopPropagation();
      const idx = STATE.wishlist.indexOf(prodId);
      if (idx > -1) {
        STATE.wishlist.splice(idx, 1);
        showToast('นำออกจากรายการโปรดแล้ว', 'info');
      } else {
        STATE.wishlist.push(prodId);
        showToast('บันทึกลงรายการโปรดแล้ว', 'success');
      }
      saveState(false);
      renderApp();
      const btn = document.getElementById(`favBtn_${prodId}`);
      if (btn) btn.classList.add('animate-heart');
    }

    function toggleFollowShop(shopId) {
      const shop = STATE.shops.find(s => s.id === shopId);
      if (!shop) return;
      const idx = STATE.followedShops.indexOf(shopId);
      if (idx > -1) {
        STATE.followedShops.splice(idx, 1);
        showToast(`เลิกติดตาม ${shop.name} แล้ว`, 'info');
      } else {
        STATE.followedShops.push(shopId);
        showToast(`ติดตาม ${shop.name} เรียบร้อย`, 'success');
      }
      saveState(false);
      renderApp();
    }

    function openProductDetailModal(prodId, galleryIdx = 0, incrementView = true) {
      const prod = STATE.products.find(p => p.id === prodId);
      if (!prod) return;
      if (incrementView) {
        prod.views = (prod.views || 0) + 1;
        STATE.visitorCount += 1;
        saveState();
        updateProductGridOnly();
      }

      const gallery = (prod.galleryPhotos && prod.galleryPhotos.length > 0) ? prod.galleryPhotos : [prod.photoKey || 'laptop_1'];
      const activeKey = gallery[galleryIdx] || gallery[0];
      const isFav = STATE.wishlist.includes(prod.id);
      const catName = STATE.categories.find(c => c.id === prod.category)?.name || 'ทั่วไป';

      openModal(`
        <div class="relative">
          <button onclick="closeModal()" aria-label="ปิดหน้าต่าง" class="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/95 border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900">
            ${renderIcon('close', 'w-4 h-4')}
          </button>

          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="bg-slate-50 p-5 flex flex-col justify-between gap-3 border-b md:border-b-0 md:border-r border-slate-100">
              <div class="aspect-[4/3] rounded-xl overflow-hidden bg-white border border-slate-200/80">
                ${prod.customImageUrl
                  ? `<img src="${prod.customImageUrl}" alt="${escapeHtml(prod.title)}" onerror="handleImgError(this)" class="w-full h-full object-cover" />`
                  : renderPhoto(activeKey, prod.title)
                }
              </div>
              ${!prod.customImageUrl && gallery.length > 1 ? `
                <div class="flex items-center justify-center gap-2">
                  ${gallery.map((k, i) => `
                    <button onclick="openProductDetailModal('${prod.id}', ${i}, false)" class="w-16 h-12 rounded-lg overflow-hidden border-2 transition ${i === galleryIdx ? 'border-blue-600' : 'border-transparent opacity-70 hover:opacity-100'}">
                      ${renderPhoto(k, `${prod.title} ภาพที่ ${i + 1}`)}
                    </button>
                  `).join('')}
                </div>
              ` : ''}
            </div>

            <div class="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
              <div class="flex flex-wrap items-center gap-2 text-[11.5px]">
                <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">${escapeHtml(catName)}</span>
                <span class="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">สภาพ: ${escapeHtml(prod.condition)}</span>
                ${prod.tradeStatus === 'trading' ? `<span class="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">กำลังทำการซื้อขาย</span>` : ''}
                ${prod.tradeStatus === 'sold' ? `<span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">ขายแล้ว</span>` : ''}
                <span class="text-slate-400 ml-auto inline-flex items-center gap-2">
                  <span class="inline-flex items-center gap-1">${renderIcon('clock', 'w-3.5 h-3.5')} ${formatPostedElapsed(prod.createdAtMs)}</span>
                  <span class="inline-flex items-center gap-1">${renderIcon('eye', 'w-3.5 h-3.5')} ${prod.views}</span>
                </span>
              </div>

              <div>
                <h2 class="text-[19px] font-bold text-slate-900 leading-snug">${escapeHtml(prod.title)}</h2>
                <div class="mt-1 text-[24px] font-bold text-blue-700">฿${prod.price.toLocaleString()}</div>
              </div>

              <div class="flex items-center gap-2 text-[13px] text-slate-700">
                <span class="font-semibold">${escapeHtml(prod.shop)}</span>
                <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px]">${escapeHtml(prod.sellerBadge)}</span>
              </div>

              <p class="text-[13.5px] text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                ${escapeHtml(prod.description)}
              </p>

              <div class="text-[13px] text-slate-700 flex items-center gap-2">
                <span class="text-blue-600">${renderIcon('pin', 'w-4 h-4')}</span>
                <span>จุดนัดรับ: <strong class="text-slate-900">${escapeHtml(prod.pickup)}</strong></span>
              </div>

              <button onclick="startProductChat('${prod.id}')" style="background-color: ${STATE.siteConfig.primaryColor}" class="w-full py-2.5 rounded-xl text-white font-semibold text-[13.5px] hover:opacity-95 transition flex items-center justify-center gap-2 shadow-sm">
                ${renderIcon('chat', 'w-4 h-4')}
                <span>${prod.tradeStatus === 'sold' ? 'ดูแชท / สอบถามผู้ขาย (ขายแล้ว)' : 'แชทหาผู้ขายในเว็บ'}</span>
              </button>

              <div class="grid grid-cols-2 gap-2.5">
                <button onclick="copyText('${escapeHtml(prod.lineId)}', 'Line ID')" class="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-[12px] transition truncate">
                  Line: ${escapeHtml(prod.lineId)}
                </button>
                <button onclick="copyText('${escapeHtml(prod.phone)}', 'เบอร์โทร')" class="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-[12px] transition truncate">
                  โทร: ${escapeHtml(prod.phone)}
                </button>
              </div>

              <div class="grid grid-cols-2 gap-2.5">
                <button onclick="toggleWishlist(event, '${prod.id}'); openProductDetailModal('${prod.id}', ${galleryIdx}, false);" class="py-2.5 rounded-xl border text-[12.5px] font-semibold transition ${isFav ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}">
                  ${isFav ? '♥ ถูกใจแล้ว' : '♡ รายการโปรด'}
                </button>
                <button onclick="shareProduct('${prod.id}')" class="py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12.5px] font-semibold transition inline-flex items-center justify-center gap-1.5">
                  ${renderIcon('share', 'w-4 h-4')}<span>แชร์ลิงก์สินค้า</span>
                </button>
              </div>

              <div class="pt-3 border-t border-slate-100">
                <button onclick="document.getElementById('prodReportForm').classList.toggle('hidden')" class="text-[12px] text-slate-400 hover:text-rose-600 inline-flex items-center gap-1 transition">
                  ${renderIcon('flag', 'w-3.5 h-3.5')}<span>แจ้งปัญหาสินค้านี้</span>
                </button>
                <form id="prodReportForm" onsubmit="submitProductReport(event, '${prod.id}')" class="hidden mt-2.5 p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2.5">
                  <select id="repReasonCode" class="w-full px-3 py-2 rounded-lg bg-white border border-rose-200 text-[12.5px]">
                    <option value="ข้อมูลสินค้าไม่ตรงกับความเป็นจริง">ข้อมูลสินค้าไม่ตรงกับความเป็นจริง</option>
                    <option value="สินค้าไม่เหมาะสมในสถานศึกษา">สินค้าไม่เหมาะสมในสถานศึกษา</option>
                    <option value="สอบถามข้อมูลเพิ่มเติม / ราคาผิดปกติ">สอบถามข้อมูลเพิ่มเติม / ราคาผิดปกติ</option>
                  </select>
                  <textarea id="repDetailsInput" rows="2" required placeholder="ระบุรายละเอียดเพิ่มเติม..." class="w-full px-3 py-2 rounded-lg bg-white border border-rose-200 text-[12.5px]"></textarea>
                  <div class="flex justify-end gap-2">
                    <button type="button" onclick="document.getElementById('prodReportForm').classList.add('hidden')" class="px-3 py-1 text-[12px] text-slate-500">ยกเลิก</button>
                    <button type="submit" class="px-3.5 py-1.5 rounded-lg bg-rose-600 text-white text-[12px] font-semibold">ส่งรายงาน</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      `, 'max-w-3xl');
    }

    function submitProductReport(e, prodId) {
      e.preventDefault();
      const prod = STATE.products.find(p => p.id === prodId);
      if (!prod) return;
      const u = getCurrentUser();
      STATE.reports.unshift({
        id: 'rep_' + Date.now(),
        productId: prod.id,
        productTitle: prod.title,
        reason_code: document.getElementById('repReasonCode').value,
        details: document.getElementById('repDetailsInput').value.trim(),
        reporter: u ? u.name : 'ผู้เยี่ยมชม',
        status: 'open',
        resolution_note: '',
        createdAt: formatThaiDate(new Date(), true)
      });
      saveState();
      closeModal();
      showToast('ส่งรายงานไปยังระบบหลังบ้านเรียบร้อยแล้ว', 'warning');
    }

    function openCreateOrEditListingModal(editProdId = null) {
      const user = getCurrentUser() || STATE.users[0];
      const existing = editProdId ? STATE.products.find(p => p.id === editProdId) : null;
      const activeCats = STATE.categories.filter(c => c.active);
      const selectedPhotoKey = existing ? (existing.photoKey || 'laptop_1') : 'laptop_1';

      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">${existing ? 'แก้ไขรายการสินค้า' : 'ลงขายสินค้าใหม่'}</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>

        <form onsubmit="submitListingForm(event, '${editProdId || ''}')" class="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div class="sm:col-span-2">
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">ชื่อสินค้า *</label>
              <input id="lstTitle" required type="text" value="${existing ? escapeHtml(existing.title) : ''}" placeholder="เช่น เครื่องคิดเลขวิทยาศาสตร์, เสื้อช็อป ปวส." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px] focus:outline-none focus:border-blue-500" />
            </div>

            <div>
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">หมวดหมู่ *</label>
              <select id="lstCategory" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px] bg-white">
                ${activeCats.map(c => `<option value="${c.id}" ${existing && existing.category === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">ราคา (บาท) *</label>
              <input id="lstPrice" required type="number" min="1" value="${existing ? existing.price : ''}" placeholder="เช่น 450" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
            </div>

            <div>
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">สภาพสินค้า *</label>
              <select id="lstCondition" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px] bg-white">
                ${['ใหม่', 'เหมือนใหม่', 'ดี', 'พอใช้'].map(c => `<option value="${c}" ${existing && existing.condition === c ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">จุดนัดรับในวิทยาลัย *</label>
              <select id="lstPickup" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px] bg-white">
                ${(STATE.siteConfig.pickupPoints || INITIAL_PICKUP_POINTS).map(pt => `<option value="${escapeHtml(pt.name)}" ${existing && existing.pickup === pt.name ? 'selected' : ''}>${escapeHtml(pt.name)}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">Line ID *</label>
              <input id="lstLine" required type="text" value="${existing ? escapeHtml(existing.lineId) : escapeHtml(user.lineId)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
            </div>

            <div>
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">เบอร์โทรศัพท์ *</label>
              <input id="lstPhone" required type="text" value="${existing ? escapeHtml(existing.phone) : escapeHtml(user.phone)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <label class="block text-[12.5px] font-semibold text-slate-800">รูปภาพสินค้า (อัปโหลดจากเครื่อง หรือเลือกรูปตัวอย่าง)</label>
            <input type="file" accept="image/*" onchange="resizeLocalProductImage(event)" class="block w-full text-[12px] text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[12px] file:font-semibold file:bg-blue-600 file:text-white cursor-pointer" />
            <div id="lstUploadStatus" class="text-[11.5px] text-emerald-700 font-medium">${existing && existing.customImageUrl ? '✓ ใช้รูปที่อัปโหลดแล้ว' : ''}</div>
            <input type="hidden" id="lstCustomImgUrl" value="${existing && existing.customImageUrl ? existing.customImageUrl : ''}" />
            <input type="hidden" id="lstPhotoKey" value="${selectedPhotoKey}" />
            <input type="hidden" id="lstPhotoChanged" value="0" />

            <div class="grid grid-cols-5 gap-2">
              ${[
                { k: 'laptop_1', l: 'โน้ตบุ๊ก' },
                { k: 'headphones_1', l: 'หูฟัง' },
                { k: 'backpack_1', l: 'กระเป๋า' },
                { k: 'uniform_1', l: 'ชุดนักศึกษา' },
                { k: 'books_1', l: 'หนังสือ' }
              ].map(item => `
                <button type="button" onclick="document.getElementById('lstPhotoKey').value='${item.k}'; document.getElementById('lstCustomImgUrl').value=''; document.getElementById('lstPhotoChanged').value='1'; document.getElementById('lstUploadStatus').textContent='เลือกรูปตัวอย่าง: ${item.l}';" class="p-1 rounded-xl bg-white border border-slate-200 hover:border-blue-500 text-center transition">
                  <div class="w-full h-11 rounded-lg overflow-hidden mb-1">${renderPhoto(item.k, item.l)}</div>
                  <div class="text-[10.5px] font-medium text-slate-600 truncate">${item.l}</div>
                </button>
              `).join('')}
            </div>
          </div>

          <div>
            <label class="block text-[12.5px] font-medium text-slate-700 mb-1">รายละเอียดสินค้า *</label>
            <textarea id="lstDesc" rows="3" required placeholder="ระบุสภาพสินค้า อุปกรณ์ที่มีให้ และช่วงเวลาที่สะดวกนัดรับ..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]">${existing ? escapeHtml(existing.description) : ''}</textarea>
          </div>

          <div class="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <label class="inline-flex items-center gap-2 text-[12.5px] text-slate-600 cursor-pointer">
              <input id="lstAutoApprove" type="checkbox" checked class="w-4 h-4 accent-blue-600 rounded" />
              <span>เผยแพร่ขึ้นหน้าร้านทันที</span>
            </label>
            <div class="flex items-center gap-2">
              <button type="button" onclick="closeModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-[13px]">ยกเลิก</button>
              <button type="submit" style="background-color: ${STATE.siteConfig.primaryColor}" class="px-5 py-2 rounded-xl text-white text-[13px] font-semibold">
                ${existing ? 'บันทึกการแก้ไข' : 'ลงขายสินค้า'}
              </button>
            </div>
          </div>
        </form>
      `);
    }

    function resizeLocalProductImage(e) {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const tempUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = function () {
        const maxDim = 540;
        let w = img.width, h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) { h = Math.round((h * maxDim) / w); w = maxDim; }
          else { w = Math.round((w * maxDim) / h); h = maxDim; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(tempUrl);
        document.getElementById('lstCustomImgUrl').value = canvas.toDataURL('image/jpeg', 0.72);
        document.getElementById('lstPhotoChanged').value = '1';
        document.getElementById('lstUploadStatus').textContent = `✓ อัปโหลดรูป "${file.name}" เรียบร้อย`;
      };
      img.src = tempUrl;
    }

    function submitListingForm(e, editProdId) {
      e.preventDefault();
      const user = getCurrentUser() || STATE.users[0];
      const title = document.getElementById('lstTitle').value.trim();
      const category = document.getElementById('lstCategory').value;
      const price = Math.max(1, Number(document.getElementById('lstPrice').value) || 0);
      const condition = document.getElementById('lstCondition').value;
      const pickup = document.getElementById('lstPickup').value;
      const lineId = document.getElementById('lstLine').value.trim();
      const phone = document.getElementById('lstPhone').value.trim();
      const customImageUrl = document.getElementById('lstCustomImgUrl').value;
      const photoKey = document.getElementById('lstPhotoKey').value || 'laptop_1';
      const photoChanged = document.getElementById('lstPhotoChanged').value === '1';
      const description = document.getElementById('lstDesc').value.trim();
      const autoApprove = document.getElementById('lstAutoApprove').checked;
      const nextStatus = autoApprove ? 'approved' : 'pending';

      if (editProdId) {
        const p = STATE.products.find(item => item.id === editProdId);
        if (p) {
          Object.assign(p, {
            title, category, price, condition, pickup, lineId, phone, customImageUrl, photoKey, description, status: nextStatus
          });
          if (photoChanged) p.galleryPhotos = [photoKey];
        }
      } else {
        STATE.products.unshift({
          id: 'p_' + Date.now(),
          title,
          price,
          shop: user.shopName || 'ร้านสมาชิก UVC',
          sellerId: user.id,
          sellerEmail: user.email || '',
          sellerBadge: user.roleLabel,
          createdAtMs: Date.now(),
          tradeStatus: 'available',
          soldDateStr: '',
          category,
          condition,
          status: nextStatus,
          views: 1,
          pickup,
          lineId,
          phone,
          photoKey,
          galleryPhotos: [photoKey],
          customImageUrl,
          description,
          moderation_note: autoApprove ? 'เผยแพร่อัตโนมัติ' : ''
        });
      }

      STATE.notifications.unshift({
        id: 'n_' + Date.now(),
        title: autoApprove ? `เผยแพร่สินค้า "${title}" บนหน้าร้านแล้ว` : `ส่งสินค้า "${title}" เข้าคิวรออนุมัติแล้ว`,
        time: 'เมื่อสักครู่',
        unread: true
      });

      saveState();
      closeModal();
      renderApp();
      if (autoApprove) fireConfetti();
      showToast(autoApprove ? 'ลงขายสินค้าเรียบร้อยแล้ว!' : 'ส่งประกาศเข้าคิวรออนุมัติในหน้า Admin แล้ว', 'success');
    }

    function openSellerDashboardModal() {
      const user = getCurrentUser();
      if (!user) { openAuthModal('login'); return; }
      const myProds = STATE.products.filter(p => p.sellerId === user.id && !p.deleted_at);
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">สินค้าของฉัน (${myProds.length} รายการ)</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>
        <div class="p-6 space-y-3 max-h-[75vh] overflow-y-auto">
          <div class="flex items-center justify-between">
            <span class="text-[13px] text-slate-500">ร้านค้า: <strong class="text-slate-900">${escapeHtml(user.shopName)}</strong></span>
            <button onclick="closeModal(); openCreateOrEditListingModal(null);" class="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-[12.5px] font-semibold">+ ลงขายสินค้าใหม่</button>
          </div>
          ${myProds.length ? myProds.map(p => {
            const st = getStatusBadgeInfo(p.status);
            const isExpiredSold = isSoldExpiredAfterMidnight(p);
            return `
              <div class="p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-14 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">${renderProductMedia(p)}</div>
                  <div class="min-w-0">
                    <div class="text-[13.5px] font-semibold text-slate-900 truncate">${escapeHtml(p.title)}</div>
                    <div class="flex flex-wrap items-center gap-1.5 mt-0.5">
                      <span class="text-[13px] font-bold text-blue-700">฿${p.price.toLocaleString()}</span>
                      <span class="px-2 py-0.5 rounded-full border text-[10.5px] font-medium ${st.cls}">${st.label}</span>
                      ${p.tradeStatus === 'trading' ? `<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10.5px] font-semibold">กำลังทำการซื้อขาย</span>` : ''}
                      ${p.tradeStatus === 'sold' ? `<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] font-semibold">${isExpiredSold ? 'ขายแล้ว (เก็บส่วนตัวหลัง 00:01)' : 'ขายแล้ว (แสดงหน้าร้านวันนี้)'}</span>` : ''}
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <button onclick="closeModal(); openCreateOrEditListingModal('${p.id}');" class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12px] font-medium">แก้ไข</button>
                  <button onclick="sellerDeleteListing('${p.id}')" class="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-[12px] font-medium">ลบประกาศ</button>
                </div>
              </div>
            `;
          }).join('') : `<div class="py-10 text-center text-slate-400 text-[13.5px]">ยังไม่มีรายการสินค้าที่คุณลงขาย</div>`}
        </div>
      `);
    }

    function sellerDeleteListing(prodId) {
      const p = STATE.products.find(item => item.id === prodId);
      if (p) p.deleted_at = formatThaiDate(new Date(), true);
      saveState();
      renderApp();
      openSellerDashboardModal();
      showToast('ลบประกาศสินค้าแล้ว', 'info');
    }

    function openWishlistModal() {
      const items = STATE.products.filter(p => STATE.wishlist.includes(p.id) && !p.deleted_at);
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">รายการโปรด (${items.length})</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>
        <div class="p-6 space-y-3 max-h-[75vh] overflow-y-auto">
          ${items.length ? items.map(p => `
            <div class="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
              <div onclick="closeModal(); openProductDetailModal('${p.id}');" class="cursor-pointer flex items-center gap-3 min-w-0">
                <div class="w-14 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">${renderProductMedia(p)}</div>
                <div class="min-w-0">
                  <div class="text-[13.5px] font-semibold text-slate-900 truncate">${escapeHtml(p.title)}</div>
                  <div class="text-[13px] font-bold text-blue-700">฿${p.price.toLocaleString()}</div>
                </div>
              </div>
              <button onclick="toggleWishlist(event, '${p.id}'); openWishlistModal();" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-[12px] font-medium shrink-0">นำออก</button>
            </div>
          `).join('') : `<div class="py-10 text-center text-slate-400 text-[13.5px]">ยังไม่มีสินค้าในรายการโปรด</div>`}
        </div>
      `, 'max-w-lg');
    }

    function openNotificationsModal() {
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">การแจ้งเตือน</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>
        <div class="p-6 space-y-2.5 max-h-[70vh] overflow-y-auto">
          <div class="flex justify-end">
            <button onclick="STATE.notifications.forEach(n => n.unread = false); saveState(false); renderApp(); openNotificationsModal();" class="text-[12px] text-blue-700 font-medium hover:underline">อ่านทั้งหมดแล้ว</button>
          </div>
          ${STATE.notifications.map(n => `
            <div class="p-3.5 rounded-xl border ${n.unread ? 'border-blue-200 bg-blue-50/50' : 'border-slate-100 bg-slate-50/60'} flex items-start justify-between gap-3">
              <div class="text-[13px] text-slate-800">${escapeHtml(n.title)}</div>
              <span class="text-[11px] text-slate-400 shrink-0">${escapeHtml(n.time)}</span>
            </div>
          `).join('')}
        </div>
      `, 'max-w-md');
    }

    function openPickupGuideModal() {
      const pts = STATE.siteConfig.pickupPoints || INITIAL_PICKUP_POINTS;
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">จุดนัดรับสินค้าภายในวิทยาลัย (${pts.length} จุด)</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>
        <div class="p-6 space-y-3 max-h-[75vh] overflow-y-auto">
          ${pts.map((pt, idx) => `
            <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-3">
              <span class="w-7 h-7 rounded-lg bg-blue-600 text-white text-[13px] font-bold flex items-center justify-center shrink-0">${idx + 1}</span>
              <div>
                <div class="font-semibold text-[14px] text-slate-900">${escapeHtml(pt.name)}</div>
                <div class="text-[12px] text-emerald-700 font-medium mt-0.5">เวลาแนะนำ: ${escapeHtml(pt.time)}</div>
                <p class="text-[12.5px] text-slate-600 mt-0.5">${escapeHtml(pt.note)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `, 'max-w-lg');
    }

    function openAnnouncementModal(annId) {
      const ann = STATE.announcements.find(a => a.id === annId);
      if (!ann) return;
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <span class="text-[14px] font-semibold text-slate-900">ประกาศวิทยาลัย</span>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>
        <div class="p-6 space-y-4">
          <div class="h-44 rounded-xl overflow-hidden bg-slate-100">${renderPhoto(ann.photoKey || 'news_1', ann.title)}</div>
          <div class="text-[12px] text-slate-400">วันที่ประกาศ: ${escapeHtml(ann.date)}</div>
          <h3 class="text-[17px] font-bold text-slate-900 leading-snug">${escapeHtml(ann.title)}</h3>
          <p class="text-[13.5px] text-slate-600 leading-relaxed">${escapeHtml(ann.content)}</p>
        </div>
      `, 'max-w-lg');
    }

    function openAnnouncementsArchiveModal() {
      const list = STATE.announcements.filter(a => a.active);
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">ประกาศทั้งหมด (${list.length})</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>
        <div class="p-6 space-y-3 max-h-[75vh] overflow-y-auto">
          ${list.map(a => `
            <div onclick="openAnnouncementModal('${a.id}')" class="cursor-pointer p-3 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center gap-3.5 transition">
              <div class="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">${renderPhoto(a.photoKey || 'news_1', a.title)}</div>
              <div class="min-w-0">
                <div class="text-[13.5px] font-semibold text-slate-900 line-clamp-1">${escapeHtml(a.title)}</div>
                <div class="text-[11.5px] text-slate-400 mt-0.5">${escapeHtml(a.date)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `, 'max-w-lg');
    }

    function openShopsModal() {
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">ร้านค้าสมาชิกในวิทยาลัย</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>
        <div class="p-6 space-y-3">
          ${STATE.shops.map(s => `
            <div class="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">${renderPhoto(s.photoKey || 'shop_it', s.name)}</div>
                <div class="min-w-0">
                  <div class="text-[14px] font-semibold text-slate-900 truncate">${escapeHtml(s.name)}</div>
                  <div class="text-[12px] text-slate-500 truncate">${escapeHtml(s.tagline)}</div>
                </div>
              </div>
              <button onclick="closeModal(); filterAndScroll('all', '${escapeHtml(s.name)}');" class="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-[12.5px] font-semibold shrink-0">ดูสินค้า</button>
            </div>
          `).join('')}
        </div>
      `, 'max-w-lg');
    }

    function openSupportModal() {
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">แจ้งปัญหา / ติดต่อผู้ดูแลระบบ</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>
        <form onsubmit="submitSupportForm(event)" class="p-6 space-y-3.5">
          <div>
            <label class="block text-[12.5px] font-medium text-slate-700 mb-1">หัวข้อเรื่อง</label>
            <select id="supType" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px] bg-white">
              <option value="สอบถามการใช้งานระบบ">สอบถามการใช้งานระบบ</option>
              <option value="แจ้งปัญหาข้อมูลสินค้า">แจ้งปัญหาข้อมูลสินค้า</option>
              <option value="ข้อเสนอแนะเพิ่มเติม">ข้อเสนอแนะเพิ่มเติม</option>
            </select>
          </div>
          <div>
            <label class="block text-[12.5px] font-medium text-slate-700 mb-1">รายละเอียด *</label>
            <textarea id="supDetail" rows="3" required placeholder="พิมพ์ข้อความถึงผู้ดูแลระบบ..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px]"></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" onclick="closeModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-[13px]">ยกเลิก</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 text-white text-[13px] font-semibold">ส่งข้อความ</button>
          </div>
        </form>
      `, 'max-w-md');
    }

    function submitSupportForm(e) {
      e.preventDefault();
      const u = getCurrentUser();
      STATE.reports.unshift({
        id: 'rep_' + Date.now(),
        productId: '',
        productTitle: 'ติดต่อผู้ดูแลระบบ',
        reason_code: document.getElementById('supType').value,
        details: document.getElementById('supDetail').value.trim(),
        reporter: u ? u.name : 'ผู้เยี่ยมชม',
        status: 'open',
        resolution_note: '',
        createdAt: formatThaiDate(new Date(), true)
      });
      saveState();
      closeModal();
      showToast('ส่งข้อความถึงผู้ดูแลระบบแล้ว', 'success');
    }

    // =========================================================================

// 7.5 BUYER-SELLER CHAT & IN-CHAT TRADE STATUS (MIDNIGHT CUTOFF)
    // =========================================================================
    function getUnreadChatCount() {
      const user = getCurrentUser();
      if (!user) return 0;
      const rooms = getUserChatRooms(user);
      const uEmail = (user.email || '').toLowerCase();
      const seenMap = STATE.chatSeenCounts || {};
      let unread = 0;
      rooms.forEach(r => {
        const total = (r.messages || []).length;
        const seen = seenMap[r.id] || 0;
        const last = total > 0 ? r.messages[total - 1] : null;
        if (total > seen && last && (last.senderEmail || '').toLowerCase() !== uEmail && last.senderEmail !== 'system') {
          unread += (total - seen);
        }
      });
      return unread;
    }

    function markChatRoomSeen(roomId) {
      const room = (STATE.chats || []).find(c => c.id === roomId);
      if (!room) return;
      if (!STATE.chatSeenCounts) STATE.chatSeenCounts = {};
      STATE.chatSeenCounts[roomId] = (room.messages || []).length;
      saveState(false);
    }

    function getUserChatRooms(user) {
      if (!user) return [];
      const uEmail = (user.email || '').toLowerCase();
      return (STATE.chats || [])
        .filter(c => c.buyerId === user.id || c.sellerId === user.id || (uEmail && ((c.buyerEmail || '').toLowerCase() === uEmail || (c.sellerEmail || '').toLowerCase() === uEmail)))
        .sort((a, b) => (b.updatedAtMs || 0) - (a.updatedAtMs || 0));
    }

    async function startProductChat(prodId) {
      const user = getCurrentUser();
      if (!user) {
        showToast('กรุณาเข้าสู่ระบบหรือสมัครสมาชิกด้วย @gmail.com ก่อนแชท', 'warning');
        openAuthModal('login');
        return;
      }
      const prod = STATE.products.find(p => p.id === prodId);
      if (!prod) return;

      const uEmail = (user.email || '').toLowerCase();
      const sEmail = (prod.sellerEmail || '').toLowerCase();
      if (prod.sellerId === user.id || (sEmail && uEmail === sEmail)) {
        // Seller clicked chat on own product: open inbox filtered or general inbox
        openChatInboxModal();
        return;
      }

      if (FIREBASE_CFG.projectId && FIREBASE_CFG.apiKey) {
        await pullStateFromFirebase(false);
      }

      if (!Array.isArray(STATE.chats)) STATE.chats = [];
      let room = STATE.chats.find(c => c.productId === prod.id && (c.buyerId === user.id || (uEmail && (c.buyerEmail || '').toLowerCase() === uEmail)));
      if (!room) {
        room = {
          id: `chat_${prod.id}_${Date.now()}`,
          productId: prod.id,
          productTitle: prod.title,
          productPrice: prod.price,
          productPhotoKey: prod.photoKey || 'laptop_1',
          sellerId: prod.sellerId,
          sellerEmail: prod.sellerEmail || '',
          sellerName: prod.shop || 'ผู้ขาย',
          buyerId: user.id,
          buyerEmail: user.email || '',
          buyerName: user.name,
          updatedAtMs: Date.now(),
          messages: [
            {
              senderEmail: 'system',
              senderName: 'ระบบ',
              text: `เริ่มการสนทนาเกี่ยวกับ "${prod.title}" (฿${prod.price.toLocaleString()})`,
              time: formatThaiDate(new Date(), true)
            }
          ]
        };
        STATE.chats.unshift(room);
        saveState(true, true);
      }
      openChatRoomModal(room.id);
    }

    async function openChatInboxModal() {
      const user = getCurrentUser();
      if (!user) {
        showToast('กรุณาเข้าสู่ระบบด้วย @gmail.com เพื่อดูข้อความแชท', 'warning');
        openAuthModal('login');
        return;
      }
      if (FIREBASE_CFG.projectId && FIREBASE_CFG.apiKey) {
        await pullStateFromFirebase(false);
      }
      const rooms = getUserChatRooms(user);
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">แชทซื้อ-ขาย (${rooms.length} ห้อง)</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>
        <div class="p-5 space-y-2.5 max-h-[75vh] overflow-y-auto">
          ${rooms.length ? rooms.map(r => {
            const prod = STATE.products.find(p => p.id === r.productId);
            const lastMsg = r.messages && r.messages.length ? r.messages[r.messages.length - 1] : null;
            const isSeller = prod && (prod.sellerId === user.id || (prod.sellerEmail && prod.sellerEmail.toLowerCase() === (user.email || '').toLowerCase()));
            return `
              <button onclick="openChatRoomModal('${r.id}')" class="w-full p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-between gap-3 text-left transition">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">${renderPhoto(r.productPhotoKey || 'laptop_1', r.productTitle)}</div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="text-[13.5px] font-semibold text-slate-900 truncate">${escapeHtml(r.productTitle)}</span>
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-medium ${isSeller ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}">${isSeller ? 'คุณเป็นผู้ขาย' : 'คุณเป็นผู้ซื้อ'}</span>
                    </div>
                    <div class="text-[12px] text-slate-500 truncate mt-0.5">${lastMsg ? escapeHtml(lastMsg.senderName + ': ' + lastMsg.text) : ''}</div>
                  </div>
                </div>
                <span class="text-[11px] text-slate-400 shrink-0">${prod && prod.tradeStatus === 'sold' ? 'ขายแล้ว' : prod && prod.tradeStatus === 'trading' ? 'กำลังซื้อขาย' : 'เปิดแชท →'}</span>
              </button>
            `;
          }).join('') : `<div class="py-10 text-center text-slate-400 text-[13.5px]">ยังไม่มีห้องแชท กดปุ่ม "แชทหาผู้ขาย" ในหน้าสินค้าได้เลย</div>`}
        </div>
      `, 'max-w-lg');
    }

    function openChatRoomModal(roomId) {
      CURRENT_OPEN_CHAT_ID = roomId;
      markChatRoomSeen(roomId);
      const user = getCurrentUser();
      if (!user) return;
      const room = (STATE.chats || []).find(c => c.id === roomId);
      if (!room) return;
      const prod = STATE.products.find(p => p.id === room.productId);
      const uEmail = (user.email || '').toLowerCase();
      const isSeller = prod && (prod.sellerId === user.id || (prod.sellerEmail && prod.sellerEmail.toLowerCase() === uEmail));
      const tradeStatus = prod ? (prod.tradeStatus || 'available') : 'available';

      openModal(`
        <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <button onclick="openChatInboxModal()" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[12px] font-medium shrink-0">← กลับ</button>
            <div class="min-w-0">
              <div class="text-[14px] font-bold text-slate-900 truncate">${escapeHtml(room.productTitle)}</div>
              <div class="text-[11.5px] text-slate-500 truncate">${isSeller ? 'คุยกับผู้ซื้อ: ' + escapeHtml(room.buyerName) : 'คุยกับผู้ขาย: ' + escapeHtml(room.sellerName)} • ฿${Number(room.productPrice || 0).toLocaleString()}</div>
            </div>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <button onclick="toggleChatSound()" title="เปิด/ปิดเสียงแจ้งเตือน" class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium">${SOUND_MUTED ? 'ปิดเสียง' : 'เปิดเสียง'}</button>
            <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
          </div>
        </div>

        ${isSeller && prod ? `
          <div class="px-5 py-3 bg-blue-50/80 border-b border-blue-100 flex flex-wrap items-center justify-between gap-2">
            <div class="text-[12px] text-blue-900 font-medium">
              สถานะสินค้า:
              <strong class="ml-1">${tradeStatus === 'sold' ? 'ขายแล้ว (แสดงหน้าร้านวันนี้ ถึง 00:00 น.)' : tradeStatus === 'trading' ? 'กำลังทำการซื้อขาย' : 'เปิดขายปกติ'}</strong>
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${tradeStatus === 'available' ? `
                <button onclick="sellerSetTradeStatus('${prod.id}', '${room.id}', 'trading')" class="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[12px] font-semibold transition">
                  กำลังทำการซื้อขาย
                </button>
              ` : ''}
              ${tradeStatus === 'trading' ? `
                <button onclick="sellerSetTradeStatus('${prod.id}', '${room.id}', 'sold')" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-semibold transition">
                  ขายเสร็จสิ้น (ขายแล้ว)
                </button>
                <button onclick="sellerSetTradeStatus('${prod.id}', '${room.id}', 'available')" class="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-[12px] font-medium">
                  ยกเลิกดีล
                </button>
              ` : ''}
            </div>
          </div>
        ` : ''}

        <div id="chatMessagesBox" class="p-5 space-y-2.5 h-72 overflow-y-auto bg-slate-50/60">
          ${(room.messages || []).map(m => {
            if (m.senderEmail === 'system') {
              return `<div class="text-center text-[11px] text-slate-400 py-1">${escapeHtml(m.text)}</div>`;
            }
            const isMe = (m.senderEmail || '').toLowerCase() === uEmail;
            return `
              <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'}">
                <div class="text-[10.5px] text-slate-400 mb-0.5 px-1">${escapeHtml(m.senderName)} • ${escapeHtml(m.time)}</div>
                <div class="max-w-[80%] px-3.5 py-2 rounded-2xl text-[13px] ${isMe ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'}">
                  ${escapeHtml(m.text)}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <form onsubmit="submitChatMessage(event, '${room.id}')" class="p-3.5 border-t border-slate-100 bg-white flex items-center gap-2">
          <input id="chatMsgInput" required type="text" placeholder="พิมพ์ข้อความ..." class="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px] focus:outline-none focus:border-blue-500" />
          <button type="submit" style="background-color: ${STATE.siteConfig.primaryColor}" class="px-4 py-2 rounded-xl text-white text-[13px] font-semibold shrink-0">ส่ง</button>
        </form>
      `, 'max-w-lg');

      setTimeout(() => {
        const box = document.getElementById('chatMessagesBox');
        if (box) box.scrollTop = box.scrollHeight;
      }, 30);
    }

    function submitChatMessage(e, roomId) {
      e.preventDefault();
      const user = getCurrentUser();
      const room = (STATE.chats || []).find(c => c.id === roomId);
      const inp = document.getElementById('chatMsgInput');
      if (!user || !room || !inp) return;
      const text = inp.value.trim();
      if (!text) return;
      room.messages.push({
        senderEmail: user.email || '',
        senderName: user.name,
        text,
        time: formatThaiDate(new Date(), true)
      });
      room.updatedAtMs = Date.now();
      saveState(true, true);
      openChatRoomModal(room.id);
    }

    function sellerSetTradeStatus(prodId, roomId, nextStatus) {
      const prod = STATE.products.find(p => p.id === prodId);
      const room = (STATE.chats || []).find(c => c.id === roomId);
      if (!prod) return;
      prod.tradeStatus = nextStatus;
      let sysText = '';
      if (nextStatus === 'trading') {
        sysText = 'ผู้ขายอัปเดตสถานะสินค้า: กำลังทำการซื้อขาย';
        showToast('ตั้งสถานะเป็น "กำลังทำการซื้อขาย" แล้ว', 'info');
      } else if (nextStatus === 'sold') {
        prod.soldAtMs = Date.now();
        prod.soldDateStr = getLocalDateKey();
        sysText = 'ผู้ขายอัปเดตสถานะสินค้า: ขายแล้ว (แสดงหน้าร้านถึงเที่ยงคืนวันนี้)';
        fireConfetti();
        showToast('ปิดการขายสำเร็จ! แสดงบนเว็บวันนี้และเก็บส่วนตัวหลัง 00:01 น.', 'success');
      } else {
        prod.soldDateStr = '';
        sysText = 'ผู้ขายยกเลิกดีล — สินค้ากลับมาเปิดขายปกติ';
        showToast('เปลี่ยนสถานะกลับเป็นเปิดขายปกติแล้ว', 'info');
      }
      if (room && sysText) {
        room.messages.push({ senderEmail: 'system', senderName: 'ระบบ', text: sysText, time: formatThaiDate(new Date(), true) });
        room.updatedAtMs = Date.now();
      }
      saveState(true, true);
      renderApp();
      openChatRoomModal(roomId);
    }

    // =========================================================================

function renderChatMessagesOnly(roomId) {
      const box = document.getElementById('chatMessagesBox');
      const user = getCurrentUser();
      const room = (STATE.chats || []).find(c => c.id === roomId);
      if (!box || !user || !room) return;
      const uEmail = (user.email || '').toLowerCase();
      const atBottom = (box.scrollHeight - box.scrollTop - box.clientHeight) < 60;
      box.innerHTML = (room.messages || []).map(m => {
        if (m.senderEmail === 'system') {
          return `<div class="text-center text-[11px] text-slate-400 py-1">${escapeHtml(m.text)}</div>`;
        }
        const isMe = (m.senderEmail || '').toLowerCase() === uEmail;
        return `
          <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'}">
            <div class="text-[10.5px] text-slate-400 mb-0.5 px-1">${escapeHtml(m.senderName)} • ${escapeHtml(m.time)}</div>
            <div class="max-w-[80%] px-3.5 py-2 rounded-2xl text-[13px] ${isMe ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'}">
              ${escapeHtml(m.text)}
            </div>
          </div>
        `;
      }).join('');
      if (atBottom) box.scrollTop = box.scrollHeight;
    }


// =========================================================================
// FRONTEND / ADMIN UI: Back-Office Dashboard, Products, Members, CMS & Firebase
// =========================================================================
// 8. CLEAN ADMIN BACK-OFFICE (WITH FULL MEMBER CRUD & FIREBASE SYNC)
    // =========================================================================
    function renderAdminPortal() {
      const pendingProds = STATE.products.filter(p => p.status === 'pending' && !p.deleted_at).length;
      const pendingUsers = STATE.users.filter(u => u.status === 'pending').length;
      const openReports = STATE.reports.filter(r => r.status === 'open').length;

      const NAV = [
        { id: 'dashboard', label: 'ภาพรวมระบบ', icon: 'chart', badge: 0 },
        { id: 'products', label: 'จัดการสินค้า', icon: 'box', badge: pendingProds },
        { id: 'members', label: 'จัดการสมาชิกทั้งหมด', icon: 'users', badge: pendingUsers },
        { id: 'categories', label: 'หมวดหมู่ & จุดนัดรับ', icon: 'tag', badge: 0 },
        { id: 'cms', label: 'ประกาศ & รายงาน', icon: 'megaphone', badge: openReports },
        { id: 'firebase', label: 'เชื่อมต่อ Firebase ออนไลน์', icon: 'cloud', badge: 0 },
        { id: 'settings', label: 'ตั้งค่าเว็บไซต์', icon: 'settings', badge: 0 }
      ];

      const currentNav = NAV.find(n => n.id === STATE.adminTab) || NAV[0];

      const sidebar = `
        <div class="h-full bg-white border-r border-slate-200 flex flex-col justify-between">
          <div>
            <div class="px-5 h-16 border-b border-slate-100 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                ${renderBrandLogo('w-8 h-8')}
                <div class="leading-tight">
                  <div class="font-bold text-[14px] text-slate-900">UBVC Admin</div>
                  <div class="text-[11px] text-slate-400">ระบบจัดการหลังบ้าน</div>
                </div>
              </div>
              <button onclick="STATE.adminSidebarOpen=false; renderApp();" class="lg:hidden text-slate-400 p-1">${renderIcon('close', 'w-4 h-4')}</button>
            </div>

            <div class="p-3 space-y-1">
              ${NAV.map(item => {
                const active = STATE.adminTab === item.id;
                return `
                  <button onclick="STATE.adminTab='${item.id}'; STATE.adminSidebarOpen=false; saveState(false); renderApp();" class="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-[13.5px] transition ${active ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:bg-slate-50 font-medium'}">
                    <span class="flex items-center gap-2.5">
                      ${renderIcon(item.icon, 'w-4 h-4')}
                      <span>${item.label}</span>
                    </span>
                    ${item.badge > 0 ? `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500 text-white">${item.badge}</span>` : ''}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <div class="p-3 border-t border-slate-100 space-y-1.5">
            <button onclick="openStorefront()" class="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[13px] transition">
              ← กลับไปหน้าร้าน
            </button>
            <button onclick="resetDemoData()" class="w-full py-2 px-3 rounded-xl hover:bg-slate-100 text-slate-500 text-[12px] transition">
              ↺ รีเซ็ตข้อมูลตัวอย่าง
            </button>
          </div>
        </div>
      `;

      return `
        <div class="min-h-screen flex bg-slate-50">
          <aside class="hidden lg:block w-64 shrink-0 sticky top-0 h-screen">${sidebar}</aside>

          ${STATE.adminSidebarOpen ? `
            <div class="fixed inset-0 z-50 lg:hidden flex">
              <div onclick="STATE.adminSidebarOpen=false; renderApp();" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
              <div class="relative w-64 h-full z-10">${sidebar}</div>
            </div>
          ` : ''}

          <div class="flex-1 min-w-0 flex flex-col">
            <header class="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <button onclick="STATE.adminSidebarOpen=true; renderApp();" class="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-700">${renderIcon('menu', 'w-5 h-5')}</button>
                <h1 class="text-[17px] font-bold text-slate-900">${currentNav.label}</h1>
              </div>
              <div class="flex items-center gap-2">
                ${FIREBASE_CFG.projectId ? `<button onclick="pullStateFromFirebase(true)" class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-[12px] font-semibold">ซิงก์ Firebase</button>` : ''}
                <button onclick="openStorefront()" class="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[12.5px] transition">
                  ← กลับหน้าร้าน
                </button>
              </div>
            </header>

            <main class="flex-1 p-4 sm:p-6 max-w-6xl w-full mx-auto">
              ${renderAdminTabContent()}
            </main>
          </div>
        </div>
      `;
    }

    function renderAdminTabContent() {
      switch (STATE.adminTab) {
        case 'products': return renderAdminProducts();
        case 'members': return renderAdminMembers();
        case 'categories': return renderAdminCategoriesAndPickup();
        case 'cms': return renderAdminCmsAndReports();
        case 'firebase': return renderAdminFirebasePanel();
        case 'settings': return renderAdminSettings();
        default: return renderAdminDashboard();
      }
    }

    // ADMIN 1: DASHBOARD
    function renderAdminDashboard() {
      const activeProds = STATE.products.filter(p => !p.deleted_at);
      const approved = activeProds.filter(p => p.status === 'approved');
      const pending = activeProds.filter(p => p.status === 'pending');
      const pendingUsers = STATE.users.filter(u => u.status === 'pending');
      const openReports = STATE.reports.filter(r => r.status === 'open');
      const maxCat = Math.max(1, ...STATE.categories.map(c => activeProds.filter(p => p.category === c.id).length));

      return `
        <div class="space-y-6">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div onclick="STATE.adminTab='products'; STATE.adminProductTab='pending'; renderApp();" class="cursor-pointer bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-300 transition">
              <div class="text-[12.5px] text-slate-500 font-medium">สินค้ารออนุมัติ</div>
              <div class="text-[28px] font-bold text-amber-600 mt-1">${pending.length}</div>
            </div>
            <div onclick="STATE.adminTab='products'; STATE.adminProductTab='approved'; renderApp();" class="cursor-pointer bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-300 transition">
              <div class="text-[12.5px] text-slate-500 font-medium">สินค้าเผยแพร่แล้ว</div>
              <div class="text-[28px] font-bold text-emerald-600 mt-1">${approved.length}</div>
            </div>
            <div onclick="STATE.adminTab='members'; renderApp();" class="cursor-pointer bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-300 transition">
              <div class="text-[12.5px] text-slate-500 font-medium">สมาชิกทั้งหมด</div>
              <div class="text-[28px] font-bold text-blue-700 mt-1">${STATE.users.length}</div>
            </div>
            <div onclick="STATE.adminTab='cms'; renderApp();" class="cursor-pointer bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-300 transition">
              <div class="text-[12.5px] text-slate-500 font-medium">รายงานที่รอตรวจสอบ</div>
              <div class="text-[28px] font-bold text-rose-600 mt-1">${openReports.length}</div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <h2 class="text-[15px] font-bold text-slate-900">จำนวนสินค้าแยกตามหมวดหมู่</h2>
              <div class="space-y-3">
                ${STATE.categories.map(c => {
                  const cnt = activeProds.filter(p => p.category === c.id).length;
                  const pct = Math.round((cnt / maxCat) * 100);
                  return `
                    <div>
                      <div class="flex justify-between text-[12.5px] mb-1">
                        <span class="text-slate-700 font-medium">${escapeHtml(c.name)}</span>
                        <span class="text-slate-900 font-semibold">${cnt} รายการ</span>
                      </div>
                      <div class="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div class="h-full rounded-full bg-blue-600 transition-all duration-300" style="width: ${pct}%"></div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <h2 class="text-[15px] font-bold text-slate-900">รายการรออนุมัติ</h2>
              ${pending.map(p => `
                <div class="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-2 text-[13px]">
                  <div class="min-w-0">
                    <div class="font-semibold text-slate-900 truncate">${escapeHtml(p.title)}</div>
                    <div class="text-[11.5px] text-slate-500">฿${p.price.toLocaleString()} • ${escapeHtml(p.shop)}</div>
                  </div>
                  <button onclick="adminSetProductStatus('${p.id}', 'approved')" class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[12px] font-semibold shrink-0">อนุมัติ</button>
                </div>
              `).join('')}
              ${pendingUsers.map(u => `
                <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between gap-2 text-[13px]">
                  <div class="min-w-0">
                    <div class="font-semibold text-slate-900 truncate">${escapeHtml(u.name)}</div>
                    <div class="text-[11.5px] text-slate-500">${escapeHtml(u.studentCode)} • ${escapeHtml(u.department)}</div>
                  </div>
                  <button onclick="adminApproveUser('${u.id}')" class="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[12px] font-semibold shrink-0">อนุมัติ</button>
                </div>
              `).join('')}
              ${pending.length === 0 && pendingUsers.length === 0 ? `<div class="py-8 text-center text-slate-400 text-[13px]">ไม่มีรายการรออนุมัติค้างในระบบ</div>` : ''}
            </div>
          </div>
        </div>
      `;
    }

    // ADMIN 2: PRODUCTS
    function renderAdminProducts() {
      const activeProds = STATE.products.filter(p => !p.deleted_at);
      const filtered = activeProds.filter(p => STATE.adminProductTab === 'all' || p.status === STATE.adminProductTab);

      const tabs = [
        { k: 'all', l: `ทั้งหมด (${activeProds.length})` },
        { k: 'pending', l: `รออนุมัติ (${activeProds.filter(p => p.status === 'pending').length})` },
        { k: 'approved', l: `เผยแพร่แล้ว (${activeProds.filter(p => p.status === 'approved').length})` },
        { k: 'hidden', l: `ซ่อนอยู่ (${activeProds.filter(p => p.status === 'hidden').length})` },
        { k: 'rejected', l: `ไม่ผ่าน (${activeProds.filter(p => p.status === 'rejected').length})` }
      ];

      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap gap-1.5 text-[12.5px]">
              ${tabs.map(t => `
                <button onclick="STATE.adminProductTab='${t.k}'; renderApp();" class="px-3.5 py-1.5 rounded-xl font-medium transition ${STATE.adminProductTab === t.k ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">${t.l}</button>
              `).join('')}
            </div>
            <button onclick="openCreateOrEditListingModal(null)" class="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-[12.5px] font-semibold">+ เพิ่มสินค้าใหม่</button>
          </div>

          <div class="space-y-3">
            ${filtered.length ? filtered.map(p => {
              const st = getStatusBadgeInfo(p.status);
              return `
                <div class="p-4 rounded-xl border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div class="flex items-start gap-3.5 min-w-0">
                    <div class="w-20 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">${renderProductMedia(p)}</div>
                    <div class="min-w-0 space-y-1">
                      <div class="flex flex-wrap items-center gap-2">
                        <span class="font-semibold text-[14.5px] text-slate-900">${escapeHtml(p.title)}</span>
                        <span class="px-2 py-0.5 rounded-full border text-[11px] font-medium ${st.cls}">${st.label}</span>
                      </div>
                      <div class="text-[13.5px] font-bold text-blue-700">฿${p.price.toLocaleString()}</div>
                      <div class="text-[12px] text-slate-500">${escapeHtml(p.shop)} • ${escapeHtml(p.pickup)}</div>
                    </div>
                  </div>
                  <div class="flex flex-wrap items-center gap-2 shrink-0">
                    <button onclick="openCreateOrEditListingModal('${p.id}')" class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-[12px] font-medium">แก้ไข</button>
                    ${p.status !== 'approved' ? `<button onclick="adminSetProductStatus('${p.id}', 'approved')" class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[12px] font-semibold">อนุมัติ</button>` : ''}
                    ${p.status === 'approved' ? `<button onclick="adminSetProductStatus('${p.id}', 'hidden')" class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-[12px] font-medium">ซ่อน</button>` : ''}
                    <button onclick="adminDeleteProd('${p.id}')" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-[12px] font-medium">ลบ</button>
                  </div>
                </div>
              `;
            }).join('') : `<div class="py-10 text-center text-slate-400 text-[13.5px]">ไม่มีสินค้าในหมวดนี้</div>`}
          </div>
        </div>
      `;
    }

    function adminSetProductStatus(prodId, status) {
      const p = STATE.products.find(item => item.id === prodId);
      if (!p) return;
      p.status = status;
      saveState();
      renderApp();
      showToast(`อัปเดตสถานะ "${p.title}" เป็น ${getStatusBadgeInfo(status).label}`, 'success');
    }

    function adminDeleteProd(prodId) {
      const p = STATE.products.find(item => item.id === prodId);
      if (!p) return;
      p.deleted_at = formatThaiDate(new Date(), true);
      saveState();
      renderApp();
      showToast(`ลบสินค้า "${p.title}" แล้ว`, 'info');
    }

    // ADMIN 3: FULL MEMBER MANAGEMENT (CREATE, EDIT, ROLE, APPROVE, SUSPEND, DELETE)
    function updateAdminMembersTable() {
      const tbody = document.getElementById('adminMembersTbody');
      if (!tbody) return;
      const q = STATE.adminMemberSearch.trim().toLowerCase();
      const list = STATE.users.filter(u => {
        const matchTab = STATE.adminMemberTab === 'all' || u.status === STATE.adminMemberTab;
        const matchQ = !q || u.name.toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q) || (u.studentCode || '').toLowerCase().includes(q) || (u.department || '').toLowerCase().includes(q);
        return matchTab && matchQ;
      });
      tbody.innerHTML = list.length ? list.map(u => {
        const st = getStatusBadgeInfo(u.status);
        return `
          <tr class="hover:bg-slate-50/70">
            <td class="py-3 px-3">
              <div class="flex items-center gap-2.5">
                ${renderUserAvatar(u, 'w-8 h-8')}
                <div>
                  <div class="font-semibold text-slate-900">${escapeHtml(u.name)} <span class="text-[11px] font-normal text-blue-700">${escapeHtml(u.roleLabel)}</span></div>
                  <div class="text-[11.5px] text-slate-500">${escapeHtml(u.email || '-')} • ${escapeHtml(u.shopName || '-')}</div>
                </div>
              </div>
            </td>
            <td class="py-3 px-3 font-mono text-slate-700">${escapeHtml(u.studentCode)}</td>
            <td class="py-3 px-3 text-slate-600">${escapeHtml(u.department)}</td>
            <td class="py-3 px-3"><span class="px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${st.cls}">${st.label}</span></td>
            <td class="py-3 px-3 text-right space-x-1">
              ${u.status !== 'approved' ? `<button onclick="adminApproveUser('${u.id}')" class="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[12px] font-semibold">อนุมัติ</button>` : ''}
              <button onclick="openAdminMemberFormModal('${u.id}')" class="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-[12px] font-medium">แก้ไข</button>
              <button onclick="adminToggleUserStatus('${u.id}')" class="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 text-[12px]">${u.status === 'rejected' ? 'ปลดระงับ' : 'ระงับ'}</button>
              ${u.id !== 'u_admin' ? `<button onclick="adminDeleteUser('${u.id}')" class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-[12px] font-medium">ลบ</button>` : ''}
            </td>
          </tr>
        `;
      }).join('') : `<tr><td colspan="5" class="py-8 text-center text-slate-400">ไม่พบรายชื่อสมาชิก</td></tr>`;
    }

    function renderAdminMembers() {
      setTimeout(updateAdminMembersTable, 0);
      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap gap-1.5 text-[12.5px]">
              ${[
                { k: 'all', l: `ทั้งหมด (${STATE.users.length})` },
                { k: 'approved', l: `อนุมัติแล้ว (${STATE.users.filter(u => u.status === 'approved').length})` },
                { k: 'pending', l: `รออนุมัติ (${STATE.users.filter(u => u.status === 'pending').length})` },
                { k: 'rejected', l: `ระงับ (${STATE.users.filter(u => u.status === 'rejected').length})` }
              ].map(t => `
                <button onclick="STATE.adminMemberTab='${t.k}'; renderApp();" class="px-3.5 py-1.5 rounded-xl font-medium ${STATE.adminMemberTab === t.k ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}">${t.l}</button>
              `).join('')}
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <input type="text" value="${escapeHtml(STATE.adminMemberSearch)}" oninput="STATE.adminMemberSearch=this.value; updateAdminMembersTable();" placeholder="ค้นหาชื่อ หรือรหัส..." class="px-3.5 py-2 rounded-xl border border-slate-200 text-[13px] focus:outline-none focus:border-blue-500" />
              <button onclick="openAdminMemberFormModal(null)" class="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-[12.5px] font-semibold">+ เพิ่มสมาชิก</button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[740px]">
              <thead>
                <tr class="border-b border-slate-200 text-[12px] text-slate-400 font-medium">
                  <th class="py-2.5 px-3">ชื่อ - นามสกุล</th>
                  <th class="py-2.5 px-3">รหัสประจำตัว</th>
                  <th class="py-2.5 px-3">แผนกวิชา</th>
                  <th class="py-2.5 px-3">สถานะ</th>
                  <th class="py-2.5 px-3 text-right">จัดการทั้งหมด</th>
                </tr>
              </thead>
              <tbody id="adminMembersTbody" class="divide-y divide-slate-100 text-[13px]"></tbody>
            </table>
          </div>
        </div>
      `;
    }

    async function adminApproveUser(userId) {
      const u = STATE.users.find(x => x.id === userId);
      if (u) { u.status = 'approved'; await saveMemberToFirebase(u); }
      saveState(false);
      renderApp();
      showToast(`อนุมัติสมาชิก "${u.name}" เรียบร้อย`, 'success');
    }

    async function adminToggleUserStatus(userId) {
      const u = STATE.users.find(x => x.id === userId);
      if (!u) return;
      u.status = u.status === 'rejected' ? 'approved' : 'rejected';
      await saveMemberToFirebase(u);
      saveState(false);
      renderApp();
      showToast('อัปเดตสถานะสมาชิกแล้ว', 'info');
    }

    async function adminDeleteUser(userId) {
      const u = STATE.users.find(x => x.id === userId);
      if (!u) return;
      STATE.users = STATE.users.filter(x => x.id !== userId);
      if (STATE.currentUserId === userId) STATE.currentUserId = null;
      await deleteMemberFromFirebase(u.email);
      saveState(false);
      renderApp();
      showToast(`ลบสมาชิก "${u.name}" ออกจากระบบแล้ว`, 'info');
    }

    function openAdminMemberFormModal(editUserId = null) {
      const existing = editUserId ? STATE.users.find(u => u.id === editUserId) : null;
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">${existing ? 'แก้ไขข้อมูลสมาชิก' : 'เพิ่มสมาชิกใหม่'}</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>
        <form onsubmit="submitAdminMemberForm(event, '${editUserId || ''}')" class="p-6 space-y-3.5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="sm:col-span-2">
              <label class="block text-[12px] font-medium text-slate-700 mb-1">อีเมล (@gmail.com) *</label>
              <input id="memEmail" required type="email" value="${existing ? escapeHtml(existing.email || '') : ''}" placeholder="example@gmail.com" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px]" />
            </div>
            <div>
              <label class="block text-[12px] font-medium text-slate-700 mb-1">ชื่อ - นามสกุล *</label>
              <input id="memName" required type="text" value="${existing ? escapeHtml(existing.name) : ''}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px]" />
            </div>
            <div>
              <label class="block text-[12px] font-medium text-slate-700 mb-1">รหัสนักศึกษา / บุคลากร *</label>
              <input id="memCode" required type="text" value="${existing ? escapeHtml(existing.studentCode) : ''}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px]" />
            </div>
            <div>
              <label class="block text-[12px] font-medium text-slate-700 mb-1">รหัสผ่าน</label>
              <input id="memPass" required type="text" value="${existing ? escapeHtml(existing.password || '1234') : '1234'}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px]" />
            </div>
            <div>
              <label class="block text-[12px] font-medium text-slate-700 mb-1">บทบาท</label>
              <select id="memRole" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px] bg-white">
                <option value="student" ${existing && existing.role === 'student' ? 'selected' : ''}>นักศึกษา</option>
                <option value="teacher" ${existing && existing.role === 'teacher' ? 'selected' : ''}>ครูที่ปรึกษา</option>
                <option value="admin" ${existing && existing.role === 'admin' ? 'selected' : ''}>ผู้ดูแลระบบ (Admin)</option>
              </select>
            </div>
            <div>
              <label class="block text-[12px] font-medium text-slate-700 mb-1">แผนกวิชา *</label>
              <input id="memDept" required type="text" value="${existing ? escapeHtml(existing.department) : ''}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px]" />
            </div>
            <div>
              <label class="block text-[12px] font-medium text-slate-700 mb-1">ชื่อร้านค้า</label>
              <input id="memShop" type="text" value="${existing ? escapeHtml(existing.shopName || '') : ''}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px]" />
            </div>
            <div>
              <label class="block text-[12px] font-medium text-slate-700 mb-1">เบอร์โทร</label>
              <input id="memPhone" type="text" value="${existing ? escapeHtml(existing.phone || '') : '080-000-0000'}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px]" />
            </div>
          </div>
          <div class="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onclick="closeModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-[13px]">ยกเลิก</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 text-white text-[13px] font-semibold">บันทึกข้อมูลสมาชิก</button>
          </div>
        </form>
      `, 'max-w-md');
    }

    function submitAdminMemberForm(e, editUserId) {
      e.preventDefault();
      const email = document.getElementById('memEmail').value.trim().toLowerCase();
      if (!email.endsWith('@gmail.com')) {
        showToast('กรุณาระบุอีเมล @gmail.com เท่านั้น', 'warning');
        return;
      }
      const name = document.getElementById('memName').value.trim();
      const studentCode = document.getElementById('memCode').value.trim();
      const password = document.getElementById('memPass').value.trim() || '1234';
      const role = email === ADMIN_EMAIL.toLowerCase() ? 'admin' : document.getElementById('memRole').value;
      const roleLabel = role === 'admin' ? 'ผู้ดูแลระบบ' : role === 'teacher' ? 'ครูที่ปรึกษา' : 'นักศึกษา';
      const department = document.getElementById('memDept').value.trim();
      const shopName = document.getElementById('memShop').value.trim() || ('ร้าน ' + name.split(' ')[0]);
      const phone = document.getElementById('memPhone').value.trim();

      let savedUser = null;
      if (editUserId) {
        const u = STATE.users.find(x => x.id === editUserId);
        if (u) { Object.assign(u, { email, name, studentCode, password, role, roleLabel, department, shopName, phone }); savedUser = u; }
      } else {
        savedUser = {
          id: 'u_' + Date.now(),
          role,
          roleLabel,
          status: 'approved',
          avatarKey: role === 'admin' ? 'avatar_admin' : role === 'teacher' ? 'avatar_teacher' : 'avatar_student',
          name,
          email,
          password,
          studentCode,
          department,
          shopName,
          lineId: email.split('@')[0],
          phone,
          createdAt: formatThaiDate()
        };
        STATE.users.push(savedUser);
      }
      if (savedUser) saveMemberToFirebase(savedUser);
      saveState(false);
      closeModal();
      renderApp();
      showToast('บันทึกข้อมูลสมาชิกเรียบร้อยแล้ว', 'success');
    }

    // ADMIN 4: CATEGORIES & PICKUP POINTS
    function renderAdminCategoriesAndPickup() {
      const sorted = [...STATE.categories].sort((a, b) => a.sort_order - b.sort_order);
      const pts = STATE.siteConfig.pickupPoints || [];

      return `
        <div class="space-y-6">
          <div class="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-[15.5px] font-bold text-slate-900">หมวดหมู่สินค้า (${sorted.length})</h2>
              <button onclick="openCategoryModal(null)" class="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-[12.5px] font-semibold">+ เพิ่มหมวดหมู่</button>
            </div>
            <div class="divide-y divide-slate-100">
              ${sorted.map(c => `
                <div class="py-3 flex items-center justify-between gap-3 text-[13.5px]">
                  <div class="flex items-center gap-2.5 font-medium text-slate-800">
                    <span class="text-blue-600">${renderIcon(c.icon, 'w-4 h-4')}</span>
                    <span>${escapeHtml(c.name)}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <button onclick="toggleCategoryActive('${c.id}')" class="px-3 py-1 rounded-full text-[11.5px] font-medium ${c.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}">${c.active ? 'เปิดใช้' : 'ปิดอยู่'}</button>
                    <button onclick="openCategoryModal('${c.id}')" class="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 text-[12px]">แก้ไข</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-[15.5px] font-bold text-slate-900">จุดนัดรับสินค้าในวิทยาลัย (${pts.length})</h2>
              <button onclick="openAddPickupModal()" class="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-[12.5px] font-semibold">+ เพิ่มจุดนัดรับ</button>
            </div>
            <div class="space-y-2.5">
              ${pts.map((pt, i) => `
                <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-3">
                  <div>
                    <div class="text-[13.5px] font-semibold text-slate-900">${escapeHtml(pt.name)} <span class="text-emerald-700 font-normal text-[12px]">(${escapeHtml(pt.time)})</span></div>
                    <div class="text-[12px] text-slate-500">${escapeHtml(pt.note)}</div>
                  </div>
                  <button onclick="deletePickupPoint(${i})" class="px-3 py-1 rounded-lg bg-rose-50 text-rose-600 text-[12px] font-medium shrink-0">ลบ</button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    function openCategoryModal(catId) {
      const existing = catId ? STATE.categories.find(c => c.id === catId) : null;
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">${existing ? 'แก้ไขหมวดหมู่' : 'เพิ่มหมวดหมู่ใหม่'}</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>
        <form onsubmit="submitCategoryForm(event, '${catId || ''}')" class="p-6 space-y-3.5">
          <input id="catName" required type="text" value="${existing ? escapeHtml(existing.name) : ''}" placeholder="ชื่อหมวดหมู่ *" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
          <div class="grid grid-cols-2 gap-3">
            <select id="catIcon" class="px-3.5 py-2 rounded-xl border border-slate-200 text-[13px] bg-white">
              ${['laptop', 'shirt', 'book', 'mobile', 'home', 'sports', 'bag'].map(ic => `<option value="${ic}" ${existing && existing.icon === ic ? 'selected' : ''}>ไอคอน: ${ic}</option>`).join('')}
            </select>
            <input id="catOrder" type="number" min="1" value="${existing ? existing.sort_order : STATE.categories.length + 1}" class="px-3.5 py-2 rounded-xl border border-slate-200 text-[13px]" />
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" onclick="closeModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-[13px]">ยกเลิก</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 text-white text-[13px] font-semibold">บันทึก</button>
          </div>
        </form>
      `, 'max-w-md');
    }

    function submitCategoryForm(e, catId) {
      e.preventDefault();
      const name = document.getElementById('catName').value.trim();
      const icon = document.getElementById('catIcon').value;
      const sort_order = Number(document.getElementById('catOrder').value) || 1;
      if (catId) {
        const c = STATE.categories.find(x => x.id === catId);
        if (c) Object.assign(c, { name, icon, sort_order });
      } else {
        STATE.categories.push({ id: 'cat_' + Date.now(), name, icon, sort_order, active: true });
      }
      saveState();
      closeModal();
      renderApp();
      showToast('บันทึกหมวดหมู่แล้ว', 'success');
    }

    function toggleCategoryActive(catId) {
      const c = STATE.categories.find(x => x.id === catId);
      if (c) c.active = !c.active;
      saveState();
      renderApp();
    }

    function openAddPickupModal() {
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">เพิ่มจุดนัดรับสินค้า</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>
        <form onsubmit="submitAddPickup(event)" class="p-6 space-y-3.5">
          <input id="pkName" required type="text" placeholder="ชื่อสถานที่ *" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px]" />
          <input id="pkTime" required type="text" value="08.00 - 17.00 น." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px]" />
          <textarea id="pkNote" rows="2" required placeholder="รายละเอียดเพิ่มเติม *" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px]"></textarea>
          <div class="flex justify-end gap-2">
            <button type="button" onclick="closeModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-[13px]">ยกเลิก</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 text-white text-[13px] font-semibold">เพิ่มจุดนัดรับ</button>
          </div>
        </form>
      `, 'max-w-md');
    }

    function submitAddPickup(e) {
      e.preventDefault();
      STATE.siteConfig.pickupPoints.push({
        name: document.getElementById('pkName').value.trim(),
        time: document.getElementById('pkTime').value.trim(),
        note: document.getElementById('pkNote').value.trim()
      });
      saveState();
      closeModal();
      renderApp();
      showToast('เพิ่มจุดนัดรับเรียบร้อย', 'success');
    }

    function deletePickupPoint(idx) {
      if (STATE.siteConfig.pickupPoints.length <= 1) {
        showToast('ต้องมีจุดนัดรับอย่างน้อย 1 จุด', 'warning');
        return;
      }
      STATE.siteConfig.pickupPoints.splice(idx, 1);
      saveState();
      renderApp();
      showToast('ลบจุดนัดรับแล้ว', 'info');
    }

    // ADMIN 5: ANNOUNCEMENTS & REPORTS
    function renderAdminCmsAndReports() {
      return `
        <div class="space-y-6">
          <div class="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-[15.5px] font-bold text-slate-900">ประกาศวิทยาลัย (${STATE.announcements.length})</h2>
              <button onclick="openAnnFormModal(null)" class="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-[12.5px] font-semibold">+ สร้างประกาศ</button>
            </div>
            <div class="space-y-2.5">
              ${STATE.announcements.map(a => `
                <div class="p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div class="flex items-center gap-2">
                      ${a.pinned ? `<span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10.5px] font-semibold">ปักหมุด</span>` : ''}
                      <span class="text-[11.5px] text-slate-400">${escapeHtml(a.date)}</span>
                    </div>
                    <div class="text-[13.5px] font-semibold text-slate-900 mt-0.5">${escapeHtml(a.title)}</div>
                  </div>
                  <div class="flex items-center gap-1.5 shrink-0">
                    <button onclick="toggleAnnPin('${a.id}')" class="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 text-[12px]">${a.pinned ? 'เลิกปักหมุด' : 'ปักหมุด'}</button>
                    <button onclick="openAnnFormModal('${a.id}')" class="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[12px] font-medium">แก้ไข</button>
                    <button onclick="deleteAnn('${a.id}')" class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-[12px] font-medium">ลบ</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <h2 class="text-[15.5px] font-bold text-slate-900">รายงานและข้อความจากผู้ใช้ (${STATE.reports.length})</h2>
            <div class="space-y-3">
              ${STATE.reports.length ? STATE.reports.map(r => `
                <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2.5">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold ${r.status === 'open' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}">${r.status === 'open' ? 'รอตรวจสอบ' : 'ปิดเคสแล้ว'}</span>
                      <span class="text-[13.5px] font-semibold text-slate-900">${escapeHtml(r.productTitle)}</span>
                    </div>
                    <span class="text-[11.5px] text-slate-400">${escapeHtml(r.reporter)} • ${escapeHtml(r.createdAt)}</span>
                  </div>
                  <div class="text-[13px] text-slate-600"><strong>${escapeHtml(r.reason_code)}:</strong> ${escapeHtml(r.details)}</div>
                  ${r.status === 'open' ? `
                    <div class="flex flex-wrap gap-2 pt-1">
                      <button onclick="resolveReport('${r.id}', false)" class="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[12px] font-semibold">ทำเครื่องหมายว่าแก้ไขแล้ว</button>
                      ${r.productId ? `<button onclick="resolveReport('${r.id}', true)" class="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-[12px] font-semibold">ซ่อนสินค้า + ปิดเคส</button>` : ''}
                    </div>
                  ` : ''}
                </div>
              `).join('') : `<div class="py-6 text-center text-slate-400 text-[13px]">ไม่มีรายงานปัญหา</div>`}
            </div>
          </div>
        </div>
      `;
    }

    function openAnnFormModal(annId) {
      const existing = annId ? STATE.announcements.find(a => a.id === annId) : null;
      openModal(`
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-[16px] font-bold text-slate-900">${existing ? 'แก้ไขประกาศ' : 'สร้างประกาศใหม่'}</h3>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">${renderIcon('close', 'w-4 h-4')}</button>
        </div>
        <form onsubmit="submitAnnForm(event, '${annId || ''}')" class="p-6 space-y-3.5">
          <input id="annTitle" required type="text" value="${existing ? escapeHtml(existing.title) : ''}" placeholder="หัวข้อประกาศ *" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
          <textarea id="annContent" required rows="4" placeholder="เนื้อหาประกาศ..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]">${existing ? escapeHtml(existing.content) : ''}</textarea>
          <label class="inline-flex items-center gap-2 text-[13px] text-slate-700">
            <input id="annPinned" type="checkbox" ${!existing || existing.pinned ? 'checked' : ''} class="w-4 h-4 accent-blue-600" />
            <span>ปักหมุดไว้ด้านบนสุด</span>
          </label>
          <div class="flex justify-end gap-2">
            <button type="button" onclick="closeModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-[13px]">ยกเลิก</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 text-white text-[13px] font-semibold">บันทึก</button>
          </div>
        </form>
      `, 'max-w-lg');
    }

    function submitAnnForm(e, annId) {
      e.preventDefault();
      const title = document.getElementById('annTitle').value.trim();
      const content = document.getElementById('annContent').value.trim();
      const pinned = document.getElementById('annPinned').checked;
      if (annId) {
        const a = STATE.announcements.find(x => x.id === annId);
        if (a) Object.assign(a, { title, content, pinned });
      } else {
        STATE.announcements.unshift({ id: 'ann_' + Date.now(), title, date: formatThaiDate(), pinned, active: true, photoKey: 'news_1', content });
      }
      saveState();
      closeModal();
      renderApp();
      showToast('บันทึกประกาศแล้ว', 'success');
    }

    function toggleAnnPin(id) {
      const a = STATE.announcements.find(x => x.id === id);
      if (a) a.pinned = !a.pinned;
      saveState();
      renderApp();
    }

    function deleteAnn(id) {
      STATE.announcements = STATE.announcements.filter(x => x.id !== id);
      saveState();
      renderApp();
      showToast('ลบประกาศแล้ว', 'info');
    }

    function resolveReport(repId, hideProduct) {
      const r = STATE.reports.find(x => x.id === repId);
      if (!r) return;
      r.status = 'resolved';
      if (hideProduct && r.productId) {
        const p = STATE.products.find(x => x.id === r.productId);
        if (p) p.status = 'hidden';
      }
      saveState();
      renderApp();
      showToast(hideProduct ? 'ซ่อนสินค้าและปิดเคสแล้ว' : 'ปิดเคสรายงานแล้ว', 'success');
    }

    // ADMIN 6: FIREBASE ONLINE SYNC PANEL
    function renderAdminFirebasePanel() {
      const statusPill = CLOUD_STATUS === 'online'
        ? '<span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[12px] font-semibold">เชื่อมต่อ Firebase ออนไลน์แล้ว</span>'
        : CLOUD_STATUS === 'error'
        ? '<span class="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[12px] font-semibold">เชื่อมต่อไม่สำเร็จ</span>'
        : '<span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[12px] font-semibold">โหมดเครื่องส่วนตัว (ยังไม่ได้ต่อ Firebase)</span>';

      return `
        <div class="space-y-6 max-w-2xl">
          <form onsubmit="saveFirebaseConfigForm(event)" class="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 class="text-[16px] font-bold text-slate-900">เชื่อมต่อ Firebase Firestore (ฐานข้อมูลออนไลน์ฟรี)</h2>
                <p class="text-[12.5px] text-slate-500">กรอก Project ID และ Web API Key จาก Firebase Console เพื่อให้สมาชิกและสินค้าซิงก์ออนไลน์ทุกเครื่อง</p>
              </div>
              ${statusPill}
            </div>
            ${LAST_FIREBASE_ERROR ? `<div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-[12px] text-rose-700"><strong>สาเหตุที่เชื่อมต่อไม่ได้:</strong> ${escapeHtml(LAST_FIREBASE_ERROR)}<br/>ถ้าขึ้น 403 ให้ไปที่ Firebase Console → Firestore Database → แท็บ <strong>Rules</strong> แล้วเปลี่ยนเป็น <code>allow read, write: if true;</code> แล้วกด Publish</div>` : ''}

            <div class="space-y-3">
              <div>
                <label class="block text-[12.5px] font-medium text-slate-700 mb-1">Firebase Project ID *</label>
                <input id="fbProjectId" required type="text" value="${escapeHtml(FIREBASE_CFG.projectId || '')}" placeholder="เช่น ubvc-marketplace-69" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px] font-mono" />
              </div>
              <div>
                <label class="block text-[12.5px] font-medium text-slate-700 mb-1">Firebase Web API Key *</label>
                <input id="fbApiKey" required type="text" value="${escapeHtml(FIREBASE_CFG.apiKey || '')}" placeholder="AIzaSy..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px] font-mono" />
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <button type="button" onclick="disconnectFirebase()" class="px-3.5 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-[12.5px] font-medium">ยกเลิกการเชื่อมต่อ</button>
              <div class="flex flex-wrap gap-2">
                <button type="button" onclick="pushAllDataToFirebase(true)" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12.5px] font-semibold">อัปข้อมูลทั้งหมดขึ้น Firebase ตอนนี้</button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold">บันทึกและเชื่อมต่อ</button>
              </div>
            </div>
          </form>

          <div class="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 text-[13px] text-slate-600">
            <h3 class="text-[14.5px] font-bold text-slate-900">ขั้นตอนเปิดฐานข้อมูล Firebase Firestore แบบเร็ว (3 นาที)</h3>
            <ol class="list-decimal pl-5 space-y-1.5">
              <li>เข้า <strong>console.firebase.google.com</strong> → สร้างโปรเจกต์ใหม่ → เพิ่มเว็บแอปเพื่อคัดลอก <code>projectId</code> และ <code>apiKey</code></li>
              <li>ไปที่เมนู <strong>Firestore Database</strong> → กด Create database → เลือก <strong>Start in test mode</strong> (ไม่ต้องตั้งระบบความปลอดภัยซับซ้อน)</li>
              <li>นำ <code>projectId</code> และ <code>apiKey</code> มากรอกด้านบน (หรือใส่ในตัวแปร <code>DEFAULT_FIREBASE_CONFIG</code> ในไฟล์ <code>index.html</code> ก่อนอัปขึ้น GitHub Pages)</li>
            </ol>
          </div>
        </div>
      `;
    }

    async function saveFirebaseConfigForm(e) {
      e.preventDefault();
      FIREBASE_CFG = {
        projectId: document.getElementById('fbProjectId').value.trim(),
        apiKey: document.getElementById('fbApiKey').value.trim()
      };
      try { localStorage.setItem(FB_CONFIG_KEY, JSON.stringify(FIREBASE_CFG)); } catch (err) {}
      await pullStateFromFirebase(true);
      startRealtimeSync();
    }

    function disconnectFirebase() {
      FIREBASE_CFG = { projectId: '', apiKey: '' };
      CLOUD_STATUS = 'local';
      try { localStorage.removeItem(FB_CONFIG_KEY); } catch (err) {}
      renderApp();
      showToast('สลับกลับเป็นโหมดข้อมูลในเครื่องแล้ว', 'info');
    }

    // ADMIN 7: CLEAN SITE SETTINGS
    function renderAdminSettings() {
      const cfg = STATE.siteConfig;
      return `
        <form onsubmit="saveSiteSettings(event)" class="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 max-w-2xl">
          <div>
            <h2 class="text-[16px] font-bold text-slate-900">ตั้งค่าชื่อเว็บไซต์ ธีมสี และโลโก้</h2>
            <p class="text-[12.5px] text-slate-500">ปรับแต่งข้อมูลหลักสำหรับนำเสนอโปรเจคจบ</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">ชื่อแบรนด์</label>
              <input id="cfgBrand" required type="text" value="${escapeHtml(cfg.brandName)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
            </div>
            <div>
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">ชื่อสถานศึกษา</label>
              <input id="cfgCollege" required type="text" value="${escapeHtml(cfg.collegeName)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">หัวข้อแบนเนอร์หลัก (Hero)</label>
              <input id="cfgHeadline" required type="text" value="${escapeHtml(cfg.heroHeadline)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">คำอธิบายย่อย</label>
              <textarea id="cfgSub" rows="2" required class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13.5px]">${escapeHtml(cfg.heroSub)}</textarea>
            </div>
            <div>
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">สีหลักของเว็บ</label>
              <div class="flex items-center gap-2">
                <input id="cfgColor" type="color" value="${escapeHtml(cfg.primaryColor)}" class="w-11 h-10 rounded-lg border border-slate-200 cursor-pointer" />
                <span class="text-[12px] font-mono text-slate-500">${escapeHtml(cfg.primaryColor)}</span>
              </div>
            </div>
            <div>
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">รูปแบบโลโก้</label>
              <select id="cfgLogoPreset" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px] bg-white">
                <option value="crest" ${cfg.logo.preset === 'crest' ? 'selected' : ''}>ตราวิทยาลัย วอศ.อบ. (มาตรฐาน)</option>
                <option value="modern" ${cfg.logo.preset === 'modern' ? 'selected' : ''}>โลโก้ UBVC ดิจิทัล</option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-[12.5px] font-medium text-slate-700 mb-1">ลิงก์รูปโลโก้กำหนดเอง (ปล่อยว่างเพื่อใช้โลโก้ด้านบน)</label>
              <input id="cfgLogoUrl" type="url" value="${escapeHtml(cfg.logo.customLogoUrl || '')}" placeholder="https://example.com/logo.png" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px]" />
            </div>
          </div>

          <div class="flex justify-end pt-2 border-t border-slate-100">
            <button type="submit" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold">บันทึกการตั้งค่า</button>
          </div>
        </form>
      `;
    }

    function saveSiteSettings(e) {
      e.preventDefault();
      STATE.siteConfig.brandName = document.getElementById('cfgBrand').value.trim();
      STATE.siteConfig.collegeName = document.getElementById('cfgCollege').value.trim();
      STATE.siteConfig.heroHeadline = document.getElementById('cfgHeadline').value.trim();
      STATE.siteConfig.heroSub = document.getElementById('cfgSub').value.trim();
      STATE.siteConfig.primaryColor = document.getElementById('cfgColor').value;
      STATE.siteConfig.logo.preset = document.getElementById('cfgLogoPreset').value;
      STATE.siteConfig.logo.customLogoUrl = document.getElementById('cfgLogoUrl').value.trim();
      saveState();
      renderApp();
      showToast('บันทึกการตั้งค่าเว็บไซต์แล้ว', 'success');
    }


    // =========================================================================

