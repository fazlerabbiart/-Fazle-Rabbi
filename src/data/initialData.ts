import { Product, SiteSettings, Order } from '../types';
import twsEarbudsImg from '../assets/images/gadget_tws_earbuds_1788248928851.jpg';
import wirelessChargerImg from '../assets/images/gadget_wireless_charger_1788248946537.jpg';
import mechKeyboardImg from '../assets/images/gadget_mech_keyboard_1788248962771.jpg';
import miniProjectorImg from '../assets/images/gadget_mini_projector_1788248986327.jpg';
import phoneGimbalImg from '../assets/images/gadget_phone_gimbal_1788249011111.jpg';
import ganPowerbankImg from '../assets/images/gadget_gan_powerbank_1788249032906.jpg';
import smartRingImg from '../assets/images/gadget_smart_ring_1788249050645.jpg';
import vintageSpeakerImg from '../assets/images/gadget_vintage_speaker_1788249069843.jpg';

export const initialSiteSettings: SiteSettings = {
  storeName: 'WhatsApp Store',
  storeTagline: 'Trending Smart Gadgets & Tech Accessories — 1-Click WhatsApp Order',
  logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtMyzLaK1_tlmZotMdmmKesHlfyeJk3pqp7LNDXm6yWJM7cfC9DjSiqXSd6_o_VS6MKfV-2dnvuyw84bBDvOGdxlHURw_Nsgpl_mg1I3LoH3kKpIOE8l6dmJVqYatsnEiowE2c511JcpnaTovnYNoD64wpZc8FLX4qjSs56jMMx2IGjfPx4nfTcwFqDL49m4KjrV3jztv_R4pOhHmWqPUQquv60wjTIG4EdWbF0SJeLm1g6y5akryfKA',
  whatsappNumber: '01706259256',
  currency: 'BDT',
  currencySymbol: '৳',
  brandColor: '#25D366',
  brandColorName: 'green',
  email: 'fazlerabbiart@gmail.com',
  address: 'Dhaka, Bangladesh / Fast All-Bangladesh Delivery',
};

