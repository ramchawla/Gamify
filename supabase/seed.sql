-- =============================================================
-- Noma Platform — Seed Data
-- Run AFTER 01_schema.sql. RLS must be DISABLED during seed.
-- Uses fixed UUIDs so they can be safely re-run (upsert style).
-- =============================================================

-- ─── Season ───────────────────────────────────────────────────

insert into seasons (
  id, title, organizer_name, prize_description,
  rules_text, start_date, end_date, status, total_missions
) values (
  '00000000-0000-0000-0000-000000000001',
  'Noma Resorts $10K Challenge',
  'Noma Resorts',
  '$10,000 Grand Prize',
  E'**Team rules:**\n- Team size: 2–6 members\n- At least 2 people present for each challenge\n- At least one member must have stayed at Noma Resorts\n- One team per person per season\n\n**Milestone rewards:**\n- 25% complete → Swag pack\n- 50% complete → Premium swag\n- 75% complete → Cool swag\n- 100% complete → Eligible for the $10,000 grand prize',
  '2023-01-01',
  '2023-05-01',
  'ended',
  47
) on conflict (id) do nothing;

-- ─── Missions — Category A: At Home (location_tier = 1) ───────

insert into missions (id, season_id, title, description, tips, category, location_tier, difficulty, points, submission_type, has_bonus, bonus_description, display_order) values

('10000000-0000-0000-0000-000000000001',
 '00000000-0000-0000-0000-000000000001',
 'The Beginning of the Challenge STARTS HERE',
 'Fill out the entry survey to officially register your team for the $10K Challenge. This helps us track participation and cross-reference Noma bookings.',
 'Make sure the team captain provides their Noma confirmation number — you''ll need it to be eligible for the grand prize.',
 'at_home', 1, 1, 100, 'text', false, null, 10),

('10000000-0000-0000-0000-000000000002',
 '00000000-0000-0000-0000-000000000001',
 'Pass Me the Salt!',
 'Cook and eat a homemade meal together as a team. It doesn''t have to be fancy — what matters is that everyone is around the table.',
 'Take the photo at the table with the food visible. Bonus points for effort: raclette, charcuterie boards, and bake-offs are fan favorites.',
 'at_home', 1, 1, 200, 'photo', false, null, 20),

('10000000-0000-0000-0000-000000000003',
 '00000000-0000-0000-0000-000000000001',
 'Dear Johnny... JK',
 'Write a heartfelt letter to each member of your team explaining why they are important in your life. Read them aloud if you dare.',
 'Photos of the letters count — you don''t need to mail them. This mission tends to generate the most emotional submissions.',
 'at_home', 1, 2, 300, 'photo', false, null, 30),

('10000000-0000-0000-0000-000000000004',
 '00000000-0000-0000-0000-000000000001',
 'I Kinda Like You...',
 'Do one meaningful thing for another member of your team. Acts of service, quality time, gifts, words of affirmation — it all counts.',
 'Document the moment in a photo. The more specific and thoughtful the act, the better.',
 'at_home', 1, 3, 400, 'photo', false, null, 40),

('10000000-0000-0000-0000-000000000005',
 '00000000-0000-0000-0000-000000000001',
 'Ooh So Trendy',
 'Do a trending social media challenge as a team and post it with the hashtags #NomaResorts and #Noma10kChallenge.',
 'Pick something your whole team can participate in — not just the youngest member filming everyone else. Most views at season end wins a bonus.',
 'at_home', 1, 4, 500, 'photo', true, 'Most views at season end wins bonus points', 50),

('10000000-0000-0000-0000-000000000006',
 '00000000-0000-0000-0000-000000000001',
 'Book Worms',
 'Read a book together as a team — at least 100 pages. This can be read aloud, over video call, or in shared silence.',
 'Submit a text response describing what you read and what resonated. Bonus: read something you wouldn''t normally pick.',
 'at_home', 1, 5, 600, 'text', false, null, 60)

on conflict (id) do nothing;

-- ─── Missions — Category B: In Community (location_tier = 2) ──

insert into missions (id, season_id, title, description, tips, category, location_tier, difficulty, points, submission_type, has_bonus, bonus_description, display_order) values

