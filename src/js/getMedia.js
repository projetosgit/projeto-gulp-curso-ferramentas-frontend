function getMedia(){
    let notas = Array.from(arguments)
    let media = (notas.reduce( (current, sum) => {
        return current + sum
    }) / notas.length)         
    return media.toFixed(2)
}