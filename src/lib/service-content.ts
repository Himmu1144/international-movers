// Page copy for /services/[slug]. Keep metaTitle ≤ 60 chars and metaDescription ≤ 155 chars.

type Item = { title: string; text: string };

export type ServiceContent = {
  metaTitle: string;
  metaDescription: string;
  /** H1 split so the accent word can be styled. */
  h1: [before: string, accent: string, after?: string];
  intro: string;
  overview: string[];
  included: Item[];
  steps: Item[];
  faqs: { q: string; a: string }[];
};

export const serviceContent: Record<string, ServiceContent> = {
  "household-shifting": {
    metaTitle: "Household Shifting Services in Gurgaon | Home Movers",
    metaDescription:
      "Safe household shifting in Gurgaon with careful packing, loading, transport and unpacking. Get a free survey and a fixed, written quote.",
    h1: ["Household shifting, handled with ", "care", "."],
    intro: "From a 1 BHK to a full villa — we pack, move and set up your home so you can settle in from day one.",
    overview: [
      "Moving house means moving everything you own, from heavy furniture to the glassware you only use on festivals. Our household shifting service covers all of it: a free survey, room-by-room packing, safe loading, transport and unpacking at your new home.",
      "Every item is packed to suit what it is. Furniture is wrapped and edge-protected, electronics go in padded cartons, and fragile items get multiple layers. Boxes are labelled by room so unloading is quick and nothing goes missing.",
    ],
    included: [
      { title: "Free pre-move survey", text: "We check your goods, floor access and timeline before quoting." },
      { title: "Room-by-room packing", text: "Quality cartons, bubble wrap, foam and stretch film for every item." },
      { title: "Furniture dismantling", text: "Beds, wardrobes and modular units taken apart and refitted." },
      { title: "Safe loading", text: "Heavy items secured, fragile goods kept separate in the vehicle." },
      { title: "Transit insurance", text: "Optional cover for added protection during the move." },
      { title: "Unpacking & placement", text: "Goods placed room by room, with packing waste cleared." },
    ],
    steps: [
      { title: "Survey & quote", text: "A free visit or video call, then a fixed written quote." },
      { title: "Packing day", text: "Our crew packs and labels everything room by room." },
      { title: "Loading & transport", text: "Goods loaded carefully and moved on the agreed date." },
      { title: "Delivery & setup", text: "Unloading, reassembly and placement at your new home." },
    ],
    faqs: [
      {
        q: "How much does household shifting cost in Gurgaon?",
        a: "It depends on the size of your home, quantity of goods, distance, floor level and services like dismantling or storage. We give a fixed, written quote after a free survey.",
      },
      { q: "How long does a local house move take?", a: "Most local moves within Gurgaon are completed in a single day, depending on the size of the home and building access." },
      { q: "Do you dismantle and reassemble furniture?", a: "Yes. Beds, wardrobes and modular furniture are dismantled before the move and reassembled at your new home." },
      { q: "What should I not pack with household goods?", a: "Keep cash, jewellery, important documents, passports and medicines with you during the move." },
    ],
  },

  "local-shifting": {
    metaTitle: "Local Shifting in Gurgaon | Same-Day Packers and Movers",
    metaDescription:
      "Fast, careful local shifting across Gurgaon and Delhi NCR. Professional packing, loading and same-day delivery with transparent pricing.",
    h1: ["Local shifting, done in a ", "day", "."],
    intro: "Quick, careful moves across Gurgaon and Delhi NCR — packed in the morning, settled in by evening.",
    overview: [
      "A local move should not take over your week. Our local shifting service is built for speed without cutting corners: one crew, one vehicle, and a plan that gets you from door to door the same day.",
      "We regularly move homes and offices across DLF Phases, Sohna Road, Golf Course Road, South City, Sushant Lok and all major sectors, so we know the society rules, lift timings and parking that make a move smooth.",
    ],
    included: [
      { title: "Same-day moves", text: "Most local moves are packed, moved and delivered in one day." },
      { title: "Right-sized vehicle", text: "A dedicated vehicle matched to your goods — no sharing." },
      { title: "Professional packing", text: "Proper materials for furniture, electronics and fragile items." },
      { title: "Society coordination", text: "We plan around lift bookings and entry timings." },
      { title: "Dismantling & refitting", text: "Beds, wardrobes and units taken apart and reassembled." },
      { title: "Clear pricing", text: "A fixed quote before the move — no surprises on the day." },
    ],
    steps: [
      { title: "Share your details", text: "Tell us your locations, date and what you’re moving." },
      { title: "Get a fixed quote", text: "A clear price after a quick survey or video call." },
      { title: "Pack & move", text: "Our crew packs, loads and drives to your new place." },
      { title: "Unload & settle", text: "Goods placed room by room, same day." },
    ],
    faqs: [
      { q: "Can you move me on the same day I call?", a: "Often yes, depending on crew availability. For weekends and month-end, we recommend booking a few days ahead." },
      { q: "Do you move within Delhi NCR too?", a: "Yes — we handle local moves across Gurgaon, Delhi, Noida, Faridabad and nearby areas." },
      { q: "Is packing material included in the price?", a: "Yes, packing materials are included in your quote unless you choose to pack yourself." },
      { q: "Do I need to be present during the move?", a: "We recommend that you or someone you trust is present at both packing and delivery to check the inventory." },
    ],
  },

  "domestic-relocation": {
    metaTitle: "Domestic Relocation Services from Gurgaon | Pan-India Movers",
    metaDescription:
      "Door-to-door domestic relocation from Gurgaon to any city in India. Secure packing, tracked transport and on-time delivery.",
    h1: ["Moving to a new city, ", "simplified", "."],
    intro: "Door-to-door moves from Gurgaon to any city in India — Mumbai, Bengaluru, Pune, Hyderabad, Chennai and beyond.",
    overview: [
      "Long-distance moves need stronger packing, careful loading and a reliable delivery plan. Our domestic relocation service takes care of all of it, so your goods arrive in the same condition they left.",
      "You get a single point of contact from survey to delivery, regular updates while your goods are on the road, and a delivery date you can plan around.",
    ],
    included: [
      { title: "Long-haul packing", text: "Extra layers and sturdier cartons built for long distances." },
      { title: "Dedicated or shared truck", text: "Choose a dedicated vehicle or a cost-saving shared load." },
      { title: "Transit updates", text: "Regular updates while your goods are on the way." },
      { title: "Vehicle transport", text: "Move your car or bike along with your household goods." },
      { title: "Transit insurance", text: "Optional cover for added protection over long distances." },
      { title: "Storage if needed", text: "Hold your goods safely if your new home isn’t ready." },
    ],
    steps: [
      { title: "Survey & plan", text: "We assess your goods and agree a delivery timeline." },
      { title: "Pack & load", text: "Long-haul packing and secure loading on the agreed date." },
      { title: "On the road", text: "Tracked transport with updates along the way." },
      { title: "Deliver & unpack", text: "Unloading and placement at your new home." },
    ],
    faqs: [
      { q: "How long does a domestic move take?", a: "It depends on distance. Most moves within North India take 2–4 days, and longer routes 5–8 days. We confirm a timeline in your quote." },
      { q: "Can you move my car with my household goods?", a: "Yes. We can transport cars and bikes on suitable carriers alongside your household move." },
      { q: "What if my new home isn’t ready on arrival?", a: "We can store your goods safely at our facility until you’re ready to receive them." },
      { q: "Is a dedicated truck more expensive?", a: "Usually yes, but it’s faster and your goods travel alone. A shared load is a good budget option for smaller moves." },
    ],
  },

  "international-relocation": {
    metaTitle: "International Relocation from Gurgaon | Overseas Movers",
    metaDescription:
      "International relocation from Gurgaon with export-grade packing, documentation support and sea or air freight coordination. Free survey.",
    h1: ["Moving abroad, with a ", "global", " team behind you."],
    intro: "Export-grade packing, paperwork support and freight coordination for moves to the UAE, UK, USA, Canada, Australia and more.",
    overview: [
      "Moving overseas involves more than packing. There’s customs paperwork, shipping options, destination rules and timelines that all have to line up. Our international relocation team guides you through each step.",
      "We pack your goods to export standards, help you prepare the documents, and coordinate sea or air freight so your belongings reach your new country safely.",
    ],
    included: [
      { title: "Export-grade packing", text: "Wooden crating and moisture protection for long sea voyages." },
      { title: "Documentation support", text: "Help preparing inventory lists and customs paperwork." },
      { title: "Sea or air freight", text: "Full container, shared container or air shipment options." },
      { title: "Destination coordination", text: "Delivery and unpacking arranged at the other end." },
      { title: "Marine insurance", text: "Optional cover for added protection overseas." },
      { title: "Storage before departure", text: "Store goods safely while you finalise your move date." },
    ],
    steps: [
      { title: "Consultation", text: "We understand your destination, volume and timeline." },
      { title: "Packing & paperwork", text: "Export packing, inventory and document preparation." },
      { title: "Shipping", text: "Sea or air freight booked and tracked." },
      { title: "Delivery abroad", text: "Customs clearance support and delivery to your new home." },
    ],
    faqs: [
      { q: "Which countries do you move to?", a: "We coordinate moves to most countries, including the UAE, UK, USA, Canada, Australia, Singapore and Europe." },
      { q: "Should I choose sea or air freight?", a: "Sea freight is more economical for full households. Air freight is faster and suits smaller, urgent shipments." },
      { q: "What documents do I need?", a: "Typically your passport, visa, an inventory list and destination-specific forms. Our team will guide you based on your country." },
      { q: "How long does an international move take?", a: "Air shipments can take 1–2 weeks; sea shipments usually 4–8 weeks depending on the route and customs." },
    ],
  },

  "office-relocation": {
    metaTitle: "Office Relocation Services in Gurgaon | Corporate Movers",
    metaDescription:
      "Planned office relocation in Gurgaon with IT equipment handling, workstation moves and minimal downtime. Weekend and after-hours moves.",
    h1: ["Office moves with ", "zero", " fuss."],
    intro: "Workstations, servers, files and furniture — moved on a plan built around keeping your business running.",
    overview: [
      "Every hour your office is down costs money. Our office relocation service is planned in detail before moving day: what moves when, how equipment is packed, and how your team gets back to work fastest.",
      "We can move over weekends or after hours, label everything by desk and department, and set up workstations at the new site so your team can log in on day one.",
    ],
    included: [
      { title: "Move planning", text: "A floor-by-floor plan agreed with your team in advance." },
      { title: "IT equipment care", text: "Anti-static packing for computers, servers and screens." },
      { title: "Workstation moves", text: "Desks and modular furniture dismantled and refitted." },
      { title: "File & record handling", text: "Sealed, labelled crates for documents and records." },
      { title: "Weekend & night moves", text: "Move outside working hours to avoid downtime." },
      { title: "Desk-wise labelling", text: "Everything placed back exactly where it belongs." },
    ],
    steps: [
      { title: "Site survey", text: "We visit both sites and plan the move with you." },
      { title: "Labelling & packing", text: "Desk-wise labels and safe packing for equipment." },
      { title: "Moving day", text: "A coordinated move, often over a weekend." },
      { title: "Setup", text: "Furniture refitted and workstations placed and ready." },
    ],
    faqs: [
      { q: "Can you move our office over a weekend?", a: "Yes. We regularly move offices over weekends and after hours to avoid disrupting work." },
      { q: "How do you protect computers and servers?", a: "We use anti-static wrap, padded cartons and secure crates, and keep IT equipment separate during loading." },
      { q: "Do you handle large corporate moves?", a: "Yes — from small offices with a few desks to multi-floor corporate moves, planned in phases if needed." },
      { q: "Will you reassemble workstations?", a: "Yes. Modular desks and furniture are dismantled, moved and reassembled at the new site." },
    ],
  },

  "car-bike-transport": {
    metaTitle: "Car and Bike Transport from Gurgaon | Vehicle Shifting",
    metaDescription:
      "Safe car and bike transport from Gurgaon to any city in India. Inspected, secured and carried on suitable carriers with door-to-door delivery.",
    h1: ["Your car and bike, ", "safely", " delivered."],
    intro: "Cars, bikes and scooters inspected, secured and carried door to door — anywhere in India.",
    overview: [
      "Driving your vehicle across the country adds wear, tolls and risk. Our vehicle transport service moves it for you on suitable carriers, with an inspection report at pickup and delivery.",
      "Cars travel on car carriers or in closed containers, and bikes are wrapped and fixed in place, so they arrive in the same condition they left.",
    ],
    included: [
      { title: "Pre-move inspection", text: "A condition report with photos at pickup and delivery." },
      { title: "Suitable carriers", text: "Car carriers or closed containers for extra protection." },
      { title: "Bike wrapping", text: "Multi-layer wrapping and secure fixing for two-wheelers." },
      { title: "Door-to-door service", text: "Pickup from your home and delivery to your new address." },
      { title: "Transit insurance", text: "Optional cover for added peace of mind." },
      { title: "Move with household", text: "Transport your vehicle along with your home move." },
    ],
    steps: [
      { title: "Book & quote", text: "Share vehicle details and route for a fixed quote." },
      { title: "Inspection", text: "We record the vehicle’s condition at pickup." },
      { title: "Secure transport", text: "Loaded, fixed in place and carried safely." },
      { title: "Delivery check", text: "Inspected again and handed over at your door." },
    ],
    faqs: [
      { q: "How long does car transport take?", a: "Usually 3–8 days depending on distance and route. We confirm the timeline in your quote." },
      { q: "Can I keep things inside the car?", a: "We recommend removing personal items and valuables. Only standard car accessories should stay inside." },
      { q: "Do you transport luxury cars?", a: "Yes. For high-value vehicles we recommend closed-container transport for extra protection." },
      { q: "What documents are needed?", a: "A copy of the RC, insurance and your ID. Our team will confirm anything else needed for your route." },
    ],
  },

  "packing-unpacking": {
    metaTitle: "Professional Packing and Unpacking Services in Gurgaon",
    metaDescription:
      "Professional packing and unpacking in Gurgaon with quality cartons, bubble wrap and foam. Safe packing for furniture, electronics and fragile items.",
    h1: ["Packed properly. ", "Unpacked", " for you."],
    intro: "Multi-layer packing with quality materials — and unpacking at your new place so you’re not living out of boxes.",
    overview: [
      "Most moving damage comes from poor packing. Our trained packers use the right material for every item: corrugated cartons, bubble wrap, foam sheets, edge protectors and stretch film.",
      "At your new home we unpack, place items in the right rooms and take away the packing waste — so you can settle in faster.",
    ],
    included: [
      { title: "Quality materials", text: "Corrugated cartons, bubble wrap, foam and edge guards." },
      { title: "Fragile item care", text: "Glassware, crockery and decor packed in multiple layers." },
      { title: "Electronics packing", text: "TVs, appliances and computers in padded cartons." },
      { title: "Room-wise labelling", text: "Every box marked by room and contents." },
      { title: "Unpacking & placement", text: "Items unpacked and placed where you want them." },
      { title: "Waste removal", text: "Cartons and packing waste cleared after unpacking." },
    ],
    steps: [
      { title: "Assess", text: "We check what needs packing and the materials required." },
      { title: "Pack", text: "Room-by-room packing with the right material for each item." },
      { title: "Label", text: "Clear labels so nothing gets lost." },
      { title: "Unpack", text: "Unpacking and placement at your new home." },
    ],
    faqs: [
      { q: "Can I book only packing, without moving?", a: "Yes. You can book packing or unpacking on its own, for example if you’re storing goods or using your own transport." },
      { q: "What packing materials do you use?", a: "Corrugated cartons, bubble wrap, foam sheets, edge protectors, stretch film and wooden crates where needed." },
      { q: "Do you pack kitchen items?", a: "Yes — crockery, glassware, utensils and appliances are all packed with extra care." },
      { q: "Do you take away the packing waste?", a: "Yes, we clear cartons and packing waste after unpacking." },
    ],
  },

  "storage-warehousing": {
    metaTitle: "Storage and Warehousing in Gurgaon | Secure Storage Facility",
    metaDescription:
      "Secure, monitored storage and warehousing in Gurgaon for household goods and business stock. Short and long-term storage with pickup and delivery.",
    h1: ["Secure storage, for as ", "long", " as you need."],
    intro: "Clean, monitored storage for household goods or business stock — with pickup and delivery handled by us.",
    overview: [
      "Sometimes the timing of a move doesn’t line up — your new home isn’t ready, you’re renovating, or you’re moving abroad for a while. Our own storage facility keeps your goods safe until you need them.",
      "Goods are packed, inventoried and stored in a clean, monitored warehouse. When you’re ready, we deliver them to your door, anywhere you need.",
    ],
    included: [
      { title: "Our own facility", text: "A dedicated warehouse — not a sub-let space." },
      { title: "CCTV & security", text: "Monitored premises with controlled access." },
      { title: "Clean & dry storage", text: "Protected from dust, moisture and pests." },
      { title: "Detailed inventory", text: "Every item listed so you know exactly what’s stored." },
      { title: "Flexible duration", text: "Store for a week, a month or a year." },
      { title: "Pickup & delivery", text: "We collect and deliver your goods when you’re ready." },
    ],
    steps: [
      { title: "Tell us what to store", text: "Share your goods and how long you need storage." },
      { title: "Pickup & packing", text: "We pack and collect from your home or office." },
      { title: "Inventory & storage", text: "Goods listed and stored securely in our facility." },
      { title: "Delivery on request", text: "We deliver your goods whenever you need them." },
    ],
    faqs: [
      { q: "How long can I store my goods?", a: "As long as you need — from a few days to several months or longer." },
      { q: "Is my stored property safe?", a: "Our facility is monitored by CCTV with controlled access, and every item is recorded in an inventory." },
      { q: "Can businesses store stock with you?", a: "Yes. We offer storage for business stock, records and equipment as well as household goods." },
      { q: "Can I access my goods while they’re stored?", a: "Yes, with prior notice we can arrange access or deliver selected items to you." },
    ],
  },
};
