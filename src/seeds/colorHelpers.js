import chroma from "chroma-js";

const levels = [50];
for (let i = 100; i <= 900; i += 100) {
    levels.push(i);
}

function generatePalette(starterPalette) {
    let newPalette = { ...starterPalette, colors: {} };

    levels.forEach(level => { newPalette.colors[level] = []; });

    for (let color of starterPalette.colors) {
        let scale = getScale(color.color, 10).reverse();
        for (let i in scale) {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, "-"),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i])
                    .css()
                    .replace("rgb", "rgba")
                    .replace(")", ",1.0)")
            });
        }
    }
    return newPalette;
}
function getRange(hexColor) {
    const end = "#fff";
    return [
        chroma(hexColor)
            .darken(1.4)
            .hex(),
        hexColor,
        end
    ];
}

function getScale(hexColor, numberOfColors) {
    return chroma
        .scale(getRange(hexColor))
        .mode("lab")
        .colors(numberOfColors);
}

export { generatePalette };
