// Donut Fall
// Makes jumping really fast
JUMP_FORCE = - 9.5;
WALL_JUMP_FORCE = 9.5; 

// Fairy Flight
// Makes floor an ceiling not hurt
EntityLimits.prototype.beginContact = function() { return } 

// Monty's Great Escape
// Start with 10 lives
EntityGameControl.prototype.lifeCount = 10

// Word Shark
// Make all words "a"
_STRINGS.DICT = {
        1: "abcdefghijklmnopqrstuvwxyz".split(""),
	2: "a".split(""),
	3: "a".split(""),
	4: "a".split(""),
	5: "a".split(""),
	6: "a".split(""),
	7: "a".split(""),
	8: "a".split(""),
	9: "a".split(""),
	10: "a".split(""),
	11: "a".split(""),
	12: "a".split("")
}
