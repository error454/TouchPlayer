#include <unistd.h>
using namespace std;

#include "SDL.h"
#include "PDL.h"

PDL_bool runCommand(PDL_JSParameters *params){
    const char *exe = PDL_GetJSParamString(params, 0);
    const char *args = PDL_GetJSParamString(params, 1);
	execl(exe, args, (char *) 0);
}

int main(int argc, char** argv)
{
    // Initialize the SDL library with the Video subsystem
    SDL_Init(SDL_INIT_VIDEO | SDL_INIT_NOPARACHUTE);

    // start the PDL library
    PDL_Init(0);
 
	PDL_RegisterJSHandler("runCommand", runCommand);
	PDL_JSRegistrationComplete();
	
    // Event descriptor
    SDL_Event Event;

    do {
    
		//PDL_CallJS("getFreeSpaceReturn", freeSpace, 2);
		
        // Process the events
        while (SDL_PollEvent(&Event)) {
            switch (Event.type) {
    
                default:
                    break;
            }
        }

	SDL_Delay(200);
    } while (Event.type != SDL_QUIT);
    
    // Cleanup
    PDL_Quit();
    SDL_Quit();

    return 0;
}