('20000000-0000-0000-0000-000000000001',
 '00000000-0000-0000-0000-000000000001',
 'Favorite Restaurant!',
 'Go out to dinner at your favorite restaurant as a team. Enjoy good food, good company, and document the moment.',
 'Group photo at the table works perfectly. Caption should mention the restaurant name — it helps us feature community businesses.',
 'in_community', 2, 1, 300, 'photo', false, null, 110),

('20000000-0000-0000-0000-000000000002',
 '00000000-0000-0000-0000-000000000001',
 'Love is Spelled T.I.M.E.',
 'Spend a few hours together at a local park, city attraction, nature area, or anywhere that gets you out of the house.',
 'Time together is the whole point — the location matters less than the presence. Museums, botanical gardens, city walks all count.',
 'in_community', 2, 2, 400, 'photo', false, null, 120),

('20000000-0000-0000-0000-000000000003',
 '00000000-0000-0000-0000-000000000001',
 'Tryin'' New Thangs',
 'Find something new to do together as a team that you''ve never done before. Big or small — it just has to be new.',
 'The more specific your caption about what made it new, the better. First concerts, cooking classes, escape rooms, and axe throwing are all fair game.',
 'in_community', 2, 3, 500, 'photo', false, null, 130),

('20000000-0000-0000-0000-000000000004',
 '00000000-0000-0000-0000-000000000001',
 'Connect or Reconnect',
 'Either find an old friend you haven''t seen in a long time, or invite a new potential friend over for dinner or an activity.',
 'Introduce them to the challenge if they''re interested! Photo should include both your team and the guest.',
 'in_community', 2, 4, 600, 'photo', false, null, 140),

('20000000-0000-0000-0000-000000000005',
 '00000000-0000-0000-0000-000000000001',
 'Let''s Help Someone in Need',
 'As a team, go perform a service of some kind for another person or group of people in your community.',
 'Service can be anything — yard work for an elderly neighbor, volunteering at a food bank, organizing a donation drive. Most influential project at season end wins a bonus.',
 'in_community', 2, 5, 700, 'photo', true, 'Most influential community service project wins bonus points', 150)

on conflict (id) do nothing;

-- ─── Missions — Category C: Near Yosemite (location_tier = 3) ─

insert into missions (id, season_id, title, description, tips, category, location_tier, difficulty, points, submission_type, has_bonus, bonus_description, display_order) values

('30000000-0000-0000-0000-000000000001',
 '00000000-0000-0000-0000-000000000001',
 'Winter in Yosemite',
 'Take a stunning picture of anything in the Yosemite National Park area. Winter light, snow-covered pines, Half Dome at dawn — capture the magic.',
 'The Tunnel View pullout at sunset and Bridalveil Fall in winter are among the most photogenic spots. Best photo at season end wins a bonus.',
 'near_yosemite', 3, 1, 400, 'photo', true, 'Best photo wins bonus points', 210),

('30000000-0000-0000-0000-000000000002',
 '00000000-0000-0000-0000-000000000001',
 'Oakhurst Exploration',
 'Explore the beautiful city of Oakhurst! Find something fun to do there as a team — it''s a great gateway town to Yosemite.',
 'The Fresno Flats Historical Park and Oakhurst Community Park are great starting points. Check out local shops and restaurants on Road 426.',
 'near_yosemite', 3, 2, 500, 'photo', false, null, 220),

('30000000-0000-0000-0000-000000000003',
 '00000000-0000-0000-0000-000000000001',
 'ICE SKATING!!',
 'Go ice skating at the beautiful Curry Village ice rink inside Yosemite National Park. You won''t regret your time there.',
 'The rink is seasonal (typically Nov–Mar). Book ahead — it fills up on weekends. Entry fee applies. Skate rentals available on site.',
 'near_yosemite', 3, 3, 600, 'photo', false, null, 230),

('30000000-0000-0000-0000-000000000004',
 '00000000-0000-0000-0000-000000000001',
 'Snow Tubing!',
 'Go snow tubing or sledding on Big Oak Flat Road. It''s a free place to go and lots of fun for all ages.',
 'Check road conditions before going — Hwy 120 (Big Oak Flat) can close in heavy snow. Pull-offs near the Crane Flat junction work well.',
 'near_yosemite', 3, 4, 700, 'photo', false, null, 240),

