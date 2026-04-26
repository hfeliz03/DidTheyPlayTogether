import type { Player } from '../types';
import headshotIds from './headshotIds.json';

type PlayerSeed = Omit<Player, 'imageUrl'> & {
  imageUrl?: string;
};

const headshot = (id: number) => `https://cdn.nba.com/headshots/nba/latest/1040x760/${id}.png`;

const withImage = (player: PlayerSeed): Player => ({
  ...player,
  imageUrl: player.imageUrl ?? headshot(headshotIds[player.name as keyof typeof headshotIds]),
});

const corePlayers: PlayerSeed[] = [
  {
    slug: 'lebron-james',
    name: 'LeBron James',
    starPower: 10,
    dataProfile: 'historical',
    teams: [
      { team: 'Cleveland Cavaliers', seasons: ['2003-04', '2004-05', '2005-06', '2006-07', '2007-08', '2008-09', '2009-10', '2014-15', '2015-16', '2016-17', '2017-18'] },
      { team: 'Miami Heat', seasons: ['2010-11', '2011-12', '2012-13', '2013-14'] },
      { team: 'Los Angeles Lakers', seasons: ['2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24'] },
    ],
  },
  {
    slug: 'kyrie-irving',
    name: 'Kyrie Irving',
    starPower: 9,
    dataProfile: 'historical',
    teams: [
      { team: 'Cleveland Cavaliers', seasons: ['2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17'] },
      { team: 'Boston Celtics', seasons: ['2017-18', '2018-19'] },
      { team: 'Brooklyn Nets', seasons: ['2019-20', '2020-21', '2021-22', '2022-23'] },
      { team: 'Dallas Mavericks', seasons: ['2022-23', '2023-24'] },
    ],
  },
  {
    slug: 'kevin-durant',
    name: 'Kevin Durant',
    starPower: 10,
    dataProfile: 'historical',
    teams: [
      { team: 'Seattle SuperSonics', seasons: ['2007-08'] },
      { team: 'Oklahoma City Thunder', seasons: ['2008-09', '2009-10', '2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16'] },
      { team: 'Golden State Warriors', seasons: ['2016-17', '2017-18', '2018-19'] },
      { team: 'Brooklyn Nets', seasons: ['2020-21', '2021-22', '2022-23'] },
      { team: 'Phoenix Suns', seasons: ['2022-23', '2023-24'] },
    ],
  },
  {
    slug: 'stephen-curry',
    name: 'Stephen Curry',
    starPower: 10,
    dataProfile: 'historical',
    teams: [{ team: 'Golden State Warriors', seasons: ['2009-10', '2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24'] }],
  },
  { slug: 'klay-thompson', name: 'Klay Thompson', starPower: 8, dataProfile: 'historical', teams: [{ team: 'Golden State Warriors', seasons: ['2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24'] }] },
  { slug: 'draymond-green', name: 'Draymond Green', starPower: 8, dataProfile: 'historical', teams: [{ team: 'Golden State Warriors', seasons: ['2012-13', '2013-14', '2014-15', '2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24'] }] },
  { slug: 'james-harden', name: 'James Harden', starPower: 9, dataProfile: 'historical', teams: [{ team: 'Oklahoma City Thunder', seasons: ['2009-10', '2010-11', '2011-12'] }, { team: 'Houston Rockets', seasons: ['2012-13', '2013-14', '2014-15', '2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21'] }, { team: 'Brooklyn Nets', seasons: ['2020-21', '2021-22'] }, { team: 'Philadelphia 76ers', seasons: ['2021-22', '2022-23'] }, { team: 'LA Clippers', seasons: ['2023-24'] }] },
  { slug: 'russell-westbrook', name: 'Russell Westbrook', starPower: 9, dataProfile: 'historical', teams: [{ team: 'Oklahoma City Thunder', seasons: ['2008-09', '2009-10', '2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17', '2017-18', '2018-19'] }, { team: 'Houston Rockets', seasons: ['2019-20'] }, { team: 'Washington Wizards', seasons: ['2020-21'] }, { team: 'Los Angeles Lakers', seasons: ['2021-22', '2022-23'] }, { team: 'LA Clippers', seasons: ['2022-23', '2023-24'] }] },
  { slug: 'chris-paul', name: 'Chris Paul', starPower: 9, dataProfile: 'historical', teams: [{ team: 'New Orleans Hornets', seasons: ['2005-06', '2006-07', '2007-08', '2008-09', '2009-10', '2010-11'] }, { team: 'Los Angeles Clippers', seasons: ['2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17'] }, { team: 'Houston Rockets', seasons: ['2017-18', '2018-19'] }, { team: 'Oklahoma City Thunder', seasons: ['2019-20'] }, { team: 'Phoenix Suns', seasons: ['2020-21', '2021-22', '2022-23'] }, { team: 'Golden State Warriors', seasons: ['2023-24'] }] },
  { slug: 'derrick-rose', name: 'Derrick Rose', starPower: 8, dataProfile: 'historical', teams: [{ team: 'Chicago Bulls', seasons: ['2008-09', '2009-10', '2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16'] }, { team: 'New York Knicks', seasons: ['2016-17', '2021-22', '2022-23'] }, { team: 'Cleveland Cavaliers', seasons: ['2017-18'] }, { team: 'Minnesota Timberwolves', seasons: ['2018-19'] }, { team: 'Detroit Pistons', seasons: ['2019-20', '2020-21'] }, { team: 'Memphis Grizzlies', seasons: ['2023-24'] }] },
  { slug: 'ja-morant', name: 'Ja Morant', starPower: 8, dataProfile: 'historical', teams: [{ team: 'Memphis Grizzlies', seasons: ['2019-20', '2020-21', '2021-22', '2022-23', '2023-24'] }] },
  { slug: 'anthony-davis', name: 'Anthony Davis', starPower: 9, dataProfile: 'historical', teams: [{ team: 'New Orleans Hornets', seasons: ['2012-13'] }, { team: 'New Orleans Pelicans', seasons: ['2013-14', '2014-15', '2015-16', '2016-17', '2017-18', '2018-19'] }, { team: 'Los Angeles Lakers', seasons: ['2019-20', '2020-21', '2021-22', '2022-23', '2023-24'] }] },
  { slug: 'damian-lillard', name: 'Damian Lillard', starPower: 9, dataProfile: 'historical', teams: [{ team: 'Portland Trail Blazers', seasons: ['2012-13', '2013-14', '2014-15', '2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23'] }, { team: 'Milwaukee Bucks', seasons: ['2023-24'] }] },
  { slug: 'giannis-antetokounmpo', name: 'Giannis Antetokounmpo', starPower: 10, dataProfile: 'historical', teams: [{ team: 'Milwaukee Bucks', seasons: ['2013-14', '2014-15', '2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24'] }] },
  { slug: 'jayson-tatum', name: 'Jayson Tatum', starPower: 9, dataProfile: 'historical', teams: [{ team: 'Boston Celtics', seasons: ['2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24'] }] },
  { slug: 'jaylen-brown', name: 'Jaylen Brown', starPower: 8, dataProfile: 'historical', teams: [{ team: 'Boston Celtics', seasons: ['2016-17', '2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24'] }] },
  { slug: 'luka-doncic', name: 'Luka Doncic', starPower: 10, dataProfile: 'historical', teams: [{ team: 'Dallas Mavericks', seasons: ['2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24'] }] },
  { slug: 'nikola-jokic', name: 'Nikola Jokic', starPower: 10, dataProfile: 'historical', teams: [{ team: 'Denver Nuggets', seasons: ['2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24'] }] },
  { slug: 'jimmy-butler', name: 'Jimmy Butler', starPower: 9, dataProfile: 'historical', teams: [{ team: 'Chicago Bulls', seasons: ['2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17'] }, { team: 'Minnesota Timberwolves', seasons: ['2017-18', '2018-19'] }, { team: 'Philadelphia 76ers', seasons: ['2018-19'] }, { team: 'Miami Heat', seasons: ['2019-20', '2020-21', '2021-22', '2022-23', '2023-24'] }] },
  { slug: 'kawhi-leonard', name: 'Kawhi Leonard', starPower: 9, dataProfile: 'historical', teams: [{ team: 'San Antonio Spurs', seasons: ['2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17'] }, { team: 'Toronto Raptors', seasons: ['2018-19'] }, { team: 'LA Clippers', seasons: ['2019-20', '2020-21', '2021-22', '2022-23', '2023-24'] }] },
  { slug: 'paul-george', name: 'Paul George', starPower: 8, dataProfile: 'historical', teams: [{ team: 'Indiana Pacers', seasons: ['2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17'] }, { team: 'Oklahoma City Thunder', seasons: ['2017-18', '2018-19'] }, { team: 'LA Clippers', seasons: ['2019-20', '2020-21', '2021-22', '2022-23', '2023-24'] }] },
  { slug: 'carmelo-anthony', name: 'Carmelo Anthony', starPower: 8, dataProfile: 'historical', teams: [{ team: 'Denver Nuggets', seasons: ['2003-04', '2004-05', '2005-06', '2006-07', '2007-08', '2008-09', '2009-10'] }, { team: 'New York Knicks', seasons: ['2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17'] }, { team: 'Oklahoma City Thunder', seasons: ['2017-18'] }, { team: 'Houston Rockets', seasons: ['2018-19'] }, { team: 'Portland Trail Blazers', seasons: ['2019-20', '2020-21'] }, { team: 'Los Angeles Lakers', seasons: ['2021-22'] }] },
  { slug: 'dwyane-wade', name: 'Dwyane Wade', starPower: 9, dataProfile: 'historical', teams: [{ team: 'Miami Heat', seasons: ['2003-04', '2004-05', '2005-06', '2006-07', '2007-08', '2008-09', '2009-10', '2010-11', '2011-12', '2012-13', '2013-14', '2017-18', '2018-19'] }, { team: 'Chicago Bulls', seasons: ['2016-17'] }, { team: 'Cleveland Cavaliers', seasons: ['2017-18'] }] },
  { slug: 'chris-bosh', name: 'Chris Bosh', starPower: 8, dataProfile: 'historical', teams: [{ team: 'Toronto Raptors', seasons: ['2003-04', '2004-05', '2005-06', '2006-07', '2007-08', '2008-09', '2009-10'] }, { team: 'Miami Heat', seasons: ['2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16'] }] },
  { slug: 'dwight-howard', name: 'Dwight Howard', starPower: 8, dataProfile: 'historical', teams: [{ team: 'Orlando Magic', seasons: ['2004-05', '2005-06', '2006-07', '2007-08', '2008-09', '2009-10', '2010-11', '2011-12'] }, { team: 'Los Angeles Lakers', seasons: ['2012-13', '2020-21', '2021-22'] }, { team: 'Houston Rockets', seasons: ['2013-14', '2014-15', '2015-16'] }, { team: 'Atlanta Hawks', seasons: ['2016-17'] }, { team: 'Charlotte Hornets', seasons: ['2017-18'] }, { team: 'Washington Wizards', seasons: ['2018-19'] }, { team: 'Philadelphia 76ers', seasons: ['2019-20'] }] },
  { slug: 'rajon-rondo', name: 'Rajon Rondo', starPower: 7, dataProfile: 'historical', teams: [{ team: 'Boston Celtics', seasons: ['2006-07', '2007-08', '2008-09', '2009-10', '2010-11', '2011-12', '2012-13', '2013-14'] }, { team: 'Dallas Mavericks', seasons: ['2014-15'] }, { team: 'Sacramento Kings', seasons: ['2015-16'] }, { team: 'Chicago Bulls', seasons: ['2016-17'] }, { team: 'New Orleans Pelicans', seasons: ['2017-18'] }, { team: 'Los Angeles Lakers', seasons: ['2018-19', '2019-20', '2020-21'] }, { team: 'LA Clippers', seasons: ['2021-22'] }, { team: 'Cleveland Cavaliers', seasons: ['2021-22'] }] },
  { slug: 'blake-griffin', name: 'Blake Griffin', starPower: 8, dataProfile: 'historical', teams: [{ team: 'Los Angeles Clippers', seasons: ['2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17', '2017-18'] }, { team: 'Detroit Pistons', seasons: ['2017-18', '2018-19', '2019-20', '2020-21'] }, { team: 'Brooklyn Nets', seasons: ['2020-21', '2021-22'] }, { team: 'Boston Celtics', seasons: ['2022-23'] }] },
  { slug: 'deandre-jordan', name: 'DeAndre Jordan', starPower: 7, dataProfile: 'historical', teams: [{ team: 'Los Angeles Clippers', seasons: ['2008-09', '2009-10', '2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17', '2017-18'] }, { team: 'Dallas Mavericks', seasons: ['2018-19'] }, { team: 'New York Knicks', seasons: ['2018-19'] }, { team: 'Brooklyn Nets', seasons: ['2019-20', '2020-21'] }, { team: 'Los Angeles Lakers', seasons: ['2021-22'] }, { team: 'Philadelphia 76ers', seasons: ['2021-22'] }, { team: 'Denver Nuggets', seasons: ['2022-23', '2023-24'] }] },
];

