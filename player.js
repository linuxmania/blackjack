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


function Player(){
	Participant.call(this);
	this.win = false;
	this.lose = false;
	this.tie = false;
	this.hasSplit = false;
	this.splitPlayers = new Array();
}

Player.prototype = new Participant();

Player.prototype.reportSplitResults = function(dealerValue,num){
	var s = "";
	for (var i = 0; i < this.splitPlayers.length; i++) {
		if(this.splitPlayers[i].hasSplit){
			this.splitPlayers[i].reportSplitResults(dealerValue, num + "." + (i+1));		
		} else { 
			if(!this.splitPlayers[i].busted && !this.splitPlayers[i].blackjack){
				if(dealerValue > 21)
					this.splitPlayers[i].win = true;
				else if(this.splitPlayers[i].getHandValue() > dealerValue)
					this.splitPlayers[i].win = true;
				else if(this.splitPlayers[i].getHandValue() == dealerValue)
					this.splitPlayers[i].tie = true;
				else this.splitPlayers[i].lose = true;
			}
			s += "Player #" + num + "." + (i+1) + ": " + this.splitPlayers[i].getResults(dealerValue) + "\n";
		}
	}
	if(s != "") alert(s);			
}


Player.prototype.canAndWantsSplit = function(num,dealerShow){
	if(this.hand[0].order != this.hand[1].order)
		return false;
	
	var s = "Player " + num + ": Splittable Hand!\n" + 
		this.reportHand(false) + 
		"Dealer showing " + dealerShow +
		"\nClick 'OK' to split, 'Cancel' not to split."
	return confirm(s);
}

Player.prototype.processSplit = function(deck,num,dealerShow){
	this.splitPlayers.push(new Player());
	this.splitPlayers.push(new Player());

	this.splitPlayers[0].hand.push(this.hand[0]);
	this.splitPlayers[1].hand.push(this.hand[1]);

	this.splitPlayers[0].hand.push(deck.nextCard());
	this.splitPlayers[1].hand.push(deck.nextCard());

	this.splitPlayers[0].process(deck, (num + ".1") ,dealerShow);
	this.splitPlayers[1].process(deck,(num + ".2"),dealerShow);		

}

Player.prototype.process = function(deck, num, dealerShow){
	this.checkAces();
	if(this.getHandValue() == 21){
		this.blackjack = true;
		var s = "Player " + num + "\nBlackJack! Collect your dough.";
		alert(s);
	} else if(this.canAndWantsSplit(num,dealerShow)){	
		if(this.aces){
			this.hand[0].value = 11;		
		}		
		this.processSplit(deck,num,dealerShow);
		this.hasSplit = true;
	} else {	
		while(this.getHandValue() < 21){
			s = "Player " + num + ": Value: " + this.getHandValue() + "\n" + 
				this.reportHand(false) + 
				"Dealer showing " + dealerShow +
				"\nClick 'OK' for hit, 'Cancel' to stay.";
			if(confirm(s)){
				this.addCard(deck.nextCard());
				if(this.checkBusted()){
					s = "Player " + num + ": Value: " + this.getHandValue() + "\n" 
						+ this.reportHand(false) + "Sorry you're busted.";
					alert(s);
					break;
				} else if(this.getHandValue() == 21){
					s = "Player " + num + ": Value: " + this.getHandValue() + "\n" 
						+ this.reportHand(false) + "21!";
					alert(s);
					break;
				}	
			}
			else break;
		}
	}
}


Player.prototype.getResults = function(dealerValue){
	if(this.busted)
		return "Sorry you're busted.";
	else if(this.blackjack)
		return "Blackjack! Collect your dough.";
	else if(this.win) {
		if(dealerValue > 21)
			return "Winner " + this.getHandValue() + " - dealer bust";
		else
			return "Winner " + this.getHandValue() + " - " + dealerValue;		
	}	
	else if(this.lose)
		return "Loser " + this.getHandValue() + " - " + dealerValue;
	else if(this.tie)
		return "Tie " + this.getHandValue() + " - " + dealerValue;
}