('30000000-0000-0000-0000-000000000005',
 '00000000-0000-0000-0000-000000000001',
 'Ice Walkers',
 'Go snow shoeing or cross country skiing in the Mariposa Grove! It''s absolutely beautiful there. The way the snow sparkles in the sunlight is something else.',
 'Mariposa Grove is accessible from the south entrance via Hwy 41. Snowshoe rentals available in Yosemite Valley. The grove sequoias under snow are unforgettable.',
 'near_yosemite', 3, 5, 800, 'photo', false, null, 250)

on conflict (id) do nothing;

-- ─── Missions — Category D: Sierra Byway (location_tier = 4) ─

insert into missions (id, season_id, title, description, tips, category, location_tier, difficulty, points, submission_type, has_bonus, bonus_description, display_order) values

('40000000-0000-0000-0000-000000000001',
 '00000000-0000-0000-0000-000000000001',
 'Street Cred',
 'Visit the very center of California. It''s honestly not as cool as it sounds... a little. But it''s worth the story.',
 'The geographic center of California is near the town of North Fork. There''s a marker on Road 225. Great for a quick detour on the way to Noma.',
 'sierra_byway', 4, 1, 500, 'photo', false, null, 310),

('40000000-0000-0000-0000-000000000002',
 '00000000-0000-0000-0000-000000000001',
 'Supporting North Fork Businesses',
 'Visit any store in North Fork and buy something. There are lots of great stores and it helps support this wonderful small community.',
 'North Fork has charming local shops along Road 274. The local market and craft stores are worth a browse. Every purchase supports the town.',
 'sierra_byway', 4, 2, 600, 'photo', false, null, 320),

('40000000-0000-0000-0000-000000000003',
 '00000000-0000-0000-0000-000000000001',
 'Join the Mile-High Club!',
 'Oh come on... dirty, dirty people... We just mean visit the Mile High Vista on the Sierra Scenic Byway. The views are spectacular.',
 'The Mile High Vista point is on Road 222 (Sierra Scenic Byway). Elevation ~5,200ft. Best visited on a clear day — views stretch to the Central Valley.',
 'sierra_byway', 4, 3, 700, 'photo', false, null, 330),

('40000000-0000-0000-0000-000000000004',
 '00000000-0000-0000-0000-000000000001',
 'Mammoth Pool Reservoir',
 'Visit Mammoth Pool Reservoir. It''s great for many activities plus it''s stunning. We won''t tell you too much — go discover it yourself.',
 'Access via Road 225 / Minarets Rd. The road gets narrow — passenger cars are fine but check conditions in winter. Worth every mile.',
 'sierra_byway', 4, 4, 800, 'photo', false, null, 340),

('40000000-0000-0000-0000-000000000005',
 '00000000-0000-0000-0000-000000000001',
 'Snowmen EVERYWHERE',
 'Build a snowman somewhere along the Bass Lake-Beasore Road forest. Get creative with location and design.',
 'The Bass Lake-Beasore Road through the Sierra National Forest has great snow spots in winter. The more creative the snowman placement, the better.',
 'sierra_byway', 4, 5, 900, 'photo', false, null, 350)

on conflict (id) do nothing;

-- ─── Missions — Category E: Noma Property (location_tier = 5) ─

insert into missions (id, season_id, title, description, tips, category, location_tier, difficulty, points, submission_type, has_bonus, bonus_description, display_order, is_hidden_treasure) values

('50000000-0000-0000-0000-000000000001',
 '00000000-0000-0000-0000-000000000001',
 'Rest in Peace',
 'Hmm maybe that came out a little dark? I mean literally just sleep really peacefully for one night at Noma Resorts. Check in and check out.',
 'Your booking confirmation number is your verification. Submit your check-in confirmation or a photo at the Noma entrance.',
 'noma_property', 5, 1, 600, 'location', false, null, 410, false),

('50000000-0000-0000-0000-000000000002',
 '00000000-0000-0000-0000-000000000001',
 'Insta Famous',
 'Take a picture by the Noma Black Classic Pickup Truck and share that picture on social media with #NomaResorts and a caption.',
 'The iconic black Noma pickup is usually parked near the main entrance. Tag @NomaResorts in your post if you can.',
 'noma_property', 5, 1, 700, 'photo', false, null, 420, false),

('50000000-0000-0000-0000-000000000003',
 '00000000-0000-0000-0000-000000000001',
 'Sunrise Pond',
 'Visit Sunrise Pond at Noma. It''s just really pretty! We fish in it, swim in it, eat by it, and now we want you to visit it.',
 'Sunrise Pond is a short walk from most of the rental domes. Best visited at sunrise (obviously) or golden hour.',
 'noma_property', 5, 1, 700, 'photo', false, null, 430, false),

