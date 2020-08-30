export const capitalize = (str: string) => {
     let firstLetter = str.split("")[0].toUpperCase()
     return firstLetter.concat(str.slice(1))
}

export const singularize = (str: string) => {
    let x = str.indexOf("s", str.length-1)
    if(x != -1) {
     return capitalize(str.substring(0, str.length-1))
    }
     return capitalize(str) 
}