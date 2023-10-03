// game.js for Perlenspiel 2.3

/*
Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
Perlenspiel is Copyright © 2009-12 Worcester Polytechnic Institute.
This file is part of Perlenspiel.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with Perlenspiel. If not, see <http://www.gnu.org/licenses/>.
*/

//Creating The Colors for the Keys to play the music sound


var GRIDWIDTH = 6;
var GRIDHEIGHT = 6;
var countingKey = 0;

PS.Init = function (options)
{
	"use strict";

	//Getting the sounds
	PS.AudioLoad("piano_d3");
	PS.AudioLoad("piano_a3");
	PS.AudioLoad("piano_bb3");
	PS.AudioLoad("piano_b3");
	PS.AudioLoad("piano_db3");
	PS.AudioLoad("piano_e3");
	PS.AudioLoad("piano_c4");
	PS.AudioLoad("piano_d4");
	PS.AudioLoad("piano_e4");
	PS.AudioLoad("piano_gb4");
	PS.AudioLoad("piano_ab4");
	PS.AudioLoad("piano_bb4");
	PS.AudioLoad("piano_c5");
	PS.AudioLoad("piano_d5");
	PS.AudioLoad("piano_e5");
	PS.AudioLoad("piano_f5");
	PS.AudioLoad("piano_g5");
	PS.AudioLoad("piano_a5");
	PS.AudioLoad("piano_c6");
	PS.AudioLoad("piano_d6");
	PS.AudioLoad("piano_e6");
	PS.AudioLoad("piano_gb6");
	PS.AudioLoad("piano_ab6");
	PS.AudioLoad("piano_b6");
	PS.AudioLoad("piano_c7");
	PS.AudioLoad("piano_d7");
	PS.AudioLoad("piano_e7");
	PS.AudioLoad("piano_gb7");
	PS.AudioLoad("piano_ab7");
	PS.AudioLoad("piano_b7");
	PS.AudioLoad("piano_c2");
	PS.AudioLoad("piano_d2");
	PS.AudioLoad("piano_e2");
	PS.AudioLoad("piano_f2");
	PS.AudioLoad("piano_g2");
	PS.AudioLoad("piano_a2");
	
	// change to the grid dimensions you want

	PS.GridSize ( GRIDWIDTH, GRIDHEIGHT );
	
	//Setting the Natural border color
	PS.BeadBorderWidth (PS.ALL,PS.ALL,1);
	PS.BeadBorderColor (PS.ALL,PS.ALL,PS.COLOR_BLACK);
	
	PS.BeadColor ( 5,0,PS.COLOR_RED);
	PS.BeadColor ( 5,1,PS.COLOR_GREEN);
	PS.BeadColor ( 5,2,PS.COLOR_ORANGE);
	PS.BeadColor ( 5,3,PS.COLOR_BLUE);
	PS.BeadColor ( 5,4,PS.COLOR_YELLOW);
	PS.BeadColor ( 5,5,PS.COLOR_GRAY_DARK);
	
    //Creating the Glyphs as objects to move across to make sounds when finished to it's color
	PS.BeadGlyph ( 1,0,"\u2669" );
	PS.BeadGlyphColor ( 1,0,PS.COLOR_BLUE);
	PS.BeadData ( 1,0,1 );
	PS.BeadGlyph ( 1,1,"\u266A" );
	PS.BeadGlyphColor ( 1,1,PS.COLOR_GRAY_DARK);
	PS.BeadData ( 1,1,2 );
	PS.BeadGlyph ( 1,2,"\u266B" );
	PS.BeadGlyphColor ( 1,2,PS.COLOR_RED);
	PS.BeadData ( 1,2,3 );
	PS.BeadGlyph ( 1,3,"\u266C" );
	PS.BeadGlyphColor ( 1,3,PS.COLOR_YELLOW);
	PS.BeadData ( 1,3,4 );
	PS.BeadGlyph ( 1,4,"\u266D" );
	PS.BeadGlyphColor ( 1,4,PS.COLOR_GREEN);
	PS.BeadData ( 1,4,5 );
	PS.BeadGlyph ( 1,5,"\u266F" );
	PS.BeadGlyphColor ( 1,5,PS.COLOR_ORANGE);
	PS.BeadData ( 1,5,6 );
	
	//The timing of the keys when they get strung
	PS.Clock (10);

};