('50000000-0000-0000-0000-000000000004',
 '00000000-0000-0000-0000-000000000001',
 'Breaking Bread Together',
 'We''d be remised if we didn''t have an eating challenge while you''re staying at Noma. Eat a meal together as a team at the property.',
 'The outdoor fire pit area near Timber Pond makes for a great meal setting. Bring your own food or use the rental kitchen.',
 'noma_property', 5, 1, 700, 'photo', false, null, 440, false),

('50000000-0000-0000-0000-000000000005',
 '00000000-0000-0000-0000-000000000001',
 'The Apple Orchard',
 'Get lost in the apple orchard at Noma! It''s just a cool thing to do. It''s really big and really beautiful.',
 'The orchard is northwest of the main pond. Best in spring when trees are blooming, but the winter structure is beautiful too.',
 'noma_property', 5, 1, 700, 'photo', false, null, 450, false),

('50000000-0000-0000-0000-000000000006',
 '00000000-0000-0000-0000-000000000001',
 'Origin Story',
 'Share a pic of your team at Noma and share it on social media with the hashtags #Noma10kChallenge and #NomaResorts. Tell your followers what you''re up to.',
 'Group photo in front of the property entrance or main barn works great. The more your caption explains the challenge, the more friends might join!',
 'noma_property', 5, 1, 700, 'photo', false, null, 460, false),

('50000000-0000-0000-0000-000000000007',
 '00000000-0000-0000-0000-000000000001',
 'Find Your Inner Peace',
 'Stand barefoot in snow on the Noma property for 2 minutes straight. I know it sounds intense — it''s deeply clarifying.',
 'Gravel lot near Timber Pond usually has snow in winter. Have a teammate time you and document the moment.',
 'noma_property', 5, 2, 800, 'photo', false, null, 470, false),

('50000000-0000-0000-0000-000000000008',
 '00000000-0000-0000-0000-000000000001',
 'Ice Fishing',
 'So this one is a little misleading — it''s not fishing for fish in icy water. It''s finding ice along Ross Creek or one of the ponds.',
 'Ross Creek runs along the northwest edge of the property. The ponds freeze in hard winters. Submit a photo of the ice you find.',
 'noma_property', 5, 2, 800, 'photo', false, null, 480, false),

('50000000-0000-0000-0000-000000000009',
 '00000000-0000-0000-0000-000000000001',
 'Stargazing',
 'Find the Big Dipper during your stay at Noma. You won''t BELIEVE the stargazing conditions there — zero light pollution.',
 'Best after 10pm on clear nights. The gravel area east of the barn has the clearest sightlines. Bring a blanket.',
 'noma_property', 5, 2, 800, 'photo', false, null, 490, false),

('50000000-0000-0000-0000-000000000010',
 '00000000-0000-0000-0000-000000000001',
 'Just Warming Up',
 'Enjoy sitting by a fireplace or gas fire pit at Noma! One of the best parts of camp life — warmth, conversation, and stillness.',
 'Most rental units have indoor fireplaces. The outdoor fire pits near Timber Pond are community spaces — first come, first served.',
 'noma_property', 5, 2, 800, 'photo', false, null, 500, false),

('50000000-0000-0000-0000-000000000011',
 '00000000-0000-0000-0000-000000000001',
 'A Dose of Inspiration',
 'Read, ponder, or discuss a spiritual or inspirational text, quote, or book at Noma. There''s no wrong answer — just be intentional.',
 'Write about what you read or discussed in the text submission. Share what resonated and why.',
 'noma_property', 5, 2, 800, 'text', false, null, 510, false),

('50000000-0000-0000-0000-000000000012',
 '00000000-0000-0000-0000-000000000001',
 'Game Time!',
 'Play a game with your team at the Noma property in your rental unit or on the property grounds.',
 'Board games, card games, bocce ball, horseshoes — anything counts. Photo should show the game in action.',
 'noma_property', 5, 2, 800, 'photo', false, null, 520, false),

