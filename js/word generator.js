(function() {
	var randomAtoZ, randomWord, randomWordLength, word_history, wordfrequency, returnWord;
	randomAtoZ = (function(lookup) {
		return function() {
			var chance, char, charfreq, prev, random;
			random = Math.random() * 100000;
			char = void 0;
			prev = 0;
			for (char in lookup) {
				charfreq = lookup[char];
				chance = (charfreq - prev) / 1000 + '%';
				if (random < charfreq) {
					return {
						char : char,
						charfreq : charfreq,
						chance : chance
					};
				}
				prev = charfreq;
			}
		};
	})({
		// Ranges calculated from data found at
	    // http://en.wikipedia.org/wiki/Letter_frequency
	    a: 8167,  b: 9659,  c: 12441, d: 16694, e: 29396, f: 31624, g: 33639, h: 39733,
	    i: 46699, j: 46852, k: 47624, l: 51649, m: 54055, n: 60804, o: 68311, p: 70240,
	    q: 70335, r: 76322, s: 82649, t: 91705, u: 94463, v: 95441, w: 97801, x: 97951,
	    y: 99925, z: 100000
	});

	wordfrequency = [];

	randomWordLength = function() {
		var amount, chance, j, len, length, lengthfreq, lookup, percent, percentages, prev, random, total;
		total = 0;
		// word length frequency in the english language from 1-19 characters
		percentages = [ 0.1, 0.6, 2.6, 5.2, 8.5, 12.2, 14.0, 14.0, 12.6, 10.1, 7.5, 5.2, 3.2, 2.0, 1.0, 0.6, 0.3, 0.2, 0.1 ];
		for (j = 0, len = percentages.length; j < len; j++) {
			percent = percentages[j];
			amount = total + ((percent / 100) * 100000);
			wordfrequency.push(amount);
			total = amount;
		}
		random = Math.random() * 100000;
		length = void 0;
		lookup = {
			1 : wordfrequency[0], 2 : wordfrequency[1], 3 : wordfrequency[2], 4 : wordfrequency[3],
			5 : wordfrequency[4], 6 : wordfrequency[5], 7 : wordfrequency[6], 8 : wordfrequency[7],
			9 : wordfrequency[8], 10 : wordfrequency[9], 11 : wordfrequency[10], 12 : wordfrequency[11],
			13 : wordfrequency[12], 14 : wordfrequency[13], 15 : wordfrequency[14], 16 : wordfrequency[15],
			17 : wordfrequency[16], 18 : wordfrequency[17], 19 : wordfrequency[18]
		};
		prev = 0;
		for (length in lookup) {
			lengthfreq = lookup[length];
			chance = Math.round(lengthfreq - prev) / 1000 + '%';
			if (random < lengthfreq) {
				return {
					length : length,
					chance : chance
				};
			}
			prev = lengthfreq;
		}
	};

	randomWord = function() {
		var chance, char_map, character, i, isword, j, length, length_i, ref, word;
		length = randomWordLength();
		length_i = length.length;
		chance = length.chance;
		word = '';
		char_map = [];
		for (i = j = 1, ref = length_i; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j
				: --j) {
			character = randomAtoZ();
			word += character.char;
			char_map.push(character);
		}
		return {
			length_i : length_i,
			chance : chance,
			word : word,
			isword : isword,
			char_map : char_map
		};
	};

	word_history = [];

	returnWord = function(generated_word) {
		var char, charlist, charlist_html, history_string, isword, j, k, len, len1, length, ref, w, word;
		document.getElementsByTagName('body')[0].className = '';
		if (generated_word.isword === true) {
			isword = 'isword';
		} else {
			isword = 'isnotword';
		}
		word = document.getElementById('word');
		word.innerHTML = ' <div style="font-size: 18px;margin-left:10%;">Generated Word : ' +generated_word.word +'</div>';
		document.getElementsByTagName('body')[0].className = isword;
		length = document.getElementById('length');
		length.innerHTML = '<div style="font-size: 18px;margin-left:10%;">Word Length &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ' + generated_word.length_i+'</div>';
		charlist = document.getElementById('charlist');
		charlist_html = '';
		ref = generated_word.char_map;

		word_history.unshift({
			word : generated_word.word,
			isword : generated_word.isword
		});
		history_string = '<div style="margin-left: -20%; font-size: 18px;">History: </div>';
		for (k = 0, len1 = word_history.length; k < len1; k++) {
			w = word_history[k];
			if (w.isword === true) {
				isword = 'isword';
			} else {
				isword = 'isnotword';
			}
			history_string += '<li class="' + isword + '">' + w.word + '</li>';
		}
		return document.getElementById('history').innerHTML = history_string;
	};

	document.getElementById('generated_word').onclick = function() {
		return returnWord(randomWord());
	};

}).call(this);