PS.Click = function (x, y, data, options)
{

// Finding the the actiavtion of the keys to follow into the colored squares
	"use strict";
	var borderX;
	var borderY;
	var oldGlyph;
	var newGlyph;
	var oldGColor;
	var newGColor;
	var newData;
	var oldData;
	var borderCheck=0;

	for ( borderX=0;borderX<GRIDWIDTH;borderX++ )
	{
		for ( borderY=0;borderY<GRIDHEIGHT;borderY++ )
		{
			if ( PS.BeadBorderWidth (borderX,borderY) == 5 )
			{
				if ( borderX==x && borderY==y ) 
				{
					PS.BeadBorderWidth( x,y,1);
					PS.BeadBorderColor( x,y,PS.COLOR_BLACK );
				}
				else if ( (x == borderX && y == borderY+1) || (x == borderX && y == borderY-1) || (x == borderX+1 && y == borderY+1) || (x == borderX+1 && y == borderY) || (x == borderX+1 && y == borderY-1) || (x == borderX-1 && y == borderY+1) || (x == borderX-1 && y == borderY) || (x == borderX-1 && y == borderY-1) )
				{
					oldGlyph = PS.BeadGlyph( borderX,borderY );
					newGlyph = PS.BeadGlyph(x,y);
					oldGColor = PS.BeadGlyphColor( borderX,borderY );
					newGColor = PS.BeadGlyphColor(x,y);
					oldData = PS.BeadData( borderX,borderY );
					newData = PS.BeadData(x,y);
	
					PS.BeadGlyph ( borderX,borderY,newGlyph );
					PS.BeadGlyph ( x,y,oldGlyph );
					PS.BeadGlyphColor ( borderX,borderY,newGColor );
					PS.BeadGlyphColor ( x,y,oldGColor );
					PS.BeadData ( borderX,borderY,newData );
					PS.BeadData ( x,y,oldData );
					
					PS.BeadBorderWidth ( borderX,borderY,1 );
				}
				borderCheck = 1;
			} 
		}
	}
	if ( borderCheck == 0 && PS.BeadGlyph (x,y) !=0 )
	{
		PS.BeadBorderWidth( x,y,5);
		PS.BeadBorderColor( x,y,PS.COLOR_BLACK);
	}
	
};


// PS.Release (x, y, data)
// This function is called whenever a mouse button is released over a bead
// It doesn't have to do anything
// x = the x-position of the bead on the grid
// y = the y-position of the bead on the grid
// data = the data value associated with this bead, 0 if none has been set
// options = a table with optional parameters; see documentation for details

PS.Release = function (x, y, data, options)
{
	"use strict";

	// Put code here for when the mouse button is released over a bead	
};

// PS.Enter (x, y, button, data)
// This function is called whenever the mouse moves over a bead
// It doesn't have to do anything
// x = the x-position of the bead on the grid
// y = the y-position of the bead on the grid
// data = the data value associated with this bead, 0 if none has been set
// options = a table with optional parameters; see documentation for details

PS.Enter = function (x, y, data, options)
{
	"use strict";

	// Put code here for when the mouse enters a bead	
};

// PS.Leave (x, y, data)
// This function is called whenever the mouse moves away from a bead
// It doesn't have to do anything
// x = the x-position of the bead on the grid
// y = the y-position of the bead on the grid
// data = the data value associated with this bead, 0 if none has been set
// options = a table with optional parameters; see documentation for details

PS.Leave = function (x, y, data, options)
{
	"use strict";
	
	// Put code here for when the mouse leaves a bead	
};

// PS.KeyDown (key, shift, ctrl)
// This function is called whenever a key on the keyboard is pressed
// It doesn't have to do anything
// key = the ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F1
// shift = true if shift key is held down, false otherwise
// ctrl = true if control key is held down, false otherwise
// options = a table with optional parameters; see documentation for details

PS.KeyDown = function (key, shift, ctrl, options)
{
	"use strict";

	// Put code here for when a key is pressed	
};

// PS.KeyUp (key, shift, ctrl)
// This function is called whenever a key on the keyboard is released
// It doesn't have to do anything
// key = the ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F12
// shift = true if shift key is held down, false otherwise
// ctrl = true if control key is held down, false otherwise
// options = a table with optional parameters; see documentation for details

PS.KeyUp = function (key, shift, ctrl, options)
{
	"use strict";
	
	// Put code here for when a key is released	
};

// PS.Wheel (dir)
// This function is called whenever the mouse wheel moves forward or backward
// It doesn't have to do anything
// dir = PS.FORWARD if mouse wheel moves forward, PS.BACKWARD if backward
// options = a table with optional parameters; see documentation for details

PS.Wheel = function (dir, options)
{
	"use strict";

	// Put code here for when mouse wheel is moved
};

// PS.Tick ()
// This function is called on every clock tick
// if a timer has been activated with a call to PS.Timer()
// It doesn't have to do anything
// options = a table with optional parameters; see documentation for details