('50000000-0000-0000-0000-000000000013',
 '00000000-0000-0000-0000-000000000001',
 'God, Nature, the Universe',
 'Each of you on the team — take 10 minutes alone to pray, meditate, or just ponder life in the Noma forest.',
 'Write about your experience in the text response. What did you think about? What did you hear, feel, notice?',
 'noma_property', 5, 3, 900, 'text', false, null, 530, false),

('50000000-0000-0000-0000-000000000014',
 '00000000-0000-0000-0000-000000000001',
 'A Walk Through Nature',
 'Walk the trail from Sunrise Pond to Emerald Pond, through the trees and back to the Domes.',
 'The full loop is about 30-40 minutes at a leisurely pace. Bring layers — shade pockets stay cold in winter.',
 'noma_property', 5, 3, 900, 'photo', false, null, 540, false),

('50000000-0000-0000-0000-000000000015',
 '00000000-0000-0000-0000-000000000001',
 'The Lone Chimney',
 'Find the Lone Chimney on the Noma property. Can you believe it used to be a full building? Now it''s just a chimney standing alone in the forest.',
 'The Lone Chimney is in the forested section northeast of the main pond. Keep your eyes open on the trail — it snuck up on us the first time too.',
 'noma_property', 5, 3, 900, 'photo', false, null, 550, false),

('50000000-0000-0000-0000-000000000016',
 '00000000-0000-0000-0000-000000000001',
 'A Good Ol'' Fashioned Pioneer Competition',
 'Play "Stick Pull" in the barn! The way it works: two people sit on the ground facing each other, feet touching, both holding a stick between them. First to pull the other off the ground wins.',
 'The main barn on the property is typically open to guests. Set up on the hay bales. Best of three rounds.',
 'noma_property', 5, 3, 900, 'photo', false, null, 560, false),

('50000000-0000-0000-0000-000000000017',
 '00000000-0000-0000-0000-000000000001',
 'Hidden Falls',
 'Hike to Hidden Falls on the Noma property. It''s a short hike and is doable for all fitness levels.',
 'Ask the Noma team for the trailhead location — it''s not marked on public maps. About 20 minutes each way. Waterproof shoes recommended.',
 'noma_property', 5, 3, 900, 'photo', false, null, 570, false),

('50000000-0000-0000-0000-000000000018',
 '00000000-0000-0000-0000-000000000001',
 'No Phone Zone',
 'During one day at Noma, use 30 minutes or less of screen time on your phone. I know it''s hard. That''s the point.',
 'Screenshot your screen time report at the end of the day (Settings → Screen Time on iOS). The photo IS the proof.',
 'noma_property', 5, 4, 1000, 'photo', false, null, 580, false),

('50000000-0000-0000-0000-000000000019',
 '00000000-0000-0000-0000-000000000001',
 'Skippy Skippy',
 'Skip a rock on one of the Noma ponds for 6 or more skips. Take a video of this — we''ll be skeptical otherwise.',
 'Timber Pond has calm sections ideal for skipping. Flat, thin rocks work best. Video submission captures the skip count clearly.',
 'noma_property', 5, 4, 1000, 'photo', false, null, 590, false),

('50000000-0000-0000-0000-000000000020',
 '00000000-0000-0000-0000-000000000001',
 'What a Sunrise',
 'Watch the Sunrise from the Noma Property. It''s beautiful! Take your best shot.',
 'East-facing spots near Emerald Pond have the clearest sunrise sightlines. Set an alarm — it''s worth it. Best sunrise photo wins a bonus.',
 'noma_property', 5, 4, 1000, 'photo', true, 'Best sunrise photo wins bonus points', 600, false),

('50000000-0000-0000-0000-000000000021',
 '00000000-0000-0000-0000-000000000001',
 'Look Ma! It''s a Waterfall!',
 'Get pictures of all 3 waterfalls on the Noma property. They''re not the biggest waterfalls — but they''re ours.',
 'All three are accessible by trail. Ask at check-in for the map. Hidden Falls, the creek fall near the barn, and the small cascade by Emerald Pond.',
 'noma_property', 5, 4, 1000, 'photo', false, null, 610, false),

('50000000-0000-0000-0000-000000000022',
 '00000000-0000-0000-0000-000000000001',
 'Run Forest Run',
 'Run the Noma 5K Loop. Yes, pun intended. If you know, you know. Anyway — run or jog the marked trail around the property.',
 'The 5K loop is marked with orange trail blazes. Roughly 3.1 miles. Best in the morning before the property gets busy.',
 'noma_property', 5, 5, 1100, 'photo', false, null, 620, false),

