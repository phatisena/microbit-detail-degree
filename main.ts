//%block="direction detail"
//%icon="\uf14e"
//%color="#e66643"
//%weight=8
namespace dir {
    let posval: number[][] = []
    let posdir: number[] = []
    let curdeg: number = undefined
    
    //%blockid=dir_r2d
    //%block="radian convert $val to degree"
    //%group="direction converter"
    //%weight=1
    export function r2d (val: number) {
        let npi = 3.14159265359
        return val / (npi * 180)
    }

    //%blockid=dir_d2r
    //%block="degree convert $val to radian"
    //%group="direction converter"
    //%weight=2
    export function d2r (val: number) {
        let npi = 3.14159265359
        return val * (npi / 180)
    }

    function checkFullSrc(invert: boolean) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (led.point(i, j) != invert) {
                    return false
                }
            }
        }
        return true
    }

    //%blockid=dir_showdegreescreen
    //%block="show direction $deg in line length $linelen"
    //%group="show screen"
    //%weight=1
    export function showdegree (deg: number, linelen: number) {
        if (curdeg == deg && !checkFullSrc(false)) {
            return
        }
        basic.clearScreen()
        posdir = [Math.cos(d2r(deg + 90)), Math.sin(d2r(deg + 90))]
        posval = []
        for (let n = 0; n < linelen; n++) {
            posval.push([Math.round(2 - n * posdir[0]), Math.round(2 - n * posdir[1])])
        }
        for (let value of posval) {
            led.plot(value[0], value[1])
        }
        curdeg = deg
    }

    let handcurdir: number = undefined

    //%blockid=dir_dirupdate
    //%block="on direction update in $dir"
    //%draggableParameters="reporter"
    //%group="dir update"
    //%weight=1
    export function onDirUpdate(dir: number, handler: (idir: number) => void ) {
        if (dir == handcurdir && !checkFullSrc(false)) {
            return
        }
        handcurdir == dir
        let odir = dir
        handler(odir)
    }
}

