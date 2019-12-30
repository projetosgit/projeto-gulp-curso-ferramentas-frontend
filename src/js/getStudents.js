const getStudents = async () => {
    const url_json = 'https://serfrontend.com/fakeapi/alunos.json'
    const response = await fetch(url_json)
    let data = await response.json()

    data.map( (s) => {            
        s.media = parseFloat(getMedia(...s.notas) )
    })        
    
    if (response.status !== 200) {
        throw Error(data.detail);
    }
    return data
    
} 