('50000000-0000-0000-0000-000000000023',
 '00000000-0000-0000-0000-000000000001',
 'Team Planning Time!',
 'Sit down as a team and create a goal and some plans to keep getting more connected going forward. Write it down.',
 'Submit a text response with your team''s shared goal. Be specific — "spend more time together" is less powerful than "Sunday dinners twice a month."',
 'noma_property', 5, 5, 1100, 'text', false, null, 630, false),

('50000000-0000-0000-0000-000000000024',
 '00000000-0000-0000-0000-000000000001',
 'Did Somebody Say Snow Angel?!',
 'Make a snow angel in a creative place on the Noma property. Take a picture or video of this masterpiece.',
 'The gravel lot by Timber Pond is the classic spot. But the orchard, the barn lawn, or the trail clearing all work. Creative placement = more memorable.',
 'noma_property', 5, 5, 1100, 'photo', false, null, 640, false),

('50000000-0000-0000-0000-000000000025',
 '00000000-0000-0000-0000-000000000001',
 'Hidden Treasure!',
 'Find the Golden Egg hidden somewhere in the Apple Orchard! This isn''t an easy challenge. The egg is small, the orchard is big. Good luck.',
 'The Golden Egg location rotates. Ask the Noma team if it''s currently hidden before you start your search. Finding it is worth 2,000 points.',
 'noma_property', 5, 5, 2000, 'photo', false, null, 650, true),

('50000000-0000-0000-0000-000000000026',
 '00000000-0000-0000-0000-000000000001',
 'Renew and Reconnect Recap',
 'Someone on your team submits a video of themselves explaining how participating in the Noma 10K Challenge helped you Renew and Reconnect.',
 'Keep it authentic — 1 to 3 minutes is ideal. Share on social media with #Noma10kChallenge and #NomaResorts for a bonus.',
 'noma_property', 5, 5, 1100, 'video', true, 'Share on social media for bonus points', 660, false)

on conflict (id) do nothing;

-- ─── Update season total_missions count ───────────────────────
update seasons
set total_missions = (
  select count(*) from missions
  where season_id = '00000000-0000-0000-0000-000000000001'
)
where id = '00000000-0000-0000-0000-000000000001';

-- ─── Teams (from GooseChase leaderboard screenshot) ───────────