const rosterSeeds: Array<{ team: string; players: string[] }> = [
  { team: 'Atlanta Hawks', players: ['Trae Young', 'Dejounte Murray', 'Clint Capela', 'Bogdan Bogdanovic', 'Jalen Johnson', 'Onyeka Okongwu', 'DeAndre Hunter', 'Saddiq Bey', 'Kobe Bufkin', 'AJ Griffin'] },
  { team: 'Boston Celtics', players: ['Jrue Holiday', 'Kristaps Porzingis', 'Derrick White', 'Al Horford', 'Payton Pritchard', 'Sam Hauser', 'Luke Kornet', 'Neemias Queta', 'Oshae Brissett', 'Xavier Tillman'] },
  { team: 'Brooklyn Nets', players: ['Ben Simmons', 'Mikal Bridges', 'Cam Thomas', 'Nic Claxton', 'Dorian Finney-Smith', 'Dennis Schroder', 'Cam Johnson', 'DayRon Sharpe', 'Lonnie Walker IV', 'Noah Clowney'] },
  { team: 'Charlotte Hornets', players: ['LaMelo Ball', 'Miles Bridges', 'Brandon Miller', 'Mark Williams', 'Tre Mann', 'Vasilije Micic', 'Nick Richards', 'Grant Williams', 'Seth Curry', 'PJ Washington'] },
  { team: 'Chicago Bulls', players: ['DeMar DeRozan', 'Zach LaVine', 'Nikola Vucevic', 'Alex Caruso', 'Coby White', 'Ayo Dosunmu', 'Patrick Williams', 'Andre Drummond', 'Lonzo Ball', 'Torrey Craig'] },
  { team: 'Cleveland Cavaliers', players: ['Donovan Mitchell', 'Darius Garland', 'Jarrett Allen', 'Evan Mobley', 'Caris LeVert', 'Isaac Okoro', 'Max Strus', 'Georges Niang', 'Dean Wade', 'Sam Merrill'] },
  { team: 'Dallas Mavericks', players: ['Tim Hardaway Jr.', 'Dereck Lively II', 'Daniel Gafford', 'P.J. Washington', 'Josh Green', 'Dante Exum', 'Jaden Hardy', 'Dwight Powell', 'Maxi Kleber', 'Grant Williams'] },
  { team: 'Denver Nuggets', players: ['Jamal Murray', 'Michael Porter Jr.', 'Aaron Gordon', 'Kentavious Caldwell-Pope', 'Reggie Jackson', 'Christian Braun', 'Peyton Watson', 'Zeke Nnaji', 'Justin Holiday', 'Julian Strawther'] },
  { team: 'Detroit Pistons', players: ['Cade Cunningham', 'Jaden Ivey', 'Ausar Thompson', 'Jalen Duren', 'Isaiah Stewart', 'Bojan Bogdanovic', 'Marcus Sasser', 'Alec Burks', 'Monte Morris', 'Simone Fontecchio'] },
  { team: 'Golden State Warriors', players: ['Andrew Wiggins', 'Jonathan Kuminga', 'Brandin Podziemski', 'Moses Moody', 'Kevon Looney', 'Trayce Jackson-Davis', 'Gary Payton II', 'Chris Paul', 'Dario Saric', 'Klay Thompson'] },
  { team: 'Houston Rockets', players: ['Fred VanVleet', 'Alperen Sengun', 'Jalen Green', 'Jabari Smith Jr.', 'Dillon Brooks', 'Amen Thompson', 'Cam Whitmore', 'Tari Eason', 'Jeff Green', 'Steven Adams'] },
  { team: 'Indiana Pacers', players: ['Tyrese Haliburton', 'Pascal Siakam', 'Myles Turner', 'Buddy Hield', 'Bennedict Mathurin', 'Andrew Nembhard', 'T.J. McConnell', 'Obi Toppin', 'Aaron Nesmith', 'Jalen Smith'] },
  { team: 'LA Clippers', players: ['Ivica Zubac', 'Norman Powell', 'Terance Mann', 'Bones Hyland', 'Mason Plumlee', 'P.J. Tucker', 'Amir Coffey', 'Daniel Theis', 'Russell Westbrook', 'James Harden'] },
  { team: 'Los Angeles Lakers', players: ['Austin Reaves', "D'Angelo Russell", 'Rui Hachimura', 'Jarred Vanderbilt', 'Gabe Vincent', 'Taurean Prince', 'Spencer Dinwiddie', 'Cam Reddish', 'Jaxson Hayes', 'Christian Wood'] },
  { team: 'Memphis Grizzlies', players: ['Desmond Bane', 'Jaren Jackson Jr.', 'Marcus Smart', 'Luke Kennard', 'Brandon Clarke', 'Ziaire Williams', 'Santi Aldama', 'Vince Williams Jr.', 'Scotty Pippen Jr.', 'GG Jackson'] },
  { team: 'Miami Heat', players: ['Bam Adebayo', 'Tyler Herro', 'Terry Rozier', 'Duncan Robinson', 'Caleb Martin', 'Kevin Love', 'Josh Richardson', 'Jaime Jaquez Jr.', 'Nikola Jovic', 'Haywood Highsmith'] },
  { team: 'Milwaukee Bucks', players: ['Khris Middleton', 'Brook Lopez', 'Bobby Portis', 'Malik Beasley', 'Pat Connaughton', 'AJ Green', 'MarJon Beauchamp', 'Patrick Beverley', 'Jae Crowder', 'Thanasis Antetokounmpo'] },
  { team: 'Minnesota Timberwolves', players: ['Anthony Edwards', 'Karl-Anthony Towns', 'Rudy Gobert', 'Mike Conley', 'Jaden McDaniels', 'Naz Reid', 'Nickeil Alexander-Walker', 'Kyle Anderson', 'Jordan McLaughlin', 'Monte Morris'] },
  { team: 'New Orleans Pelicans', players: ['Zion Williamson', 'Brandon Ingram', 'CJ McCollum', 'Jonas Valanciunas', 'Herb Jones', 'Trey Murphy III', 'Jose Alvarado', 'Larry Nance Jr.', 'Dyson Daniels', 'Naji Marshall'] },
  { team: 'New York Knicks', players: ['Jalen Brunson', 'Julius Randle', 'OG Anunoby', 'Josh Hart', 'Donte DiVincenzo', 'Mitchell Robinson', 'Isaiah Hartenstein', 'Miles McBride', 'Bojan Bogdanovic', 'Precious Achiuwa'] },
  { team: 'Oklahoma City Thunder', players: ['Shai Gilgeous-Alexander', 'Chet Holmgren', 'Jalen Williams', 'Josh Giddey', 'Luguentz Dort', 'Isaiah Joe', 'Cason Wallace', 'Aaron Wiggins', 'Jaylin Williams', 'Kenrich Williams'] },
  { team: 'Orlando Magic', players: ['Paolo Banchero', 'Franz Wagner', 'Jalen Suggs', 'Wendell Carter Jr.', 'Jonathan Isaac', 'Markelle Fultz', 'Cole Anthony', 'Moritz Wagner', 'Anthony Black', 'Gary Harris'] },
  { team: 'Philadelphia 76ers', players: ['Tyrese Maxey', 'Tobias Harris', 'Kelly Oubre Jr.', 'Nicolas Batum', 'Buddy Hield', 'DeAnthony Melton', 'Paul Reed', 'Kyle Lowry', 'Robert Covington', 'Mo Bamba'] },
  { team: 'Phoenix Suns', players: ['Devin Booker', 'Bradley Beal', 'Jusuf Nurkic', 'Grayson Allen', 'Eric Gordon', 'Royce ONeale', 'Bol Bol', 'Josh Okogie', 'Drew Eubanks', 'Nassir Little'] },
  { team: 'Portland Trail Blazers', players: ['Anfernee Simons', 'Jerami Grant', 'Deandre Ayton', 'Scoot Henderson', 'Shaedon Sharpe', 'Matisse Thybulle', 'Robert Williams III', 'Malcolm Brogdon', 'Toumani Camara', 'Jabari Walker'] },
  { team: 'Sacramento Kings', players: ['DeAaron Fox', 'Domantas Sabonis', 'Keegan Murray', 'Kevin Huerter', 'Malik Monk', 'Harrison Barnes', 'Davion Mitchell', 'Sasha Vezenkov', 'Trey Lyles', 'Chris Duarte'] },
  { team: 'San Antonio Spurs', players: ['Victor Wembanyama', 'Devin Vassell', 'Keldon Johnson', 'Jeremy Sochan', 'Tre Jones', 'Zach Collins', 'Julian Champagnie', 'Malaki Branham', 'Blake Wesley', 'Cedi Osman'] },
  { team: 'Toronto Raptors', players: ['Scottie Barnes', 'RJ Barrett', 'Immanuel Quickley', 'Jakob Poeltl', 'Gradey Dick', 'Bruce Brown', 'Gary Trent Jr.', 'Chris Boucher', 'Kelly Olynyk', 'Ochai Agbaji'] },
  { team: 'Utah Jazz', players: ['Lauri Markkanen', 'Jordan Clarkson', 'Collin Sexton', 'John Collins', 'Walker Kessler', 'Keyonte George', 'Taylor Hendricks', 'Kelly Olynyk', 'Kris Dunn', 'Talen Horton-Tucker'] },
  { team: 'Washington Wizards', players: ['Jordan Poole', 'Kyle Kuzma', 'Tyus Jones', 'Deni Avdija', 'Corey Kispert', 'Bilal Coulibaly', 'Marvin Bagley III', 'Richaun Holmes', 'Landry Shamet', 'Johnny Davis'] },
];

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/\./g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const starPowerOverrides: Record<string, number> = {
  'Trae Young': 8,
  'Jrue Holiday': 8,
  'Kristaps Porzingis': 7,
  'Ben Simmons': 7,
  'LaMelo Ball': 8,
  'Donovan Mitchell': 8,
  'Jamal Murray': 8,
  'Cade Cunningham': 7,
  'Tyrese Haliburton': 8,
  'Anthony Edwards': 9,
  'Zion Williamson': 8,
  'Jalen Brunson': 8,
  'Shai Gilgeous-Alexander': 9,
  'Paolo Banchero': 8,
  'Tyrese Maxey': 8,
  'Devin Booker': 9,
  'Bradley Beal': 8,
  'DeAaron Fox': 8,
  'Victor Wembanyama': 9,
  'Scottie Barnes': 7,
  'Lauri Markkanen': 7,
  'Jordan Poole': 6,
};

const generatedPlayers: PlayerSeed[] = rosterSeeds.flatMap(({ team, players }) =>
  players.map((name) => ({
    slug: slugify(name),
    name,
    starPower: starPowerOverrides[name] ?? 5,
    dataProfile: 'roster_snapshot',
    teams: [{ team, seasons: ['2023-24'] }],
  })),
);

const uniquePlayers = new Map<string, Player>();

[...generatedPlayers, ...corePlayers].forEach((player) => {
  uniquePlayers.set(player.slug, withImage(player));
});

export const players = Array.from(uniquePlayers.values());
export const playerMap = new Map(players.map((player) => [player.slug, player]));
