/***************************
Copyleft [2014] [Daniel Spicer]
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
****************************/


function Participant(){
	this.hand = new Array();
	this.busted = false;
	this.blackjack = false;
	this.aces = false;
}

Participant.prototype.addCard = function(card) {
	this.hand.push(card);
}

Participant.prototype.checkAces = function() {
	if(this.hand[0].order == 1 && this.hand[1].order == 1){
		this.aces = true;
		this.hand[0].value = 1;
	}
}
	
Participant.prototype.getCard = function(index) {
	return this.hand[index];	
}

Participant.prototype.reportHand = function(web){
	if(web == true)
		var delim = "<br>";
	else delim = "\n";	
	var s = "";
	
	if(this.hand.length > 3){
		for (var i = 0; i < this.hand.length; i++) {
			s += this.hand[i].name + " of " + this.hand[i].suit;
			if(this.hand.length > (i+1)){
				s += " || " + this.hand[i+1].name + " of " + this.hand[i+1].suit + delim;
				i++;
			}else{
				s += delim;
			}
		}		
	} else {
		for (var i = 0; i < this.hand.length; i++) {
			s += "Card #" + (i+1) + ": " + this.hand[i].name + " of " + this.hand[i].suit + delim;
		}
	}	
	if(this.busted)
		s += "Busted!" + delim;
	return s;
}


Participant.prototype.checkBusted = function() {
	if(this.getHandValue() > 21){
		this.busted = true;
		for (var i = 0; i < this.hand.length; i++) {
			if(this.hand[i].value == 11){
				this.hand[i].value = 1;
				this.busted = false;
				break;
			}	
		}	
	}
	return this.busted;
}


Participant.prototype.getHandValue = function() {
	var handValue = 0;
	for (var i = 0; i < this.hand.length; i++) {
		handValue += this.hand[i].value;
	}		
	return handValue;
}
