// =========================================================================
// BACKEND / CONFIG: Firebase Project Config, Admin Email & Default Seed Data
// =========================================================================
// =========================================================================
    const STORAGE_KEY = 'ubvc_marketplace_clean_v5';
    const FB_CONFIG_KEY = 'ubvc_firebase_config_v1';

    // ใส่ค่า Firebase Config ที่นี่ได้โดยตรง (หรือไปกรอกในหน้า Admin -> เชื่อมต่อ Firebase)
    const DEFAULT_FIREBASE_CONFIG = {
      projectId: 'uvci-b8c4f',
      apiKey: 'AIzaSyBfAmG0Q2UMy7IFeE5uYzIZzwyjGzuJwlI'
    };

    const INITIAL_CATEGORIES = [
      { id: 'it', name: 'ไอที & คอมพิวเตอร์', icon: 'laptop', sort_order: 1, active: true },
      { id: 'fashion', name: 'ชุดนักศึกษา & แฟชั่น', icon: 'shirt', sort_order: 2, active: true },
      { id: 'books', name: 'หนังสือเรียน & ชีทสรุป', icon: 'book', sort_order: 3, active: true },
      { id: 'mobile', name: 'มือถือ & แท็บเล็ต', icon: 'mobile', sort_order: 4, active: true },
      { id: 'dorm', name: 'ของใช้หอพัก', icon: 'home', sort_order: 5, active: true },
      { id: 'sports', name: 'กีฬา & งานอดิเรก', icon: 'sports', sort_order: 6, active: true },
      { id: 'other', name: 'ผลิตภัณฑ์วิชาชีพ', icon: 'bag', sort_order: 7, active: true }
    ];

    const INITIAL_PICKUP_POINTS = [
      { name: 'หน้าตึกอำนวยการ วอศ.อบ.', time: '07.30 - 17.30 น.', note: 'มีเจ้าหน้าที่และกล้อง CCTV ดูแลตลอดวัน' },
      { name: 'โรงอาหารกลาง UVC', time: '08.00 - 16.30 น.', note: 'สะดวกนัดรับช่วงพักกลางวันและหลังเลิกเรียน' },
      { name: 'โดมอเนกประสงค์ UVC', time: '08.00 - 17.30 น.', note: 'พื้นที่โปร่ง ตรวจเช็กสินค้าขนาดใหญ่ได้สะดวก' },
      { name: 'ลานหน้าเสาธงวิทยาลัย', time: '07.30 - 17.00 น.', note: 'จุดนัดพบหลักใจกลางวิทยาลัย' },
      { name: 'ห้องสมุด UVC (อาคารวิทยบริการ)', time: '08.30 - 16.30 น.', note: 'เหมาะสำหรับนัดเช็กโน้ตบุ๊ก แท็บเล็ต และหนังสือ' }
    ];

    const INITIAL_SITE_CONFIG = {
      brandName: 'UBVC Marketplace',
      collegeName: 'วิทยาลัยอาชีวศึกษาอุบลราชธานี',
      heroHeadline: 'ตลาดนัดออนไลน์ นักศึกษาและบุคลากร วอศ.อบ.',
      heroSub: 'พื้นที่ซื้อ-ขาย และแลกเปลี่ยนอุปกรณ์การเรียน ชุดนักศึกษา รวมถึงผลิตภัณฑ์วิชาชีพภายในวิทยาลัย นัดรับง่ายและตรวจสอบได้จริง',
      primaryColor: '#1d4ed8',
      logo: { preset: 'crest', customLogoUrl: '' },
      pickupPoints: JSON.parse(JSON.stringify(INITIAL_PICKUP_POINTS)),
      footerAddress: '464 ถ.พรหมราช ต.ในเมือง อ.เมือง จ.อุบลราชธานี 34000 • โทร. 045-254043',
      footerCopyright: '© 2569 โครงงานวิชาชีพ UBVC Marketplace — วิทยาลัยอาชีวศึกษาอุบลราชธานี'
    };

    const ADMIN_EMAIL = 'rust2tf2@gmail.com';

    const INITIAL_USERS = [
      {
        id: 'u_admin',
        role: 'admin',
        roleLabel: 'ผู้ดูแลระบบ',
        status: 'approved',
        avatarKey: 'avatar_admin',
        name: 'ผู้ดูแลระบบ (Admin)',
        email: 'rust2tf2@gmail.com',
        password: '1234',
        studentCode: 'ADM-UVC-001',
        department: 'ศูนย์ดูแลระบบ UBVC',
        shopName: 'ศูนย์ดูแลระบบ UBVC',
        lineId: 'admin_ubvc',
        phone: '045-254043',
        createdAt: '20 พ.ย. 2569'
      }
    ];

    const INITIAL_PRODUCTS = [
      {
        id: 'p1',
        title: 'โน้ตบุ๊ก ASUS Vivobook 15 (Core i5 / 16GB)',
        price: 15900,
        shop: 'ร้าน IT-UBVC',
        sellerId: 'u_student',
        sellerBadge: 'นักศึกษา',
        category: 'it',
        condition: 'เหมือนใหม่',
        status: 'approved',
        views: 412,
        pickup: 'ห้องสมุด UVC (อาคารวิทยบริการ)',
        lineId: 'somchai_ubvc',
        phone: '089-412-5589',
        photoKey: 'laptop_1',
        galleryPhotos: ['laptop_1', 'laptop_2', 'mouse_1'],
        description: 'โน้ตบุ๊ก ASUS Vivobook 15 สเปก Core i5 Gen 12 / RAM 16GB / SSD 512GB น้ำหนักเบา เหมาะสำหรับงานเขียนโปรแกรม กราฟิก และทำรายงาน ประกันศูนย์เหลือ 1 ปี อุปกรณ์ครบกล่องพร้อมกระเป๋า',
        createdAtMs: Date.now() - 2 * 3600 * 1000,
        tradeStatus: 'available',
        soldDateStr: '',
        moderation_note: 'ผ่านการตรวจสอบแล้ว'
      },
      {
        id: 'p2',
        title: 'หูฟังไร้สาย Bluetooth ANC พร้อมเคสชาร์จ',
        price: 1290,
        shop: 'ร้าน StudentShop UVC',
        sellerId: 'u_teacher',
        sellerBadge: 'ครู',
        category: 'it',
        condition: 'ใหม่',
        status: 'approved',
        views: 289,
        pickup: 'โรงอาหารกลาง UVC',
        lineId: 'aj_wipa_uvc',
        phone: '081-966-4120',
        photoKey: 'headphones_1',
        galleryPhotos: ['headphones_1', 'headphones_2'],
        description: 'หูฟังไร้สาย Bluetooth 5.3 พร้อมเคสชาร์จ ระบบตัดเสียงรบกวน ANC เสียงใสเบสแน่น แบตเตอรี่ใช้งานต่อเนื่องสูงสุด 30 ชั่วโมง ชาร์จไว Type-C',
        createdAtMs: Date.now() - 26 * 3600 * 1000,
        tradeStatus: 'available',
        soldDateStr: '',
        moderation_note: 'ตรวจสอบแล้ว'
      },
      {
        id: 'p3',
        title: 'กระเป๋าเป้นักศึกษา สีดำ กันน้ำ ใส่โน้ตบุ๊ก 15.6"',
        price: 590,
        shop: 'ร้าน StudentShop UVC',
        sellerId: 'u_teacher',
        sellerBadge: 'ครู',
        category: 'fashion',
        condition: 'ใหม่',
        status: 'approved',
        views: 356,
        pickup: 'หน้าตึกอำนวยการ วอศ.อบ.',
        lineId: 'aj_wipa_uvc',
        phone: '081-966-4120',
        photoKey: 'backpack_1',
        galleryPhotos: ['backpack_1', 'backpack_2'],
        description: 'กระเป๋าเป้สีดำเรียบหรู ผ้ากันละอองน้ำ ใส่โน้ตบุ๊กขนาด 15.6 นิ้วได้สบาย มีช่องแยกใส่เอกสารและขวดน้ำด้านข้าง ทนทาน เหมาะสำหรับนักศึกษาทุกแผนกวิชา',
        createdAtMs: Date.now() - 26 * 3600 * 1000,
        tradeStatus: 'available',
        soldDateStr: '',
        moderation_note: 'ตรวจสอบแล้ว'
      },
      {
        id: 'p4',
        title: 'ขวดน้ำเก็บอุณหภูมิ สแตนเลส 316 ขนาด 750ml',
        price: 350,
        shop: 'ร้าน IT-UBVC',
        sellerId: 'u_student',
        sellerBadge: 'นักศึกษา',
        category: 'dorm',
        condition: 'ใหม่',
        status: 'approved',
        views: 234,
        pickup: 'โดมอเนกประสงค์ UVC',
        lineId: 'somchai_ubvc',
        phone: '089-412-5589',
        photoKey: 'thermos_1',
        galleryPhotos: ['thermos_1', 'thermos_2'],
        description: 'กระบอกน้ำสแตนเลส 316 เก็บความเย็น-ความร้อนได้นาน 18-24 ชั่วโมง ขนาด 750 ml ฝาปิดสนิทไม่รั่วซึม พกพาสะดวกไปเรียนทุกวัน',
        createdAtMs: Date.now() - 26 * 3600 * 1000,
        tradeStatus: 'available',
        soldDateStr: '',
        moderation_note: 'ตรวจสอบแล้ว'
      },
      {
        id: 'p5',
        title: 'ชุดนักศึกษาอาชีวศึกษา เสื้อเชิ้ตขาว ผ้าคอมบ์ทวิว',
        price: 420,
        shop: 'ร้าน StudentShop UVC',
        sellerId: 'u_teacher',
        sellerBadge: 'ครู',
        category: 'fashion',
        condition: 'ใหม่',
        status: 'approved',
        views: 305,
        pickup: 'หน้าตึกอำนวยการ วอศ.อบ.',
        lineId: 'aj_wipa_uvc',
        phone: '081-966-4120',
        photoKey: 'uniform_1',
        galleryPhotos: ['uniform_1', 'uniform_2'],
        description: 'เสื้อเชิ้ตนักศึกษาสีขาวผ้าคอมบ์ทวิวเนื้อดี รีดง่าย ไม่บาง ใส่สบายระบายอากาศเยี่ยม ถูกต้องตามระเบียบวิทยาลัยอาชีวศึกษาอุบลราชธานี มีครบทุกไซส์ S-XXL',
        createdAtMs: Date.now() - 26 * 3600 * 1000,
        tradeStatus: 'available',
        soldDateStr: '',
        moderation_note: 'ตรวจสอบแล้ว'
      },
      {
        id: 'p6',
        title: 'ชุดหนังสือเรียนบัญชีและคอมพิวเตอร์ธุรกิจ + ชีทสรุป',
        price: 220,
        shop: 'ร้าน StudentShop UVC',
        sellerId: 'u_teacher',
        sellerBadge: 'ครู',
        category: 'books',
        condition: 'ดี',
        status: 'approved',
        views: 192,
        pickup: 'ลานหน้าเสาธงวิทยาลัย',
        lineId: 'aj_wipa_uvc',
        phone: '081-966-4120',
        photoKey: 'books_1',
        galleryPhotos: ['books_1', 'books_2'],
        description: 'ชุดหนังสือเรียนบัญชีเบื้องต้น คอมพิวเตอร์ธุรกิจ และสมุดสรุปสูตรเตรียมสอบมาตรฐานวิชาชีพ ปวช./ปวส. สภาพสะอาด อ่านเข้าใจง่าย',
        createdAtMs: Date.now() - 26 * 3600 * 1000,
        tradeStatus: 'available',
        soldDateStr: '',
        moderation_note: 'ตรวจสอบแล้ว'
      },
      {
        id: 'p7',
        title: 'iPad Air M1 พร้อมปากกาสไตลัส จดเลคเชอร์',
        price: 14500,
        shop: 'ร้าน IT-UBVC',
        sellerId: 'u_student',
        sellerBadge: 'นักศึกษา',
        category: 'mobile',
        condition: 'เหมือนใหม่',
        status: 'approved',
        views: 318,
        pickup: 'ห้องสมุด UVC (อาคารวิทยบริการ)',
        lineId: 'somchai_ubvc',
        phone: '089-412-5589',
        photoKey: 'ipad_1',
        galleryPhotos: ['ipad_1', 'ipad_2'],
        description: 'iPad Air ชิป M1 พร้อมปากกาสไตลัสและฟิล์มกระดาษ สุขภาพแบต 96% ใช้จดเลคเชอร์และวาดรูปในวิชาออกแบบลื่นมาก นัดเช็กเครื่องก่อนจ่ายได้ครับ',
        createdAtMs: Date.now() - 26 * 3600 * 1000,
        tradeStatus: 'available',
        soldDateStr: '',
        moderation_note: 'ตรวจสอบแล้ว'
      },
      {
        id: 'p8',
        title: 'โคมไฟตั้งโต๊ะอ่านหนังสือ LED ถนอมสายตา USB-C',
        price: 280,
        shop: 'ร้าน IT-UBVC',
        sellerId: 'u_student',
        sellerBadge: 'นักศึกษา',
        category: 'dorm',
        condition: 'ใหม่',
        status: 'approved',
        views: 158,
        pickup: 'โรงอาหารกลาง UVC',
        lineId: 'somchai_ubvc',
        phone: '089-412-5589',
        photoKey: 'lamp_1',
        galleryPhotos: ['lamp_1', 'lamp_2'],
        description: 'โคมไฟตั้งโต๊ะอ่านหนังสือ LED ถนอมสายตา ปรับระดับแสงได้ 3 โทนสี มีแบตเตอรี่ในตัวชาร์จ USB-C เหมาะสำหรับอ่านหนังสือสอบในหอพัก',
        createdAtMs: Date.now() - 26 * 3600 * 1000,
        tradeStatus: 'available',
        soldDateStr: '',
        moderation_note: 'ตรวจสอบแล้ว'
      },
      {
        id: 'p9',
        title: 'ลูกฟุตซอลหนัง PU มาตรฐานแข่งขัน พร้อมตาข่าย',
        price: 490,
        shop: 'ร้าน StudentShop UVC',
        sellerId: 'u_teacher',
        sellerBadge: 'ครู',
        category: 'sports',
        condition: 'เหมือนใหม่',
        status: 'approved',
        views: 141,
        pickup: 'โดมอเนกประสงค์ UVC',
        lineId: 'aj_wipa_uvc',
        phone: '081-966-4120',
        photoKey: 'sports_1',
        galleryPhotos: ['sports_1', 'sports_2'],
        description: 'ลูกฟุตซอลและลูกฟุตบอลหนัง PU มาตรฐานการแข่งขัน หนังนิ่มคอนโทรลบอลดี แถมเข็มสูบลมและตาข่ายใส่ลูกบอล พร้อมลุยกีฬาสีวิทยาลัย',
        createdAtMs: Date.now() - 26 * 3600 * 1000,
        tradeStatus: 'available',
        soldDateStr: '',
        moderation_note: 'ตรวจสอบแล้ว'
      },
      {
        id: 'p_pending_1',
        title: 'เมาส์ไร้สาย Logitech Ergonomic สีกรมท่า',
        price: 750,
        shop: 'ร้าน IT-UBVC',
        sellerId: 'u_student',
        sellerBadge: 'นักศึกษา',
        category: 'it',
        condition: 'เหมือนใหม่',
        status: 'pending',
        views: 12,
        pickup: 'ห้องสมุด UVC (อาคารวิทยบริการ)',
        lineId: 'somchai_ubvc',
        phone: '089-412-5589',
        photoKey: 'mouse_1',
        galleryPhotos: ['mouse_1', 'laptop_1'],
        description: 'เมาส์ไร้สายคลิกเงียบ เชื่อมต่อได้ทั้ง Bluetooth และ USB Receiver ใช้งานปกติ 100% ประกันเหลือ 6 เดือน',
        moderation_note: ''
      }
    ];

    const INITIAL_ANNOUNCEMENTS = [
      {
        id: 'ann_1',
        title: 'เปิดใช้งาน UBVC Marketplace ภาคเรียนที่ 2/2569 อย่างเป็นทางการ',
        date: '15 พ.ย. 2569',
        pinned: true,
        active: true,
        photoKey: 'news_1',
        content: 'เปิดพื้นที่ตลาดนัดออนไลน์ให้นักศึกษา ปวช./ปวส. และครูบุคลากร แลกเปลี่ยนอุปกรณ์การเรียนและจำหน่ายผลิตภัณฑ์วิชาชีพภายในวิทยาลัยอาชีวศึกษาอุบลราชธานี'
      },
      {
        id: 'ann_2',
        title: 'แนะนำ 5 จุดนัดรับสินค้าหลักภายในรั้ววิทยาลัย (Safe Pickup)',
        date: '13 พ.ย. 2569',
        pinned: true,
        active: true,
        photoKey: 'news_2',
        content: 'เพื่อความสะดวกและสบายใจ แนะนำให้นัดรับและตรวจเช็กสินค้า ณ จุดบริการกลาง 5 จุด ได้แก่ หน้าตึกอำนวยการ, โรงอาหารกลาง, โดมอเนกประสงค์, ลานหน้าเสาธง และห้องสมุด UVC'
      },
      {
        id: 'ann_3',
        title: 'อบรมการถ่ายภาพสินค้าและการสร้างร้านค้าออนไลน์สำหรับนักศึกษา',
        date: '11 พ.ย. 2569',
        pinned: false,
        active: true,
        photoKey: 'news_3',
        content: 'เชิญชวนนักศึกษาทุกแผนกวิชาเข้าร่วมกิจกรรมอบรมเทคนิคการตั้งราคาและการถ่ายภาพสินค้าให้น่าสนใจ ณ อาคารวิทยบริการ'
      }
    ];

    const INITIAL_SHOPS = [
      { id: 'shop_1', name: 'ร้าน IT-UBVC', ownerRole: 'นักศึกษา', photoKey: 'shop_it', tagline: 'อุปกรณ์ไอที โน้ตบุ๊ก แท็บเล็ต', rating: 4.9, reviews: 128 },
      { id: 'shop_2', name: 'ร้าน StudentShop UVC', ownerRole: 'ครูที่ปรึกษา', photoKey: 'shop_student', tagline: 'ชุดนักศึกษา กระเป๋า & หนังสือเรียน', rating: 4.8, reviews: 84 }
    ];

    const INITIAL_REPORTS = [
      {
        id: 'rep_101',
        productId: 'p2',
        productTitle: 'หูฟังไร้สาย Bluetooth ANC พร้อมเคสชาร์จ',
        reason_code: 'สอบถามข้อมูลรับประกันสินค้าเพิ่มเติม',
        details: 'ผู้ซื้ออยากให้ร้านค้าระบุระยะเวลารับประกันให้ชัดเจนขึ้น',
        reporter: 'น.ส.นิดา ใจดี',
        status: 'open',
        resolution_note: '',
        createdAt: '15 พ.ย. 2569 10:15'
      }
    ];

    const INITIAL_NOTIFICATIONS = [
      { id: 'n1', title: 'สินค้า "โน้ตบุ๊ก ASUS Vivobook 15" ได้รับการอนุมัติแล้ว', time: '5 นาทีที่แล้ว', unread: true },
      { id: 'n2', title: 'รองรับ Firebase ออนไลน์ + ติดตั้งเป็นแอปมือถือ (PWA) แล้ว', time: 'เมื่อสักครู่', unread: true }
    ];


