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


function Card(suit,order){
	this.suit=suit;
	this.order=order;
	
	switch(order){
		case 1:
			this.name = "Ace";
			this.value = 11;
			break;
		case 2:
			this.name = "2";
			this.value = 2;
			break;
		case 3:
			this.name = "3";
			this.value = 3;
			break;
		case 4:
			this.name = "4";
			this.value = 4;
			break;
		case 5:
			this.name = "5";
			this.value = 5;
			break;
		case 6:
			this.name = "6";
			this.value = 6;
			break;
		case 7:
			this.name = "7";
			this.value = 7;
			break;
		case 8:
			this.name = "8";
			this.value = 8;
			break;
		case 9:
			this.name = "9";
			this.value = 9;
			break;
		case 10:
			this.name = "10";
			this.value = 10;
			break;
		case 11:
			this.name = "Jack";
			this.value = 10;
			break;
		case 12:
			this.name = "Queen";
			this.value = 10;
			break;
		case 13:
			this.name = "King";
			this.value = 10;
			break;
	}
}
