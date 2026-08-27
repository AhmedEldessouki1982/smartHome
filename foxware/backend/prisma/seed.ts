import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const IMAGES: Record<string, string> = {
  "WiFi Smart Switch 1 Gang (US)": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-star-ring-2nd-generation-smart-wifi-3-waysingle-pole-push-button-light-switch-1234-gang-864554.jpg?v=1685695883",
  "WiFi Smart Switch 2 Gang (US)": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-star-ring-2nd-generation-smart-wifi-3-waysingle-pole-push-button-light-switch-1234-gang-864554.jpg?v=1685695883",
  "WiFi Smart Switch 3 Gang (US)": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-star-ring-2nd-generation-smart-wifi-3-waysingle-pole-push-button-light-switch-1234-gang-864554.jpg?v=1685695883",
  "WiFi Smart Switch 1 Gang (EU)": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/Star_Featherg_Series_WiFi_Smart_Switch_Push_Button_With_Neutral_Light_Scene_2in1_Switch_EU_Version.jpg?v=1750661921",
  "Smart Dimmer Switch (EU)": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-wifi-smart-light-dimmer-touch-panel-switch-123-gang-eu-version-890545.jpg?v=1663923354",
  "Smart Dimmer Switch (US)": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-wifi-smart-light-dimmer-touch-panel-switch-123-gang-us-version-202519.png?v=1661370994",
  "Smart Fan Switch (US)": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/new-wifi-smart-rotary-light-dimmer-switch-schedule-timer-brightness-memory-eu-535041.jpg?v=1615966248",
  "Smart Fan Light Switch (US)": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-star-ring-2nd-generation-smart-wifi-3-waysingle-pole-push-button-light-switch-1234-gang-864554.jpg?v=1685695883",
  "WiFi Curtain Switch (US)": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-wifi-rf433-smart-25d-arc-glass-touch-panel-curtain-switch-for-roller-blinds-shutters-735483.jpg?v=1757579515",
  "WiFi Garage Door Opener": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/rf433-remote-emitter-for-controlling-wifi-zigbee-curtain-motor-hand-held-wall-mounted-transmitter-multiple-channels-optional-165850.jpg?v=1615966310",
  "WiFi Switch Module 1 Gang": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/mini-new-diy-wifi-rf433-smart-light-relay-switch-module-321684.png?v=1647534125",
  "WiFi Switch Module 2 Gang": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/mini-new-diy-wifi-rf433-smart-light-relay-switch-module-321684.png?v=1647534125",
  "WiFi Dimmer Module": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/zigbee-smart-dimmer-switch-relay-module-tuya-zigbee30-hub-required-12-way-12-gang-660137.jpg?v=1661457705",
  "WiFi Curtain Module": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/wifi-mini-diy-smart-curtain-switch-module-for-electric-motorized-roller-blinds-shutter-motor-eu-373822.jpg?v=1660073237",
  "WiFi Chain Roller Blinds Motor": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/rechargeable-tubular-roller-blind-motor-rf433-remote-control-718776.jpg?v=1712566146",
  "BHT-002 WiFi Thermostat": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-wifi-smart-home-heating-knob-thermostat-temperature-controller-for-water-gas-boiler-electric-heating-419771.png?v=1691678326",
  "BHT-006 WiFi Thermostat": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-wifi-smart-home-heating-knob-thermostat-temperature-controller-for-water-gas-boiler-electric-heating-419771.png?v=1691678326",
  "BHT-3000 WiFi Thermostat": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/smart-thermostat-matter-wifi-temperature-controller-water-electric-gas-boiler-floor-heating-623002.jpg?v=1730309544",
  "BHT-8000 WiFi Thermostat": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/smart-thermostat-matter-wifi-temperature-controller-water-electric-gas-boiler-floor-heating-623002.jpg?v=1730309544",
  "WiFi PIR Motion Sensor": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/smart-pir-sensor-human-body-motion-detector-home-security-and-scene-linkage-automation-417713.jpg?v=1725420545",
  "WiFi Temperature & Humidity Sensor": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-zigbee-smart-temperature-and-humidity-sensor-indoor-hygrometer-thermometer-detector-447150.jpg?v=1677747161",
  "WiFi Door & Window Sensor": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-zigbee-smart-temperature-and-humidity-sensor-indoor-hygrometer-thermometer-detector-447150.jpg?v=1677747161",
  "WiFi Smoke Sensor": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-zigbee-smart-smoke-fire-detector-sensor-761970.jpg?v=1676895999",
  "WiFi Gas Leakage Sensor": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/CarbonMonoxide_NaturalGasDetector-1.jpg?v=1751514642",
  "WiFi Water Leakage Sensor": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-zigbee-smart-temperature-and-humidity-sensor-indoor-hygrometer-thermometer-detector-447150.jpg?v=1677747161",
  "WiFi Audible & Visual Alarm": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/tuya-smart-wifizigbee-sound-light-siren-alarm-solar-energy-outdoor-ipx5-waterproof-tamper-alarm-with-rechargeable-battery-434922.png?v=1688695158",
  "Smart LED Bulb E27 RGB 9W": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-wifi-smart-led-light-bulb-dimmable-lamp-14w-rgb-e27-color-changeable-2700k-6500k-513783.png?v=1688695140",
  "Smart LED Bulb E27 RGB 13W": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-wifi-smart-led-light-bulb-dimmable-lamp-14w-rgb-e27-color-changeable-2700k-6500k-513783.png?v=1688695140",
  "Smart LED Bulb GU10 RGB 5W": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-wifi-gu10-smart-light-bulbs-led-rgb-warm-dimmable-lamps-5w-alexa-google-app-714466.png?v=1694164056",
  "Smart Downlight RGB 7W": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/1_3.jpg?v=1623920231",
  "Mini Smart Socket 10A": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/smart-plug-matter-wifi-socket-16a-outlet-power-monitor-eu-version-255756.png?v=1741826763",
  "Mini Smart Socket 16A": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/smart-plug-matter-wifi-socket-16a-outlet-power-monitor-eu-version-255756.png?v=1741826763",
  "Smart Dimmer Power Socket": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-wifi-smart-power-dimmer-plug-brightness-adjust-timer-socket-eu-151650.jpg?v=1668076316",
  "Glass Panel Smart Socket (EU)": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-zigbee-smart-wall-socket-glass-panel-power-monitor-762208.jpg?v=1657737140",
  "WiFi IR Remote (UFO-R1)": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-wifi-usb-smart-ir-rf-wireless-universal-remote-controller-822271.jpg?v=1688695148",
  "WiFi IR+RF Remote (UFO-R2)": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-wifi-usb-smart-ir-rf-wireless-universal-remote-controller-822271.jpg?v=1688695148",
  "Air Conditioner Mate": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-tuya-wifi-smart-ir-thermostat-ac-remote-controller-temperature-and-humidity-sensor-621080.jpg?v=1657823876",
  "Smart Boiler Switch": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-smart-wifi-water-heater-boiler-switch-wireless-control-timer-for-heating-water-484546.jpg?v=1687311499",
  "Smart Valve (WiFi)": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-smart-zigbee-water-heater-boiler-switch-wireless-control-timer-for-heating-water-666608.jpg?v=1668076315",
  "WiFi Smart Door Lock": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/bluetooth-smart-door-lock-with-passcode-keypad-biometric-entry-doorknob-with-handle-769897.jpg?v=1721940339",
  "WiFi Smart Wake-up Light": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/wifi-wake-up-smart-light-alarm-clock-with-7-colors-sunrise-sunset-simulation-952225.jpg?v=1618455349",
  "WiFi Smart Star Projector": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-smart-wifi-ambient-lighting-tv-backlight-4k-hdmi-20-sync-box-led-light-strip-music-174636.jpg?v=1685063393",
  "ZigBee Smart Switch 1 Gang (US)": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-star-ring-zigbee-smart-light-switch-single-pole-no-neutral-required-no-capacitor-392141.jpg?v=1703858789",
  "ZigBee Smart Dimmer Switch": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-star-ring-zigbee-smart-dimmer-switch-for-light-dimming-work-with-alexa-google-home-dimmable-1-3gang-602714.png?v=1691429812",
  "ZigBee Scene Switch": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/MOESZigbeeWirelessSceneSwitch-3Gang9ScenariosSmartPushButtonRemote_MagneticHandheldDesign.jpg?v=1777273025",
  "ZigBee Smart Knob Dimmer": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/new-wifi-smart-rotary-light-dimmer-switch-schedule-timer-brightness-memory-eu-535041.jpg?v=1615966248",
  "ZigBee Smart Button": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/zigbee-smart-push-button-switch-and-zigbee-scene-switch-kit-l-only-no-neutral-wire-or-ln-wiring-optional-no-capacitor-required-tuya-zigbee-hub-required-726824.jpg?v=1621653787",
  "ZigBee Switch Module 1 Gang": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/tuya-zigbee-30-smart-light-switch-module-2mqtt-setup-available-839515.jpg?v=1647497716",
  "ZigBee Dimmer Module": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/zigbee-smart-dimmer-switch-relay-module-tuya-zigbee30-hub-required-12-way-12-gang-660137.jpg?v=1661457705",
  "ZigBee LED Driver ZLD-RCW": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/wifi-smart-led-light-strip-rgb-strip-light-5050-controller-music-sync-mic-sound-color-changing-smart-life-app-24-key-remote-control-904086.jpg?v=1662712147",
  "ZigBee PIR Motion Sensor": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/smart-pir-sensor-human-body-motion-detector-home-security-and-scene-linkage-automation-417713.jpg?v=1725420545",
  "ZigBee Door & Window Sensor": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-zigbee-smart-temperature-and-humidity-sensor-indoor-hygrometer-thermometer-detector-447150.jpg?v=1677747161",
  "ZigBee Smoke Detector": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-zigbee-smart-smoke-fire-detector-sensor-761970.jpg?v=1676895999",
  "ZigBee Gas Leakage Sensor": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/CarbonMonoxide_NaturalGasDetector-1.jpg?v=1751514642",
  "ZigBee Water Leakage Sensor": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-zigbee-smart-temperature-and-humidity-sensor-indoor-hygrometer-thermometer-detector-447150.jpg?v=1677747161",
  "ZigBee SOS Button": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/moes-tuya-smart-fingerbot-plus-bluetooth-wireless-switch-bot-touch-onoff-411847.jpg?v=1755584338",
  "ZigBee Smart Brightness Thermometer": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-zigbee-smart-temperature-and-humidity-sensor-indoor-hygrometer-thermometer-detector-447150.jpg?v=1677747161",
  "ZigBee Human Presence Sensor": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-zigbee-human-presence-sensor-detector-radar-wave-detection-sensor-for-home-security-596265.png?v=1692258238",
  "ZigBee BHT-002 Thermostat": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/Zigbee_Smart_Thermostat_Programmable_Temperature_Controller_Water_Boiler_Electric_Heating-1.jpg?v=1758097145",
  "ZigBee TRV Radiator Thermostat": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/tuya-zigbee30-new-mini-radiator-actuator-valve-smart-programmable-thermostat-temperature-controller-846552.jpg?v=1664530034",
  "Tuya ZigBee Wired Hub": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/TuyaZigBeeBluetoothSmartGatewayHubType-CHomeAutomationBridgeWorkswithAlexa_GoogleHome-1_1.png?v=1761200931",
  "Smart Control Panel (4-inch)": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/3.5-inSmartCenterControlPanel-1.jpg?v=1753335294",
  "Handheld Center Control Panel": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/MOESTuyaAIDesktopCenterControlPanelAlexaBuilt-in-1.jpg?v=1784112295",
  "ZigBee Downlight RGB 7W": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/TuyaZigBeeSmartLEDDownlightRoundSpotlights912WRGBColorDimmingLampWorkwithAlexaGoogleHome-1_20a264f1-4554-403e-aee5-53c550083ca6.png?v=1767956346",
  "ZigBee GU10 Smart Bulb 5W": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-zigbee-downlight-tuya-dimming-spot-lamp-6w-rgb-change-warm-cool-light-217937.png?v=1691015674",
  "ZigBee RGB LED Strip + Controller": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/wifi-smart-led-light-strip-rgb-strip-light-5050-controller-music-sync-mic-sound-color-changing-smart-life-app-24-key-remote-control-904086.jpg?v=1662712147",
  "ZigBee Curtain Switch": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-zigbee-rf-smart-star-ring-curtain-switch-for-roller-shutter-electric-curtains-blind-motor-support-timing-remote-control-374550.jpg?v=1691512616",
  "ZigBee Chain Blinds Motor": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/TuyaZigBeeRechargeable16mmSmartRollerBlindsMotorfor172528mmTubes_App_VoiceControl-1.jpg?v=1765264801",
  "ZigBee Smart Valve": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-smart-zigbee-water-heater-boiler-switch-wireless-control-timer-for-heating-water-666608.jpg?v=1668076315",
  "Bluetooth Mesh Gateway": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/Bluetooth_MeshSmartGatewaywithType-C_Hubfor128Devices_Alexa_GoogleHomeSupport.jpg?v=1778307926",
  "Bluetooth Smart Switch": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/bluetooth-smart-switch-relay-module-single-point-control-breaker-repeater-728967.jpg?v=1688612314",
  "Bluetooth Brightness Thermometer": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-bluetooth-smart-carbon-dioxide-tester-portable-co2-temp-humi-air-quality-monitor-985319.jpg?v=1677720227",
  "Bluetooth Chain Blinds Motor": "https://cdn.shopify.com/s/files/1/0095/4079/6497/files/TuyaMatterOverThreadSmartRollerBlindsMotor38mmTubeCurtainAutomation-1.jpg?v=1762755534",
  "Bluetooth CO2 Air Quality Detector": "https://cdn.shopify.com/s/files/1/0095/4079/6497/products/moes-bluetooth-smart-carbon-dioxide-tester-portable-co2-temp-humi-air-quality-monitor-985319.jpg?v=1677720227",
};