// =========================================================================
// BACKEND / FIREBASE SERVICE: Firestore REST API (members + shared_store)
// =========================================================================
// Firestore REST API Helpers (Separate 'members' collection + 'ubvc_marketplace/shared_store')
    function getFirestoreBaseUrl() {
      return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(FIREBASE_CFG.projectId)}/databases/(default)/documents`;
    }

    function getFirestoreDocUrl(docId) {
      return `${getFirestoreBaseUrl()}/ubvc_marketplace/${encodeURIComponent(docId)}?key=${encodeURIComponent(FIREBASE_CFG.apiKey)}`;
    }

    function getMemberDocId(email) {
      return String(email || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
    }

    function getFirestoreMemberUrl(docId) {
      return `${getFirestoreBaseUrl()}/members/${encodeURIComponent(docId)}?key=${encodeURIComponent(FIREBASE_CFG.apiKey)}`;
    }

    function encodeFirestoreFields(obj) {
      const fields = {};
      Object.keys(obj).forEach(k => {
        fields[k] = { stringValue: String(obj[k] === undefined || obj[k] === null ? '' : obj[k]) };
      });
      return fields;
    }

    function decodeFirestoreFields(fields) {
      const out = {};
      if (!fields) return out;
      Object.keys(fields).forEach(k => {
        out[k] = fields[k].stringValue !== undefined ? fields[k].stringValue : '';
      });
      return out;
    }

    async function saveMemberToFirebase(userObj, alertOnError = false) {
      if (!FIREBASE_CFG.projectId || !FIREBASE_CFG.apiKey || !userObj || !userObj.email) return false;
      try {
        const docId = getMemberDocId(userObj.email);
        const res = await fetch(getFirestoreMemberUrl(docId), {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fields: encodeFirestoreFields(userObj) })
        });
        if (!res.ok) {
          const errBody = await res.text().catch(() => '');
          throw new Error(`HTTP ${res.status} ${errBody.slice(0, 120)}`);
        }
        CLOUD_STATUS = 'online';
        LAST_FIREBASE_ERROR = '';
        return true;
      } catch (err) {
        CLOUD_STATUS = 'error';
        LAST_FIREBASE_ERROR = err && err.message ? err.message : 'เชื่อมต่อไม่สำเร็จ';
        if (alertOnError) {
          if (LAST_FIREBASE_ERROR.includes('403')) {
            showToast('Firebase ปฏิเสธสิทธิ์ (403): กรุณาตั้ง Firestore Rules เป็น allow read, write: if true;', 'danger');
          } else {
            showToast('บันทึกขึ้น Firebase ไม่สำเร็จ: ' + LAST_FIREBASE_ERROR, 'danger');
          }
        }
        return false;
      }
    }

    async function deleteMemberFromFirebase(email) {
      if (!FIREBASE_CFG.projectId || !FIREBASE_CFG.apiKey || !email) return false;
      try {
        const docId = getMemberDocId(email);
        await fetch(getFirestoreMemberUrl(docId), { method: 'DELETE' });
        return true;
      } catch (err) {
        return false;
      }
    }

    async function pullMembersFromFirebase() {
      if (!FIREBASE_CFG.projectId || !FIREBASE_CFG.apiKey) return false;
      try {
        const res = await fetch(`${getFirestoreBaseUrl()}/members?pageSize=200&key=${encodeURIComponent(FIREBASE_CFG.apiKey)}&_t=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        const docs = Array.isArray(data.documents) ? data.documents : [];
        if (docs.length === 0) {
          // Seed designated admin into 'members' collection on first run
          for (const u of STATE.users) {
            await saveMemberToFirebase(u);
          }
          return true;
        }
        const cloudUsers = docs.map(d => decodeFirestoreFields(d.fields)).filter(u => u.email);
        // Ensure designated admin exists
        if (!cloudUsers.some(u => (u.email || '').toLowerCase() === ADMIN_EMAIL.toLowerCase())) {
          const adm = INITIAL_USERS[0];
          cloudUsers.unshift(adm);
          await saveMemberToFirebase(adm);
        }
        STATE.users = cloudUsers;
        CLOUD_STATUS = 'online';
        return true;
      } catch (err) {
        CLOUD_STATUS = 'error';
        return false;
      }
    }


    async function pushAllDataToFirebase(showNotice = true) {
      if (!FIREBASE_CFG.projectId || !FIREBASE_CFG.apiKey) return false;
      let okMembers = true;
      for (const u of STATE.users) {
        if (u && u.email) {
          const ok = await saveMemberToFirebase(u, showNotice);
          if (!ok) okMembers = false;
        }
      }
      const okStore = await pushStateToFirebase(false);
      if (okMembers && okStore) {
        CLOUD_STATUS = 'online';
        LAST_FIREBASE_ERROR = '';
        if (showNotice) showToast('อัปโหลดข้อมูลทั้งหมด (สมาชิก + สินค้า + แชท + ประกาศ) ขึ้น Firebase เรียบร้อย!', 'success');
        renderApp();
        return true;
      }
      if (showNotice) showToast('อัปข้อมูลไม่สำเร็จ กรุณาเช็ก Firestore Rules', 'danger');
      renderApp();
      return false;
    }

    async function pushStateToFirebase(showSuccessToast = true) {
      if (!FIREBASE_CFG.projectId || !FIREBASE_CFG.apiKey) return false;
      try {
        const payload = {
          categories: STATE.categories,
          products: STATE.products,
          announcements: STATE.announcements,
          shops: STATE.shops,
          reports: STATE.reports,
          chats: STATE.chats,
          siteConfig: STATE.siteConfig,
          visitorCount: STATE.visitorCount,
          updatedAt: (LAST_CLOUD_UPDATED_AT = new Date().toISOString())
        };
        const res = await fetch(getFirestoreDocUrl('shared_store'), {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: {
              jsonData: { stringValue: JSON.stringify(payload) }
            }
          })
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        CLOUD_STATUS = 'online';
        if (showSuccessToast) showToast('บันทึกข้อมูลขึ้น Firebase Firestore สำเร็จ!', 'success');
        return true;
      } catch (err) {
        CLOUD_STATUS = 'error';
        if (showSuccessToast) showToast('เชื่อมต่อ Firebase ไม่สำเร็จ กรุณาตรวจสอบ Firestore Rules', 'danger');
        return false;
      }
    }

    async function pullStateFromFirebase(notify = false) {
      if (!FIREBASE_CFG.projectId || !FIREBASE_CFG.apiKey) {
        CLOUD_STATUS = 'local';
        return false;
      }
      try {
        await pullMembersFromFirebase();
        const res = await fetch(getFirestoreDocUrl('shared_store') + `&_t=${Date.now()}`, { cache: 'no-store' });
        if (res.status === 404) {
          const ok = await pushStateToFirebase(false);
          if (ok && notify) showToast('เชื่อมต่อ Firebase สำเร็จและสร้างฐานข้อมูลเริ่มต้นแล้ว!', 'success');
          renderApp();
          return ok;
        }
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const doc = await res.json();
        const rawJson = doc && doc.fields && doc.fields.jsonData && doc.fields.jsonData.stringValue;
        if (rawJson) {
          const cloudData = JSON.parse(rawJson);
          if (Array.isArray(cloudData.categories)) STATE.categories = cloudData.categories;
          if (Array.isArray(cloudData.products)) STATE.products = cloudData.products;
          if (Array.isArray(cloudData.announcements)) STATE.announcements = cloudData.announcements;
          if (Array.isArray(cloudData.shops)) STATE.shops = cloudData.shops;
          if (Array.isArray(cloudData.reports)) STATE.reports = cloudData.reports;
          if (Array.isArray(cloudData.chats)) STATE.chats = cloudData.chats;
          if (cloudData.siteConfig) STATE.siteConfig = Object.assign(STATE.siteConfig, cloudData.siteConfig);
          if (typeof cloudData.visitorCount === 'number') STATE.visitorCount = cloudData.visitorCount;
          saveState(false);
        }
        CLOUD_STATUS = 'online';
        if (notify) showToast('ซิงก์ข้อมูลล่าสุดจาก Firebase เรียบร้อย!', 'success');
        renderApp();
        return true;
      } catch (err) {
        CLOUD_STATUS = 'error';
        if (notify) showToast('ดึงข้อมูลจาก Firebase ไม่สำเร็จ กรุณาตรวจสอบการตั้งค่า', 'danger');
        renderApp();
        return false;
      }
    }