//Having the different keys for the different key notes
PS.Tick = function (options)
{
	"use strict";
	
	PS.BeadColor(5,countingKey,PS.BeadColor(5,countingKey));
	
	if ( countingKey == 0 )
	{
		if ( PS.BeadData(5,countingKey) ==  1 )
		{
			PS.AudioPlay("piano_d3");
		}
		else if ( PS.BeadData (5,countingKey) ==  2 )
		{
			PS.AudioPlay("piano_a3");
		}
		else if ( PS.BeadData (5,countingKey) ==  3 )
		{
			PS.AudioPlay("piano_bb3");
		}
		else if ( PS.BeadData (5,countingKey) ==  4 )
		{
			PS.AudioPlay("piano_b3");
		}
		else if ( PS.BeadData (5,countingKey) ==  5 )
		{
			PS.AudioPlay("piano_db3");
		}
		else if ( PS.BeadData (5,countingKey) ==  6 )
		{
			PS.AudioPlay("piano_e3");
		}
	}
	else if ( countingKey == 1 )
	{
		if ( PS.BeadData (5,countingKey) ==  1 )
		{
			PS.AudioPlay("piano_c4");
		}
		else if ( PS.BeadData (5,countingKey) ==  2 )
		{
			PS.AudioPlay("piano_d4");
		}
		else if ( PS.BeadData (5,countingKey) ==  3 )
		{
			PS.AudioPlay("piano_e4");
		}
		else if ( PS.BeadData (5,countingKey) ==  4 )
		{
			PS.AudioPlay("piano_gb4");
		}
		else if ( PS.BeadData (5,countingKey) ==  5 )
		{
			PS.AudioPlay("piano_ab4");
		}
		else if ( PS.BeadData (5,countingKey) ==  6 )
		{
			PS.AudioPlay("piano_bb4");
		}
	}
	else if ( countingKey == 2 )
	{
		if ( PS.BeadData (5,countingKey) ==  1 )
		{
			PS.AudioPlay("piano_c5");
		}
		else if ( PS.BeadData (5,countingKey) ==  2 )
		{
			PS.AudioPlay("piano_d5");
		}
		else if ( PS.BeadData (5,countingKey) ==  3 )
		{
			PS.AudioPlay("piano_e5");
		}
		else if ( PS.BeadData (5,countingKey) ==  4 )
		{
			PS.AudioPlay("piano_f5");
		}
		else if ( PS.BeadData (5,countingKey) ==  5 )
		{
			PS.AudioPlay("piano_g5");
		}
		else if ( PS.BeadData (5,countingKey) ==  6 )
		{
			PS.AudioPlay("piano_a5");
		}
	}
	else if ( countingKey == 3 )
		{
			if ( PS.BeadData (5,countingKey) ==  1 )
			{
			
				PS.AudioPlay("piano_c6");
			}
		else if ( PS.BeadData (5,countingKey) ==  2 )
			{
			
				PS.AudioPlay("piano_d6");
			}
		else if ( PS.BeadData (5,countingKey) ==  3 )
			{
			
				PS.AudioPlay("piano_e6");
			}
		else if ( PS.BeadData (5,countingKey) ==  4 )
			{
			
				PS.AudioPlay("piano_gb6");
			}
		else if ( PS.BeadData (5,countingKey) ==  5 )
			{
			
				PS.AudioPlay("piano_ab6");
			}
		else if ( PS.BeadData (5,countingKey) ==  6 )
			{
			
				PS.AudioPlay("piano_b6");
			}
		}
	else if ( countingKey == 4 )
		{
			if ( PS.BeadData (5,countingKey) ==  1 )
			{
			
				PS.AudioPlay("piano_c7");
			}
		else if ( PS.BeadData (5,countingKey) ==  2 )
			{
			
				PS.AudioPlay("piano_d7");
			}
		else if ( PS.BeadData (5,countingKey) ==  3 )
			{
			
				PS.AudioPlay("piano_e7");
			}
		else if ( PS.BeadData (5,countingKey) ==  4 )
			{
			
				PS.AudioPlay("piano_gb7");
			}
		else if ( PS.BeadData (5,countingKey) ==  5 )
			{
			
				PS.AudioPlay("piano_ab7");
			}
		else if ( PS.BeadData (5,countingKey) ==  6 )
			{
			
				PS.AudioPlay("piano_b7");
			}
		}
	else if ( countingKey == 5 )
		{
			if ( PS.BeadData (5,countingKey) ==  1 )
			{
			
				PS.AudioPlay("piano_c2");
			}
		else if ( PS.BeadData (5,countingKey) ==  2 )
			{
			
				PS.AudioPlay("piano_d2");
			}
		else if ( PS.BeadData (5,countingKey) ==  3 )
			{
			
				PS.AudioPlay("piano_e2");
			}
		else if ( PS.BeadData (5,countingKey) ==  4 )
			{
			
				PS.AudioPlay("piano_f2");
			}
		else if ( PS.BeadData (5,countingKey) ==  5 )
			{
			
				PS.AudioPlay("piano_g2");
			}
		else if ( PS.BeadData (5,countingKey) ==  6 )
			{
			
				PS.AudioPlay("piano_a2");
			}
	}
	countingKey = countingKey+1;
	
	if (countingKey == 6)
	{
		countingKey = 0;
	}
	
};
