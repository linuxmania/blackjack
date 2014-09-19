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


function Deck(){
	this.cards = new Array();
	this.shuffled = new Array();

	for(var i=0; i<52; i++) {
		if(i<13)
			var s = "Diamonds";
		else if(i<26)
			s="Clubs";
		else if(i<39)
			s="Hearts";
		else
			s="Spades";
			
		var val = (i%13) + 1;
		this.cards.push(new Card(s,val));
	}  

	while(this.cards.length > 0){
		var num = parseInt(Math.random() * this.cards.length);
		this.shuffled.push(this.cards[num]);
		this.cards.splice(num,1);	
	}
}

Deck.prototype.nextCard = function() {
	return this.shuffled.pop();
}