// =========================================================================
// BACKEND / STORE: Application State, Local Cache & 3s Real-Time Sync Engine
// =========================================================================
function createDefaultState() {
      return {
        portalMode: 'storefront', // 'storefront' | 'admin'
        darkMode: false,
        currentUserId: null, // null until user logs in or registers
        mobileMenuOpen: false,
        selectedCategory: 'all',
        selectedCondition: 'all',
        selectedShopFilter: 'all',
        searchQuery: '',
        minPrice: '',
        maxPrice: '',
        sortOrder: 'latest',
        visitorCount: 1248,
        wishlist: ['p1', 'p3'],
        followedShops: ['shop_1'],
        users: JSON.parse(JSON.stringify(INITIAL_USERS)),
        categories: JSON.parse(JSON.stringify(INITIAL_CATEGORIES)),
        products: JSON.parse(JSON.stringify(INITIAL_PRODUCTS)),
        announcements: JSON.parse(JSON.stringify(INITIAL_ANNOUNCEMENTS)),
        shops: JSON.parse(JSON.stringify(INITIAL_SHOPS)),
        reports: JSON.parse(JSON.stringify(INITIAL_REPORTS)),
        chats: [],
        notifications: JSON.parse(JSON.stringify(INITIAL_NOTIFICATIONS)),
        siteConfig: JSON.parse(JSON.stringify(INITIAL_SITE_CONFIG)),

        adminTab: 'dashboard',
        adminSidebarOpen: false,
        adminProductTab: 'all',
        adminMemberTab: 'all',
        adminMemberSearch: ''
      };
    }

    function loadFirebaseConfig() {
      if (DEFAULT_FIREBASE_CONFIG.projectId && DEFAULT_FIREBASE_CONFIG.apiKey) {
        return { ...DEFAULT_FIREBASE_CONFIG };
      }
      try {
        const raw = localStorage.getItem(FB_CONFIG_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.projectId && parsed.apiKey) return parsed;
        }
      } catch (e) {}
      return { ...DEFAULT_FIREBASE_CONFIG };
    }

    let FIREBASE_CFG = loadFirebaseConfig();
    let CLOUD_STATUS = FIREBASE_CFG.projectId ? 'connecting' : 'local'; // 'local' | 'connecting' | 'online' | 'error'
    let LAST_FIREBASE_ERROR = '';
    let LAST_CLOUD_UPDATED_AT = '';
    let LAST_MEMBERS_SIGNATURE = '';
    let CURRENT_OPEN_CHAT_ID = null;
    let REALTIME_POLL_TIMER = null;
    let DEFERRED_PWA_PROMPT = null;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      DEFERRED_PWA_PROMPT = e;
    });

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return createDefaultState();
        const parsed = JSON.parse(raw);
        const def = createDefaultState();
        const merged = Object.assign(def, parsed);
        merged.siteConfig = Object.assign(JSON.parse(JSON.stringify(INITIAL_SITE_CONFIG)), parsed.siteConfig || {});
        merged.siteConfig.logo = Object.assign({ preset: 'crest', customLogoUrl: '' }, (parsed.siteConfig && parsed.siteConfig.logo) || {});
        if (!Array.isArray(merged.siteConfig.pickupPoints) || merged.siteConfig.pickupPoints.length === 0) {
          merged.siteConfig.pickupPoints = JSON.parse(JSON.stringify(INITIAL_PICKUP_POINTS));
        }
        return merged;
      } catch (e) {
        return createDefaultState();
      }
    }

    let STATE = loadState();
    let cloudSyncTimer = null;

    function saveState(syncToCloud = true, immediate = false) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
      } catch (e) {}
      if (syncToCloud && FIREBASE_CFG.projectId && FIREBASE_CFG.apiKey) {
        clearTimeout(cloudSyncTimer);
        if (immediate) {
          pushStateToFirebase(false);
        } else {
          cloudSyncTimer = setTimeout(() => pushStateToFirebase(false), 500);
        }
      }
    }

