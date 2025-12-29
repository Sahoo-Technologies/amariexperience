import React from 'react';

const FAQ: React.FC = () => {
  const faqText = `Planning a Destination Wedding in Kenya (and Everything Around It)
Amari is a destination wedding platform — first and foremost.
We’re built to support couples, planners, and families planning weddings in Kenya, while also making it easier to organise the celebrations and experiences that naturally surround them.
This guide covers the essentials for planning a destination wedding in Kenya, plus helpful information for proposals, receptions, bachelor and bachelorette parties, vow renewals, honeymoons, anniversaries, and guest travel.
For personalised questions, Amari’s built-in AI is available to guide you further.
💍 Weddings in Kenya – Legal & Symbolic Options
Kenya legally recognises marriages involving foreign nationals, provided official requirements are met.
Couples may choose:
A legal marriage in Kenya, or
A symbolic ceremony in Kenya, with legal formalities completed elsewhere
Amari does not process legal marriages or paperwork. We provide information and connect you with experienced planners, venues, and vendors.
📄 Legal marriage basics (at a glance)
Legal marriages may require:
Valid passports
Birth certificates
Proof of marital status
Passport-size photographs
Compliance with notice periods and registration timelines
Requirements vary by nationality and ceremony type. Always confirm through official government sources.
💒 Symbolic ceremonies & wedding events
Symbolic ceremonies are common for destination weddings and allow flexibility in location and format.
Important:
Even symbolic weddings and related events may require event permits, depending on location.
Hotels & private venues: approvals are usually handled by the venue
Public beaches, parks, conservancies: permits may be required
Amari does not obtain permits but connects you with professionals familiar with local requirements.
🎉 Beyond the wedding day
While weddings are our core focus, Amari also supports planning for:
Proposals
Welcome dinners & receptions
Bachelor & bachelorette parties
Vow renewals & anniversaries
Honeymoons
Guest travel, tours, and experiences
These events usually don’t require personal legal documentation but may still involve venue or location approvals.
✈️ Travel & entry for couples and guests
Most visitors to Kenya require an official e-Travel Authorisation (eTA) prior to arrival, depending on nationality.
Guests planning safaris, tours, or extended stays should check official immigration guidance before travel.
👗 What to wear in Kenya
For weddings & events
Formalwear is welcome and widely worn
Light, breathable fabrics are ideal for coastal climates
Beachwear is appropriate at resorts and beaches
For travel & excursions
Modest dress is recommended in towns and cultural sites
Comfortable shoes for safaris and walking
Light layers for cooler evenings inland
🛡️ Safety & general guidance
Kenya is an established destination for international weddings and tourism.
General tips:
Use licensed transport and guides
Secure valuables
Respect local laws and customs
Exercise caution when moving around cities at night
🔗 Official Government & Travel Resources
For accurate and up-to-date information:
Kenya eCitizen – Marriage & Civil Services:
https://oag.ecitizen.go.ke/
Department of Immigration Services (Visas & Entry):
https://immigration.go.ke/
Kenya eTA Portal:
https://etakenya.go.ke/
Official Tourism Information – Magical Kenya:
https://www.magicalkenya.com/
Amari may link to these resources for convenience but is not affiliated with government agencies.
🤝 What Amari Does (and Doesn’t Do)
Amari does:
Focus on destination weddings in Kenya
Connect couples, planners, and families with venues, vendors, and experience providers
Share general planning information
Offer AI-powered guidance to explore options
Amari does not:
Apply for visas, permits, or licenses
Register marriages or events
Act as a planner, agent, or tour operator
All legal, contractual, and logistical responsibilities remain with users and their chosen service providers.
✨ Final Note
Amari is built for destination weddings — and everything that makes them unforgettable. This the FAQ page`;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <span className="text-amari-500 font-bold uppercase tracking-widest text-xs mb-3 block">FAQ</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-amari-900">FAQ</h2>
      </div>

      <section className="bg-white rounded-3xl shadow-sm border border-amari-100 p-8">
        <div className="whitespace-pre-wrap text-stone-600 leading-relaxed text-base md:text-lg font-light">
          {faqText}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