export const initialProducts: Product[] = [
  {
    id: 'prod-tws-1',
    title: 'Cyberpunk Transparent ANC Wireless Earbuds',
    subtitle: 'Active Noise Cancelling & Ambient LEDs',
    category: 'Audio & Sound',
    regularPrice: 4500,
    salePrice: 3450,
    discountBadge: '-23% POPULAR',
    inStock: true,
    description: 'Next-generation futuristic earbuds featuring a transparent magnetic charging case with cyber-glow ambient LEDs. Equipped with -42dB Hybrid Active Noise Cancellation, high-resolution 13mm composite diaphragm drivers, crystal-clear 4-mic ENC calls, and an ultra-low 38ms gaming latency mode.',
    imageUrl: twsEarbudsImg,
    galleryImages: [twsEarbudsImg],
    specs: 'ANC 42dB • 36h Total Battery • Bluetooth 5.4 • Touch Controls • USB-C Fast Charge',
    createdAt: '2026-09-01',
  },
  {
    id: 'prod-charger-2',
    title: 'MagSafe 3-in-1 Aluminum & Walnut Fast Wireless Charging Stand',
    subtitle: '15W Fast Charge for Phone, Watch & Earbuds',
    category: 'Chargers & Power',
    regularPrice: 5200,
    salePrice: 4200,
    discountBadge: '-19% HOT',
    inStock: true,
    description: 'Elevate your desk setup with this premium 3-in-1 magnetic wireless charging station crafted from solid American walnut wood and CNC anodized aerospace aluminum. Powers your smartphone (15W MagSafe), Apple Watch/Smartwatch, and wireless earbuds simultaneously with zero cable clutter.',
    imageUrl: wirelessChargerImg,
    galleryImages: [wirelessChargerImg],
    specs: '15W Qi2 MagSafe • Solid Walnut & Aluminum • Overheat & Surge Protection • Free 30W Adapter',
    createdAt: '2026-09-01',
  },
  {
    id: 'prod-keyboard-3',
    title: 'Custom 75% RGB Wireless Mechanical Keyboard',
    subtitle: 'Hot-Swappable Pre-Lubed Switches & Gold Rotary Knob',
    category: 'Desk Setup',
    regularPrice: 7800,
    salePrice: 6500,
    discountBadge: '-16%',
    inStock: true,
    description: 'A masterpiece for creators, coders, and gamers. Features a compact 75% layout, gasket-mounted sound dampening silicone structure, hot-swappable sockets for 3-pin/5-pin mechanical switches, durable PBT dye-sublimated keycaps, and a multi-function metal rotary dial for volume and lighting control.',
    imageUrl: mechKeyboardImg,
    galleryImages: [mechKeyboardImg],
    specs: 'Tri-Mode (Bluetooth 5.1 / 2.4G Wireless / Type-C) • South-Facing RGB • 4000mAh Battery',
    createdAt: '2026-09-01',
  },
  {
    id: 'prod-projector-4',
    title: 'Smart Ultra-Pocket 4K Cinema Projector',
    subtitle: 'Auto Focus, Auto Keystone & 180° Gimbal Stand',
    category: 'Smart Gadgets',
    regularPrice: 18500,
    salePrice: 15900,
    discountBadge: '-14% BESTSELLER',
    inStock: true,
    description: 'Turn any wall or ceiling into a 130-inch home theater. This ultra-portable smart projector features 180-degree flexible rotation, instant auto-focus and 4-point keystone correction. Comes with built-in Android TV OS, Netflix/YouTube streaming, Dual-band Wi-Fi 6, and cinematic 360° Hi-Fi stereo speakers.',
    imageUrl: miniProjectorImg,
    galleryImages: [miniProjectorImg],
    specs: '4K HDR Decode • 1080P Native Resolution • 300 ANSI Lumens • Android 11 Built-in • Screen Mirroring',
    createdAt: '2026-09-01',
  },
  {
    id: 'prod-gimbal-5',
    title: '3-Axis AI Face Tracking Smartphone Gimbal Stabilizer',
    subtitle: 'Foldable Handheld Gimbal with Magnetic Fill Light',
    category: 'Cameras & Video',
    regularPrice: 9200,
    salePrice: 7800,
    discountBadge: '-15% TRENDING',
    inStock: true,
    description: 'Capture butter-smooth cinematic videos on your smartphone. Engineered with a professional 3-axis stabilization motor, built-in smart AI face & object tracking sensor (works across TikTok, Instagram, YouTube without app restrictions), magnetic bidirectional bi-color LED fill light, and built-in extendable rod.',
    imageUrl: phoneGimbalImg,
    galleryImages: [phoneGimbalImg],
    specs: '3-Axis Anti-Shake • OLED Status Screen • 12h Battery • Gesture Controls • Foldable Pocket Design',
    createdAt: '2026-09-01',
  },
  {
    id: 'prod-powerbank-6',
    title: '140W Cyberpunk Transparent GaN Power Bank 25000mAh',
    subtitle: 'Color Smart IPS Screen & Multi-Device Ultra Fast Charge',
    category: 'Chargers & Power',
    regularPrice: 8900,
    salePrice: 7200,
    discountBadge: '-19%',
    inStock: true,
    description: 'A beast of power in a futuristic see-through cyberpunk design. With dual USB-C PD 3.1 ports delivering up to 140W high-speed charging, you can easily charge laptops, MacBooks, tablets, and phones simultaneously. The vivid color IPS smart screen shows real-time wattage, voltage, temperature, and battery life.',
    imageUrl: ganPowerbankImg,
    galleryImages: [ganPowerbankImg],
    specs: '140W Max Fast Output • 25,000mAh Airplane-Safe Capacity • 100W Fast Recharging • Color IPS Display',
    createdAt: '2026-09-01',
  },
  {
    id: 'prod-smartring-7',
    title: 'Titanium Smart Health & Sleep Tracking Ring (Gen 3)',
    subtitle: 'Discreet Bio-Sensor Ring / 24/7 Heart Rate & SpO2',
    category: 'Wearables',
    regularPrice: 11500,
    salePrice: 9800,
    discountBadge: '-15% NEW',
    inStock: true,
    description: 'The future of minimalist health tracking without a bulky screen. Crafted from ultra-lightweight Grade 5 aerospace titanium with medical-grade resin inner lining. Measures sleep stages, continuous heart rate, blood oxygen (SpO2), stress levels, skin temperature, and daily steps with 7-day battery life.',
    imageUrl: smartRingImg,
    galleryImages: [smartRingImg],
    specs: 'Aerospace Titanium • 5ATM Water Resistant (Swimming Safe) • 7 Days Battery • Zero Monthly Fees',
    createdAt: '2026-09-01',
  },
  {
    id: 'prod-speaker-8',
    title: 'Vintage Leather & Brass Portable Hi-Fi Bluetooth Speaker',
    subtitle: 'Classic Brass Knobs, Rich Deep Bass & 20h Playtime',
    category: 'Audio & Sound',
    regularPrice: 6800,
    salePrice: 5500,
    discountBadge: '-19%',
    inStock: true,
    description: 'Immerse in warm, rich acoustics paired with timeless retro aesthetics. Wrapped in textured hand-finished leatherette with golden woven speaker grille and solid brushed brass rotary controls for volume, bass, and treble tuning. Delivers booming 30W stereo room-filling sound anywhere.',
    imageUrl: vintageSpeakerImg,
    galleryImages: [vintageSpeakerImg],
    specs: '30W Stereo Output • 20h Playtime • Bluetooth 5.3 + AUX + TF Card • IPX5 Splashproof',
    createdAt: '2026-09-01',
  },
  {
    id: 'prod-headphones-9',
    title: 'Premium Wireless Over-Ear ANC Studio Headphones',
    subtitle: 'High-Fidelity Sound & Memory Foam Comfort',
    category: 'Audio & Sound',
    regularPrice: 14700,
    salePrice: 12500,
    discountBadge: '-15%',
    inStock: true,
    description: 'Experience pure, uninterrupted sound with these premium noise-canceling headphones. Featuring high-fidelity audio, all-day comfort memory foam ear cushions, and up to 30 hours of battery life on a single charge.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRnXb2aRPaWpizont8f0GLeS8zoZFAmGKrZNkmodkFPQF1vfRNZhBpTXQ8wP2ah5GnydT22bQeNXrTFWMXhWvGgJIqaEJpKPEOwKiHTu3fkDWdMvVc4FL_Wcz3WHUrNEh92yAag7HL9iWYvY-fbLObim9Fju370Xl9i_7mDM-CR0305lDbtiEMRKchdDHfPhsOkFogP5kNTWDY-1O4J22KH2FeFIkFOlwzuOuJZwAuRYYkdr6v4hcDmw',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRnXb2aRPaWpizont8f0GLeS8zoZFAmGKrZNkmodkFPQF1vfRNZhBpTXQ8wP2ah5GnydT22bQeNXrTFWMXhWvGgJIqaEJpKPEOwKiHTu3fkDWdMvVc4FL_Wcz3WHUrNEh92yAag7HL9iWYvY-fbLObim9Fju370Xl9i_7mDM-CR0305lDbtiEMRKchdDHfPhsOkFogP5kNTWDY-1O4J22KH2FeFIkFOlwzuOuJZwAuRYYkdr6v4hcDmw',
    ],
    specs: 'Active Noise Cancellation • 30h Battery • Bluetooth 5.3 • Hi-Res Audio',
    createdAt: '2026-09-01',
  },
  {
    id: 'prod-smartwatch-10',
    title: 'Minimalist Aluminum Smartwatch Series 5 Ultra',
    subtitle: 'AMOLED Always-On Display & Health Tracking',
    category: 'Wearables',
    regularPrice: 8200,
    salePrice: 6800,
    discountBadge: '-17%',
    inStock: true,
    description: 'A minimalist, high-end smartwatch with a brushed aluminum casing and a sleek black silicone strap. The watch face displays a crisp, modern digital interface with 24/7 heart rate monitoring, sleep analysis, and water resistance up to 50 meters.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNRPTcNDkJGvotQCjortT_zvV4wXUrJbM6bc9-rzZOQMWBZXNXe0mywWIIVC4z59EK4HlJxDUAnRVYvLxCCM2vk4Lmi-gZX0Mw5bHd_ovbdg4wbkXRG1xMOYcc6ISX2md5WsaMn0B_Ts0urE9UEAWEi1LY70Xds1rkwR_GyhLLHReiExabsL4Ki9zvoa5rt0_9NiGxUl2dBK2qkG0hTu6Qu5Zn-JTWXGB13D6cB7NfZBD4BFmxBfdfMA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBNRPTcNDkJGvotQCjortT_zvV4wXUrJbM6bc9-rzZOQMWBZXNXe0mywWIIVC4z59EK4HlJxDUAnRVYvLxCCM2vk4Lmi-gZX0Mw5bHd_ovbdg4wbkXRG1xMOYcc6ISX2md5WsaMn0B_Ts0urE9UEAWEi1LY70Xds1rkwR_GyhLLHReiExabsL4Ki9zvoa5rt0_9NiGxUl2dBK2qkG0hTu6Qu5Zn-JTWXGB13D6cB7NfZBD4BFmxBfdfMA',
    ],
    specs: 'AMOLED Always-On • Heart Rate & SpO2 • 5ATM Water Resistant • Bluetooth Calling',
    createdAt: '2026-09-01',
  }
];