function getCurrentUser() {
      if (!STATE.currentUserId) return null;
      return STATE.users.find(u => u.id === STATE.currentUserId) || null;
    }

    function getStatusBadgeInfo(status) {
      const map = {
        approved: { label: 'เผยแพร่แล้ว', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
        pending: { label: 'รออนุมัติ', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
        rejected: { label: 'ไม่ผ่านอนุมัติ', cls: 'bg-rose-50 text-rose-700 border-rose-200' },
        hidden: { label: 'ซ่อนอยู่', cls: 'bg-slate-100 text-slate-600 border-slate-200' }
      };
      return map[status] || { label: status, cls: 'bg-slate-100 text-slate-600 border-slate-200' };
    }

    // =========================================================================

async function realtimeSyncTick() {
      if (document.hidden || !FIREBASE_CFG.projectId || !FIREBASE_CFG.apiKey) return;
      try {
        let changed = false;

        // 1. Check members collection
        const mRes = await fetch(`${getFirestoreBaseUrl()}/members?pageSize=200&key=${encodeURIComponent(FIREBASE_CFG.apiKey)}&_t=${Date.now()}`, { cache: 'no-store' });
        if (mRes.ok) {
          const mData = await mRes.json();
          const docs = Array.isArray(mData.documents) ? mData.documents : [];
          if (docs.length > 0) {
            const cloudUsers = docs.map(d => decodeFirestoreFields(d.fields)).filter(u => u.email);
            const sig = JSON.stringify(cloudUsers);
            if (sig !== LAST_MEMBERS_SIGNATURE) {
              LAST_MEMBERS_SIGNATURE = sig;
              STATE.users = cloudUsers;
              changed = true;
            }
          }
        }

        // 2. Check shared_store document
        const res = await fetch(getFirestoreDocUrl('shared_store') + `&_t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const doc = await res.json();
          const rawJson = doc && doc.fields && doc.fields.jsonData && doc.fields.jsonData.stringValue;
          if (rawJson) {
            const cloudData = JSON.parse(rawJson);
            const remoteUpdated = cloudData.updatedAt || '';
            if (remoteUpdated && remoteUpdated !== LAST_CLOUD_UPDATED_AT) {
              LAST_CLOUD_UPDATED_AT = remoteUpdated;
              if (Array.isArray(cloudData.categories)) STATE.categories = cloudData.categories;
              if (Array.isArray(cloudData.products)) STATE.products = cloudData.products;
              if (Array.isArray(cloudData.announcements)) STATE.announcements = cloudData.announcements;
              if (Array.isArray(cloudData.shops)) STATE.shops = cloudData.shops;
              if (Array.isArray(cloudData.reports)) STATE.reports = cloudData.reports;
              if (Array.isArray(cloudData.chats)) {
                const prevUnread = typeof getUnreadChatCount === 'function' ? getUnreadChatCount() : 0;
                STATE.chats = cloudData.chats;
                const nextUnread = typeof getUnreadChatCount === 'function' ? getUnreadChatCount() : 0;
                if (nextUnread > prevUnread && typeof playChatChime === 'function') {
                  playChatChime();
                  showToast('มีข้อความแชทใหม่เข้ามา!', 'info');
                }
              }
              if (cloudData.siteConfig) STATE.siteConfig = Object.assign(STATE.siteConfig, cloudData.siteConfig);
              if (typeof cloudData.visitorCount === 'number') STATE.visitorCount = cloudData.visitorCount;
              changed = true;
            }
          }
        }

        CLOUD_STATUS = 'online';
        LAST_FIREBASE_ERROR = '';

        if (changed) {
          saveState(false);
          const activeTag = document.activeElement ? document.activeElement.tagName : '';
          const isTyping = activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT';
          const modalOpen = !document.getElementById('modalOverlay').classList.contains('hidden');

          if (CURRENT_OPEN_CHAT_ID) {
            renderChatMessagesOnly(CURRENT_OPEN_CHAT_ID);
          } else if (!modalOpen && !isTyping) {
            renderApp();
          } else if (STATE.portalMode === 'storefront') {
            updateProductGridOnly();
          }
        }
      } catch (e) {
        // Keep silent on background polling blip
      }
    }

    function startRealtimeSync() {
      if (REALTIME_POLL_TIMER) clearInterval(REALTIME_POLL_TIMER);
      REALTIME_POLL_TIMER = setInterval(realtimeSyncTick, 3000);
    }

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && FIREBASE_CFG.projectId && FIREBASE_CFG.apiKey) {
        realtimeSyncTick();
      }
    });

    function checkSharedItemDeepLink() {
      try {
        const params = new URLSearchParams(window.location.search);
        const itemId = params.get('item');
        if (itemId && STATE.products.some(p => p.id === itemId && !p.deleted_at)) {
          openProductDetailModal(itemId, 0, true);
        }
      } catch (e) {}
    }

    window.onload = function () {
      renderApp();
      if (FIREBASE_CFG.projectId && FIREBASE_CFG.apiKey) {
        pullStateFromFirebase(false).then(() => {
          startRealtimeSync();
          checkSharedItemDeepLink();
        });
      } else {
        checkSharedItemDeepLink();
      }
    };
