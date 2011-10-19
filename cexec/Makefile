PRE=0
PIXI=1
DESKTOP=0
DEBUG=0

ifeq (1,$(DEBUG))
DEVICEOPTS=-g
else
DEVICEOPTS=
endif

ifeq (1,$(PRE))
DEVICEOPTS += -mcpu=cortex-a8 -mfpu=neon -mfloat-abi=softfp
else ifeq (1,$(PIXI))
DEVICEOPTS += -mcpu=arm1136jf-s -mfpu=vfp -mfloat-abi=softfp
else
$(error Must set either PRE or PIXI variable to 1 to build)
endif

INC="-I$(PalmPDK)\include" "-I$(PalmPDK)\include\SDL" 

CC=arm-none-linux-gnueabi-gcc
CFLAGS=$(INC) $(DEVICEOPTS)
CPP=arm-none-linux-gnueabi-g++
CPPFLAGS=$(CFLAGS)
LIBS=-lSDL -lpdl
LDFLAGS="-L$(PalmPDK)\device\lib" $(LIBS) -Wl,--allow-shlib-undefined

%.o : %.cpp
	$(CPP) $(CPPFLAGS) -c $<

%.o : %.c
	$(CC) $(CFLAGS) -c $<

usbtools: usbtools.o
	$(CC) $(LDFLAGS) -o $@ $+

package: appinfo.json
	rm -rf STAGING
	mkdir STAGING
	cp appinfo.json STAGING
	cmd /c palm-package STAGING

clean:
	rm -rf STAGING

all: package
