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


function Game(num){
	var playIt = true;
	while(true){
		this.num = prompt("How many Players (1 - 5)?", num);
		if (this.num == parseInt(this.num,10) && this.num > 0 && this.num < 6){
			numPlayers = this.num
			break;
		} else if (this.num == null){
			playIt = false;
			break;
		}
	}
	if(playIt){		
		this.deck = new Deck();
		this.dealer = new Dealer();
		this.players = new Array();
		while(this.num > 0){
			this.players.push(new Player());
			this.num--;
		}
		this.deal();
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].process(this.deck, (i+1), this.dealer.reportShowing());
		}
		this.processDealer();
		this.reportResults();
	}
}
	
Game.prototype.deal = function() {
	for (var j = 0; j < 2; j++) {
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].addCard(this.deck.nextCard());
		}	
		this.dealer.addCard(this.deck.nextCard());
	}
}

Game.prototype.processDealer = function() {
	this.dealer.checkAces();
	while(!this.dealer.busted){
		if(this.dealer.getHandValue() < 17){
			alert("Dealer: Value: " + this.dealer.getHandValue() + "\n" +
				this.dealer.reportHand(false) + "Dealer must take a hit ...");
			this.dealer.addCard(this.deck.nextCard());
			if(this.dealer.checkBusted()){
				alert("Dealer: Value: " + this.dealer.getHandValue() + "\n" +
					this.dealer.reportHand(false) + "Dealer has busted!");
			}
		} else {
			alert("Dealer: Value: " + this.dealer.getHandValue() + "\n" + 
				this.dealer.reportHand(false) + "Dealer must stay.");
			break;
		}
	}		
}

Game.prototype.reportResults = function() {
	var s = "";
	for (var i = 0; i < this.players.length; i++) {
		if(this.players[i].hasSplit){
			this.players[i].reportSplitResults(this.dealer.getHandValue() , (i+1));		
		} else { 
			if(!this.players[i].busted && !this.players[i].blackjack){
				if(this.dealer.busted)
					this.players[i].win = true;
				else if(this.players[i].getHandValue() > this.dealer.getHandValue())
					this.players[i].win = true;
				else if(this.players[i].getHandValue() == this.dealer.getHandValue())
					this.players[i].tie = true;
				else this.players[i].lose = true;
			}
			s += "Player #" + (i+1) + ": " + this.players[i].getResults(this.dealer.getHandValue()) + "\n";
		}
	}
	if(s != "") alert(s);			
}