async function main() {
  console.log('Seeding MOES catalog...');

  // Clean transactional data only — keep users & categories
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();

  // Seed users if empty
  const userCount = await prisma.user.count();
  if (userCount === 0) {
    const adminPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: { name: 'Admin', email: 'admin@almashareq.com', password: adminPassword, role: Role.ADMIN },
    });
    const userPassword = await bcrypt.hash('user123', 10);
    await prisma.user.create({
      data: { name: 'Demo User', email: 'user@almashareq.com', password: userPassword, role: Role.USER },
    });
    console.log('  - Users created');
  } else {
    console.log(`  - ${userCount} users exist, skipping`);
  }

  // Seed categories if empty
  let smartHome = await prisma.category.findUnique({ where: { slug: 'smart-home' } });
  let officeSecurity = await prisma.category.findUnique({ where: { slug: 'office-security' } });
  let networking = await prisma.category.findUnique({ where: { slug: 'networking' } });
  let servers = await prisma.category.findUnique({ where: { slug: 'servers' } });
  let automation = await prisma.category.findUnique({ where: { slug: 'automation' } });

  if (!smartHome) smartHome = await prisma.category.create({ data: { name: 'Smart Home', slug: 'smart-home' } });
  if (!officeSecurity) officeSecurity = await prisma.category.create({ data: { name: 'Office Security', slug: 'office-security' } });
  if (!networking) networking = await prisma.category.create({ data: { name: 'Networking', slug: 'networking' } });
  if (!servers) servers = await prisma.category.create({ data: { name: 'Servers', slug: 'servers' } });
  if (!automation) automation = await prisma.category.create({ data: { name: 'Automation', slug: 'automation' } });

  const products = [
    // ─── WiFi Smart Switches ───────────────────────────────────────
    { name: 'WiFi Smart Switch 1 Gang (US)', categoryId: smartHome.id, description: 'Single-gang smart light switch with WiFi 2.4GHz + RF433MHz. 100-240V AC, 10A. Colors: White, Gold, Black. Voice control via Alexa and Google Assistant. No neutral wire version available.', descriptionAr: 'مفتاح إضاءة ذكي بفتحة واحدة مع واي فاي ٢.٤ جيجاهرتز + RF433MHz. ١٠٠-٢٤٠ فولت تيار متردد، ١٠ أمبير. الألوان: أبيض، ذهبي، أسود. تحكم صوتي عبر أليكسا ومساعد جوجل.' },
    { name: 'WiFi Smart Switch 2 Gang (US)', categoryId: smartHome.id, description: 'Dual-gang smart light switch with WiFi 2.4GHz + RF433MHz. 100-240V AC, 10A per gang. Colors: White, Gold, Black. Supports timer, family sharing, and remote app control.', descriptionAr: 'مفتاح إضاءة ذكي بفتحتين مع واي فاي ٢.٤ جيجاهرتز + RF433MHz. ١٠٠-٢٤٠ فولت تيار متردد، ١٠ أمبير لكل فتحة. الألوان: أبيض، ذهبي، أسود. يدعم المؤقت والمشاركة العائلية والتحكم عن بعد.' },
    { name: 'WiFi Smart Switch 3 Gang (US)', categoryId: smartHome.id, description: 'Three-gang smart light switch with WiFi 2.4GHz + RF433MHz. 100-240V AC, 10A per gang. Backlight ON/OFF optional. Compatible with Alexa and Google Home.', descriptionAr: 'مفتاح إضاءة ذكي بثلاث فتحات مع واي فاي ٢.٤ جيجاهرتز + RF433MHz. ١٠٠-٢٤٠ فولت تيار متردد، ١٠ أمبير لكل فتحة. إضاءة خلفية اختيارية. متوافق مع أليكسا وجوجل هوم.' },
    { name: 'WiFi Smart Switch 1 Gang (EU)', categoryId: smartHome.id, description: 'European standard single-gang smart switch. WiFi 2.4GHz + RF433MHz, 200-240V AC, 10A. White/Gold/Black. No neutral wire required version available.', descriptionAr: 'مفتاح ذكي أوروبي بفتحة واحدة. واي فاي ٢.٤ جيجاهرتز + RF433MHz، ٢٠٠-٢٤٠ فولت، ١٠ أمبير. أبيض/ذهبي/أسود. تتوفر نسخة بدون سلك محايد.' },
    { name: 'Smart Dimmer Switch (EU)', categoryId: smartHome.id, description: 'Push dimmer switch with WiFi 2.4GHz + RF433MHz. 100-250V AC, 1A, 220W max. Colors: White, Black. Long press to dim, single press for ON/OFF. Compatible with Alexa and Google Assistant.', descriptionAr: 'مفتاح تعتيم ذكي بالضغط مع واي فاي ٢.٤ جيجاهرتز + RF433MHz. ١٠٠-٢٥٠ فولت، ١ أمبير، ٢٢٠ واط كحد أقصى. ألوان: أبيض، أسود. ضغط مطول للتعتيم، ضغطة واحدة للتشغيل/الإيقاف.' },
    { name: 'Smart Dimmer Switch (US)', categoryId: smartHome.id, description: 'Push dimmer switch with WiFi 2.4GHz + RF433MHz. 100-250V AC, 2A, 440W (220V) / 220W (110V). Colors: White, Black. Independent dimmer control for each light.', descriptionAr: 'مفتاح تعتيم ذكي أمريكي. واي فاي ٢.٤ جيجاهرتز + RF433MHz. ١٠٠-٢٥٠ فولت، ٢ أمبير. ألوان: أبيض، أسود. تحكم مستقل في التعتيم لكل إضاءة.' },
    { name: 'Smart Fan Switch (US)', categoryId: smartHome.id, description: 'WiFi fan speed controller with RF433MHz remote. 100-250V AC, 0.7A, 150W max. Colors: White, Black. Compatible with Alexa and Google Home for voice control.', descriptionAr: 'تحكم في سرعة المروحة عن طريق واي فاي مع ريموت RF433MHz. ١٠٠-٢٥٠ فولت، ٠.٧ أمبير، ١٥٠ واط. ألوان: أبيض، أسود.' },
    { name: 'Smart Fan Light Switch (US)', categoryId: smartHome.id, description: 'Combined fan and light control switch. WiFi 2.4GHz + RF433MHz. Light 2200W (220V), fan 150W (220V). Colors: White, Black. Separate control for fan speed and light.', descriptionAr: 'مفتاح تحكم مشترك للمروحة والإضاءة. واي فاي ٢.٤ جيجاهرتز + RF433MHz. إضاءة ٢٢٠٠ واط، مروحة ١٥٠ واط. ألوان: أبيض، أسود. تحكم منفصل في سرعة المروحة والإضاءة.' },
    { name: 'WiFi Curtain Switch (US)', categoryId: automation.id, description: 'Smart curtain switch for motorized drapes. 100-240V AC, 2.5A. WiFi 2.4GHz protocol. Colors: White, Black. 30m indoor range. Supports timer scheduling and voice control.', descriptionAr: 'مفتاح ستارة ذكي للستائر الآلية. ١٠٠-٢٤٠ فولت، ٢.٥ أمبير. واي فاي ٢.٤ جيجاهرتز. ألوان: أبيض، أسود. مدى ٣٠ متراً داخلياً. يدعم جدولة المؤقت والتحكم الصوتي.' },
    { name: 'WiFi Garage Door Opener', categoryId: automation.id, description: 'Smart garage door controller with WiFi 2.4G. 100-240V AC. Includes alarm system integration. Compact size 87x40x23mm. IP20 rated. Works with Alexa and Google Assistant.', descriptionAr: 'جهاز تحكم ذكي لفتح باب الجراج. واي فاي ٢.٤ جيجاهرتز. ١٠٠-٢٤٠ فولت. يتكامل مع نظام الإنذار. مقاس صغير ٨٧×٤٠×٢٣ مم. يعمل مع أليكسا ومساعد جوجل.' },

    // ─── WiFi Modules ─────────────────────────────────────────────
    { name: 'WiFi Switch Module 1 Gang', categoryId: smartHome.id, description: 'In-wall relay module for converting standard switches to smart. 90-250V AC, 10A total. WiFi 2.4GHz + RF433MHz. 52x47x18mm, IP20. 2-year warranty.', descriptionAr: 'وحدة مرحل داخلي لتحويل المفاتيح العادية إلى ذكية. ٩٠-٢٥٠ فولت، ١٠ أمبير. واي فاي ٢.٤ جيجاهرتز + RF433MHz. ٥٢×٤٧×١٨ مم، IP20. ضمان سنتين.' },
    { name: 'WiFi Switch Module 2 Gang', categoryId: smartHome.id, description: 'Two-channel in-wall smart relay module. 90-250V AC, 10A total. WiFi 2.4GHz + RF433MHz. 52x47x18mm, IP20. Multi-control association support.', descriptionAr: 'وحدة مرحل ذكية بقناتين. ٩٠-٢٥٠ فولت، ١٠ أمبير. واي فاي ٢.٤ جيجاهرتز + RF433MHz. ٥٢×٤٧×١٨ مم. دعم الربط متعدد التحكم.' },
    { name: 'WiFi Dimmer Module', categoryId: smartHome.id, description: 'In-wall dimmer module for retrofitting existing lights. 90-250V AC, 75W (110V) / 150W (220V). WiFi 2.4GHz. 52x47x18mm, IP20. 1-year warranty.', descriptionAr: 'وحدة تعتيم داخلية للتحديث. ٩٠-٢٥٠ فولت، ٧٥ واط (١١٠ فولت) / ١٥٠ واط (٢٢٠ فولت). واي فاي ٢.٤ جيجاهرتز.' },
    { name: 'WiFi Curtain Module', categoryId: automation.id, description: 'Curtain switch module for automating existing drapes. 90-250V AC, 2A, 500W max. WiFi 2.4GHz. 52x47x18mm, IP20. Supports timer scheduling.', descriptionAr: 'وحدة تحكم في الستائر لأتمتة الستائر الموجودة. ٩٠-٢٥٠ فولت، ٢ أمبير، ٥٠٠ واط كحد أقصى. واي فاي ٢.٤ جيجاهرتز.' },
    { name: 'WiFi Chain Roller Blinds Motor', categoryId: automation.id, description: 'Motor for chain-operated roller blinds. 12V, 1.35Nm torque, 55rpm. WiFi 2.4GHz + RF433MHz. Max blinds size 2.5x3.5m, max weight 10KG. Battery backup optional.', descriptionAr: 'محرك للستائر الدوارة بسلسلة. ١٢ فولت، عزم دوران ١.٣٥ نيوتن متر، ٥٥ دورة/دقيقة. واي فاي ٢.٤ جيجاهرتز + RF433MHz.' },

    // ─── WiFi Thermostats ──────────────────────────────────────────
    { name: 'BHT-002 WiFi Thermostat', categoryId: automation.id, description: 'WiFi programmable room thermostat. 95-240V AC, 5A (water/gas boiler) / 16A (electric heating). NTC sensor. Capacitive touch buttons, 86x86mm standard box. <1.5W power consumption.', descriptionAr: 'ترموستات غرفة قابل للبرمجة. ٩٥-٢٤٠ فولت، ٥ أمبير (غلاية ماء/غاز) / ١٦ أمبير (تدفئة كهربائية). حساس NTC. أزرار لمس سعوية.' },
    { name: 'BHT-006 WiFi Thermostat', categoryId: automation.id, description: 'WiFi thermostat with large LED display. 95-240V AC, 3A (water heating) / 16A (electric heating). NTC3950 sensor, ±1°C accuracy. PC+ABS fireproof shell.', descriptionAr: 'ترموستات واي فاي بشاشة LED كبيرة. ٩٥-٢٤٠ فولت. حساس NTC3950 بدقة ±١°م. غلاف مقاوم للحريق من PC+ABS.' },
    { name: 'BHT-3000 WiFi Thermostat', categoryId: automation.id, description: 'Premium WiFi room thermostat with border-less rounded design. 95-240V AC. PC+ABS fireproof shell, capacitive touch buttons. Hidden touch buttons with light guide strip.', descriptionAr: 'ترموستات واي فاي فاخر بتصميم دائري بدون حواف. ٩٥-٢٤٠ فولت. هيكل مقاوم للحريق، أزرار لمس مخفية بشريط إضاءة.' },
    { name: 'BHT-8000 WiFi Thermostat', categoryId: automation.id, description: 'Heating thermostat with brushed metal panel. 95-240V AC. NTC3950 sensor, ±1°C accuracy. 86x86mm installation. IP20. For water/gas boiler heating systems.', descriptionAr: 'ترموستات تدفئة بلوحة معدنية. ٩٥-٢٤٠ فولت. حساس NTC3950 بدقة ±١°م. مقاس ٨٦×٨٦ مم.' },

    // ─── WiFi Sensors ─────────────────────────────────────────────
    { name: 'WiFi PIR Motion Sensor', categoryId: officeSecurity.id, description: 'Wireless motion detector with WiFi 2.4GHz. Sends push notifications on movement detection. Battery powered. Compatible with Alexa and Google Home for automation triggers.', descriptionAr: 'كاشف حركة لاسلكي مع واي فاي ٢.٤ جيجاهرتز. يرسل إشعارات عند اكتشاف الحركة. يعمل بالبطارية. متوافق مع أليكسا وجوجل هوم.' },
    { name: 'WiFi Temperature & Humidity Sensor', categoryId: officeSecurity.id, description: 'Indoor climate monitor with LCD display. -20°C to 60°C range, ±1°C accuracy. Humidity 0-100% RH, ±5% RH. 2x AAA batteries. WiFi 2.4GHz IEEE 802.11 b/g/n.', descriptionAr: 'مراقب مناخ داخلي بشاشة LCD. نطاق -٢٠°م إلى ٦٠°م، دقة ±١°م. رطوبة ٠-١٠٠%. بطاريتين AAA.' },
    { name: 'WiFi Door & Window Sensor', categoryId: officeSecurity.id, description: 'Contact sensor for doors and windows. WiFi 2.4GHz. 2x AAA batteries, 6000 triggers battery life. 71x25x20mm main sensor. Sends instant alert when opened. Works with Alexa.', descriptionAr: 'حساس تلامس للأبواب والنوافذ. واي فاي ٢.٤ جيجاهرتز. بطاريتين AAA، ٦٠٠٠ عملية. ٧١×٢٥×٢٠ مم. يرسل إنذاراً فورياً عند الفتح.' },
    { name: 'WiFi Smoke Sensor', categoryId: officeSecurity.id, description: 'Photoelectric smoke detector with WiFi connectivity. 2x AAA batteries. 30 sqm monitoring range. -10°C to +50°C operating range. Push notifications on alarm.', descriptionAr: 'كاشف دخان كهروضوئي مع واي فاي. بطاريتين AAA. نطاق مراقبة ٣٠ متراً مربعاً. إشعارات فورية عند الإنذار.' },
    { name: 'WiFi Gas Leakage Sensor', categoryId: officeSecurity.id, description: 'Natural gas leakage detector. AC100-240V powered. 75dB/m alarm sound. WiFi 2.4GHz. Solenoid valve output (12V/100Kpa). Relay output NC/NO optional.', descriptionAr: 'كاشف تسرب غاز طبيعي. يعمل بتيار ١٠٠-٢٤٠ فولت. صوت إنذار ٧٥ ديسيبل. واي فاي ٢.٤ جيجاهرتز. مخرج صمام ملفي.' },
    { name: 'WiFi Water Leakage Sensor', categoryId: officeSecurity.id, description: 'Water leak detector with audible alarm. 2x AAA batteries, 3V. WiFi 2.4GHz IEEE 802.11 b/g/n. 70+dB buzzer. -10°C to +40°C operating temperature.', descriptionAr: 'كاشف تسرب ماء مع إنذار صوتي. بطاريتين AAA. واي فاي ٢.٤ جيجاهرتز. جرس ٧٠+ ديسيبل.' },
    { name: 'WiFi Audible & Visual Alarm', categoryId: officeSecurity.id, description: 'Indoor siren and strobe alarm. USB 5V/1A powered. 105dB max volume, 18 ringtones. WiFi 2.4GHz IEEE 802.11 b/g/n. 45m wireless range.', descriptionAr: 'صفارة إنذار داخلية مع ضوء وامض. USB ٥V/١A. ١٠٥ ديسيبل كحد أقصى، ١٨ نغمة. واي فاي ٢.٤ جيجاهرتز.' },

    // ─── WiFi Lighting ────────────────────────────────────────────
    { name: 'Smart LED Bulb E27 RGB 9W', categoryId: smartHome.id, description: 'WiFi RGB smart bulb with E27 base. 9W, 60W equivalent. 2800-6200K + RGB color. AC100-240V. Dimmable. Compatible with Alexa and Google Home. 50,000+ hour lifespan.', descriptionAr: 'لمبة ذكية RGB بقاعدة E27. ٩ واط، تعادل ٦٠ واط. ٢٨٠٠-٦٢٠٠كلفن + ألوان RGB. قابلة للتعتيم. متوافقة مع أليكسا وجوجل هوم.' },
    { name: 'Smart LED Bulb E27 RGB 13W', categoryId: smartHome.id, description: 'High-power WiFi RGB bulb, E27 base. 13W, 2900-6000K + RGB. AC100-240V. Voice and app control. Group control supported.', descriptionAr: 'لمبة RGB عالية الطاقة بقاعدة E27. ١٣ واط. ٢٩٠٠-٦٠٠٠كلفن + ألوان RGB. تحكم صوتي وعبر التطبيق.' },
    { name: 'Smart LED Bulb GU10 RGB 5W', categoryId: smartHome.id, description: 'GU10 spot smart bulb, 5W. RGB + 2700K warm white. Dimmable. WiFi 2.4GHz. AC85-265V. Perfect for recessed lighting.', descriptionAr: 'لمبة GU10 ذكية موجهة، ٥ واط. RGB + أبيض دافئ ٢٧٠٠كلفن. قابلة للتعتيم. مثالية للإضاءة الغائرة.' },
    { name: 'Smart Downlight RGB 7W', categoryId: smartHome.id, description: 'Smart ceiling downlight, 7W RGB+CCT. 115mm diameter, 95mm cutout. AC100-240V. WiFi 2.4GHz IEEE 802.11 b/g/n. Dimmable with voice control.', descriptionAr: 'إضاءة سقف ذكية غائرة، ٧ واط RGB+CCT. قطر ١١٥ مم. واي فاي ٢.٤ جيجاهرتز. قابلة للتعتيم مع التحكم الصوتي.' },

    // ─── WiFi Plugs & Sockets ────────────────────────────────────
    { name: 'Mini Smart Socket 10A', categoryId: smartHome.id, description: 'Compact WiFi smart plug. 90-240V AC, 10A. WiFi 2.4GHz. Timer, schedule, and voice control. Energy monitoring supported. 54x49x36mm.', descriptionAr: 'مقبس ذكي واي فاي مضغوط. ٩٠-٢٤٠ فولت، ١٠ أمبير. مؤقت وجدولة وتحكم صوتي. مراقبة الطاقة.' },
    { name: 'Mini Smart Socket 16A', categoryId: smartHome.id, description: 'High-power WiFi smart plug. 100-250V, 16A, 3300W max. WiFi 2.4GHz. Electricity consumption tracking. 54x54x55mm.', descriptionAr: 'مقبس ذكي عالي الطاقة. ١٠٠-٢٥٠ فولت، ١٦ أمبير، ٣٣٠٠ واط كحد أقصى. تتبع استهلاك الكهرباء.' },
    { name: 'Smart Dimmer Power Socket', categoryId: smartHome.id, description: 'Dimmable smart socket for lamps. AC100-240V, 500W max. WiFi 2.4GHz. Adjustable brightness from phone or voice. 50x50x47mm.', descriptionAr: 'مقبس ذكي قابل للتعتيم للمصابيح. ١٠٠-٢٤٠ فولت، ٥٠٠ واط. واي فاي ٢.٤ جيجاهرتز. ضبط السطوع من الهاتف أو الصوت.' },
    { name: 'Glass Panel Smart Socket (EU)', categoryId: smartHome.id, description: 'Glass panel power socket with WiFi. 95-245V AC, 16A. WiFi 802.11 b/g/n 2.4GHz. Power monitoring. Incandescent load up to 3000W. EU/UK/FR standards.', descriptionAr: 'مقبس طاقة بلوحة زجاجية مع واي فاي. ٩٥-٢٤٥ فولت، ١٦ أمبير. مراقبة الطاقة. حمولة متوهجة حتى ٣٠٠٠ واط.' },

    // ─── WiFi Remotes & Controllers ──────────────────────────────
    { name: 'WiFi IR Remote (UFO-R1)', categoryId: smartHome.id, description: 'Universal infrared remote controller. 2.4GHz WiFi, 38KHz carrier. Multi-directional IR control. Compatible with A/C, TV, set-top boxes. Android/iOS app.', descriptionAr: 'جهاز تحكم عن بعد بالأشعة تحت الحمراء. واي فاي ٢.٤ جيجاهرتز، تردد ٣٨ كيلوهرتز. متوافق مع المكيفات والتلفزيون.' },
    { name: 'WiFi IR+RF Remote (UFO-R2)', categoryId: smartHome.id, description: 'Universal remote with IR + RF433/315MHz. 2.4GHz WiFi, 38KHz IR. Controls A/C, TV, RF devices like fans and curtains. Android/iOS.', descriptionAr: 'جهاز تحكم شامل بالأشعة تحت الحمراء + RF. واي فاي ٢.٤ جيجاهرتز. يتحكم في المكيفات والتلفزيون والأجهزة اللاسلكية.' },
    { name: 'Air Conditioner Mate', categoryId: smartHome.id, description: 'Smart A/C controller and power monitor. 250V, 16A, 4000W. WiFi 2.4GHz. Turns any window A/C smart. Current measurement and scheduling.', descriptionAr: 'جهاز تحكم ذكي في المكيف ومراقب للطاقة. ٢٥٠ فولت، ١٦ أمبير، ٤٠٠٠ واط. يحول أي مكيف شباك إلى جهاز ذكي.' },

    // ─── Special WiFi ─────────────────────────────────────────────
    { name: 'Smart Boiler Switch', categoryId: automation.id, description: 'WiFi boiler controller for water heating systems. 110-240V AC, 20A, 3000W. WiFi 2.4GHz. ABS + toughened glass panel. Timer and voice control.', descriptionAr: 'جهاز تحكم واي فاي للسخان. ١١٠-٢٤٠ فولت، ٢٠ أمبير، ٣٠٠٠ واط. لوحة زجاجية مقواة. مؤقت وتحكم صوتي.' },
    { name: 'Smart Valve (WiFi)', categoryId: automation.id, description: 'Automatic shut-off valve for water/gas lines. 12V/1A, 1.6MPA pressure. WiFi 2.4GHz. 5-10 second operation time. Emergency shut-off via app.', descriptionAr: 'صمام إغلاق تلقائي لخطوط المياه/الغاز. ١٢ فولت/١ أمبير، ضغط ١.٦ ميجا باسكال. إغلاق طارئ عبر التطبيق.' },
    { name: 'WiFi Smart Door Lock', categoryId: officeSecurity.id, description: 'Keyless smart door lock with 4 unlocking methods: fingerprint, password, smart card, and key. 100 fingerprint capacity, semiconductor sensor. 6V power, touch 12-key keypad. Phantom password support.', descriptionAr: 'قفل باب ذكي بدون مفتاح بأربع طرق: بصمة، رمز، بطاقة، مفتاح. سعة ١٠٠ بصمة. لوحة مفاتيح لمس ١٢ زراً.' },
    { name: 'WiFi Smart Wake-up Light', categoryId: smartHome.id, description: 'Sunrise alarm clock with 20-level brightness, 7 colors, FM radio, and 7 natural sounds. USB output. Simulates sunrise for gentle waking.', descriptionAr: 'منبه شروق الشمس بمستويات سطوع ٢٠، ٧ ألوان، راديو FM، و٧ أصوات طبيعية. يحاكي شروق الشمس لإيقاظ لطيف.' },
    { name: 'WiFi Smart Star Projector', categoryId: smartHome.id, description: 'Nebula and star projector with WiFi control. RGB nebula + green/blue laser. 100-240V AC. Voice control via Alexa/Google. 43x43x83mm.', descriptionAr: 'جهاز إسقاط نجمي وسديم مع تحكم واي فاي. سديم RGB + ليزر أخضر/أزرق. تحكم صوتي عبر أليكسا وجوجل.' },

    // ─── ZigBee Switches ──────────────────────────────────────────
    { name: 'ZigBee Smart Switch 1 Gang (US)', categoryId: smartHome.id, description: 'ZigBee 3.0 single-gang smart switch. 100-240V AC. Max load 600W (220V) incandescent. Wireless frequency: ZigBee 2.4GHz. Works with Tuya ZigBee hub. Alexa and Google compatible.', descriptionAr: 'مفتاح ذكي ZigBee 3.0 بفتحة واحدة. ١٠٠-٢٤٠ فولت. حمولة قصوى ٦٠٠ واط. يعمل مع hub زيجبي.' },
    { name: 'ZigBee Smart Dimmer Switch', categoryId: smartHome.id, description: 'ZigBee 3.0 dimmer switch for incandescent and LED loads. 90-250V AC, 600W total. 2.4GHz ZigBee. 20-30m outdoor range. Smooth dimming from app or voice.', descriptionAr: 'مفتاح تعتيم ZigBee 3.0. ٩٠-٢٥٠ فولت، ٦٠٠ واط. ZigBee ٢.٤ جيجاهرتز. مدى خارجي ٢٠-٣٠ متراً.' },
    { name: 'ZigBee Scene Switch', categoryId: smartHome.id, description: 'Wireless scene controller with CR2032 battery. ZigBee 3.0 communication. 86x86x15.5mm. Trigger custom lighting scenes. 500K button lifecycle.', descriptionAr: 'جهاز تحكم لاسلكي في المشاهد ببطارية CR2032. ZigBee 3.0. تشغيل مشاهد إضاءة مخصصة. ٥٠٠ ألف ضغطة.' },
    { name: 'ZigBee Smart Knob Dimmer', categoryId: smartHome.id, description: 'Battery-powered rotary dimmer and scene controller. CR2032 3V, ZigBee 3.0. 50m open area range. 40x40x29mm. 1-year battery life. No wiring needed.', descriptionAr: 'مفتاح تعتيم دوار يعمل بالبطارية. CR2032، ZigBee 3.0. مدى ٥٠ متراً. لا يحتاج إلى أسلاك.' },
    { name: 'ZigBee Smart Button', categoryId: smartHome.id, description: 'Wireless programmable scene button. CR2032 battery, ZigBee 3.0. IP55 weatherproof. 45x45x12.5mm. 30K presses battery life. 25m range.', descriptionAr: 'زر مشاهد لاسلكي قابل للبرمجة. بطارية CR2032، ZigBee 3.0. مقاوم للطقس IP55. ٣٠ ألف ضغطة.' },

    // ─── ZigBee Modules ──────────────────────────────────────────
    { name: 'ZigBee Switch Module 1 Gang', categoryId: smartHome.id, description: 'In-wall relay module with ZigBee 3.0. 90-250V AC, 10A total. 52x47x18mm, IP20. Retrofits behind existing switches for smart control.', descriptionAr: 'وحدة مرحل داخلي ZigBee 3.0. ٩٠-٢٥٠ فولت، ١٠ أمبير. ٥٢×٤٧×١٨ مم. تُركب خلف المفاتيح الموجودة.' },
    { name: 'ZigBee Dimmer Module', categoryId: smartHome.id, description: 'In-wall dimmer module for ZigBee 3.0 systems. 90-250V AC, 75W (110V) / 150W (220V). 52x47x18mm, IP20. Compact design fits standard junction boxes.', descriptionAr: 'وحدة تعتيم داخلية لأنظمة ZigBee 3.0. ٩٠-٢٥٠ فولت. ٥٢×٤٧×١٨ مم. تصميم مضغوط.' },
    { name: 'ZigBee LED Driver ZLD-RCW', categoryId: smartHome.id, description: 'RGB+CCT LED strip controller with ZigBee. DC12-24V input, 15A total, 6A per channel. 24x40x90mm. For addressable RGB LED strips up to 5 meters.', descriptionAr: 'جهاز تحكم في شريط LED RGB+CCT مع ZigBee. دخل ١٢-٢٤ فولت تيار مستمر، ١٥ أمبير إجمالاً.' },

    // ─── ZigBee Sensors ───────────────────────────────────────────
    { name: 'ZigBee PIR Motion Sensor', categoryId: officeSecurity.id, description: 'ZigBee motion detector with 150° detection angle, 7m range. CR2 3V battery, 2-year standby. Compact design. Works with any ZigBee hub.', descriptionAr: 'كاشف حركة ZigBee بزاوية ١٥٠° ومدى ٧ أمتار. بطارية CR2، استعداد سنتين.' },
    { name: 'ZigBee Door & Window Sensor', categoryId: officeSecurity.id, description: 'ZigBee contact sensor for entry points. CR2032 battery. Tamper protection. 25x40x12mm main unit. Low power consumption. Push alerts on open/close.', descriptionAr: 'حساس تلامس ZigBee للأبواب والنوافذ. بطارية CR2032. حماية ضد العبث. إنذار عند الفتح/الإغلاق.' },
    { name: 'ZigBee Smoke Detector', categoryId: officeSecurity.id, description: 'ZigBee smoke alarm with CR123A battery. Ceiling mount. 3m detection range. Wireless alert to phone via hub. Self-inspection supported.', descriptionAr: 'كاشف دخان ZigBee ببطارية CR123A. مثبت على السقف. نطاق ٣ أمتار. إنذار لاسلكي للهاتف.' },
    { name: 'ZigBee Gas Leakage Sensor', categoryId: officeSecurity.id, description: 'ZigBee natural gas detector. AC220V powered. 8% LEL alarm threshold. Audible + visual + push alarm. Wall or ceiling mount. FCC compliant.', descriptionAr: 'كاشف غاز طبيعي ZigBee. يعمل بتيار ٢٢٠ فولت. عتبة إنذار ٨% LEL. إنذار صوتي + بصري + إشعار.' },
    { name: 'ZigBee Water Leakage Sensor', categoryId: officeSecurity.id, description: 'ZigBee flood and leak detector. CR2032 battery. IP66 waterproof. 50mm diameter. 1+ year battery life. Instant push notification on water detection.', descriptionAr: 'كاشف تسرب ومياه ZigBee. بطارية CR2032. مقاوم للماء IP66. إشعار فوري عند اكتشاف الماء.' },
    { name: 'ZigBee SOS Button', categoryId: officeSecurity.id, description: 'Emergency call button for ZigBee systems. CR2032 battery. 100m+ open air range. One-click SOS alert to phone. Ideal for elderly or medical alert.', descriptionAr: 'زر طوارئ لأنظمة ZigBee. بطارية CR2032. مدى ١٠٠+ متر. مثالي لكبار السن والتنبيهات الطبية.' },
    { name: 'ZigBee Smart Brightness Thermometer', categoryId: officeSecurity.id, description: 'ZigBee environment monitor with temperature, humidity, and light sensor. CR2032 battery. 0-999 lux light detection. 66x66x11mm with 45x45mm screen.', descriptionAr: 'مراقب بيئة ZigBee مع حساس حرارة ورطوبة وإضاءة. بطارية CR2032. كشف إضاءة ٠-٩٩٩ لوكس.' },
    { name: 'ZigBee Human Presence Sensor', categoryId: officeSecurity.id, description: 'Ceiling-mounted presence detector with ZigBee. DC12V, ≤70mA. 0.3-9m detection distance. Adjustable sensitivity 0-9. Light sensing 0-2000 lux.', descriptionAr: 'كاشف وجود بشري مثبت على السقف. ١٢ فولت تيار مستمر. مسافة كشف ٠.٣-٩ أمتار. حساسية قابلة للتعديل.' },

    // ─── ZigBee Thermostats ───────────────────────────────────────
    { name: 'ZigBee BHT-002 Thermostat', categoryId: automation.id, description: 'ZigBee room thermostat for floor heating and boilers. 95-240V AC. 5A (water) / 16A (electric). NTC sensor. Capacitive touch, 86x86mm.', descriptionAr: 'ترموستات غرفة ZigBee للتدفئة الأرضية والغلايات. ٩٥-٢٤٠ فولت. حساس NTC. لمس سعوي.' },
    { name: 'ZigBee TRV Radiator Thermostat', categoryId: automation.id, description: 'Smart radiator valve with ZigBee. 2x AA batteries. M30x1.5 thread, ±0.5°C accuracy. Weekly scheduling. LCD display. Works with standard radiator valves.', descriptionAr: 'صمام رادياتير ذكي مع ZigBee. بطاريتين AA. دقة ±٠.٥°م. جدولة أسبوعية. شاشة LCD.' },

    // ─── ZigBee Hubs & Controllers ────────────────────────────────
    { name: 'Tuya ZigBee Wired Hub', categoryId: networking.id, description: 'ZigBee gateway for Tuya ecosystem. Micro USB DC5V/1A. Connects up to 100 ZigBee devices. Works with Alexa, Google Home, and Apple HomeKit.', descriptionAr: 'بوابة ZigBee لمنظومة Tuya. Micro USB ٥V/١A. يربط حتى ١٠٠ جهاز ZigBee. يعمل مع أليكسا وجوجل هوم.' },
    { name: 'Smart Control Panel (4-inch)', categoryId: smartHome.id, description: 'Wall-mounted touchscreen controller. 4-inch 480x480 multi-touch. WiFi + Bluetooth + ZigBee gateway built-in. 86x86mm. Controls up to 100 devices.', descriptionAr: 'لوحة تحكم تعمل باللمس مثبتة على الحائط. ٤ بوصة ٤٨٠×٤٨٠. واي فاي + بلوتوث + ZigBee مدمج.' },
    { name: 'Handheld Center Control Panel', categoryId: smartHome.id, description: 'Portable smart home controller with IR blaster. DC5V/1A. WiFi + Bluetooth + IR (38KHz, 8m range). Standby <0.5W. Controls A/C, TV, and smart devices.', descriptionAr: 'جهاز تحكم منزلي ذكي محمول مع IR. WiFi + بلوتوث + أشعة تحت حمراء. يتحكم في المكيفات والتلفزيون.' },

    // ─── ZigBee Lighting ──────────────────────────────────────────
    { name: 'ZigBee Downlight RGB 7W', categoryId: smartHome.id, description: 'ZigBee smart downlight, 7W RGB+CCT. 115mm diameter, 95mm cutout. AC100-240V. ZigBee 3.0. 690lm luminous flux. Dimmable.', descriptionAr: 'إضاءة سقف ذكية ZigBee، ٧ واط RGB+CCT. قطر ١١٥ مم. تدفق ضوئي ٦٩٠ لومن. قابلة للتعتيم.' },
    { name: 'ZigBee GU10 Smart Bulb 5W', categoryId: smartHome.id, description: 'ZigBee GU10 spot bulb, 5W. RGB + 2200-6500K CCT. Dimmable. AC90-240V. 345lm, 36° beam angle. Works with ZigBee hub.', descriptionAr: 'لمزة GU10 ذكية ZigBee، ٥ واط. RGB + ٢٢٠٠-٦٥٠٠كلفن. زاوية شعاع ٣٦°. تعمل مع hub زيجبي.' },
    { name: 'ZigBee RGB LED Strip + Controller', categoryId: smartHome.id, description: '5-meter RGB+CCT LED strip with ZigBee controller. DC12V. 5050 SMD 30 LEDs/m. Waterproof. Voice and app control. Perfect for ambient lighting.', descriptionAr: 'شريط LED بطول ٥ أمتار مع جهاز تحكم ZigBee. ١٢ فولت. مقاوم للماء. تحكم صوتي وعبر التطبيق.' },

    // ─── ZigBee Curtains & Valves ────────────────────────────────
    { name: 'ZigBee Curtain Switch', categoryId: automation.id, description: 'ZigBee curtain control switch. AC100-240V, 600W max, 2.5A. ZigBee protocol. Zero line and fire line connection. Compatible with standard curtain motors.', descriptionAr: 'مفتاح تحكم ستائر ZigBee. ١٠٠-٢٤٠ فولت، ٦٠٠ واط. متوافق مع محركات الستائر القياسية.' },
    { name: 'ZigBee Chain Blinds Motor', categoryId: automation.id, description: 'ZigBee blinds motor with battery and solar options. DC 8.4V input, solar 12V/0.3W. 0.45Nm torque. 42x33x165mm. Low noise operation.', descriptionAr: 'محرك ستائر ZigBee مع خيار بطارية وطاقة شمسية. عزم ٠.٤٥ نيوتن متر. تشغيل منخفض الضوضاء.' },
    { name: 'ZigBee Smart Valve', categoryId: automation.id, description: 'ZigBee water/gas shut-off valve actuator. 12VDC/1A adapter. 1.6MPA pressure rating. 30-60kg.cm torque. 5-10 second operation. Threaded ball valve.', descriptionAr: 'مشغل صمام إغلاق ماء/غاز ZigBee. ١٢ فولت/١ أمبير. ضغط ١.٦ ميجا باسكال. صمام كروي ملولب.' },

    // ─── Bluetooth Series ─────────────────────────────────────────
    { name: 'Bluetooth Mesh Gateway', categoryId: networking.id, description: 'Multi-protocol gateway supporting Bluetooth Mesh, WiFi 2.4GHz, and ZigBee. 5V/1A. 92x92x40mm. Bridges BLE sensors to the cloud for remote access.', descriptionAr: 'بوابة متعددة البروتوكولات تدعم Bluetooth Mesh وواي فاي وZigBee. تربط حساسات BLE بالسحابة.' },
    { name: 'Bluetooth Smart Switch', categoryId: smartHome.id, description: 'Bluetooth Mesh smart switch. 100-240V AC, 10A per gang. BLE Mesh protocol. Colors: White, Black, Gold. Works with Bluetooth gateway.', descriptionAr: 'مفتاح ذكي Bluetooth Mesh. ١٠٠-٢٤٠ فولت، ١٠ أمبير. ألوان: أبيض، أسود، ذهبي.' },
    { name: 'Bluetooth Brightness Thermometer', categoryId: officeSecurity.id, description: 'Bluetooth environment sensor. CR2032 battery. Measures temperature, humidity, and luminance 0-999 lux. 66x66x11mm with screen. Requires Bluetooth gateway.', descriptionAr: 'حساس بيئة Bluetooth. بطارية CR2032. يقيس الحرارة والرطوبة والإضاءة ٠-٩٩٩ لوكس.' },
    { name: 'Bluetooth Chain Blinds Motor', categoryId: automation.id, description: 'Bluetooth roller blinds motor. 110-240V AC with 8.4VDC backup. Solar panel compatible. 0.45Nm torque. 42x33x165mm. Bluetooth Mesh control.', descriptionAr: 'محرك ستائر دوار Bluetooth. ١١٠-٢٤٠ فولت مع بطارية احتياطية. متوافق مع الألواح الشمسية.' },
    { name: 'Bluetooth CO2 Air Quality Detector', categoryId: officeSecurity.id, description: 'Carbon dioxide monitor with Bluetooth. 5V/2A. 400-5000ppm CO2 range. Temperature and humidity display. 3 emoji air quality indicator. Requires Bluetooth gateway.', descriptionAr: 'مراقب ثاني أكسيد الكربون مع Bluetooth. نطاق CO2 ٤٠٠-٥٠٠٠ جزء في المليون. يعرض الحرارة والرطوبة.' },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: { ...product, descriptionAr: product.descriptionAr || '', price: 0, stock: 0, images: [IMAGES[product.name]] },
    });
  }

  console.log('Seeded:');
  console.log(`  - ${products.length} MOES products`);
  console.log(`  - 5 categories`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
