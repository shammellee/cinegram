var mongo = new Mongo()
		,db   = mongo.getDB('cinegram')
		;

var movies = 
[
	[
		'Prometheus'
		,2012
		,"The discovery of a clue to mankind's origins on Earth leads a team of explorers to the darkest parts of the universe. Two brilliant young scientists lead the expedition."
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/prometheus.jpg'
	]
	,[
		'The Silence of the Lambs'
		,1991
		,'Jodie Foster stars as Clarice Starling, a top student at the FBI\'s training academy. Jack Crawford (Scott Glenn) wants Clarice to interview Dr. Hannibal Lecter (Anthony Hopkins), a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism.'
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/the_silence_of_the_lambs.jpg'
	]
	,[
		'The Matrix'
		,1999
		,'Neo (Keanu Reeves) believes that Morpheus (Laurence Fishburne), an elusive figure considered to be the most dangerous man alive, can answer his question -- What is the Matrix? Neo is contacted by Trinity (Carrie-Anne Moss), a beautiful stranger who leads him into an underworld where he meets Morpheus.'
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/the_matrix.jpg'
	]
	,[
		'Heist'
		,2001
		,'Joe Moore (Gene Hackman) has a job he loves. He\'s a thief. His job goes sour when he gets caught on security camera tape. His fence, Bergman (Danny DeVito) reneges on the money he\'s owed, and his wife (Rebecca Pidgeon) may be betraying him with the fence\'s young lieutenant (Sam Rockwell).'
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/heist.jpg'
	]
	,[
		'Inception'
		,2010
		,'Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people\'s dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves.'
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/inception.jpg'
	]
	,[
		'2001: A Space Odyssey'
		,1968
		,'An imposing black structure provides a connection between the past and the future in this enigmatic adaptation of a short story by revered sci-fi author Arthur C. Clarke. When Dr. Dave Bowman (Keir Dullea) and other astronauts are sent on a mysterious mission.'
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/2001_a_space_odyssey.jpg'
	]
	,[
		'Big Trouble in Little China'
		,1986
		,'Kurt Russell plays hard-boiled truck driver Jack Burton, who gets caught in a bizarre conflict within, and underneath, San Francisco\'s Chinatown. An ancient Chinese prince and Chinatown crime lord has kidnapped a beautiful green-eyed woman, who is the fiancee to Jack\'s best friend. '
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/big_trouble_in_little_china.jpg'
	]
	,[
		'Blade Runner'
		,1982
		,'Deckard (Harrison Ford) is forced by the police Boss (M. Emmet Walsh) to continue his old job as Replicant Hunter. His assignment: eliminate four escaped Replicants from the colonies who have returned to Earth. '
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/blade_runner.jpg'
	]
	,[
		'Iron Man'
		,2008
		,'A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.), is conducting weapons tests overseas, but terrorists kidnap him to force him to build a devastating weapon. Instead, he builds an armored suit and upends his captors.'
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/iron_man.jpg'
	]
	,[
		'Logan\'s Run'
		,1976
		,'In the year 2274, young residents enjoy an idyllic, hedonistic lifestyle within the protective confines of a domed city. The general belief is that when each person turns 30, they are reincarnated for another blissful life cycle.'
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/logans_run.jpg'
	]
	,[
		'The Fellowship of the Ring'
		,2001
		,'The future of civilization rests in the fate of the One Ring, which has been lost for centuries. Powerful forces are unrelenting in their search for it. But fate has placed it in the hands of a young Hobbit named Frodo Baggins (Elijah Wood), who inherits the Ring and steps into legend.'
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/the_fellowship_of_the_ring.jpg'
	]
	,[
		'Revolver'
		,2005
		,'Jake Green is a hotshot gambler, long on audacity and short on common sense. Jake served seven years in jail for a crime he didn\'t commit after taking the rap for mean crime boss Dorothy Macha. Upon his release he takes on Macha in a private casino game, causes humiliation, and wins.'
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/revolver.jpg'
	]
	,[
		'Soylent Green'
		,1973
		,'In a densely overpopulated, starving New York City of the future, NYPD detective Robert Thorn (Charlton Heston) investigates the murder of an executive at rations manufacturer Soylent Corporation.'
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/soylent_green.jpg'
	]
	,[
		'The Bourne Identity'
		,2002
		,'The story of a man (Matt Damon), salvaged, near death, from the ocean by an Italian fishing boat. When he recuperates, the man suffers from total amnesia, without identity or background... except for a range of extraordinary talents in fighting, linguistic skills and self-defense that speak of a dangerous past.'
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/the_bourne_identity.jpg'
	]
	,[
		'The Dark Knight'
		,2008
		,'With the help of allies Lt. Jim Gordon (Gary Oldman) and DA Harvey Dent (Aaron Eckhart), Batman (Christian Bale) has been able to keep a tight lid on crime in Gotham City.'
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/the_dark_knight.jpg'
	]
	,[
		'The Master'
		,2012
		,'Freddie Quell (Joaquin Phoenix) is a troubled, boozy drifter struggling with the trauma of World War II and whatever inner demons ruled his life before that. On a fateful night in 1950, Freddie boards a passing boat and meets Lancaster Dodd (Philip Seymour Hoffman), the charismatic leader of a religious movement called the Cause.'
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/the_master.jpg'
	]
	,[
		'Tron: Legacy'
		,2010
		,'Sam (Garrett Hedlund), the son of famous video-game developer Kevin Flynn (Jeff Bridges), has been haunted for a long time by his father\'s mysterious disappearance. A strange signal draws Sam to Flynn\'s Arcade, and he is pulled into the same cyberworld in which his father, its creator, has been trapped for 20 years.'
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/tron_legacy.jpg'
	]
	,[
		'Wall Street'
		,1987
		,'On the Wall Street of the 1980s, Bud Fox (Charlie Sheen) is a stockbroker full of ambition, doing whatever he can to make his way to the top. Admiring the power of the unsparing corporate raider Gordon Gekko (Michael Douglas), Fox entices Gekko into mentoring him by providing insider trading.'
		,'http://am-shammel-130330120130.s3.amazonaws.com/shammel/cinegram/img/wall_street.jpg'
	]
];

for(i = 0;i < movies.length;i++)
{
	var movie = {
		_id:i + 1
		,title:movies[i][0]
		,releaseYear:movies[i][1]
		,plot:movies[i][2]
		,imageURL:movies[i][3]
	};

	db.movies.save(movie);
}