export const sampleSampleCategories = [
  'All Products',
  'Audio & Sound',
  'Chargers & Power',
  'Desk Setup',
  'Smart Gadgets',
  'Cameras & Video',
  'Wearables'
];

export const sampleOrderHistory: Order[] = [
  {
    id: 'ORD-9825',
    customerName: 'Amina Rahman',
    customerPhone: '+880 1712 345678',
    deliveryAddress: 'House 14, Road 7, Dhanmondi, Dhaka',
    totalAmount: 3450,
    status: 'dispatched',
    createdAt: '2026-09-01T08:15:00Z',
    items: [
      {
        product: initialProducts[0],
        quantity: 1,
      }
    ],
    whatsappMessage: 'Order ORD-9825 confirmed and dispatched via courier.',
  },
  {
    id: 'ORD-9824',
    customerName: 'Farhan Kabir',
    customerPhone: '+880 1819 876543',
    deliveryAddress: 'Banani Block C, Road 11, Dhaka',
    totalAmount: 4200,
    status: 'delivered',
    createdAt: '2026-08-31T14:30:00Z',
    items: [
      {
        product: initialProducts[1],
        quantity: 1,
      }
    ],
    whatsappMessage: 'Delivered successfully.',
  },
  {
    id: 'ORD-9823',
    customerName: 'Sadia Chowdhury',
    customerPhone: '+880 1911 223344',
    deliveryAddress: 'Gulshan 2, Avenue 4, Dhaka',
    totalAmount: 15900,
    status: 'confirmed',
    createdAt: '2026-09-01T09:45:00Z',
    items: [
      {
        product: initialProducts[3],
        quantity: 1,
      }
    ],
    whatsappMessage: 'Order received and being prepared for delivery.',
  }
];