insert into teams (id, season_id, name, captain_email, booking_number, join_code, total_points) values
('a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'swiftest to 10k',           'swift@example.com',   'NOMA-2023-001', 'SWIFT1', 0),
('a0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Leyva Flava',               'leyva@example.com',   'NOMA-2023-002', 'LEYVA1', 0),
('a0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'AK Moosen',                 'akm@example.com',     'NOMA-2023-003', 'AKMO01', 0),
('a0000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'Smith Clan',                'smith@example.com',   'NOMA-2023-004', 'SMITH1', 0),
('a0000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', 'quinnandkaralineandclan',   'quinn@example.com',   'NOMA-2023-005', 'QUINN1', 0),
('a0000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000001', 'Spoer Bears',               'spoer@example.com',   'NOMA-2023-006', 'SPOER1', 0),
('a0000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000001', 'Team Murph',                'murph@example.com',   'NOMA-2023-007', 'MURPH1', 0),
('a0000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000001', 'SSRACER',                   'ssracer@example.com', 'NOMA-2023-008', 'SSRAC1', 0)
on conflict (id) do nothing;

-- ─── Team Members (representative seed) ───────────────────────

insert into team_members (id, team_id, display_name, email, role) values
-- Leyva Flava (the demo team)
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'Ana Leyva',   'leyva@example.com',  'captain'),
('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'Ryen Leyva',  'ryen@example.com',   'member'),
('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 'Cassie L.',   'cassie@example.com', 'member'),
('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002', 'Atlas L.',    null,                 'member'),
-- swiftest to 10k
('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'Swift Captain', 'swift@example.com', 'captain')
on conflict (id) do nothing;

-- ─── Seed Submissions for Leyva Flava (demo team) ─────────────
-- Matches the 4 submissions visible in GooseChase profile screenshot

insert into submissions (id, mission_id, team_id, member_id, status, text_response, caption, points_awarded, submitted_at) values

-- Survey to Enter (text)
('c0000000-0000-0000-0000-000000000001',
 '10000000-0000-0000-0000-000000000001',
 'a0000000-0000-0000-0000-000000000002',
 'b0000000-0000-0000-0000-000000000001',
 'submitted',
 'Team Leyva Flava — booking NOMA-2023-002. Captain: Ana Leyva. We are so excited for this challenge!',
 null, 100,
 '2023-01-01 18:00:00+00'),

-- Pass Me the Salt (photo — meal together)
('c0000000-0000-0000-0000-000000000002',
 '10000000-0000-0000-0000-000000000002',
 'a0000000-0000-0000-0000-000000000002',
 'b0000000-0000-0000-0000-000000000001',
 'submitted',
 null,
 'An evening of raclette. Cooking dinner together...dogs included.',
 200,
 '2023-01-03 20:30:00+00'),

-- I Kinda Like You (text — honey-do list)
('c0000000-0000-0000-0000-000000000003',
 '10000000-0000-0000-0000-000000000004',
 'a0000000-0000-0000-0000-000000000002',
 'b0000000-0000-0000-0000-000000000002',
 'submitted',
 'For this challenge Ryen and Atlas worked on the honey-do list for Cassie. They updated some things around the house and spent quality time together. Although Cassie is grateful for their handy work, it was even sweeter seeing Atlas (2yo) love being so helpful with dad!',
 null, 400,
 '2023-01-05 14:00:00+00'),

-- Ooh So Trendy (photo — christmas drop challenge)
('c0000000-0000-0000-0000-000000000004',
 '10000000-0000-0000-0000-000000000005',
 'a0000000-0000-0000-0000-000000000002',
 'b0000000-0000-0000-0000-000000000001',
 'submitted',
 null,
 'Christmas drop challenge done!',
 500,
 '2023-01-07 16:00:00+00')

on conflict (id) do nothing;

-- seed submission for swiftest to 10k (enough missions to justify 3700 pts)
-- 3700 = entry(100) + multiple high-value missions
-- We won't seed all of them — just enough for feed variety

insert into submissions (id, mission_id, team_id, member_id, status, caption, points_awarded, submitted_at) values
('c0000000-0000-0000-0000-000000000005',
 '20000000-0000-0000-0000-000000000002',
 'a0000000-0000-0000-0000-000000000001',
 'b0000000-0000-0000-0000-000000000005',
 'submitted',
 'Checked out a new museum and it was AMAZING!!',
 400,
 '2023-01-04 15:00:00+00')
on conflict (id) do nothing;

-- Leyva Flava — one additional food submission for feed variety
insert into submissions (id, mission_id, team_id, member_id, status, caption, points_awarded, submitted_at) values
('c0000000-0000-0000-0000-000000000006',
 '10000000-0000-0000-0000-000000000003',
 'a0000000-0000-0000-0000-000000000002',
 'b0000000-0000-0000-0000-000000000003',
 'submitted',
 'Dear Johnny... JK letter read aloud',
 300,
 '2023-01-02 19:00:00+00')
on conflict (id) do nothing;

-- ─── Seed Wrapped for Leyva Flava ─────────────────────────────

insert into wrapped (
  id, season_id, team_id, final_rank, total_points,
  missions_completed, top_category, cards_json, narrative_copy
) values (
  'd0000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000002',
  2, 1200, 4, 'at_home',
  '[
    {"card_num":1,"type":"intro","data":{"headline":"Your season is complete.","rank":2,"total_teams":8,"team_name":"Leyva Flava"}},
    {"card_num":2,"type":"stats","data":{"points":1200,"missions":4,"total_missions":47,"days":90,"top_category":"At Home"}},
    {"card_num":3,"type":"best_moment","data":{"mission_title":"Love is spelled T.I.M.E.","caption":"Checked out a new museum and it was AMAZING!!","points":400}},
    {"card_num":4,"type":"labels","data":{"labels":["Memory Maker","Bonding Champion","Rising Explorer"]}},
    {"card_num":5,"type":"share","data":{"tagline":"Renew. Reconnect. Remember.","points":1200,"rank":2}}
  ]'::jsonb,
  'Leyva Flava showed up for each other. Four missions completed, 1,200 points earned, and a season''s worth of memories made. You finished 2nd — and the gap to first only means there''s more adventure ahead.'
) on conflict (id) do nothing;
